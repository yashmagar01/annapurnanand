'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import Razorpay from 'razorpay';
import { z } from 'zod';

// We initialize Razorpay securely on the server
// You will need to add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to your .env.local
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

// Zod Schema for validation
const OrderSchema = z.object({
  addressId: z.string().uuid(),
  paymentMethod: z.enum(['COD', 'RAZORPAY']),
  cartItems: z.array(z.object({
    variantId: z.string().uuid(),
    quantity: z.number().int().min(1)
  })).min(1),
});

export async function validateAndCreateOrder(formData: z.infer<typeof OrderSchema>) {
  try {
    // 1. Validate Input Data
    const parsedData = OrderSchema.parse(formData);
    const { addressId, paymentMethod, cartItems } = parsedData;

    // 2. Initialize Supabase Client
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing user sessions.
            }
          },
        },
      }
    );

    // 3. Authenticate User
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return { success: false, error: 'Unauthorized: Please log in to place an order.' };
    }

    // 4. Calculate Server-Side Pricing & Verify Stock
    let totalAmount = 0;
    const validatedItems = [];

    for (const item of cartItems) {
      // Securely fetch the real price and stock from the database
      const { data: variant, error: variantError } = await supabase
        .from('product_variants')
        .select('id, price, stock_quantity')
        .eq('id', item.variantId)
        .single();

      if (variantError || !variant) {
        return { success: false, error: `Variant ${item.variantId} not found.` };
      }

      if (variant.stock_quantity < item.quantity) {
        return { success: false, error: 'Insufficient stock for one or more items.' };
      }

      const itemTotal = Number(variant.price) * item.quantity;
      totalAmount += itemTotal;

      validatedItems.push({
        variant_id: variant.id,
        quantity: item.quantity,
        price_at_time: variant.price
      });
    }

    // Optional: Add shipping logic here (e.g., if totalAmount < 500, add 50 flat rate)
    
    // 5. Create Order Record
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        total_amount: totalAmount,
        payment_method: paymentMethod,
        payment_status: paymentMethod === 'COD' ? 'pending' : 'pending',
        shipping_address_id: addressId,
      })
      .select('id')
      .single();

    if (orderError) throw orderError;

    // 6. Insert Order Items
    const orderItemsToInsert = validatedItems.map(item => ({
      ...item,
      order_id: order.id
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItemsToInsert);

    if (itemsError) {
      // Rollback logic could be implemented here or managed by database transactions via a Postgres Function
      throw itemsError;
    }

    // 7. Handle Payment Methods
    if (paymentMethod === 'COD') {
      // Order complete! Return success to redirect user.
      return { 
        success: true, 
        orderId: order.id, 
        message: 'Order created successfully with Cash on Delivery.' 
      };
    } 
    
    if (paymentMethod === 'RAZORPAY') {
      // Generate Razorpay Order locally on Server
      const razorpayOrder = await razorpay.orders.create({
        amount: Math.round(totalAmount * 100), // Razorpay expects amount in paise
        currency: 'INR',
        receipt: `receipt_order_${order.id}`,
      });

      // Save the razorpay_order_id to the database reference
      await supabase
        .from('orders')
        .update({ razorpay_order_id: razorpayOrder.id })
        .eq('id', order.id);

      return {
        success: true,
        orderId: order.id,
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
      };
    }

    return { success: false, error: 'Invalid payment method.' };

  } catch (error: any) {
    console.error('Order creation failed:', error);
    return { success: false, error: error.message || 'An unexpected error occurred.' };
  }
}
