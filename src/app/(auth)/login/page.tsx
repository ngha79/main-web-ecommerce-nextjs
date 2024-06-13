import Image from "next/image";
import type { Metadata } from "next";

import LoginForm from "./form";

export const metadata: Metadata = {
  title: "Đăng nhập | Mua ngay | ShopDev",
  description: "Đăng nhập | Mua ngay | ShopDev",
};

export default function LoginPage() {
  return (
    <div className="container flex h-full items-center justify-between">
      <LoginForm />
      <Image
        alt="background"
        src={"/login.png"}
        className="w-[50%] top-0 max-md:hidden"
        width={580}
        height={580}
      />
    </div>
  );
}
