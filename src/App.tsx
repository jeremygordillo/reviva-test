import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ProductCard from "./Product/ProductCard";
import ProductList from "./Product/ProductList";
import ProductItemCard from "./Product/ProductItemCard";
import CartItemCard from "./Cart/CartItemCard";
import CartSummary from "./Cart/CartSummary";
import { generateCartItem, calculateSaleTaxes, getTaxes } from "./utils";
import { Product, CartItem } from "./types";
import { products as initialProducts } from "./products";
import Divider from "@mui/material/Divider";

export default function App() {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const [products, setProducts] = React.useState<Product[]>(initialProducts);

  const handleRemoveFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((p: Product) => p.id !== productId));
  };

  const handleAddToCart = (productId: number) => {
    const prd = products.find((p: Product) => p.id === productId);
    if (prd) {
      setCartItems((prev) => {
        const carItemAddedIndex = prev.findIndex(
          (p: Product) => p.id === prd.id
        );
        const addedQty =
          carItemAddedIndex === -1 ? 1 : prev[carItemAddedIndex].qty + 1;
        const productToAdd = generateCartItem(prd, addedQty);
        const itemsToRemove = carItemAddedIndex === -1 ? 0 : 1;
        const startIndex =
          carItemAddedIndex === -1 ? prev.length : carItemAddedIndex;
        const newCartItems = Array.from(prev);
        newCartItems.splice(startIndex, itemsToRemove, productToAdd);

        return newCartItems;
      });
    } else console.error(`Product with id = ${productId} not found!`);
  };

  const handleCreateProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const [salesTaxes, cartTotal] = React.useMemo(
    () =>
      cartItems.reduce(
        (tots, item) => {
          const st = tots[0] + calculateSaleTaxes(item.price, getTaxes(item));
          const ct = tots[1] + item.totalPrice;
          return [st, ct];
        },
        [0, 0]
      ),
    [cartItems]
  );

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Problem: Sale Taxes
        </Typography>
        <strong>Basic sales tax</strong> is applicable at a rate of{" "}
        <strong>10%</strong> on all goods, <strong>except</strong> books, food,
        and medical products that are exempt. <strong>Import duty</strong> is an
        additional sales tax applicable on all imported goods at a rate of{" "}
        <strong>5%</strong>, with no exemptions. <br />
        When I purchase items I receive a receipt which lists the name of all
        the items and their price (including tax), finishing with the total cost
        of the items, and the total amounts of sales taxes paid. The rounding
        rules for sales tax are that for a tax rate of n%, a shelf price of p
        contains (np/100 rounded up to the nearest 0.05) amount of sales tax.
      </Box>
      <ProductCard onCreateProduct={handleCreateProduct} />
      <Divider sx={{ my: 2 }} variant="middle" />
      <ProductList>
        {products.map((p) => (
          <ProductItemCard
            key={`Product-${p.id}`}
            id={p.id}
            desc={p.desc}
            price={p.price}
            onAddToCart={handleAddToCart}
          />
        ))}
      </ProductList>
      <Divider sx={{ my: 2 }} variant="middle" />
      <CartSummary
        total={cartTotal}
        salesTaxes={salesTaxes}
        isEmpty={cartItems.length === 0}
      >
        <List sx={{ width: "100%" }}>
          {cartItems.map((p) => (
            <CartItemCard
              key={`Product-${p.id}`}
              id={p.id}
              qty={p.qty}
              desc={p.desc}
              price={p.totalPrice}
              onRemoveFromCart={handleRemoveFromCart}
            />
          ))}
        </List>
      </CartSummary>
    </Container>
  );
}
