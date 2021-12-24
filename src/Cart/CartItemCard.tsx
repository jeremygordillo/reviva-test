import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import RemoveShoppingCart from "@mui/icons-material/RemoveShoppingCartOutlined";
import Tooltip from "@mui/material/Tooltip";

type CartItemCardProps = {
  id: number;
  desc: string;
  price: number;
  qty: number;
  onRemoveFromCart: (productId: number) => void;
};

const CartItemCard: React.FC<CartItemCardProps> = ({
  price,
  desc,
  id,
  qty,
  onRemoveFromCart
}) => {
  return (
    <ListItem
      secondaryAction={
        <IconButton onClick={() => onRemoveFromCart(id)} color="primary">
          <Tooltip title="Remove">
            <RemoveShoppingCart />
          </Tooltip>
        </IconButton>
      }
    >
      <ListItemText primary={`${desc} (x${qty})`} secondary={`$ ${price}`} />
    </ListItem>
  );
};

export default CartItemCard;
