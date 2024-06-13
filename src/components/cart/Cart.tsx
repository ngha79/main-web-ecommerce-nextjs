"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";

import { cn } from "@/lib/utils";
import CartProduct from "./CartProduct";
import { buttonVariants } from "../ui/button";
import { cartStore } from "@/utils/store/store";
import cartApiRequest from "@/apiRequests/cart";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Cart as ICart, CartItem } from "@/lib/interface";
import TotalCartItem from "./TotalCartItem";

const IsNotLogin = () => {
  return (
    <div className="h-60 w-full flex justify-center items-center gap-4 flex-col">
      <span className="text-sm">Bạn chưa đăng nhập</span>
      <Link
        href={"/login"}
        className={cn(buttonVariants({ variant: "primary" }))}
      >
        Đăng nhập
      </Link>
    </div>
  );
};

const CartEmpty = () => {
  return (
    <div className="h-60 w-full flex justify-center items-center">
      <span className="text-sm">Chưa Có Sản Phẩm</span>
    </div>
  );
};

const CartItems = ({ cartData }: { cartData: ICart }) => {
  const cartItems = cartData.cartItems;

  return (
    <div className="flex flex-col h-max max-h-80 gap-2">
      <h2 className="text-sm text-gray-500">Sản Phẩm Mới Thêm</h2>
      <div className="flex flex-col overflow-y-scroll gap-2">
        {cartItems
          .flatMap((item) => item.products)
          .map((product) => (
            <CartProduct product={product} key={product.productAttribute.id} />
          ))}
      </div>
      <div className="flex items-center justify-end pt-4 border-t">
        <Link
          href="/cart"
          className="bg-blue-500 text-white uppercase rounded-md px-4 py-2"
        >
          Xem giỏ hàng
        </Link>
      </div>
    </div>
  );
};

const Cart = ({ user }: { user: any }) => {
  const router = useRouter();
  const cartState = cartStore((state) => state);
  const { cart } = cartState;
  const { setCart } = cartState;

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { payload } = await cartApiRequest.getCart();
        setCart(payload);
      } catch (error) {}
    };

    if (user) {
      fetchCart();
    }
  }, [user, setCart]);

  const handleNavigation = () => {
    const destination = user?.id ? "/cart" : "/login";
    router.replace(destination);
  };

  const cartContent = !user ? (
    <IsNotLogin />
  ) : !cart || !cart.cartItems.length ? (
    <CartEmpty />
  ) : (
    <CartItems cartData={cart} />
  );

  return (
    <div className="text-white">
      <HoverCard openDelay={200} closeDelay={200}>
        <HoverCardTrigger onClick={handleNavigation} className="relative">
          <ShoppingCart />
          {user && <TotalCartItem />}
        </HoverCardTrigger>
        <HoverCardContent className="w-96">{cartContent}</HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default Cart;
