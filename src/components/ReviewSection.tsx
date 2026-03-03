'use client';

import { useState, useEffect, useCallback } from 'react';
import { Star, ShieldCheck, User, PenLine } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';

interface Review {
  id: string;
  product_id: string;
  user_id: string | null;
  rating: number;
  title: string | null;
  body: string;
  is_verified_purchase: boolean;
  created_at: string;
}

interface ReviewSectionProps {
  productId: string;
}

function StarRating({ rating, interactive = false, onRate }: {
  rating: number;
  interactive?: boolean;
  onRate?: (r: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type={interactive ? 'button' : undefined}
          onClick={interactive && onRate ? () => onRate(star) : undefined}
          onMouseEnter={interactive ? () => setHovered(star) : undefined}
          onMouseLeave={interactive ? () => setHovered(0) : undefined}
          className={interactive ? 'cursor-pointer' : 'cursor-default'}
          aria-label={interactive ? `Rate ${star} star${star !== 1 ? 's' : ''}` : undefined}
        >
          <Star
            size={interactive ? 22 : 16}
            className={
              star <= (hovered || rating)
                ? 'fill-[var(--premium-gold)] text-[var(--premium-gold)]'
                : 'fill-gray-200 text-gray-200'
            }
          />
        </button>
      ))}
    </div>
  );
}

export default function ReviewSection({ productId }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isVerifiedPurchaser, setIsVerifiedPurchaser] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const supabase = createClient();

  const fetchReviews = useCallback(async () => {
    const { data } = await supabase
      .from('product_reviews')
      .select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: false });
    setReviews(data || []);
    setLoading(false);
  }, [productId, supabase]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  useEffect(() => {
    async function checkEligibility() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);

      // Verified purchase gate: check orders + order_items + product_variants
      const { data } = await supabase
        .from('orders')
        .select(`
          id,
          payment_status,
          order_items (
            variant_id,
            product_variants ( product_id )
          )
        `)
        .eq('user_id', user.id)
        .eq('payment_status', 'paid');

      const hasPurchased = (data || []).some(order =>
        (order.order_items as any[]).some((item: any) =>
          item.product_variants?.product_id === productId
        )
      );
      setIsVerifiedPurchaser(hasPurchased);
    }
    checkEligibility();
  }, [productId, supabase]);

  const avgRating = reviews.length
    ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10
    : 0;

  const ratingDist = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    pct: reviews.length ? Math.round((reviews.filter(r => r.rating === star).length / reviews.length) * 100) : 0,
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    setSubmitting(true);

    await supabase.from('product_reviews').insert({
      product_id: productId,
      user_id: userId,
      rating,
      title: title || null,
      body,
      is_verified_purchase: isVerifiedPurchaser,
    });

    setSubmitting(false);
    setSubmitted(true);
    setShowForm(false);
    fetchReviews();
  };

  return (
    <section className="section bg-white" id="reviews">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">

          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)] mb-8">
            Customer Reviews
          </h2>

          {loading ? (
            <div className="animate-pulse space-y-4">
              {[1,2,3].map(i => <div key={i} className="h-24 bg-gray-100 rounded-xl" />)}
            </div>
          ) : (
            <>
              {/* Rating Summary */}
              {reviews.length > 0 && (
                <div className="bg-[var(--parchment)] rounded-2xl p-6 mb-8 flex flex-col sm:flex-row gap-6 items-center">
                  <div className="text-center">
                    <p className="text-5xl font-bold text-[var(--herbal-green)]">{avgRating}</p>
                    <StarRating rating={Math.round(avgRating)} />
                    <p className="text-sm text-[var(--text-secondary)] mt-1">{reviews.length} reviews</p>
                  </div>
                  <div className="flex-1 w-full space-y-1.5">
                    {ratingDist.map(({ star, count, pct }) => (
                      <div key={star} className="flex items-center gap-3 text-sm">
                        <span className="w-4 text-right text-[var(--text-secondary)]">{star}</span>
                        <Star size={12} className="fill-[var(--premium-gold)] text-[var(--premium-gold)] flex-shrink-0" />
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[var(--premium-gold)] h-2 rounded-full transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="w-8 text-[var(--text-secondary)]">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Write Review CTA */}
              {!submitted && (
                <div className="mb-8">
                  {isVerifiedPurchaser ? (
                    <Button
                      onClick={() => setShowForm(v => !v)}
                      variant="secondary"
                      icon={<PenLine size={16} />}
                    >
                      {showForm ? 'Cancel' : 'Write a Review'}
                    </Button>
                  ) : userId ? (
                    <div className="text-sm text-[var(--text-secondary)] bg-[var(--parchment)] px-4 py-3 rounded-xl inline-flex items-center gap-2">
                      <ShieldCheck size={16} className="text-[var(--herbal-green)]" />
                      Only verified purchasers can leave a review.
                    </div>
                  ) : (
                    <div className="text-sm text-[var(--text-secondary)] bg-[var(--parchment)] px-4 py-3 rounded-xl inline-flex items-center gap-2">
                      <User size={16} />
                      <a href="/auth/login" className="text-[var(--herbal-green)] font-semibold underline">Sign in</a>
                      &nbsp;to write a review after purchase.
                    </div>
                  )}
                </div>
              )}

              {/* Review Form */}
              {showForm && isVerifiedPurchaser && (
                <form onSubmit={handleSubmit} className="bg-[var(--parchment)] rounded-2xl p-6 mb-8 border border-gray-200">
                  <h3 className="font-semibold text-[var(--text-primary)] mb-4">Your Review</h3>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Rating *</label>
                    <StarRating rating={rating} interactive onRate={setRating} />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Title (optional)</label>
                    <input
                      type="text"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      placeholder="Summarize your experience"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[var(--herbal-green)] focus:ring-2 focus:ring-[var(--herbal-green)]/20 outline-none text-sm"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Review *</label>
                    <textarea
                      value={body}
                      onChange={e => setBody(e.target.value)}
                      required
                      rows={4}
                      placeholder="Tell others what you thought about the product..."
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:border-[var(--herbal-green)] focus:ring-2 focus:ring-[var(--herbal-green)]/20 outline-none text-sm resize-none"
                    />
                  </div>

                  <Button type="submit" disabled={submitting || !body}>
                    {submitting ? 'Submitting...' : 'Submit Review'}
                  </Button>
                </form>
              )}

              {/* Review List */}
              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map(review => (
                    <div key={review.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <StarRating rating={review.rating} />
                          {review.title && (
                            <p className="font-semibold text-[var(--text-primary)] mt-1">{review.title}</p>
                          )}
                        </div>
                        {review.is_verified_purchase && (
                          <span className="inline-flex items-center gap-1 bg-[var(--herbal-green-50)] text-[var(--herbal-green)] text-xs px-2.5 py-1 rounded-full font-medium border border-[var(--herbal-green-100)] flex-shrink-0">
                            <ShieldCheck size={11} />
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <p className="text-[var(--text-primary)] text-sm leading-relaxed">{review.body}</p>
                      <p className="text-xs text-[var(--text-light)] mt-3">
                        {new Date(review.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-[var(--text-secondary)]">
                  <Star size={40} className="mx-auto mb-3 opacity-20" />
                  <p className="font-medium">No reviews yet.</p>
                  <p className="text-sm">Be the first to share your experience!</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
