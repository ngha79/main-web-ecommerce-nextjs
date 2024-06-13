import DirectoryLoading from "./_components/loading/DirectoryLoading";
import InfoProductLoading from "./_components/loading/InfoProductLoaing";
import InfoShopLoading from "./_components/loading/InfoShopLoading";
import ProductDescriptionLoading from "./_components/loading/ProductDescriptionLoading";
import ProductLoading from "./_components/loading/ProductLoading";
import RatingLoading from "./_components/loading/RatingLoading";
import TopProductLoading from "./_components/loading/TopProductLoading";
import VoucherLoading from "./_components/loading/VoucherLoading";

export default async function Loading() {
  return (
    <section className="flex flex-col gap-8 py-4 container">
      <DirectoryLoading />
      <InfoProductLoading />
      <InfoShopLoading />
      <VoucherLoading />
      <TopProductLoading />
      <ProductDescriptionLoading />
      <RatingLoading />
      <ProductLoading />
    </section>
  );
}
