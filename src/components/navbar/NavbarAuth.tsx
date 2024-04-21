import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NavbarAuth = () => {
  return (
    <div className="w-full bg-sky-400">
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 py-2">
        <Link href={'/'}>
          <Image
            alt="logo"
            src={'/login.png'}
            width={80}
            height={80}
          />
        </Link>
      </div>
    </div>
  )
}

export default NavbarAuth
