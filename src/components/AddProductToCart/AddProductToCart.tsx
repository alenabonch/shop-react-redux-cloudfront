import Typography from "@mui/material/Typography";
import { CartItem } from "~/models/CartItem";
import { Product } from "~/models/Product";
import CartIcon from "@mui/icons-material/ShoppingCart";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import { useCart, useInvalidateCart, useUpsertCart } from "~/queries/cart";

type AddProductToCartProps = {
  product: Product;
};

export default function AddProductToCart({ product }: AddProductToCartProps) {
  const { data, isFetching } = useCart();
  const { mutate: upsertCart } = useUpsertCart();
  const invalidateCart = useInvalidateCart();
  const cartItems = data?.cart.items || [];
  const cartItem = cartItems.find((i) => i.product.id === product.id);

  const addProduct = () => {
    if (data?.cart) {
      let updatedCartItems;

      if (cartItem) {
        updatedCartItems = cartItems.map((item) =>
          item.product.id === product.id
            ? { ...item, count: item.count + 1 }
            : item
        );
      } else {
        updatedCartItems = [...cartItems, { product, count: 1 } as CartItem];
      }
      upsertCart(
        { ...data.cart, items: updatedCartItems },
        { onSuccess: invalidateCart }
      );
    }
  };

  const removeProduct = () => {
    if (data?.cart && cartItem) {
      let updatedCartItems;

      if (cartItem.count > 1) {
        updatedCartItems = cartItems.map((item) =>
          item.product.id === product.id
            ? { ...item, count: item.count - 1 }
            : item
        );
      } else {
        updatedCartItems = cartItems.filter((item) => item.product.id !== product.id);
      }
      upsertCart(
        { ...data.cart, items: updatedCartItems },
        { onSuccess: invalidateCart }
      );
    }
  };

  return cartItem ? (
    <>
      <IconButton disabled={isFetching} onClick={removeProduct} size="large">
        <Remove color={"secondary"} />
      </IconButton>
      <Typography align="center">{cartItem.count}</Typography>
      <IconButton disabled={isFetching} onClick={addProduct} size="large">
        <Add color={"secondary"} />
      </IconButton>
    </>
  ) : (
    <IconButton disabled={isFetching} onClick={addProduct} size="large">
      <CartIcon color={"secondary"} />
    </IconButton>
  );
}
