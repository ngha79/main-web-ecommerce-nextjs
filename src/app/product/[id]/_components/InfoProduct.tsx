'use client'

import { Button } from '@/components/ui/button'
import FormUpdateTotalProduct from '@/components/utils/FormUpdateTotalProduct'
import { Product, ProductAttribute, Shop } from '@/lib/interface'
import { handleAddProductToCart } from '@/utils/action'
import Image from 'next/image'
import React, { ChangeEvent, useState } from 'react'
import TypeProduct from './TypeProduct'
import CarouselThumb from './CarouselThumb'
import { cartStore } from '@/utils/store/store'
import { toast } from 'sonner'
import LikeProduct from './LikeProduct'
import cartApiRequest from '@/apiRequests/cart'
import { clientSessionUser } from '@/lib/http'

interface TypeThumbImage {
  currentImage: null | string
  prevImage: null | string
  defaultImage: string
}

const InfoProduct = ({ product, shop }: { product: Product; shop: Shop }) => {
  let [totalProduct, setTotalProduct] = useState<number>(1)
  const [attribute, setAttribute] = useState<ProductAttribute | null>(
    product.attributes[0]
  )
  const [thumbImage, setThumbImage] = useState<TypeThumbImage>({
    currentImage: null,
    prevImage: null,
    defaultImage: product.picture[0].product_image_url,
  })
  const addProductToCart = cartStore((state) => state.addProductToCart)

  const handleOnChange = (e: any) => {
    setTotalProduct(e)
  }

  const handleAddToCart = async () => {
    if (!attribute) {
      return toast.error('Vui lòng chọn Phân loại hàng')
    }
    if (totalProduct < 1 || totalProduct > 1000) {
      return toast.error('Số lượng sản phẩm không phù hợp.')
    }
    try {
      await cartApiRequest.handleAddProductToCart(
        {
          productId: attribute.id,
          total_product: totalProduct,
        },
        clientSessionUser.accessToken
      )
      const newproduct = {
        productAttribute: {
          product: {
            name: product.name,
            isPublish: product.isPublish,
            id: product.id,
            price: product.price,
          },
          size: attribute.size,
          picture: attribute.picture,
          material: attribute.material,
          id: attribute.id,
        },
        total_product: totalProduct,
      }
      addProductToCart(shop, newproduct)
      toast.success('Thêm sản phẩm vào giỏ hàng thành công.')
    } catch (error: any) {
      toast.error(error.payload.message)
    }
  }

  const handleAddSize = (productAttribute: ProductAttribute) => {
    if (attribute?.id !== productAttribute.id) {
      setAttribute(productAttribute)
      setThumbImage((state) => ({
        ...state,
        currentImage: productAttribute.picture,
        prevImage: null,
      }))
    } else {
      setAttribute(null)
      setThumbImage((state) => ({
        ...state,
        currentImage: null,
        prevImage: null,
        defaultImage: productAttribute.picture,
      }))
    }
  }

  const handleMouseEnter = (id: number, image: string) => {
    if (id !== attribute?.id) {
      setThumbImage((state) => ({
        ...state,
        currentImage: product.picture[0].product_image_url,
        prevImage: state.currentImage,
      }))
    }
  }

  const handleMouseLeave = (id: number, image: string) => {
    if (id !== attribute?.id) {
      setThumbImage((state) => ({
        ...state,
        currentImage: state.prevImage,
        prevImage: null,
      }))
    }
  }

  return (
    <div className="bg-white shadow-login rounded-md w-full flex flex-col md:flex-row p-4">
      <div className="md:max-w-[50%] w-full h-max flex flex-col gap-4 items-center p-4">
        <div className="md:min-w-[400px] w-full max-w-full h-max flex items-center justify-center">
          <Image
            alt="iamge"
            src={
              thumbImage.currentImage
                ? thumbImage.currentImage
                : thumbImage.defaultImage
            }
            width={450}
            height={450}
            className="w-auto max-w-full h-[300px] md:h-[450px]"
          />
        </div>
        <CarouselThumb images={product.picture} />
        <LikeProduct
          productId={product.id}
          shopId={shop.shop_id}
        />
      </div>
      <div className="w-full flex flex-col gap-4 p-4 md:max-w-[50%]">
        <h1 className="text-lg text-gray-800">{product.name}</h1>
        <div className="flex items-center flex-wrap">
          <Button
            className="font-light border-r mr-4 border-gray-200 rounded-none"
            variant={'link'}
          >
            Đã bán {product.sold}
          </Button>
          <Button variant={'destructive'}>Tố cáo</Button>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-red-700 text-2xl">
            {product?.price.toLocaleString('vi', {
              style: 'currency',
              currency: 'VND',
            })}
          </div>
        </div>
        <div className="flex items-center gap-8">
          <label
            htmlFor=""
            className="text-gray-700 text-sm"
          >
            Số lượng
          </label>
          <FormUpdateTotalProduct
            value={totalProduct}
            handleOnChange={handleOnChange}
          />
        </div>
        {product?.attributes?.length > 1 ? (
          <div className="flex items-center gap-8">
            <label
              htmlFor=""
              className="text-gray-700 text-sm"
            >
              Phân loại
            </label>
            <div className="flex flex-wrap gap-4">
              {product?.attributes.map((item) => (
                <TypeProduct
                  key={item.id}
                  product={item}
                  handleAddSize={handleAddSize}
                  attribute={attribute}
                  handleMouseLeave={handleMouseLeave}
                  handleMouseEnter={handleMouseEnter}
                />
              ))}
            </div>
          </div>
        ) : null}
        <div className="flex gap-4 flex-wrap justify-end sm:justify-start">
          <Button
            className="border-private text-private hover:text-private/80 bg-private/10 hover:bg-private/5"
            variant={'outline'}
            onClick={() => handleAddToCart()}
          >
            Thêm vào giỏ hàng
          </Button>
          <Button variant={'destructive'}>Mua ngay</Button>
        </div>
      </div>
    </div>
  )
}

export default InfoProduct
