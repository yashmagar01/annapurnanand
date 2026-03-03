-- =============================================
-- Phase 1 Upgrade Migration
-- Adds product_variants, upgrades orders for
-- Razorpay/COD, and strengthens RLS policies
-- =============================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PRODUCT VARIANTS table
CREATE TABLE IF NOT EXISTS public.product_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  sku VARCHAR(100) UNIQUE NOT NULL,
  net_qty VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  compare_at_price DECIMAL(10, 2),
  stock_quantity INTEGER DEFAULT 100,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true
);

-- 2. Upgrade ORDERS table
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS payment_method VARCHAR(50),
  ADD COLUMN IF NOT EXISTS payment_status VARCHAR(50) DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS order_status VARCHAR(50) DEFAULT 'processing',
  ADD COLUMN IF NOT EXISTS razorpay_payment_id TEXT,
  ADD COLUMN IF NOT EXISTS awb_code VARCHAR(100);

-- 3. Add variant support to ORDER ITEMS
ALTER TABLE public.order_items
  ADD COLUMN IF NOT EXISTS variant_id UUID REFERENCES public.product_variants(id) ON DELETE RESTRICT,
  ADD COLUMN IF NOT EXISTS price_at_time DECIMAL(10, 2);

-- 4. Add role column to PROFILES for RBAC
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'customer';

-- 5. RLS Policies
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public can view active variants' AND tablename = 'product_variants') THEN
    CREATE POLICY "Public can view active variants" ON public.product_variants FOR SELECT USING (is_active = true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can manage variants' AND tablename = 'product_variants') THEN
    CREATE POLICY "Admins can manage variants" ON public.product_variants FOR ALL USING (
      EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND (profiles.is_admin = true OR profiles.role = 'admin'))
    );
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can manage products' AND tablename = 'products') THEN
    CREATE POLICY "Admins can manage products" ON public.products FOR ALL USING (
      EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND (profiles.is_admin = true OR profiles.role = 'admin'))
    );
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can read own orders' AND tablename = 'orders') THEN
    CREATE POLICY "Users can read own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can insert own orders' AND tablename = 'orders') THEN
    CREATE POLICY "Users can insert own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can manage own addresses' AND tablename = 'addresses') THEN
    CREATE POLICY "Users can manage own addresses" ON public.addresses FOR ALL USING (auth.uid() = user_id);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can read own order items' AND tablename = 'order_items') THEN
    CREATE POLICY "Users can read own order items" ON public.order_items FOR SELECT USING (
      EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
    );
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can insert own order items' AND tablename = 'order_items') THEN
    CREATE POLICY "Users can insert own order items" ON public.order_items FOR INSERT WITH CHECK (
      EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
    );
  END IF;
END $$;

-- 6. Seed Product Variants
INSERT INTO public.product_variants (product_id, sku, net_qty, price, compare_at_price, image_url)
VALUES
  ('daily-moringa-health-drink', 'DMHD-100G', '100g', 349.00, 449.00, '/images/products/daily-moringa.jpg'),
  ('moringa-cocoa-smoothie',    'MCSM-150G', '150g', 449.00, 549.00, '/images/products/moringa-cocoa.jpg'),
  ('moringa-millet-nutrition',  'MMNP-200G', '200g', 399.00, 499.00, '/images/products/moringa-millet.jpg'),
  ('moringa-digestive-mix',     'MDHM-100G', '100g', 299.00, 399.00, '/images/products/moringa-digestive.jpg'),
  ('moringa-capsules',          'MC-60C',    '60 Capsules', 549.00, 699.00, '/images/products/moringa-capsules.jpg'),
  ('moringa-tablets',           'MT-60T',    '60 Tablets', 499.00, 649.00, '/images/products/moringa-tablets.jpg')
ON CONFLICT (sku) DO NOTHING;

-- 7. Fix insecure prototype RLS policies
DROP POLICY IF EXISTS "Users can create order items" ON public.order_items;
DROP POLICY IF EXISTS "Admin can manage products" ON public.products;
ALTER FUNCTION public.handle_new_user() SET search_path = '';
ALTER FUNCTION public.update_updated_at_column() SET search_path = '';
