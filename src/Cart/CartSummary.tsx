import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

type CartSummaryProps = {
  total: number;
  salesTaxes: number;
  isEmpty: boolean;
};

const CartSummary: React.FC<CartSummaryProps> = ({
  total,
  salesTaxes,
  isEmpty,
  children
}) => {
  return (
    <Box id="cartSummary">
      <Typography variant="h4" component="h1" gutterBottom>
        Cart Summary
      </Typography>
      {isEmpty ? (
        <Typography variant="body1" gutterBottom>
          Cart is empty
        </Typography>
      ) : (
        <>
          <Box sx={{ maxHeight: 300, overflowX: "hidden" }}>{children}</Box>
          <Typography variant="button" gutterBottom paragraph>
            Sales Taxes: ${salesTaxes.toFixed(2)}
          </Typography>

          <Typography variant="button" gutterBottom paragraph>
            Total: ${total.toFixed(2)}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default CartSummary;
