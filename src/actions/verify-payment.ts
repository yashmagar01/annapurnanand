'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import crypto from 'crypto';

export async function verifyPaymentAndUpdateOrder({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  orderId,
}: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  orderId: string;
}) {
  try {
    // 1. Cryptographically verify the Razorpay signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(body)
      .digest('hex');

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid) {
      return { success: false, error: 'Payment verification failed. Invalid signature.' };
    }

    // 2. Update order in database
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
              // Ignored in Server Component context
            }
          },
        },
      }
    );

    const { error: updateError } = await supabase
      .from('orders')
      .update({
        payment_status: 'paid',
        razorpay_payment_id: razorpay_payment_id,
        order_status: 'processing',
      })
      .eq('id', orderId)
      .eq('razorpay_order_id', razorpay_order_id);

    if (updateError) {
      console.error('Failed to update order:', updateError);
      return { success: false, error: 'Failed to update order status.' };
    }

    return { success: true, orderId };

  } catch (error: any) {
    console.error('Payment verification error:', error);
    return { success: false, error: error.message || 'Verification failed.' };
  }
}
