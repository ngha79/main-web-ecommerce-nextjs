import InfoUser from './InfoUser'
import Link from 'next/link'
import SearchBar from '../search-bar/SearchBar'
import Notification from '../notification/Notification'
import Cart from '../cart/Cart'
import { Heart } from 'lucide-react'
import { Icons } from './Icons'
import SheetFeature from './SheetFeature'

const Navbar = () => {
  return (
    <div className="w-full bg-sky-500 fixed top-0 left-0 z-10">
      <div className="flex flex-col container px-4 mx-auto py-2">
        <div className="hidden lg:flex items-center justify-between flex-col md:flex-row">
          <div className="flex items-center gap-2 text-sm w-full">
            <Link
              href={'/banhang'}
              className="hover:text-white/70 text-white"
            >
              Kênh người bán
            </Link>
            <Link
              href={'/seller/register'}
              className="hover:text-white/70 text-white"
            >
              Trở thành người bán
            </Link>
          </div>
          <div className="flex items-center gap-8 h-12 text-sm w-full justify-end">
            <Notification />
            <InfoUser />
          </div>
        </div>
        <div className="flex items-center gap-8 p-2">
          <Link href={'/'}>
            <Icons.logo className="h-10 w-10" />
          </Link>
          <SearchBar />
          <div className="flex items-center gap-4 relative">
            <Link href={'/wishlist'}>
              <Heart className="text-white" />
            </Link>
            <Cart />
            <SheetFeature />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
