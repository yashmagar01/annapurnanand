'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import { MapPin, Phone, User, ChevronRight, Truck, ShieldCheck, CreditCard, Package, ChevronDown, ChevronUp, ShoppingBag, Banknote, Smartphone, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { createClient } from '@/lib/supabase/client';
import { validateAndCreateOrder } from '@/actions/order-actions';
import { verifyPaymentAndUpdateOrder } from '@/actions/verify-payment';
import Image from 'next/image';

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

type PaymentMethod = 'RAZORPAY' | 'COD';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart, totalItems } = useCart();
  const { user, loading: authLoading } = useAuth();
  const supabase = createClient();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showOrderSummaryMobile, setShowOrderSummaryMobile] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('RAZORPAY');
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  
  const [address, setAddress] = useState<AddressForm>({
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
  });

  const shippingCost = totalPrice >= 499 ? 0 : 49;
  const grandTotal = totalPrice + shippingCost;

  useEffect(() => {
    if (user?.user_metadata?.full_name) {
      setAddress(prev => ({ ...prev, fullName: user.user_metadata.full_name }));
    }
  }, [user]);

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
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (paymentMethod === 'RAZORPAY' && !razorpayLoaded) {
      setError('Payment gateway is still loading. Please wait a moment.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Step 1: Save address to Supabase
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

      // Step 2: Call server action for validated order creation
      const cartItems = items.map(item => ({
        variantId: item.variantId,
        quantity: item.quantity,
      }));

      const result = await validateAndCreateOrder({
        addressId: savedAddress.id,
        paymentMethod,
        cartItems,
      });

      if (!result.success) {
        setError(result.error || 'Failed to create order.');
        setLoading(false);
        return;
      }

      // Step 3: Handle COD or Razorpay
      if (paymentMethod === 'COD') {
        clearCart();
        router.push(`/checkout/success?orderId=${result.orderId}`);
        return;
      }

      if (paymentMethod === 'RAZORPAY' && result.razorpayOrderId) {
        // Open Razorpay payment modal
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: result.amount,
          currency: result.currency || 'INR',
          name: 'Annapurnanand',
          description: 'Ayurvedic Nutrition Order',
          order_id: result.razorpayOrderId,
          handler: async function (response: any) {
            // Verify payment signature on the server
            const verifyResult = await verifyPaymentAndUpdateOrder({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: result.orderId!,
            });

            if (verifyResult.success) {
              clearCart();
              router.push(`/checkout/success?orderId=${result.orderId}`);
            } else {
              setError('Payment verification failed. Please contact support.');
              setLoading(false);
            }
          },
          prefill: {
            name: address.fullName,
            email: user?.email || '',
            contact: address.phone,
          },
          theme: {
            color: '#2D5016',
          },
          modal: {
            ondismiss: function () {
              setLoading(false);
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function () {
          setError('Payment failed. Please try again or choose Cash on Delivery.');
          setLoading(false);
        });
        rzp.open();
      }

    } catch (err: any) {
      console.error('Order error:', err);
      setError(err.message || 'Failed to place order. Please try again.');
      setLoading(false);
    }
  };

  if (authLoading || items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--parchment)]">
        <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-[var(--herbal-green)] border-t-transparent rounded-full animate-spin"></div>
            <div className="text-[var(--text-secondary)] font-medium">Loading checkout...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--parchment)] pb-20 lg:pb-0">
      {/* Razorpay Script */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setRazorpayLoaded(true)}
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 flex-none z-30 relative">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--text-secondary)]">
            <Link href="/" className="hover:text-[var(--herbal-green)]">Home</Link>
            <ChevronRight size={14} />
            <Link href="/shop" className="hover:text-[var(--herbal-green)]">Shop</Link>
            <ChevronRight size={14} />
            <span className="text-[var(--text-primary)] font-medium truncate">Checkout</span>
          </div>
        </div>
      </div>
      
      {/* Mobile Order Summary Toggle */}
      <div className="lg:hidden bg-[var(--parchment-cream)] border-b border-gray-100 sticky top-0 z-20 shadow-sm">
        <button 
            onClick={() => setShowOrderSummaryMobile(!showOrderSummaryMobile)}
            className="w-full px-4 py-4 flex items-center justify-between"
        >
            <div className="flex items-center gap-2 text-[var(--herbal-green)] font-medium">
                <ShoppingBag size={18} />
                <span>{showOrderSummaryMobile ? 'Hide' : 'Show'} Order Summary</span>
                {showOrderSummaryMobile ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
            <span className="font-bold text-[var(--text-primary)] text-lg">₹{grandTotal}</span>
        </button>
        
        <div className={`overflow-hidden transition-all duration-300 ease-in-out bg-white ${showOrderSummaryMobile ? 'max-h-[500px] border-b border-gray-100' : 'max-h-0'}`}>
            <div className="p-4 space-y-4">
                {items.map(item => (
                    <div key={item.variantId} className="flex gap-4">
                    <div className="w-16 h-16 relative bg-[var(--parchment)] rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                        <span className="absolute top-0 right-0 bg-gray-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-bl-lg font-bold">
                            {item.quantity}
                        </span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-medium text-[var(--text-primary)] text-sm line-clamp-2">{item.name}</p>
                        <p className="text-xs text-[var(--text-secondary)]">{item.netQty}</p>
                    </div>
                    <p className="font-semibold text-[var(--text-primary)]">₹{item.price * item.quantity}</p>
                    </div>
                ))}
                
                <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-[var(--text-secondary)]">Subtotal</span>
                        <span>₹{totalPrice}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-[var(--text-secondary)]">Shipping</span>
                        <span className={shippingCost === 0 ? 'text-[var(--herbal-green)] font-medium' : ''}>
                            {shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}
                        </span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 lg:py-10">
        <h1 className="font-[family-name:var(--font-heading)] text-2xl lg:text-4xl font-bold text-[var(--riverbelt-blue)] mb-6 lg:mb-10 text-center lg:text-left">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            {/* Shipping Address */}
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 relative overflow-hidden">
              <div className="relative z-10">
                  <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[var(--text-primary)] mb-6 flex items-center gap-3 pb-4 border-b border-gray-100">
                    <div className="w-8 h-8 rounded-full bg-[var(--herbal-green-50)] flex items-center justify-center text-[var(--herbal-green)]">
                        <MapPin size={18} />
                    </div>
                    <span>1. Shipping Information</span>
                  </h2>
    
                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-start gap-2 animate-fade-in-up">
                      <span className="mt-0.5">⚠️</span>
                      {error}
                    </div>
                  )}
    
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5 ml-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[var(--herbal-green)] transition-colors" size={18} />
                        <input
                          type="text"
                          name="fullName"
                          value={address.fullName}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-[var(--herbal-green)] focus:ring-4 focus:ring-[var(--herbal-green)]/10 outline-none transition-all placeholder:text-gray-300"
                        />
                      </div>
                    </div>
    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5 ml-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[var(--herbal-green)] transition-colors" size={18} />
                        <span className="absolute left-11 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium border-r border-gray-200 pr-2">+91</span>
                        <input
                          type="tel"
                          name="phone"
                          value={address.phone}
                          onChange={handleInputChange}
                          placeholder="00000 00000"
                          maxLength={10}
                          className="w-full pl-24 pr-4 py-3 border border-gray-200 rounded-xl focus:border-[var(--herbal-green)] focus:ring-4 focus:ring-[var(--herbal-green)]/10 outline-none transition-all placeholder:text-gray-300 tracking-wide font-medium"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5 ml-1">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="addressLine1"
                        value={address.addressLine1}
                        onChange={handleInputChange}
                        placeholder="House No, Building, Street"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[var(--herbal-green)] focus:ring-4 focus:ring-[var(--herbal-green)]/10 outline-none transition-all placeholder:text-gray-300"
                      />
                    </div>
    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5 ml-1">
                        Landmark / Area <span className="text-[var(--text-light)] text-xs font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        name="addressLine2"
                        value={address.addressLine2}
                        onChange={handleInputChange}
                        placeholder="Near..."
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[var(--herbal-green)] focus:ring-4 focus:ring-[var(--herbal-green)]/10 outline-none transition-all placeholder:text-gray-300"
                      />
                    </div>
    
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5 ml-1">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={address.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[var(--herbal-green)] focus:ring-4 focus:ring-[var(--herbal-green)]/10 outline-none transition-all placeholder:text-gray-300"
                      />
                    </div>
    
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5 ml-1">
                        Pincode <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={address.pincode}
                        onChange={handleInputChange}
                        placeholder="000 000"
                        maxLength={6}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[var(--herbal-green)] focus:ring-4 focus:ring-[var(--herbal-green)]/10 outline-none transition-all placeholder:text-gray-300"
                      />
                    </div>
    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5 ml-1">
                        State <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                          <select
                            name="state"
                            value={address.state}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[var(--herbal-green)] focus:ring-4 focus:ring-[var(--herbal-green)]/10 outline-none bg-white appearance-none cursor-pointer text-[var(--text-primary)]"
                          >
                            <option value="">Select State</option>
                            {INDIAN_STATES.map(state => (
                              <option key={state} value={state}>{state}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                      </div>
                    </div>
                  </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100">
              <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[var(--text-primary)] mb-6 flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="w-8 h-8 rounded-full bg-[var(--herbal-green-50)] flex items-center justify-center text-[var(--herbal-green)]">
                  <CreditCard size={18} />
                </div>
                <span>2. Payment Method</span>
              </h2>

              <div className="space-y-3">
                {/* Online Payment */}
                <button
                  onClick={() => setPaymentMethod('RAZORPAY')}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 text-left ${
                    paymentMethod === 'RAZORPAY'
                      ? 'border-[var(--herbal-green)] bg-[var(--herbal-green-50)] shadow-sm ring-2 ring-[var(--herbal-green)]/20'
                      : 'border-gray-200 hover:border-[var(--herbal-green-light)]'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    paymentMethod === 'RAZORPAY' ? 'border-[var(--herbal-green)]' : 'border-gray-300'
                  }`}>
                    {paymentMethod === 'RAZORPAY' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[var(--herbal-green)]" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Smartphone size={18} className="text-[var(--herbal-green)]" />
                      <span className="font-semibold text-[var(--text-primary)]">Pay Online</span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)]">
                      UPI (GPay, PhonePe) • Debit/Credit Cards • Net Banking • Wallets
                    </p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <div className="w-8 h-5 bg-blue-600 rounded text-white text-[8px] flex items-center justify-center font-bold">VISA</div>
                    <div className="w-8 h-5 bg-orange-500 rounded text-white text-[8px] flex items-center justify-center font-bold">UPI</div>
                  </div>
                </button>

                {/* Cash on Delivery */}
                <button
                  onClick={() => setPaymentMethod('COD')}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 text-left ${
                    paymentMethod === 'COD'
                      ? 'border-[var(--herbal-green)] bg-[var(--herbal-green-50)] shadow-sm ring-2 ring-[var(--herbal-green)]/20'
                      : 'border-gray-200 hover:border-[var(--herbal-green-light)]'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    paymentMethod === 'COD' ? 'border-[var(--herbal-green)]' : 'border-gray-300'
                  }`}>
                    {paymentMethod === 'COD' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[var(--herbal-green)]" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Banknote size={18} className="text-[var(--herbal-green)]" />
                      <span className="font-semibold text-[var(--text-primary)]">Cash on Delivery</span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)]">
                      Pay when you receive your order
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 text-center border border-transparent hover:border-[var(--herbal-green-100)] transition-all shadow-sm">
                <div className="w-10 h-10 rounded-full bg-[var(--herbal-green-50)] flex items-center justify-center mx-auto mb-3 text-[var(--herbal-green)]">
                   <Truck size={20} />
                </div>
                <p className="text-xs text-[var(--text-secondary)] font-medium">Free Delivery <br/><span className="text-[var(--herbal-green)]">on ₹499+</span></p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center border border-transparent hover:border-[var(--herbal-green-100)] transition-all shadow-sm">
                 <div className="w-10 h-10 rounded-full bg-[var(--herbal-green-50)] flex items-center justify-center mx-auto mb-3 text-[var(--herbal-green)]">
                    <ShieldCheck size={20} />
                 </div>
                <p className="text-xs text-[var(--text-secondary)] font-medium">100% Secure <br/>Checkout</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center border border-transparent hover:border-[var(--herbal-green-100)] transition-all shadow-sm">
                 <div className="w-10 h-10 rounded-full bg-[var(--herbal-green-50)] flex items-center justify-center mx-auto mb-3 text-[var(--herbal-green)]">
                    <Package size={20} />
                 </div>
                <p className="text-xs text-[var(--text-secondary)] font-medium">Quality <br/> Assured</p>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-4">
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 sticky top-24">
              <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[var(--text-primary)] mb-6 pb-4 border-b border-gray-100">
                Order Summary
              </h2>

              <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map(item => (
                  <div key={item.variantId} className="flex gap-4 group">
                    <div className="w-16 h-16 relative bg-[var(--parchment)] rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                       <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[var(--text-primary)] text-sm line-clamp-2 mb-1 group-hover:text-[var(--herbal-green)] transition-colors">{item.name}</p>
                      <p className="text-xs text-[var(--text-secondary)]">{item.netQty} × <span className="font-semibold text-[var(--text-primary)]">{item.quantity}</span></p>
                    </div>
                    <p className="font-semibold text-[var(--text-primary)]">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-2 bg-[var(--parchment-cream)] -mx-6 -mb-6 p-6 rounded-b-2xl border-t border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Subtotal ({totalItems} items)</span>
                  <span className="text-[var(--text-primary)] font-medium">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Shipping</span>
                  <span className={shippingCost === 0 ? 'text-[var(--herbal-green)] font-semibold' : 'text-[var(--text-primary)] font-medium'}>
                    {shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}
                  </span>
                </div>
                
                <div className="my-2 border-t border-dashed border-gray-300"></div>

                <div className="flex justify-between items-baseline mb-6">
                  <span className="text-base font-semibold text-[var(--text-primary)]">Total Amount</span>
                  <span className="text-2xl font-bold text-[var(--riverbelt-blue)]">₹{grandTotal}</span>
                </div>

                <Button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    isLoading={loading}
                    size="lg"
                    fullWidth
                    className="py-4 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                    icon={paymentMethod === 'RAZORPAY' ? <CreditCard size={20} /> : <Banknote size={20} />}
                    iconPosition="left"
                >
                    {loading ? 'Processing...' : paymentMethod === 'COD' ? 'Place Order (COD)' : 'Pay Now'}
                </Button>

                <p className="text-[10px] text-center text-[var(--text-light)] mt-4">
                    By placing this order, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Sticky Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 pb-safe z-40 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
           <div className="flex items-center gap-4">
               <div className="flex-1">
                   <p className="text-xs text-[var(--text-secondary)] uppercase font-semibold tracking-wide">Total Pay</p>
                   <p className="text-xl font-bold text-[var(--riverbelt-blue)]">₹{grandTotal}</p>
               </div>
               <Button
                   onClick={handlePlaceOrder}
                   disabled={loading}
                   isLoading={loading}
                   className="flex-1 shadow-md"
               >
                   {loading ? 'Processing...' : paymentMethod === 'COD' ? 'Place Order' : 'Pay Now'}
               </Button>
           </div>
      </div>
    </div>
  );
}
