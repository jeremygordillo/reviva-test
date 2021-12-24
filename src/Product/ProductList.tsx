import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const ProductList: React.FC = ({ children }) => {
  return (
    <Box id="cartSummary">
      <Typography variant="h4" component="h1" gutterBottom>
        Product List
      </Typography>
      <Box sx={{ maxHeight: 300, overflowX: "hidden" }}>{children}</Box>
    </Box>
  );
};

export default ProductList;
