# Bizleap Marketplace - System BRAIN

This document serves as the single source of truth for the Bizleap Marketplace project. It is intended for any future AI agent or developer to understand the architecture, workflows, data flow, integrations, and technical debt of the system.

## 1. High-Level Overview
**Bizleap Marketplace** is a digital asset storefront for UI kits, web templates, and dashboards. 
The system operates as a classic Single Page Application (SPA) with a lightweight backend for offloading sensitive actions (emails) and relies heavily on Backend-as-a-Service (Supabase) for authentication and database management.

### Tech Stack
- **Frontend:** React 19, Vite, Tailwind CSS v4, React Router v7, Radix UI, Framer Motion/GSAP.
- **Backend:** Node.js, Express 5.
- **Database & Auth:** Supabase (PostgreSQL).
- **Payments:** Razorpay (Test Mode).
- **Emails:** Nodemailer (via SMTP).

---

## 2. Architecture & Repository Structure

```text
BT market/
├── backend/
│   └── server.js           # Express server (Emails, Contact Form)
├── frontend/
│   ├── src/
│   │   ├── components/     # UI Components (Radix, Custom)
│   │   ├── lib/            # Supabase client & utilities
│   │   ├── *Context.jsx    # Global State Managers (Auth, Cart, Wishlist, Theme)
│   │   ├── *Page.jsx       # Route Views (Home, CartPage, DashboardPage, etc.)
│   │   ├── data.js         # Hardcoded template data (Single Source of Truth for ID lookups)
│   │   └── useTemplates.js # Hook for fetching templates (DB + Mock merge)
│   ├── index.html
│   └── vite.config.js      # Vite configuration (port 5173)
├── reviews.sql             # SQL definition for the reviews table
├── seed.sql                # SQL definition for templates & purchases tables
└── package.json            # Monorepo-style package config
```

---

## 3. Data & State Flow

### 3.1 Global State (React Context)
The frontend relies entirely on React Context for global state, avoiding external libraries like Redux.
1. **`AuthContext.jsx`**: Listens to Supabase `onAuthStateChange`. Stores the `user` object and a `profile` object (merged from `user.user_metadata` and the `profiles` table). Exposes OAuth (Google, Github, Figma) and Email/Password methods.
2. **`CartContext.jsx`**: Manages the local shopping cart array. Syncs purchased items directly to Supabase `auth.users` via `user_metadata.purchased_templates`. 
3. **`WishlistContext.jsx`**: Manages the wishlist. Syncs wishlisted items directly to Supabase `user_metadata.wishlist_templates`.
4. **`ThemeContext.jsx`**: Toggles a `dark` class on the HTML root and syncs with `localStorage`.

### 3.2 Database Schema (Supabase)
- **`auth.users`**: Managed by Supabase. The `raw_user_meta_data` JSONB column is critically used to store arrays of `purchased_templates` and `wishlist_templates` IDs.
- **`profiles`**: Extended profile info.
- **`templates`**: Catalog items.
- **`reviews`**: Stores product reviews linked by `template_id`. Enforces Row Level Security (RLS) so users can only modify their own reviews.
- **`purchases`**: **[DEBT]** Defined in `seed.sql`, but currently *unused* by the application codebase.

### 3.3 Data Source Quirk (CRITICAL)
There are multiple sources of truth for template data which creates architectural friction:
1. `frontend/src/data.js` exports `marketplaceTemplates` (50 hardcoded templates).
2. `useTemplates.js` fetches from the Supabase `templates` table AND merges them with a hardcoded `luxuryMockTemplates` array.
3. **The Catch:** `CartContext.jsx` and `WishlistContext.jsx` map the integer IDs stored in Supabase `user_metadata` back into full template objects *exclusively* by filtering `marketplaceTemplates` from `data.js`. 
**Risk:** If a template exists only in the database (or `luxuryMockTemplates`) and NOT in `data.js`, it will silently fail to render in the user's purchased/wishlist views.

---

## 4. Key Workflows

### 4.1 Purchase Flow & Checkout
1. User adds items to the cart (`CartContext`). State is strictly local until checkout.
2. User clicks "Checkout" in `CartPage.jsx`.
3. The Razorpay SDK (`checkout.js`) is injected.
4. **Payment Simulation:** If the system detects the public dummy key (`rzp_test_1DP5mmOlF5G5ag`), it bypasses the SDK and simulates a successful payment after 2 seconds to avoid Razorpay blocking the leaked key.
5. On success (`processSuccessfulPayment`), three parallel actions occur:
   - **Backend API Call:** `POST http://localhost:3000/api/send-receipt` is called to send an HTML email via Nodemailer.
   - **Database Update:** Calls `CartContext.checkout()`, which patches the user's `purchased_templates` array in Supabase `user_metadata`.
   - **Client PDF Generation:** `jspdf` generates a localized PDF invoice and triggers a browser download.
6. A Canvas Confetti animation plays, and the user is routed to `/my-templates`.

### 4.2 Review Submission Flow
1. User visits `ProductPage.jsx` which embeds `ReviewsSection.jsx`.
2. The component queries the Supabase `reviews` table for existing reviews.
3. If the user is logged in, it checks local state `hasPurchased` (derived from `purchasedTemplates`).
4. If purchased, the user can submit a 1-5 star review.
5. The review is written directly to the Supabase `reviews` table. 

---

## 5. Backend Service

The backend is a strictly decoupled Express app running on port 3000. It is stateless and acts primarily as an email proxy.
- **Middlewares:** Uses `helmet` for HTTP headers, `express-rate-limit` (100 req/15min) for abuse prevention, and strictly scoped `cors` (localhost:5173/5174).
- **Endpoints:**
  - `POST /api/send-receipt`: Accepts `to` and `orderDetails`. Generates a stylized HTML receipt and sends via Nodemailer.
  - `POST /api/contact`: Accepts contact form fields and sends an inquiry email to the site admin (`CONTACT_EMAIL`).

---

## 6. Technical Debt, Risks, and Bottlenecks

### 6.1 Security Risks
- **Client-Side Pricing:** The checkout amount is calculated entirely on the client side in `CartPage.jsx` (`cartTotal * 100`) and passed to Razorpay. A malicious user could edit the memory state and purchase a $100 template for $1. Proper implementation requires creating a Razorpay Order on the backend, verifying prices against the database, and passing the order ID to the client.
- **Review Spoofing:** `ReviewsSection.jsx` checks purchase eligibility using client-side state (`hasPurchased`). A user could bypass this check via React DevTools to post reviews for unpurchased items.

### 6.2 Architectural Debt
- **`purchases` Table Ignored:** The `purchases` table in Supabase is completely bypassed in favor of saving a JSON array of IDs in `auth.users.user_metadata`. This prevents backend analytics (e.g., querying top-selling templates) and makes data migration harder.
- **Split Brain Data (data.js vs DB):** The reliance on `data.js` as a lookup table in Contexts creates a massive maintenance bottleneck. To add a new template, an admin must currently add it to the DB *and* modify the frontend source code (`data.js`).
- **No Webhooks:** The application relies on the client side calling `/api/send-receipt` upon successful checkout. If the user closes the browser window exactly as payment succeeds but before the API call fires, they will not receive a receipt, and their Supabase `user_metadata` will not update. This must be migrated to a Razorpay Webhook on the backend.

### 6.3 Maintenance Considerations
- **Environment Variables:** Requires `.env.local` at the monorepo root. It must contain Supabase keys (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`), Razorpay keys (`VITE_RAZORPAY_TEST_KEY`), and SMTP credentials (`SMTP_HOST`, `SMTP_USER`, etc.).
- **Missing Build Step:** The `package.json` treats the repository as a monorepo, but the backend is run raw via `node backend/server.js`. If deployed, the backend and frontend need separate hosting environments or a reverse proxy.

## 7. Future Extension Guide (For AI Agents)
- **If adding a new Template:** You MUST add it to `frontend/src/data.js` otherwise it cannot be properly processed by the cart and wishlist logic.
- **If refactoring Checkout:** Shift the `cartTotal` calculation to `backend/server.js`. Create an endpoint `POST /api/create-order` that interacts with Razorpay.
- **If migrating Data:** Stop using `user_metadata.purchased_templates`. Write directly to the `purchases` table in Supabase via an edge function or authenticated backend request. Update `CartContext.jsx` to fetch from the `purchases` table instead.
