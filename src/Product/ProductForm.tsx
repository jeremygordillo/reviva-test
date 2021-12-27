import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import NumberInput from "../common/NumberInput";
import { Product } from "../types";

type ProductFormProps = {
  onCreateProduct: (product: Product) => void;
};

type ProductState = Pick<Product, "desc" | "tax" | "imported"> & {
  price: string;
};

const prdTypes = [
  {
    id: "1",
    taxable: false,
    label: "Food"
  },
  {
    id: "2",
    taxable: false,
    label: "Medicine"
  },
  {
    id: "3",
    taxable: false,
    label: "Book"
  },
  {
    id: "4",
    taxable: true,
    label: "Other"
  }
];

const ProductForm = React.forwardRef<HTMLFormElement, ProductFormProps>(
  ({ onCreateProduct }, ref) => {
    const [prdType, setProductType] = React.useState<string>("1");
    const [product, setProduct] = React.useState<ProductState>({
      desc: "New Product",
      price: "10",
      tax: undefined,
      imported: false
    });

    const handleProductTypeChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const prdTypeId = event.target.value;
      const prdType = prdTypes.find((pt) => pt.id === prdTypeId);
      if (prdType) {
        const tax = prdType.taxable ? 0.1 : undefined;
        setProduct((prev) => ({ ...prev, tax }));
      }
      setProductType(prdTypeId);
    };

    const handleChange = (prop: keyof ProductState) => (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      let value =
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value;
      if (prop === "price" && value === "") value = "0";
      setProduct((prev) => ({ ...prev, [prop]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onCreateProduct({
        ...product,
        id: uuidv4(),
        price: parseFloat(product.price.toString())
      });
    };

    return (
      <form ref={ref} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          id="product-type-select"
          select
          fullWidth
          label="Select Product Type"
          value={prdType}
          onChange={handleProductTypeChange}
          variant="standard"
        >
          {prdTypes.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Product Name"
          variant="standard"
          margin="normal"
          fullWidth
          value={product.desc}
          onChange={handleChange("desc")}
        />
        <FormControl fullWidth sx={{ my: 1 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-price">Price</InputLabel>
          <Input
            id="standard-adornment-price"
            inputComponent={NumberInput as any}
            value={product.price}
            onChange={handleChange("price")}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            inputProps={{
              thousandSeparator: true,
              allowNegative: false
            }}
          />
        </FormControl>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                value={product.imported}
                onChange={handleChange("imported")}
              />
            }
            label="Imported product"
          />
        </FormGroup>
        <input name="submit" type="submit" style={{ display: "none" }} />
      </form>
    );
  }
);

export default ProductForm;
