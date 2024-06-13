import OrderLoading from "@/components/order/OrderLoading";

export default async function Loading() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <OrderLoading />
      <OrderLoading />
      <OrderLoading />
    </div>
  );
}
