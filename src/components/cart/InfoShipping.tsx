import Image from 'next/image'
import React from 'react'

const InfoShipping = () => {
  return (
    <div className="flex gap-2 py-2 px-4 border border-orange-300 rounded-md bg-white">
      <Image
        alt="icon"
        src={'/icon-ship.png'}
        width={20}
        height={20}
      />
      <span className="text-sm font-medium text-gray-700">
        Nhấn vào mục Mã giảm giá ở cuối trang để hưởng miễn phí vận chuyển bạn
        nhé!
      </span>
    </div>
  )
}

export default InfoShipping
