import { cartStore } from "@/utils/store/store";
import React from "react";

const TotalCartItem = () => {
  const cart = cartStore((state) => state.cart);
  const totalCartItemCount = cart?.cartItems.reduce(
    (acc, cartItem) => acc + cartItem.products.length,
    0
  );

  return (
    <div className="absolute -top-3 text-sm font-medium -right-3 flex items-center justify-center w-6 h-6 text-black bg-background rounded-full p-1">
      {totalCartItemCount}
    </div>
  );
};

export default TotalCartItem;
