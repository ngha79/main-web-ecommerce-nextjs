import Image from 'next/image'
import React from 'react'

const ShopFeedback = ({ feedback }: { feedback: any }) => {
  return (
    <div className="p-4 rounded-md bg-gray-100">
      <h3 className="pb-2">Phản Hồi Của Người Bán</h3>
      {feedback?.images?.length ? (
        <div className="flex items-center h-20 gap-2">
          {feedback.images.map((item: any) => (
            <Image
              alt="avatar-user"
              src={item.image_url}
              width={80}
              height={80}
              className="border"
              key={item.id}
            />
          ))}
        </div>
      ) : null}
      <span className="text-gray-600">{feedback?.content}</span>
    </div>
  )
}

export default ShopFeedback
