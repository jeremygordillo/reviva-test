import { Product, CartItem } from "../types";

const roundValue = (value: number): number => Math.ceil(value * 20) / 20;

const hasTax = (product: Product): boolean =>
  product.tax !== undefined && product.tax > 0;

const isImportedProduct = (product: Product): boolean => product.imported;

export const calculateSaleTaxes = (price: number, taxes: number): number =>
  roundValue(price * taxes);

const applyTaxes = (price: number, taxes: number): number =>
  price + calculateSaleTaxes(price, taxes);

const calculatePrice = (price: number, quantity: number) =>
  Number.parseFloat((price * quantity).toFixed(2));

export const getTaxes = (product: Product): number => {
  let taxes = isImportedProduct(product) ? 0.05 : 0;
  taxes += hasTax(product) ? (product.tax as number) : 0;
  return taxes;
};

export const generateCartItem = (product: Product, qty: number): CartItem => {
  const totalPrice = calculatePrice(
    applyTaxes(product.price, getTaxes(product)),
    qty
  );
  return { ...product, totalPrice, qty };
};
