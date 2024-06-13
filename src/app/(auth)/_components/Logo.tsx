"use client";

import { Icons } from "@/components/navbar/Icons";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Logo = () => {
  const pathName = usePathname();
  return (
    <Link href={"/"} className="flex items-center gap-2">
      <Icons.logo className="h-16 w-16" />
      <span className="text-2xl font-semibold text-background max-md:hidden">
        {pathName === "/login" ? "Đăng nhập" : "Đăng ký"}
      </span>
    </Link>
  );
};

export default Logo;
