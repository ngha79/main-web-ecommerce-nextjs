import SheetFeature from "@/components/navbar/SheetFeature";
import Notification from "@/components/notification/NotificationHeader";
import SearchBar from "@/components/search-bar/SearchBar";
import Link from "next/link";
import React, { Suspense } from "react";
import Logo from "./Logo";

const NavbarAuth = () => {
  return (
    <div className="w-full relative min-h-36 max-lg:min-h-24">
      <div className="w-full bg-cyan-700 fixed top-0 left-0 z-40">
        <div className="flex flex-col container py-2">
          <div className="hidden lg:flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm w-full">
              <Link
                href={"/banhang"}
                className="hover:text-white/70 text-white"
              >
                Kênh người bán
              </Link>
              <Link
                href={"/seller/register"}
                className="hover:text-white/70 text-white"
              >
                Trở thành người bán
              </Link>
            </div>
            <div className="flex items-center gap-4 h-12 text-sm w-full justify-end">
              <Notification user={null} />
              <Link
                href={"/login"}
                className="rounded-md text-sm px-2 py-2 hover:text-white/70 text-white"
              >
                Đăng Nhập
              </Link>
              <Link
                href={"/register"}
                className="rounded-md text-sm px-2 py-2 hover:text-white/70 text-white"
              >
                Đăng Ký
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-8 p-2">
            <Logo />
            <Suspense>
              <SearchBar />
            </Suspense>
            <SheetFeature user={null} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarAuth;
