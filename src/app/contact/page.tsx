import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export const metadata = {
  title: 'Contact Us | Annapurnanand HerbalGold',
  description: 'Get in touch with our team. We\'re here to help with any questions about our Moringa products or your order.',
};

export default function ContactPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-[var(--herbal-green)] to-[var(--riverbelt-blue)] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl font-bold mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Our team is here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)] mb-6">
                Send Us a Message
              </h2>

              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--herbal-green)] focus:ring-2 focus:ring-[var(--herbal-green)] focus:ring-opacity-20 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--herbal-green)] focus:ring-2 focus:ring-[var(--herbal-green)] focus:ring-opacity-20 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--herbal-green)] focus:ring-2 focus:ring-[var(--herbal-green)] focus:ring-opacity-20 outline-none transition-all"
                  >
                    <option value="">Select a topic</option>
                    <option value="product">Product Inquiry</option>
                    <option value="order">Order Status</option>
                    <option value="bulk">Bulk Orders</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--herbal-green)] focus:ring-2 focus:ring-[var(--herbal-green)] focus:ring-opacity-20 outline-none transition-all resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <button type="submit" className="btn-gold py-3 px-8 text-lg">
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)] mb-6">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-[var(--parchment)] rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-[var(--herbal-green)]/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={24} className="text-[var(--herbal-green)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)] mb-1">Email Us</h3>
                    <a
                      href="mailto:support@herbalgoldriverbelt.com"
                      className="text-[var(--herbal-green)] hover:underline"
                    >
                      support@herbalgoldriverbelt.com
                    </a>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">
                      We typically respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-[var(--parchment)] rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-[var(--riverbelt-blue)]/10 flex items-center justify-center flex-shrink-0">
                    <Phone size={24} className="text-[var(--riverbelt-blue)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)] mb-1">Call Us</h3>
                    <p className="text-[var(--text-primary)]">+91 XXXX XXXXXX</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">
                      Monday - Saturday, 10am - 6pm IST
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-[var(--parchment)] rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-[var(--premium-gold)]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={24} className="text-[var(--premium-gold)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)] mb-1">Visit Us</h3>
                    <p className="text-[var(--text-primary)]">
                      HerbalGold Farmer Producer Company
                    </p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Godavari Riverbelt Region,<br />
                      Maharashtra, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-[var(--parchment)] rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-[var(--herbal-green)]/10 flex items-center justify-center flex-shrink-0">
                    <Clock size={24} className="text-[var(--herbal-green)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)] mb-1">Business Hours</h3>
                    <p className="text-[var(--text-primary)]">Monday - Saturday</p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      10:00 AM - 6:00 PM IST
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ Callout */}
              <div className="mt-8 p-6 bg-gradient-to-br from-[var(--herbal-green)]/10 to-[var(--riverbelt-blue)]/10 rounded-xl border border-[var(--herbal-green)]/20">
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">
                  Frequently Asked Questions
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  Find quick answers to common questions about our products, shipping, and more.
                </p>
                <a href="/faq" className="btn-outline text-sm py-2 px-4">
                  View FAQs
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
