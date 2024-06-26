"use client";

import {
  AlignJustify,
  Bell,
  Heart,
  KeyRound,
  LogIn,
  LogOut,
  MapPin,
  MessageCircle,
  ShoppingBag,
  Store,
  TicketPercent,
  User,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn, ResponseExceptions } from "@/lib/utils";
import { logout } from "@/utils/actions/account";
import { toast } from "sonner";
import { useContext } from "react";
import { SocketContext } from "../contexts/SocketContext";

const LoginForm = () => {
  return (
    <div className="flex flex-col gap-2">
      <SheetClose asChild>
        <Link
          href={"/login"}
          className="p-2 flex items-center gap-2 hover:bg-gray-200 outline-none rounded-md cursor-pointer"
        >
          <LogIn size={18} />
          Đăng Nhập
        </Link>
      </SheetClose>
      <SheetClose asChild>
        <Link
          href={"/register"}
          className="p-2 flex items-center gap-2 hover:bg-gray-200 outline-none rounded-md cursor-pointer"
        >
          <UserPlus size={18} />
          Đăng Ký
        </Link>
      </SheetClose>
    </div>
  );
};

const IsLogin = () => {
  const router = useRouter();
  const pathName = usePathname();
  const isProfile = pathName.includes("/user/account");
  const { socket } = useContext(SocketContext);

  const handleLogoutAccount = async () => {
    try {
      await logout();
      router.push("/");
      socket?.disconnect();
    } catch (error) {
      toast.error(ResponseExceptions.DEFAULT_ERROR);
    }
  };
  return (
    <div className="flex flex-col gap-2">
      {isProfile ? (
        <>
          <SheetClose asChild>
            <Link
              href={"/user/account/profile"}
              className={cn([
                "p-2 flex items-center gap-2 outline-none rounded-md cursor-pointer",
                ,
                pathName === "/user/account/profile"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200",
              ])}
            >
              <User size={18} />
              Hồ sơ tài khoản
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href={"/user/account/address"}
              className={cn([
                "p-2 flex items-center gap-2 outline-none rounded-md cursor-pointer",
                ,
                pathName === "/user/account/address"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200",
              ])}
            >
              <MapPin size={18} />
              Địa chỉ của tôi
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href={"/user/account/password"}
              className={cn([
                "p-2 flex items-center gap-2 outline-none rounded-md cursor-pointer",
                ,
                pathName === "/user/account/password"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200",
              ])}
            >
              <KeyRound size={18} />
              Đổi mật khẩu
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href={"/user/account/purchase"}
              className={cn([
                "p-2 flex items-center gap-2 outline-none rounded-md cursor-pointer",
                ,
                pathName === "/user/account/purchase"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200",
              ])}
            >
              <ShoppingBag size={18} />
              Đơn hàng
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href={"/user/account/vouchers"}
              className={cn([
                "p-2 flex items-center gap-2 outline-none rounded-md cursor-pointer",
                ,
                pathName === "/user/account/vouchers"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200",
              ])}
            >
              <TicketPercent size={18} />
              Kho Voucher
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href={"/user/account/notifications"}
              className={cn([
                "p-2 flex items-center gap-2 outline-none rounded-md cursor-pointer",
                ,
                pathName === "/user/account/notifications"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200",
              ])}
            >
              <Bell size={18} />
              Thông báo
            </Link>
          </SheetClose>
        </>
      ) : (
        <>
          <SheetClose asChild>
            <Link
              href={"/user/account/profile"}
              className={cn([
                "p-2 flex items-center gap-2 outline-none rounded-md cursor-pointer",
                ,
                pathName === "/user/account/profile"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200",
              ])}
            >
              <User size={18} />
              Tài khoản của tôi
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href={"/user/account/purchase"}
              className={cn([
                "p-2 flex items-center gap-2 outline-none rounded-md cursor-pointer",
                ,
                pathName === "/user/account/purchase"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200",
              ])}
            >
              <ShoppingBag size={18} />
              Đơn mua
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href={"/user/account/notifications"}
              className={cn([
                "p-2 flex items-center gap-2 outline-none rounded-md cursor-pointer",
                ,
                pathName === "/user/account/notifications"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200",
              ])}
            >
              <Bell size={18} />
              Thông báo
            </Link>
          </SheetClose>
        </>
      )}
      <SheetClose asChild>
        <Link
          href={"/wishlist"}
          className={cn([
            "p-2 flex items-center gap-2 outline-none rounded-md cursor-pointer",
            ,
            pathName === "/wishlist"
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-200",
          ])}
        >
          <Heart size={18} />
          Sản phẩm yêu thích
        </Link>
      </SheetClose>
      <SheetClose asChild>
        <Link
          href={"/messages"}
          className={cn([
            "p-2 flex items-center gap-2 outline-none rounded-md cursor-pointer",
            ,
            pathName === "/messages"
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-200",
          ])}
        >
          <MessageCircle size={18} />
          Tin nhắn
        </Link>
      </SheetClose>
      <SheetClose asChild>
        <div
          className="p-2 flex items-center gap-2 hover:bg-gray-200 outline-none rounded-md cursor-pointer"
          onClick={handleLogoutAccount}
        >
          <LogOut size={18} />
          Đăng xuất
        </div>
      </SheetClose>
    </div>
  );
};

const SheetFeature = ({ user }: any) => {
  return (
    <div className="flex justify-end lg:hidden">
      <Sheet>
        <SheetTrigger>
          <AlignJustify className="text-background" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <div className="py-4 text-gray-800 space-y-2">
              {user ? <IsLogin /> : <LoginForm />}
              <div className="flex flex-col gap-2">
                <SheetClose asChild>
                  <Link
                    href={`${process.env.NEXT_PUBLIC_MANAGER_URL}`}
                    className="p-2 flex items-center gap-2 hover:bg-gray-200 outline-none rounded-md cursor-pointer"
                  >
                    <Store size={18} />
                    Kênh người bán
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href={`${process.env.NEXT_PUBLIC_MANAGER_URL}/register`}
                    className="p-2 flex items-center gap-2 hover:bg-gray-200 outline-none rounded-md cursor-pointer"
                  >
                    <KeyRound size={18} />
                    Trở thành người bán
                  </Link>
                </SheetClose>
              </div>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SheetFeature;
