# 🌿 Annapurnanand - HerbalGold Riverbelt

> **Premium Ayurvedic E-Commerce Platform** | Soil to Soul Journey\
> _Farmer-grown, Science-backed Moringa products from the Godavari Riverbelt_

---

## 👥 Team

| Name             | Role           |
| ---------------- | -------------- |
| **yash magar**    | Lead Developer |
| **Yash Date**    | Lead Developer |
| **AI Assistant** | Builder Agent  |

---

## 📊 Current Progress (January 14, 2026)

### ✅ Phase 1: Foundation — COMPLETE

| Feature                     | Status | Notes                                        |
| --------------------------- | ------ | -------------------------------------------- |
| Next.js 14 App Router Setup | ✅     | TypeScript + Tailwind-free vanilla CSS       |
| Premium Design System       | ✅     | Custom CSS variables, Playfair + Inter fonts |
| Responsive Layout           | ✅     | Mobile-first, tested down to 320px           |
| Header + Navigation         | ✅     | Sticky header, mobile menu, search bar       |
| Footer + Disclaimer         | ✅     | FSSAI compliance, newsletter signup          |

### ✅ Phase 2: Core Pages — COMPLETE

| Page            | Route             | Status                                              |
| --------------- | ----------------- | --------------------------------------------------- |
| Homepage        | `/`               | ✅ Hero, Trust Icons, Founder, Products, Newsletter |
| Shop            | `/shop`           | ✅ Product grid with filters                        |
| Product Detail  | `/product/[slug]` | ✅ Full product info, nutrition, add-to-cart        |
| About/Our Story | `/about`          | ✅ Brand story                                      |
| The Riverbelt   | `/riverbelt`      | ✅ Soil-to-Soul journey                             |
| Blog            | `/blog`           | ✅ Article listing                                  |
| Contact         | `/contact`        | ✅ Contact form                                     |
| FAQ             | `/faq`            | ✅ Accordion FAQ                                    |
| 404 Not Found   | `*`               | ✅ Custom error page                                |

### ✅ Phase 3: E-Commerce Functionality — COMPLETE

| Feature                          | Status | Notes                          |
| -------------------------------- | ------ | ------------------------------ |
| Product Data (JSON)              | ✅     | 5 products with full details   |
| Cart Context (React)             | ✅     | Add/remove/quantity management |
| Cart Sidebar                     | ✅     | Slide-out drawer with totals   |
| "Add to Cart" Buttons            | ✅     | On cards + product pages       |
| "Ideal For" Tags                 | ✅     | Audience segmentation          |
| "Dr. Mohini's Formulation" Badge | ✅     | Trust signal on all products   |

### ✅ Phase 4: Admin Dashboard — COMPLETE

| Feature            | Route              | Status             |
| ------------------ | ------------------ | ------------------ |
| Admin Home         | `/admin`           | ✅ Stats overview  |
| Product Management | `/admin/products`  | ✅ CRUD operations |
| Order Management   | `/admin/orders`    | ✅ Order listing   |
| Inventory          | `/admin/inventory` | ✅ Stock tracking  |
| Settings           | `/admin/settings`  | ✅ Basic settings  |

### ✅ Phase 5: Brand Identity Refinements — COMPLETE (Today)

| Refinement                        | Status                           |
| --------------------------------- | -------------------------------- |
| ANNAPURNANAND brand hierarchy     | ✅ Header/Footer updated         |
| Godavari River SVG path           | ✅ Organic timeline connector    |
| Founder power statement           | ✅ 2-line condensed quote        |
| Credential repetition reduced     | ✅ BAMS/MPH-N → 2 locations only |
| "Clinically Aligned Formulations" | ✅ Replaced "most loved"         |
| "Dr. Mohini's Riverbelt Journal"  | ✅ Newsletter renamed            |
| Premium button system             | ✅ btn-link, btn-gold, btn-ghost |

---

## 🏗️ Project Structure

```
annapurnanand/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Homepage
│   │   ├── layout.tsx            # Root layout
│   │   ├── globals.css           # Design system
│   │   ├── shop/page.tsx         # Product listing
│   │   ├── product/[slug]/       # Dynamic product pages
│   │   ├── about/page.tsx        # Our Story
│   │   ├── blog/page.tsx         # Blog listing
│   │   ├── contact/page.tsx      # Contact form
│   │   ├── riverbelt/page.tsx    # Soil-to-Soul story
│   │   ├── faq/page.tsx          # FAQ accordion
│   │   ├── admin/                # Admin dashboard
│   │   │   ├── page.tsx          # Admin home
│   │   │   ├── products/         # Product CRUD
│   │   │   ├── orders/           # Order management
│   │   │   ├── inventory/        # Stock tracking
│   │   │   └── settings/         # Settings
│   │   └── not-found.tsx         # 404 page
│   ├── components/
│   │   ├── Header.tsx            # Site header + nav
│   │   ├── Footer.tsx            # Site footer
│   │   ├── ProductCard.tsx       # Product card component
│   │   ├── CartSidebar.tsx       # Shopping cart drawer
│   │   ├── FounderSpotlight.tsx  # Dr. Mohini section
│   │   ├── RiverbeltStory.tsx    # Timeline component
│   │   ├── RiverbeltPath.tsx     # SVG river animation
│   │   ├── TrustIcons.tsx        # Trust badge strip
│   │   └── admin/                # Admin components
│   ├── context/
│   │   ├── CartContext.tsx       # Cart state management
│   │   └── AdminContext.tsx      # Admin state
│   └── data/
│       └── products.json         # Product catalog
├── public/
│   └── images/                   # Product & brand images
├── package.json
└── README.md                     # This file
```

---

## 🚀 Next Stages to Deployment

### Stage 1: Backend Integration (Priority: HIGH)

- [ ] **Set up Supabase** — PostgreSQL database
- [ ] **Migrate products.json → Database** — Products, categories tables
- [ ] **User authentication** — Supabase Auth (email/password)
- [ ] **Order storage** — Orders, order_items tables
- [ ] **Admin authentication** — Protected admin routes

### Stage 2: Payment Gateway (Priority: HIGH)

- [ ] **Razorpay integration** — UPI, cards, net banking
- [ ] **Checkout flow** — Address → Payment → Confirmation
- [ ] **Order confirmation emails** — Transactional emails
- [ ] **Invoice generation** — PDF invoices

### Stage 3: Real Product Assets (Priority: MEDIUM)

- [ ] **Product photography** — Replace emoji placeholders
- [ ] **Dr. Mohini photo** — Replace stethoscope icon
- [ ] **Brand logo SVG** — Replace Lucide leaf icon
- [ ] **Optimize images** — Next.js Image optimization

### Stage 4: Compliance & Legal (Priority: HIGH)

- [ ] **FSSAI License Number** — Replace XXXXXXXXXX placeholder
- [ ] **Privacy Policy page** — `/privacy`
- [ ] **Terms & Conditions page** — `/terms`
- [ ] **Refund Policy page** — `/refund`
- [ ] **Shipping Policy page** — `/shipping`

### Stage 5: Production Deployment (Priority: HIGH)

- [ ] **Domain setup** — annapurnanand.com
- [ ] **Vercel deployment** — Connect GitHub repo
- [ ] **Environment variables** — API keys, database URLs
- [ ] **SSL certificate** — Auto via Vercel
- [ ] **Analytics** — Google Analytics / Vercel Analytics

### Stage 6: Post-Launch Enhancements (Priority: LOW)

- [ ] **Wishlist functionality**
- [ ] **Product reviews & ratings**
- [ ] **Coupon/discount codes**
- [ ] **Inventory alerts (low stock)**
- [ ] **Email newsletter integration** — Mailchimp/Resend
- [ ] **WhatsApp order notifications**

---

## 🛠️ Tech Stack

| Layer          | Technology                              |
| -------------- | --------------------------------------- |
| **Framework**  | Next.js 14 (App Router)                 |
| **Language**   | TypeScript                              |
| **Styling**    | Vanilla CSS (custom design system)      |
| **Fonts**      | Playfair Display + Inter (Google Fonts) |
| **Icons**      | Lucide React                            |
| **State**      | React Context API                       |
| **Database**   | JSON (→ Supabase for production)        |
| **Deployment** | Vercel (planned)                        |

---

## 🏃 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/annapurnanand.git
cd annapurnanand

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm run start
```

---

## 📝 Key Design Decisions

1. **No Tailwind** — Vanilla CSS for maximum control and smaller bundle
2. **JSON Data** — Quick prototyping, will migrate to Supabase
3. **Client-side Cart** — React Context for instant UI updates
4. **Playfair Display** — Premium serif for headings (Organic India inspiration)
5. **Gold + Green palette** — Premium wellness aesthetic

---

## 📄 License

Proprietary — Annapurnanand HerbalGold © 2026

---

## 📞 Contact

- **Email**: care@annapurnanand.com
- **Location**: Godavari Riverbelt Region, Maharashtra, India

---

_Last Updated: January 14, 2026_
