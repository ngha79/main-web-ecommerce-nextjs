import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import React, { useState } from "react";
import { ProductCart as IProductCart } from "@/lib/interface";
import FormUpdateTotalProduct from "@/components/utils/FormUpdateTotalProduct";
import { cartStore } from "@/utils/store/store";
import { toast } from "sonner";
import productApiRequest from "@/apiRequests/product";
import DeleteCartItem from "./delete-cart-item";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProductOptions } from "./product-options";

const ProductCart = ({
  product,
  shopId,
  listCartCheckout,
  handleSetProductCartProduct,
}: {
  product: IProductCart;
  shopId: string;
  listCartCheckout: number[];
  handleSetProductCartProduct: (id: number) => void;
}) => {
  const [openDeleteProduct, setOpenDeleteProduct] = useState<boolean>(false);
  const cart = cartStore((state) => state.cart);
  const removeProductToCart = cartStore((state) => state.removeProductToCart);

  const updateQuantityProduct = cartStore(
    (state) => state.updateQuantityProduct
  );

  const handleDeleteProductCart = async () => {
    try {
      await productApiRequest.handleDeleteProductFromCart(
        product.productAttribute.id
      );
      removeProductToCart(product.productAttribute.id);
    } catch (error: any) {
      toast.error(error.payload.message);
    }
  };
  const handleOnchangeProductQuantity = async (total: number) => {
    try {
      if (cart) {
        await productApiRequest.updateQuantityProductCart(cart.id, {
          productId: product.productAttribute.id,
          total_product: total,
        });
        updateQuantityProduct(product.productAttribute.id, shopId, total);
      }
    } catch (error: any) {
      toast.error(error.payload.message);
    }
  };

  const handleConfirmDeleteProductCart = () => {
    setOpenDeleteProduct(true);
  };

  return (
    <div className="w-full gap-y-4 flex flex-col md:flex-row md:items-center px-8 py-4 border-b last:border-b-0">
      <div className="w-full md:w-1/2 flex items-center gap-4">
        <Checkbox
          checked={listCartCheckout.includes(product.productAttribute.id)}
          onClick={() =>
            handleSetProductCartProduct(product.productAttribute.id)
          }
        />
        <div className="flex items-center gap-4">
          <div className="w-32 h-32 flex items-center justify-center">
            <Image
              alt="logo-shop"
              src={product.productAttribute.picture}
              width={80}
              height={80}
              className="max-w-32 max-h-32 w-auto h-auto"
            />
          </div>
          <div className="flex flex-col">
            <span className="line-clamp-2 text-sm">
              {product.productAttribute?.product?.name}
            </span>
            <span className="line-clamp-1 text-xs">
              Size: {product.productAttribute?.size}
            </span>
            <span className="line-clamp-1 text-xs">
              Chất liệu: {product.productAttribute?.material}
            </span>
          </div>
        </div>
        {/* <ProductOptions /> */}
      </div>
      <div className="w-full md:w-1/2 flex items-center gap-4">
        <span className="text-sm text-gray-700 w-1/4 text-center">
          <span className="md:hidden">Đơn giá: </span>
          {product.productAttribute.product.price?.toLocaleString("en-US", {
            style: "currency",
            currency: "VND",
          }) || 0}
        </span>
        <FormUpdateTotalProduct
          value={product.total_product}
          handleOnChange={handleOnchangeProductQuantity}
          handleConfirmDeleteProductCart={handleConfirmDeleteProductCart}
        />
        <span className="text-sm text-red-500 w-1/4 text-center">
          {Number(
            product.productAttribute.product.price * product.total_product
          )?.toLocaleString("en-US", {
            style: "currency",
            currency: "VND",
          }) || 0}
        </span>
      </div>
      <DeleteCartItem handleDeleteProductCart={handleDeleteProductCart} />
      <Dialog
        open={openDeleteProduct}
        onOpenChange={(value) => setOpenDeleteProduct(value)}
      >
        <DialogContent className="w-max">
          <DialogHeader className="gap-4">
            <DialogTitle className="p-4">
              Bạn có muốn xóa sản phẩm này khỏi giỏ hàng
            </DialogTitle>
            <DialogDescription className="flex items-center justify-end w-full gap-8">
              <DialogClose
                className={cn(buttonVariants({ variant: "destructive" }))}
                onClick={handleDeleteProductCart}
              >
                Xóa
              </DialogClose>
              <DialogClose
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                Hủy
              </DialogClose>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductCart;
