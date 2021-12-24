import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import Tooltip from "@mui/material/Tooltip";

type CartItemCardProps = {
  id: number;
  desc: string;
  price: number;
  onAddToCart: (productId: number) => void;
};

const CartItemCard: React.FC<CartItemCardProps> = ({
  price,
  desc,
  id,
  onAddToCart
}) => {
  return (
    <ListItem
      secondaryAction={
        <IconButton onClick={() => onAddToCart(id)} color="primary">
          <Tooltip title="Add to cart">
            <AddShoppingCart />
          </Tooltip>
        </IconButton>
      }
    >
      <ListItemText primary={desc} secondary={`$ ${price}`} />
    </ListItem>
  );
};

export default CartItemCard;
