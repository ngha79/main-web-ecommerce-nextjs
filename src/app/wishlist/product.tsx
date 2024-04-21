import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import DeleteProductWishlist from './delete-product-wishlist'

const Product = ({ product, id }: { product: any; id: number }) => {
  return (
    <div className="flex relative justify-between w-full items-center rounded-md bg-background shadow-md p-4">
      <div className="flex items-center gap-2">
        <div className="w-32 h-32 flex items-center justify-center">
          <Image
            alt="image"
            src={product.picture?.[0].product_image_url}
            width={80}
            height={80}
            className="max-w-32 max-h-32 w-auto h-auto"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="line-clamp-2 max-w-40">{product.name}</h2>
          <div className="text-sm text-gray-700">
            <span>Đã bán:</span>
            <span>{product.sold}</span>
          </div>
          <span className="text-sm text-gray-700">{product.brand}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 text-gray-700">
        <span className="text-sm line-clamp-1">Giá sản phẩm:</span>
        <span>
          {product.price.toLocaleString('vi', {
            style: 'currency',
            currency: 'VND',
          })}
        </span>
      </div>
      {!product.isPublish ? (
        <div className="absolute top-0 left-0 w-full gap-2 h-full flex flex-col items-center justify-center bg-gray-50/80">
          <h2>Sản phẩm không còn hoạt động</h2>
          <DeleteProductWishlist id={id} />
        </div>
      ) : null}
      <div className="flex items-center flex-wrap justify-center gap-2">
        <DeleteProductWishlist id={id} />
        <Link
          href={`/product/${product.id}`}
          className={cn([
            buttonVariants({
              variant: 'primary',
            }),
          ])}
        >
          Xem sản phẩm
        </Link>
      </div>
    </div>
  )
}

export default Product
