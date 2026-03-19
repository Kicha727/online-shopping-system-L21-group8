import type { CartItem, Order, User } from "@/types/shop";

const STORAGE_KEYS = {
  users: "shop-users",
  currentUser: "shop-current-user",
  cart: "shop-cart",
  orders: "shop-orders",
} as const;

const STORAGE_EVENT = "shop:storage-update";

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  const raw = window.localStorage.getItem(key);
  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJSON<T>(key: string, value: T): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

export function notifyStorageUpdate(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(STORAGE_EVENT));
}

export function subscribeStorageUpdate(callback: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handler = () => callback();
  window.addEventListener(STORAGE_EVENT, handler);
  window.addEventListener("storage", handler);

  return () => {
    window.removeEventListener(STORAGE_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

export function getUsers(): User[] {
  return readJSON<User[]>(STORAGE_KEYS.users, []);
}

export function saveUsers(users: User[]): void {
  writeJSON(STORAGE_KEYS.users, users);
  notifyStorageUpdate();
}

export function getCurrentUser(): User | null {
  return readJSON<User | null>(STORAGE_KEYS.currentUser, null);
}

export function setCurrentUser(user: User | null): void {
  writeJSON(STORAGE_KEYS.currentUser, user);
  notifyStorageUpdate();
}

export function getCart(): CartItem[] {
  return readJSON<CartItem[]>(STORAGE_KEYS.cart, []);
}

export function saveCart(cart: CartItem[]): void {
  writeJSON(STORAGE_KEYS.cart, cart);
  notifyStorageUpdate();
}

export function clearCart(): void {
  saveCart([]);
}

export function addToCart(productId: string, quantity = 1): void {
  const cart = getCart();
  const existing = cart.find((item) => item.productId === productId);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }

  saveCart(cart);
}

export function getOrders(): Order[] {
  return readJSON<Order[]>(STORAGE_KEYS.orders, []);
}

export function saveOrder(order: Order): void {
  const orders = getOrders();
  orders.unshift(order);
  writeJSON(STORAGE_KEYS.orders, orders);
  notifyStorageUpdate();
}

export function cartItemCount(): number {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}
