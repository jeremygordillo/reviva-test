import { Product } from "./types";
export const products: Product[] = [
  {
    id: 1,
    desc: "Book",
    price: 12.49,
    tax: undefined,
    imported: false
  },
  {
    id: 2,
    desc: "Music CD",
    price: 14.99,
    tax: 0.1,
    imported: false
  },
  {
    id: 3,
    desc: "Chocolate bar",
    price: 0.85,
    tax: undefined,
    imported: false
  },
  {
    id: 4,
    desc: "Imported Chocolate",
    price: 10.0,
    tax: undefined,
    imported: true
  },
  {
    id: 5,
    desc: "Imported bottle of perfume",
    price: 47.5,
    tax: 0.1,
    imported: true
  },
  {
    id: 6,
    desc: "bottle of perfume",
    price: 18.99,
    tax: 0.1,
    imported: false
  },
  {
    id: 7,
    desc: "packet of headache pills",
    price: 9.75,
    tax: 0.1,
    imported: true
  }
];
