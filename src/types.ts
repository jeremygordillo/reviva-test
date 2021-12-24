export type Product = {
  id: number;
  desc: string;
  price: number;
  tax: number | undefined;
  imported: boolean;
};

export type CartItem = Product & {
  qty: number;
  totalPrice: number;
};
