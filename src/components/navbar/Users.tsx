import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'

const Users = ({ user }: { user: any }) => {
  if (!user) return null
  const handleLogoutAccount = async () => {}
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
        <Link
          href={'/user/account/profile'}
          className="w-full bg-red-400"
        >
          <DropdownMenuItem className="p-2 hover:bg-gray-200 outline-none rounded-md cursor-pointer">
            Tài khoản của tôi
          </DropdownMenuItem>
        </Link>
        <Link
          href={'/user/account/purchase'}
          className="w-full bg-red-400"
        >
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
  )
}

export default Users
