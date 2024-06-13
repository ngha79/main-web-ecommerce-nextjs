import productApiRequest from "@/apiRequests/product";
import Category from "@/components/home/Category";
import ProductSuggest from "@/components/product/ProductSuggest";
import SliderEvent from "@/components/slider-event/SliderEvent";
import http from "@/lib/http";
import { ISlider } from "@/lib/interface";

export default async function Home() {
  const { payload: products } = await productApiRequest.handleSearchProduct({
    limit: 20,
    page: 1,
    search: "",
  });
  const { payload: sliders } = await http.get<ISlider[]>("/admin/slider");
  return (
    <div className="flex container gap-4 py-4 flex-col md:flex-row">
      <Category />
      <div className="flex flex-col gap-4 flex-1">
        <SliderEvent sliders={sliders} />
        <ProductSuggest products={products} />
      </div>
    </div>
  );
}
