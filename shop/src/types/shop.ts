export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  imageColor: string;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Order = {
  id: string;
  userId: string;
  itemCount: number;
  total: number;
  createdAt: string;
};
