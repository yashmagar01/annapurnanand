'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Phone, User, ChevronRight, Truck, ShieldCheck, CreditCard, Package } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { createClient } from '@/lib/supabase/client';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh'
];

interface AddressForm {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const { user, loading: authLoading } = useAuth();
  const supabase = createClient();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [address, setAddress] = useState<AddressForm>({
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
  });

  // Shipping cost logic
  const shippingCost = totalPrice >= 499 ? 0 : 49;
  const grandTotal = totalPrice + shippingCost;

  // Pre-fill name from user metadata
  useEffect(() => {
    if (user?.user_metadata?.full_name) {
      setAddress(prev => ({ ...prev, fullName: user.user_metadata.full_name }));
    }
  }, [user]);

  // Redirect to cart if empty
  useEffect(() => {
    if (!authLoading && items.length === 0) {
      router.push('/shop');
    }
  }, [items, authLoading, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!address.fullName.trim()) return 'Full name is required';
    if (!address.phone.trim() || !/^[6-9]\d{9}$/.test(address.phone)) return 'Valid 10-digit phone number is required';
    if (!address.addressLine1.trim()) return 'Address is required';
    if (!address.city.trim()) return 'City is required';
    if (!address.state) return 'State is required';
    if (!address.pincode.trim() || !/^\d{6}$/.test(address.pincode)) return 'Valid 6-digit pincode is required';
    return null;
  };

  const handlePlaceOrder = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Create address record
      const { data: savedAddress, error: addressError } = await supabase
        .from('addresses')
        .insert({
          user_id: user?.id,
          full_name: address.fullName,
          phone: address.phone,
          address_line1: address.addressLine1,
          address_line2: address.addressLine2 || null,
          city: address.city,
          state: address.state,
          pincode: address.pincode,
          is_default: true,
        })
        .select()
        .single();

      if (addressError) throw addressError;

      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user?.id,
          address_id: savedAddress.id,
          total: grandTotal,
          status: 'pending',
          customer_name: address.fullName,
          customer_email: user?.email,
          customer_phone: address.phone,
          shipping_address: {
            fullName: address.fullName,
            phone: address.phone,
            addressLine1: address.addressLine1,
            addressLine2: address.addressLine2,
            city: address.city,
            state: address.state,
            pincode: address.pincode,
          },
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        price: item.price,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear cart and redirect to success
      clearCart();
      router.push(`/checkout/success?orderId=${order.id}`);

    } catch (err: any) {
      console.error('Order error:', err);
      setError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-[var(--text-secondary)]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--parchment)]">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <Link href="/" className="hover:text-[var(--herbal-green)]">Home</Link>
            <ChevronRight size={14} />
            <Link href="/shop" className="hover:text-[var(--herbal-green)]">Shop</Link>
            <ChevronRight size={14} />
            <span className="text-[var(--text-primary)] font-medium">Checkout</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[var(--text-primary)] mb-8">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Address Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[var(--text-primary)] mb-6 flex items-center gap-2">
                <MapPin className="text-[var(--herbal-green)]" size={22} />
                Shipping Address
              </h2>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-light)]" size={18} />
                    <input
                      type="text"
                      name="fullName"
                      value={address.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:border-[var(--herbal-green)] focus:ring-2 focus:ring-[var(--herbal-green)]/20 outline-none"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-light)]" size={18} />
                    <input
                      type="tel"
                      name="phone"
                      value={address.phone}
                      onChange={handleInputChange}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:border-[var(--herbal-green)] focus:ring-2 focus:ring-[var(--herbal-green)]/20 outline-none"
                    />
                  </div>
                </div>

                {/* Address Line 1 */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Address Line 1 *
                  </label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={address.addressLine1}
                    onChange={handleInputChange}
                    placeholder="House/Flat No., Building Name, Street"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[var(--herbal-green)] focus:ring-2 focus:ring-[var(--herbal-green)]/20 outline-none"
                  />
                </div>

                {/* Address Line 2 */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Address Line 2 (Optional)
                  </label>
                  <input
                    type="text"
                    name="addressLine2"
                    value={address.addressLine2}
                    onChange={handleInputChange}
                    placeholder="Landmark, Area"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[var(--herbal-green)] focus:ring-2 focus:ring-[var(--herbal-green)]/20 outline-none"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[var(--herbal-green)] focus:ring-2 focus:ring-[var(--herbal-green)]/20 outline-none"
                  />
                </div>

                {/* Pincode */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={address.pincode}
                    onChange={handleInputChange}
                    placeholder="6-digit pincode"
                    maxLength={6}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[var(--herbal-green)] focus:ring-2 focus:ring-[var(--herbal-green)]/20 outline-none"
                  />
                </div>

                {/* State */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    State *
                  </label>
                  <select
                    name="state"
                    value={address.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[var(--herbal-green)] focus:ring-2 focus:ring-[var(--herbal-green)]/20 outline-none bg-white"
                  >
                    <option value="">Select State</option>
                    {INDIAN_STATES.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 text-center">
                <Truck className="mx-auto text-[var(--herbal-green)] mb-2" size={24} />
                <p className="text-xs text-[var(--text-secondary)]">Free Delivery on ₹499+</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center">
                <ShieldCheck className="mx-auto text-[var(--herbal-green)] mb-2" size={24} />
                <p className="text-xs text-[var(--text-secondary)]">100% Secure</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center">
                <Package className="mx-auto text-[var(--herbal-green)] mb-2" size={24} />
                <p className="text-xs text-[var(--text-secondary)]">Quality Assured</p>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[var(--text-primary)] mb-6">
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[var(--herbal-green-light)]/20 to-[var(--riverbelt-blue-light)]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🌿</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[var(--text-primary)] text-sm line-clamp-2">{item.name}</p>
                      <p className="text-xs text-[var(--text-secondary)]">{item.netQty} × {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-[var(--text-primary)]">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-gray-100 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Subtotal</span>
                  <span className="text-[var(--text-primary)]">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Shipping</span>
                  <span className={shippingCost === 0 ? 'text-[var(--herbal-green)] font-medium' : 'text-[var(--text-primary)]'}>
                    {shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-100">
                  <span className="text-[var(--text-primary)]">Total</span>
                  <span className="text-[var(--herbal-green)]">₹{grandTotal}</span>
                </div>
              </div>

              {/* Place Order Button */}
              {/* Place Order Button */}
              <Button
                onClick={handlePlaceOrder}
                disabled={loading}
                isLoading={loading}
                size="lg"
                fullWidth
                className="mt-6 py-4"
                icon={<CreditCard size={20} />}
                iconPosition="left"
              >
                Place Order • ₹{grandTotal}
              </Button>

              <p className="text-xs text-center text-[var(--text-light)] mt-4">
                By placing order, you agree to our Terms of Service
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
