# HkmuCart - Online Shopping System

Course: COMP S351F  
Group: 8

A simple, responsive online shopping demo built with Next.js, Tailwind CSS, and Local Storage only.

## Live Project Structure

The actual app is located in [shop](shop).

## Features

- Home page with product listing
- Product details page
- Add to cart (saved in Local Storage)
- Shopping cart page with quantity controls
- Checkout page
- Fake payment flow (simulation only)
- Order confirmation page
- Login and register (saved in Local Storage)
- Responsive UI for desktop and mobile

## Tech Stack

- Next.js (App Router, TypeScript)
- React
- Tailwind CSS
- Browser Local Storage

## Getting Started

1. Go to the app folder.
2. Install dependencies.
3. Run the dev server.

```bash
cd shop
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Validation Commands

```bash
cd shop
npm run lint
npm run build
```

## Key Local Storage Data

The app stores data under these keys:

- `shop-users`
- `shop-current-user`
- `shop-cart`
- `shop-orders`

## Folder Overview

```text
online-shopping-system-L21-group8/
	README.md
	shop/
		src/
			app/
			components/
			lib/
			types/
```

## Notes

- Payment is fake and for demo only.
- Passwords are stored in plain text in Local Storage for simplicity (not production-safe).

## License

This project is for demo purposes.