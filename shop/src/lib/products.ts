import type { Product } from "@/types/shop";

export const products: Product[] = [
  {
    id: "wireless-headphones",
    name: "Wireless Headphones",
    category: "Audio",
    description:
      "Comfortable over-ear headphones with rich bass, clear voice, and up to 30 hours battery life.",
    price: 89.99,
    imageColor: "from-amber-300 to-rose-400",
  },
  {
    id: "smart-watch",
    name: "Smart Watch",
    category: "Wearables",
    description:
      "Track your steps, sleep, and notifications with a slim and lightweight watch for daily use.",
    price: 129.0,
    imageColor: "from-cyan-300 to-blue-500",
  },
  {
    id: "mechanical-keyboard",
    name: "Mechanical Keyboard",
    category: "Accessories",
    description:
      "Compact keyboard with tactile switches, RGB backlight, and durable build for work and gaming.",
    price: 79.5,
    imageColor: "from-violet-300 to-fuchsia-500",
  },
  {
    id: "travel-backpack",
    name: "Travel Backpack",
    category: "Lifestyle",
    description:
      "Water-resistant backpack with padded laptop sleeve and smart pockets for travel essentials.",
    price: 54.99,
    imageColor: "from-lime-300 to-emerald-500",
  },
  {
    id: "desk-lamp",
    name: "LED Desk Lamp",
    category: "Home Office",
    description:
      "Modern adjustable desk lamp with eye-care lighting and three color temperature modes.",
    price: 39.0,
    imageColor: "from-sky-300 to-indigo-500",
  },
  {
    id: "portable-speaker",
    name: "Portable Speaker",
    category: "Audio",
    description:
      "Compact speaker with deep sound, Bluetooth 5, and all-day battery for indoor and outdoor use.",
    price: 64.25,
    imageColor: "from-orange-300 to-red-500",
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}
