# HkmuCart: Simple Online Shopping Demo

This is a simple online shopping system built with:

- Next.js (App Router)
- Tailwind CSS
- Local Storage only (no backend, no database)

## Features

1. Home page with product listing
2. Product details page
3. Add to cart (saved in Local Storage)
4. Shopping cart page with quantity controls
5. Checkout page
6. Fake payment process
7. Order confirmation page
8. Login/Register with Local Storage user persistence

## Tech Notes

- No backend server logic for auth/cart/orders
- No external APIs
- Everything runs client-side for demo purposes

## Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build Validation

```bash
npm run lint
npm run build
```

Both commands pass in the current implementation.
