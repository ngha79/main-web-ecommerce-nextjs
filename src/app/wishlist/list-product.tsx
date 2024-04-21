import Product from './product'

const ListProduct = ({ products }: { products: any }) => {
  return (
    <div className="flex flex-col gap-4">
      {products?.map((item: any) => (
        <Product
          product={item.product}
          id={item.id}
          key={item.id}
        />
      ))}
      {!products.length ? (
        <div className="text-center">Bạn chưa thêm sản phẩm yêu thích nào</div>
      ) : null}
    </div>
  )
}

export default ListProduct
