import Product from "./product";

const ListProduct = ({ products }: { products: any }) => {
  return (
    <div className="flex flex-col gap-4 flex-1">
      {products?.map((item: any) => (
        <Product product={item.product} id={item.id} key={item.id} />
      ))}
      {!products.length ? (
        <div className="flex items-center justify-center flex-1">
          <span>Bạn chưa thêm sản phẩm yêu thích nào</span>
        </div>
      ) : null}
    </div>
  );
};

export default ListProduct;
