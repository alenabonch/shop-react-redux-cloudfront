import axios, { AxiosError } from "axios";
import React from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import API_PATHS from "~/constants/apiPaths";
import { Cart, CartDTO } from "~/models/Cart";
import { CartItem } from "~/models/CartItem";

export function useCart() {
  return useQuery<CartDTO, AxiosError>("cart", async () => {
    const res = await axios.get<CartDTO>(`${API_PATHS.cart}/profile/cart`, {
      headers: {
        Authorization: `Basic ${localStorage.getItem("authorization_token")}`,
      },
    });
    return res.data?.data;
  });
}

export function useCartData() {
  const queryClient = useQueryClient();
  return queryClient.getQueryData<CartItem[]>("cart");
}

export function useInvalidateCart() {
  const queryClient = useQueryClient();
  return React.useCallback(
    () => queryClient.invalidateQueries("cart", { exact: true }),
    []
  );
}

export function useUpsertCart() {
  return useMutation((updatedCart: Cart) =>
    axios.put<CartItem[]>(`${API_PATHS.cart}/profile/cart`, updatedCart, {
      headers: {
        Authorization: `Basic ${localStorage.getItem("authorization_token")}`, // YWxlbmFib25jaDpURVNUX1BBU1NXT1JE
      },
    })
  );
}
