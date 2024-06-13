import Link from "next/link";
import { Suspense } from "react";
import { Heart, MessageCircle } from "lucide-react";

import InfoUser from "./InfoUser";
import Cart from "../cart/Cart";
import { Icons } from "./Icons";
import SheetFeature from "./SheetFeature";
import NavbarLayout from "./NavbarLayout";
import { getMe } from "@/utils/actions/account";
import SearchBar from "../search-bar/SearchBar";
import NotificationHeader from "../notification/NotificationHeader";

const Navbar = async () => {
  let user = null;

  try {
    const response = await getMe();
    user = response.payload;
  } catch (error) {
    user = null;
  }

  return (
    <NavbarLayout user={user}>
      <section className="flex flex-col container px-4 py-2">
        <div className="hidden lg:flex items-center justify-between flex-col md:flex-row">
          <div className="flex items-center gap-4 text-sm w-full">
            <Link
              href={`${process.env.NEXT_PUBLIC_MANAGER_URL}`}
              className="hover:text-white/70 text-white"
            >
              Kênh người bán
            </Link>
            <Link
              href={`${process.env.NEXT_PUBLIC_MANAGER_URL}/register`}
              className="hover:text-white/70 text-white"
            >
              Trở thành người bán
            </Link>
          </div>
          <div className="flex items-center gap-8 h-12 text-sm w-full justify-end">
            <NotificationHeader user={user} />
            <InfoUser user={user} />
          </div>
        </div>
        <div className="flex items-center gap-8 p-2">
          <Link href={"/"}>
            <Icons.logo className="h-16 w-16" />
          </Link>
          <Suspense>
            <SearchBar />
          </Suspense>
          <div className="flex items-center gap-4 relative">
            <Link href={"/wishlist"}>
              <Heart className="text-white" />
            </Link>
            <Cart user={user} />
            {user ? (
              <Link href={"/messages"}>
                <MessageCircle className="text-white" />
              </Link>
            ) : null}
            <SheetFeature user={user} />
          </div>
        </div>
      </section>
    </NavbarLayout>
  );
};

export default Navbar;
