import { IAddressUser } from '@/app/user/account/address/UpdateAddress'

export interface Cart {
  id: string
  cartItems: CartItem[]
}

export interface CartStore {
  cart: Cart | undefined
  setCart: (cart: Cart) => void
  addProductToCart: (shop: Shop, product: ProductCart) => void
  removeProductToCart: (productId: number) => void
}

export interface ProductCart {
  productAttribute: {
    product: {
      name: string
      isPublish: boolean
      id: string
      price: number
    }
    size: string
    picture: string
    material: string
    id: number
  }
  total_product: number
  id?: number
}

export interface CartItem {
  shop: {
    id: string
    userName: string
    avatar: string
    background: string
  }
  products: ProductCart[]
}

export interface ShopProduct {
  shopId: string
  shop_discounts: string
  item_products: ProductOrder[]
}

export interface ProductOrder {
  product: string
  productAttribute: number
  price: number
  quantity: number
}

export interface Product {
  id: string
  name: string
  sold: number
  price: number
  isPublish: boolean
  brand: string
  detail: string
  picture: [
    {
      id: string
      product_thumb: string
      product_image_url: string
    }
  ]
  attributes: ProductAttribute[]
}

export interface ProductAttribute {
  id: number
  picture: string
  size: string
  material: string
  createdAt: string
  updatedAt: string
}

export interface Shop {
  shop_id: string
  shop_email: string
  shop_userName: string
  shop_password: string
  shop_phoneNumber: string
  shop_avatar: string
  shop_role: string
  shop_background: string
  shop_createdAt: string
  shop_updatedAt: string
  productCount: string
  followersCount: string
  totalLikeCount: string
  totalCommentCount: string
}

export const BrandProductType = [
  'Thời trang',
  'Giày dép',
  'Sách',
  'Thiết bị điện tử',
  'Sắc đẹp',
  'Sức khỏe',
  'Đồ chơi',
  'Chăm sóc thú cưng',
]

export const ListCategory = {
  'Thời trang': 'fashion',
  'Giày dép': 'footwear',
  Sách: 'books',
  'Thiết bị điện tử': 'electronics',
  'Sắc đẹp': 'beauty',
  'Sức khỏe': 'health',
  'Đồ chơi': 'toys',
  'Chăm sóc thú cưng': 'petcare',
}

export enum BrandProduct {
  FASHION = 'Thời trang',
  FOOTWEAR = 'Giày dép',
  BOOKS = 'Sách',
  ELECTRONICS = 'Thiết bị điện tử',
  BEAUTY = 'Sắc đẹp',
  HEALTH = 'Sức khỏe',
  TOYS = 'Đồ chơi',
  PETCARE = 'Chăm sóc thú cưng',
}

export interface ProductSearch {
  name: string
  thumb: string
  id: string
}

export interface IUpdateProfile {
  userName?: string
  phoneNumber?: string
  avatar?: string
  background?: string
}

export interface IUpdatePassword {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface CheckOutStore {
  checkout: CheckOut | undefined
  setCheckout: (checkout: CheckOut) => void
  resetCheckout: () => void
}

export interface CheckOut {
  checkout_order: {
    total_price: number
    feeship: number
    totalDiscount: number
    totalCheckout: number
  }
  shop_order_ids: [
    {
      item_products: ItemProductCheckOut[]
      shopId: string
      shop_discounts: string
    }
  ]
  shop_order_ids_new: [
    {
      item_products: ItemProductCheckOutNew[]
      shop: IShop
      shop_discounts: string
      priceApplyDiscount: number
      priceRaw: number
    }
  ]
}

export interface ItemProductCheckOut {
  id: string
  price: number
  quantity: number
}

export interface ItemProductCheckOutNew {
  id: string
  total_price: number
  total_price_apply: number
  quantity: number
  productAttribute: IProductAttibute
}

export interface IShopCheckout {
  shop: IShop
  productItems: IProductItems[]
  discount: string
}

export interface IShop {
  userName: string
  avatar: string
  background: string
  phoneNumber: string
  id: string
}

export interface IProductItems {
  total_price: number
  total_price_apply: number
  quantity: number
  productAttribute: IProductAttibute
}

export interface IProductAttibute extends ProductAttribute {
  product: Product
}

export interface ListOrderStore {
  listOrder: ListOrder[]
  setListOrder: (listOrder: ListOrder[]) => void
  resetListOrder: () => void
}

export interface ListOrder {
  order: Order
  message: [
    {
      message: string
      product: ProductAttribute
    }
  ]
}

export interface Order {
  address: IAddressUser
  id: string
  createdAt: Date
  status: string
  total_price: number
  total_price_apply_discount: number
  tracking_number: string
  order: any
  user: {
    id: string
  }
}
