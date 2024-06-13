import RegisterForm from "./form";
import Image from "next/image";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Đăng ký | Mua ngay | ShopDev",
  description: "Đăng ký | Mua ngay | ShopDev",
};

export default function RegisterPage() {
  return (
    <div className="container h-full flex items-center justify-between">
      <Image
        alt="background"
        src={"/login.png"}
        className="w-[50%] top-0 max-md:hidden"
        width={580}
        height={580}
      />
      <Suspense>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
