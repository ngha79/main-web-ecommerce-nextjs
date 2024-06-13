import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container min-h-layout flex flex-col gap-4 items-center justify-center">
      <h2 className="text-2xl font-bold">Không tìm thấy</h2>
      <p>Không thể tìm sản phẩm bạn muốn tìm</p>
      <Link href="/" className={cn([buttonVariants({ variant: "primary" })])}>
        Trở về trang chủ
      </Link>
    </div>
  );
}
