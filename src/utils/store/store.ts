import { Cart, CartItem, CartStore, ProductCart, Shop } from "@/lib/interface";
import { create } from "zustand";

const addCart = ({
  state,
  product,
  shop,
}: {
  state: any;
  product: ProductCart;
  shop: Shop;
}) => {
  const cartItems = state.cart?.cartItems.find(
    (item: CartItem) => item.shop.id === shop.shop_id
  );
  if (cartItems) {
    const checkProduct = cartItems?.products?.filter(
      (item: ProductCart) =>
        item.productAttribute.id !== product.productAttribute.id
    );
    checkProduct.push(product);
    const newCartItems = state.cart?.cartItems.map((item: CartItem) => {
      if (item.shop.id === shop.shop_id) {
        return { ...cartItems, products: checkProduct };
      }
      return item;
    });
    return {
      cart: {
        ...state.cart,
        cartItems: newCartItems,
      },
    };
  } else {
    const newCartItems = [
      ...state.cart.cartItems,
      {
        shop: {
          avatar: shop.shop_avatar,
          background: shop.shop_background,
          id: shop.shop_id,
          userName: shop.shop_userName,
        },
        products: [product],
      },
    ];
    return {
      cart: { ...state.cart, cartItems: newCartItems },
    };
  }
};

const removeCartItem = ({
  state,
  productId,
}: {
  state: any;
  productId: number;
}) => {
  const newCartItems: CartItem[] = [];
  state.cart?.cartItems.forEach((item: CartItem) => {
    let productIsExist = item.products.filter(
      (prod) => prod.productAttribute.id !== productId
    );
    if (productIsExist?.length) {
      item.products = productIsExist;
      newCartItems.push(item);
    }
  });
  return { cart: { ...state.cart, cartItems: newCartItems || [] } };
};

const removeCartItems = ({
  state,
  cartItems,
}: {
  state: any;
  cartItems: number[];
}) => {
  const newCartItems: CartItem[] = [];
  state.cart?.cartItems.forEach((item: CartItem) => {
    let productIsExist = item.products.filter(
      (prod) => !cartItems.includes(prod.id)
    );
    if (productIsExist?.length) {
      item.products = productIsExist;
      newCartItems.push(item);
    }
  });
  return { cart: { ...state.cart, cartItems: newCartItems || [] } };
};

const updateQuantityProduct = ({
  state,
  productId,
  quantity,
  shopId,
}: {
  state: any;
  productId: number;
  quantity: number;
  shopId: string;
}) => {
  const newUpdate = state.cart?.cartItems.map((cartItem: CartItem) => {
    if (cartItem.shop.id === shopId) {
      cartItem.products.map((product) => {
        if (product.productAttribute.id === productId) {
          product.total_product = quantity;
        }
        return product;
      });
      return cartItem;
    }
  });

  return { cart: { ...state.cart, cartItems: newUpdate || [] } };
};

export const cartStore = create<CartStore>()((set) => ({
  cart: undefined,
  setCart: (cart: Cart) => set((state) => ({ cart: { ...cart } })),
  addProductToCart: (shop: Shop, product: ProductCart) =>
    set((state) => addCart({ state, product, shop })),
  removeProductToCart: (productId: number) =>
    set((state) => removeCartItem({ state, productId })),
  removeCartItems: (cartItems: number[]) =>
    set((state) => removeCartItems({ state, cartItems })),
  updateQuantityProduct: (
    productId: number,
    shopId: string,
    quantity: number
  ) =>
    set((state) =>
      updateQuantityProduct({ state, productId, shopId, quantity })
    ),
}));
