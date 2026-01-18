'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package, ArrowRight, Home } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchOrder() {
      if (!orderId) {
        setLoading(false);
        return;
      }

      const { data: order } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .eq('id', orderId)
        .single();

      setOrderDetails(order);
      setLoading(false);
    }

    fetchOrder();
  }, [orderId, supabase]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--parchment)]">
        <div className="animate-pulse text-[var(--text-secondary)]">Loading order details...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--parchment)] to-[var(--parchment-dark)] flex items-center justify-center py-12 px-4">
      <div className="max-w-lg w-full">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 mx-auto rounded-full bg-[var(--herbal-green)]/10 flex items-center justify-center mb-6 animate-scale-in">
            <CheckCircle className="text-[var(--herbal-green)]" size={48} />
          </div>

          <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[var(--text-primary)] mb-2">
            Order Placed!
          </h1>
          <p className="text-[var(--text-secondary)] mb-6">
            Thank you for your order. We'll start preparing it right away.
          </p>

          {/* Order ID */}
          {orderId && (
            <div className="bg-[var(--parchment)] rounded-lg p-4 mb-6">
              <p className="text-sm text-[var(--text-secondary)]">Order ID</p>
              <p className="font-mono font-bold text-[var(--riverbelt-blue)] text-lg">
                {orderId.slice(0, 8).toUpperCase()}
              </p>
            </div>
          )}

          {/* Order Summary */}
          {orderDetails && (
            <div className="text-left border-t border-gray-100 pt-6 mb-6">
              <h3 className="font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <Package size={18} className="text-[var(--herbal-green)]" />
                Order Details
              </h3>
              <div className="space-y-3">
                {orderDetails.order_items?.map((item: any) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-[var(--text-secondary)]">
                      {item.product_name} × {item.quantity}
                    </span>
                    <span className="font-medium">₹{item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold pt-3 border-t border-gray-100">
                  <span>Total</span>
                  <span className="text-[var(--herbal-green)]">₹{orderDetails.total}</span>
                </div>
              </div>
            </div>
          )}

          {/* Shipping Info */}
          {orderDetails?.shipping_address && (
            <div className="text-left bg-[var(--parchment)] rounded-lg p-4 mb-6">
              <p className="text-sm font-medium text-[var(--text-primary)] mb-1">Shipping to:</p>
              <p className="text-sm text-[var(--text-secondary)]">
                {orderDetails.shipping_address.fullName}<br />
                {orderDetails.shipping_address.addressLine1}<br />
                {orderDetails.shipping_address.city}, {orderDetails.shipping_address.state} - {orderDetails.shipping_address.pincode}
              </p>
            </div>
          )}

          {/* What's Next */}
          <div className="text-left bg-[var(--premium-gold)]/10 rounded-lg p-4 mb-6">
            <p className="text-sm font-medium text-[var(--premium-gold-dark)] mb-2">What happens next?</p>
            <ol className="text-sm text-[var(--text-secondary)] space-y-1 list-decimal list-inside">
              <li>You'll receive an order confirmation email</li>
              <li>We'll pack your order with care</li>
              <li>Track your shipment via SMS updates</li>
            </ol>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/shop" className="flex-1 btn-herbal py-3 justify-center">
              Continue Shopping
              <ArrowRight size={18} />
            </Link>
            <Link href="/" className="flex-1 btn-outline py-3 justify-center">
              <Home size={18} />
              Back to Home
            </Link>
          </div>
        </div>

        {/* Trust Note */}
        <p className="text-center text-sm text-[var(--text-light)] mt-6">
          Questions? Contact us at support@annapurnanand.com
        </p>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[var(--parchment)]">
        <div className="animate-pulse text-[var(--text-secondary)]">Loading...</div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
