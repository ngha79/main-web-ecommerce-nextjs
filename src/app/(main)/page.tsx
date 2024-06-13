import productApiRequest from "@/apiRequests/product";
import Category from "@/components/home/Category";
import ProductSuggest from "@/components/product/ProductSuggest";
import SliderEvent from "@/components/slider-event/SliderEvent";
import http from "@/lib/http";
import { ISlider } from "@/lib/interface";

export default async function Home() {
  return (
    <div className="flex container gap-4 py-4 flex-col md:flex-row">
      <Category />
      <div className="flex flex-col gap-4 flex-1">
        <Event />
        <Products />
      </div>
    </div>
  );
}

const Event = async () => {
  try {
    const { payload: sliders } = await http.get<ISlider[]>("/admin/slider");
    return <SliderEvent sliders={sliders} />;
  } catch (error) {
    return null;
  }
};

const Products = async () => {
  try {
    const { payload: products } = await productApiRequest.handleSearchProduct({
      limit: 20,
      page: 1,
      search: "",
    });
    return <ProductSuggest products={products} />;
  } catch (error) {
    return null;
  }
};
