Presentation Script: Fashion-Aura (Simple Shopping Cart)

Purpose
-------
This document is a full script and technical walkthrough you can use to present this project from scratch up to a working prototype served with `npm run dev`.

Audience
--------
Engineers and product stakeholders who want to understand architecture, design decisions, the demo flow, and how to run and extend the app.

Agenda (what you'll cover)
--------------------------
1. Project overview and goals
2. Tech stack and why we chose it
3. File structure highlights and key files
4. Important code snippets and why they matter
5. How the frontend and backend communicate
6. The two-step checkout flow and idempotency
7. Local setup and running the prototype
8. Demo script (what to click and what to explain)
9. Tests and CI notes
10. Roadmap & next improvements

1) Project overview
-------------------
Fashion-Aura is a minimal e-commerce prototype with the following capabilities:
- A hardcoded products API that returns a JSON list of products
- A client that fetches and renders the product grid with images and "Add to Cart" buttons
- A cart system stored in a React Context with localStorage persistence
- A checkout flow: Address -> Payment -> Confirmation
- A backend checkout endpoint that validates and persists orders (uses MongoDB when configured)
- Jest tests for backend endpoints using `mongodb-memory-server` for isolated DB tests

2) Tech stack
-------------
- Next.js (App Router) — framework for React server/client components and API routes.
- React + TypeScript — UI library and static types.
- Tailwind CSS — utility-first styling (configured in `tailwind.config.ts`).
- MongoDB (optional, via `mongodb` driver) + `mongodb-memory-server` for tests.
- Jest + ts-jest — unit tests for backend routes.
- undici / node-fetch polyfills in test setup for web Request/Response.

Why these choices
- Next.js: fast dev loop, SSR/SSG if needed, built-in API routes.
- TypeScript: safer refactoring and clear data contracts.
- MongoDB: flexible, simple to demo persistence with a helper.
- Jest + memory server: tests that exercise DB logic without external dependencies.

3) File structure highlights (important files)
---------------------------------------------
- `src/lib/products.ts` — hardcoded product catalog used by the products API and product pages.
- `src/app/api/products/route.ts` — GET handler returning the product list.
- `src/app/api/checkout/route.ts` — POST handler that validates a checkout payload, logs/persists the order.
- `src/context/cart-context.tsx` — Cart provider with add/update/remove and localStorage persistence.
- `src/components/product-card.tsx` & `product-grid.tsx` — product UI and "Add to Cart" button.
- `src/app/checkout/address/page.tsx` — Address form that writes `shippingAddress` to localStorage.
- `src/app/checkout/payment/page.tsx` — Payment page: builds final payload (`pendingOrder`) and POSTs to `/api/checkout`.
- `src/app/checkout/confirmation/page.tsx` — Reads `shippingAddress` and last-order to show confirmation.
- `src/lib/mongodb.ts` — MongoDB helper: `getClient()`, `getDb()`, `closeClient()`; safe to run without `MONGODB_URI`.
- `jest.setup.js` + `test/__mocks__/next-server.js` — test shims to make Next server modules testable in Jest.
- `src/app/api/*/*.test.ts` — Jest tests for API routes. They use `mongodb-memory-server` to isolate DB.

4) Important code snippets & explanation
---------------------------------------
- products API
```ts
// src/app/api/products/route.ts
import { NextResponse } from 'next/server';
import { products } from '@/lib/products';
export async function GET() {
  return NextResponse.json(products);
}
```
Why it matters: minimal backend API used by the frontend; matches the "Simple Shopping Cart" requirement.

- Cart provider (persistence + debounced writes)
```ts
useEffect(() => {
  // debounce write to localStorage
  timer = setTimeout(() => {
    window.localStorage.setItem('shopstream-cart', JSON.stringify(minimal));
  }, 150);
}, [cart]);
```
Why it matters: avoids blocking main thread while keeping cart persisted.

- Checkout submission (idempotent POST)
```ts
// src/app/checkout/payment/page.tsx
const res = await fetch('/api/checkout', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'idempotency-key': pending.idempotencyKey },
  body: JSON.stringify(payload),
});
```
Why it matters: demonstrates a simple idempotency approach using a client-generated key in the header. The server uses this header to avoid duplicate order insertion.

- Checkout schema validation (zod)
```ts
const checkoutSchema = z.object({ items: z.array(z.object({ id: z.string(), name: z.string(), quantity: z.number().min(1), price: z.number() })), total: z.number(), ... });
```
Why it matters: server-side validation prevents malformed data reaching DB/business logic.

5) Frontend / Backend communication
-----------------------------------
- Frontend fetches products via `GET /api/products`.
- When user clicks "Checkout" we create a `pendingOrder` locally and navigate to Address page.
- After address is entered and payment is completed, the client reads `pendingOrder` and `shippingAddress`, posts full order to `/api/checkout` with `idempotency-key` header.
- Server validates, checks idempotency in DB (when configured) and inserts an order document.

6) Two-step checkout & idempotency
----------------------------------
- Reason: Payments and address collection are separate UX steps; generating an idempotency key early ensures retries or network hiccups don't create duplicates.
- Implementation: `pendingOrder` saved in localStorage with `orderId` and `idempotencyKey`.
- Server checks existing orders by `idempotencyKey` and returns existing orderId if already processed.

7) Local setup & running demo
-----------------------------
Prereqs: Node 18+, npm, optional MongoDB (Atlas) if you want DB persistence.
1. Install deps: `npm install`
2. Run typecheck: `npm run typecheck`
3. Run tests: `npm test`
4. Start dev server: `npm run dev` (runs Next dev on port 9002 by default in this repo)

Quick tip: If you want DB persistence, add `.env.local` with:
```
MONGODB_URI="your-atlas-uri"
MONGODB_DB="fashion-aura"
```
Then restart the dev server.

8) Demo script (what to click & what to explain)
-------------------------------------------------
- Start dev server and open `http://localhost:9002`.
- Show product grid: explain how `GET /api/products` populates the UI.
- Click "Add to Cart" on several items; explain `addToCart` and `CartProvider`.
- Open Cart: show quantity change and removal. Explain state is persisted to `shopstream-cart`.
- Click "Checkout" -> Address: fill the form and explain `shippingAddress` localStorage key.
- Proceed to Payment: choose a method and click pay. Show console/debug that `pendingOrder` is sent to `/api/checkout` and the server logs it (or persists when DB enabled).
- Confirmation: show `shippingAddress` used in the confirmation summary.

9) Tests & CI notes
-------------------
- Tests use Jest and `mongodb-memory-server` to run DB-backed tests without an external DB.
- Important test files: `src/app/api/products/route.test.ts`, `src/app/api/checkout/route.test.ts`.
- For CI: run `npm test`. If CI spins up a separate DB, pass a MONGODB_URI via env.

10) Roadmap & next improvements
-------------------------------
- Add user authentication and associate orders with user accounts.
- Replace localStorage persistence with IndexedDB for large carts.
- Integrate a real payments SDK (Stripe) with server-side verification.
- Add e2e tests (Cypress) for the full checkout flow.
- Harden server validation and add rate limits/idempotency storage.

-- End of script --

If you want, I can now:
- Create a short PowerPoint-like export (MD -> slides) or a concise 5-slide PDF for the demo.
- Add `present.ps1` to automate starting the dev server and opening the app in the browser.


