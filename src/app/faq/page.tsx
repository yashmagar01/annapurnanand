import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Frequently Asked Questions | Annapurnanand',
  description: 'Find answers to common questions about our Moringa products, shipping, ingredients, and more.',
};

const faqCategories = [
  {
    title: 'Products & Ingredients',
    faqs: [
      {
        question: 'Where is your Moringa sourced from?',
        answer: 'All our Moringa is grown by HerbalGold Farmer Producer Company members in the Godavari Riverbelt region of Maharashtra, India. This area\'s mineral-rich alluvial soil produces some of the most nutrient-dense Moringa in the world.',
      },
      {
        question: 'Are your products 100% natural?',
        answer: 'Yes! All our products contain only natural ingredients with no artificial preservatives, colors, or flavors. We believe in the power of nature to provide complete nutrition.',
      },
      {
        question: 'What makes your Moringa different from others?',
        answer: 'Three things set us apart: (1) Our Godavari Riverbelt sourcing provides superior nutrient density, (2) Every product is formulated by Dr. Mohini Zate with her dual expertise in Ayurveda and Public Health, and (3) Complete traceability from farm to your home.',
      },
      {
        question: 'Are your products suitable for children?',
        answer: 'Yes, several of our products are specifically formulated for families including children. Our Moringa Cocoa Smoothie Mix and Moringa Millet Nutrition Powder are particularly popular with kids. Always consult your pediatrician for children under 2 years.',
      },
    ],
  },
  {
    title: 'Ordering & Shipping',
    faqs: [
      {
        question: 'Do you offer free shipping?',
        answer: 'Yes! We offer free shipping on all orders above ₹499 across India. Orders below ₹499 have a flat shipping fee of ₹49.',
      },
      {
        question: 'How long does delivery take?',
        answer: 'Standard delivery takes 4-7 business days for most locations in India. Metro cities typically receive orders within 3-5 business days. You\'ll receive tracking information once your order ships.',
      },
      {
        question: 'Do you ship internationally?',
        answer: 'Currently, we only ship within India. International shipping is coming soon! Sign up for our newsletter to be notified when we launch global shipping.',
      },
    ],
  },
  {
    title: 'Usage & Storage',
    faqs: [
      {
        question: 'How should I store the products?',
        answer: 'Store all products in a cool, dry place away from direct sunlight. Once opened, reseal tightly and consume within the period mentioned on the packaging. Capsules and tablets should be kept away from moisture.',
      },
      {
        question: 'Can I take multiple products together?',
        answer: 'Yes, our products are formulated to complement each other. However, we recommend starting with one product and adding others gradually. If you have any medical conditions, please consult your healthcare provider.',
      },
      {
        question: 'What\'s the recommended daily dosage?',
        answer: 'Each product has specific usage instructions on the packaging. Generally, 1-2 teaspoons of powder products or 2 capsules/tablets daily is recommended. The product detail pages on our website have complete usage guidelines.',
      },
    ],
  },
  {
    title: 'Returns & Refunds',
    faqs: [
      {
        question: 'What is your return policy?',
        answer: 'We offer a 30-day satisfaction guarantee. If you\'re not happy with your purchase, contact us within 30 days of delivery for a full refund. Products must be returned in original packaging.',
      },
      {
        question: 'How do I request a refund?',
        answer: 'Email us at support@herbalgoldriverbelt.com with your order number and reason for return. We\'ll process your request within 48 hours and arrange for pickup if needed.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-[var(--riverbelt-blue)] to-[var(--herbal-green)] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Find answers to common questions about our products, shipping, and more.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="section">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {faqCategories.map((category, catIndex) => (
              <div key={catIndex} className="mb-10">
                <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--herbal-green)] mb-6">
                  {category.title}
                </h2>

                <div className="space-y-4">
                  {category.faqs.map((faq, faqIndex) => (
                    <details
                      key={faqIndex}
                      className="group bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
                    >
                      <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                        <h3 className="font-semibold text-[var(--text-primary)] pr-4">
                          {faq.question}
                        </h3>
                        <ChevronDown 
                          size={20} 
                          className="text-[var(--text-secondary)] group-open:rotate-180 transition-transform flex-shrink-0" 
                        />
                      </summary>
                      <div className="px-5 pb-5 pt-0">
                        <p className="text-[var(--text-secondary)] leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Still Need Help */}
          <div className="max-w-xl mx-auto mt-16 text-center p-8 bg-[var(--parchment)] rounded-2xl">
            <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[var(--text-primary)] mb-3">
              Still Have Questions?
            </h2>
            <p className="text-[var(--text-secondary)] mb-6">
              Our team is here to help. Reach out and we'll get back to you within 24 hours.
            </p>
            <Link href="/contact" className="btn-herbal">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
