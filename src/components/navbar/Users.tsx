import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { ResponseExceptions } from "@/lib/utils";
import { logout } from "@/utils/actions/account";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Users = ({ user }: { user: any }) => {
  const router = useRouter();
  if (!user) return null;
  const handleLogoutAccount = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      toast.error(ResponseExceptions.DEFAULT_ERROR);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center">
        <Avatar>
          <AvatarImage
            src={user.avatar}
            alt="@shadcn"
            className="w-12 h-12 border rounded-full"
          />
          <AvatarFallback>
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white">
              {user?.userName?.[0].toUpperCase()}
            </div>
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-20 bg-background rounded-md shadow-login        ">
        <Link href={"/user/account/profile"} className="w-full bg-red-400">
          <DropdownMenuItem className="p-2 hover:bg-gray-200 outline-none rounded-md cursor-pointer">
            Tài khoản của tôi
          </DropdownMenuItem>
        </Link>
        <Link href={"/user/account/purchase"} className="w-full bg-red-400">
          <DropdownMenuItem className="p-2 hover:bg-gray-200 outline-none rounded-md cursor-pointer">
            Đơn mua
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          className="p-2 hover:bg-gray-200 outline-none rounded-md cursor-pointer"
          onClick={handleLogoutAccount}
        >
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Users;
