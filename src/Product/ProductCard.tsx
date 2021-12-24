import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import ProductForm from "./ProductForm";
import { Product } from "../types";

type ProductCardProps = {
  onCreateProduct: (product: Product) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ onCreateProduct }) => {
  const formRef = React.createRef<HTMLFormElement>();
  const handleCreate = () => {
    if (formRef.current) {
      const submitBtn = formRef.current.lastChild;
      if (submitBtn) (submitBtn as HTMLInputElement).click();
    }
  };

  return (
    <Box id="productCard">
      <Card square sx={{ mb: 2 }}>
        <CardContent>
          <ProductForm ref={formRef} onCreateProduct={onCreateProduct} />
        </CardContent>
        <CardActions>
          <Button variant="contained" fullWidth onClick={handleCreate}>
            Create Product
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default ProductCard;
