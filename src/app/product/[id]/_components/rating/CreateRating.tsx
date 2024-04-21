import Image from 'next/image'
import { toast } from 'sonner'
import { useParams } from 'next/navigation'
import { Camera, Star, Trash } from 'lucide-react'
import React, { useRef, useState } from 'react'

import productApiRequest from '@/apiRequests/product'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { clientSessionUser } from '@/lib/http'

const CreateRating = ({
  user,
  handleAddComment,
}: {
  user: any
  handleAddComment: (comment: any) => void
}) => {
  const { id } = useParams()
  const [star, setStar] = useState<number>(5)
  const [file, setFile] = useState<any[]>([])
  const [review, setReview] = useState<string>('')
  const [image, setImage] = useState<string[]>([])
  const [isLoading, setLoading] = useState<boolean>(false)
  const [starHover, setStarHover] = useState<number>(0)
  const ref = useRef<HTMLInputElement>(null)

  const handleSetImage = () => {
    ref.current?.click()
  }

  const handleUploadThumb = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage([])
      setFile([])
      Array.from(e.target.files).forEach((item) => {
        const newImage = URL.createObjectURL(item)
        setImage((image) => [...image, newImage])
        setFile((file) => [...file, item])
      })
    }
  }

  function deleteItem(arr: any[], index: number) {
    if (index < 0 || index >= arr.length) {
      return arr
    } else {
      arr.splice(index, 1)
      return arr
    }
  }

  const handleDeleteImage = (item: string, index: number) => {
    if (isLoading) return
    const newFile = deleteItem(file, index)
    setFile(newFile)
    setImage((image) => image.filter((img) => img !== item))
  }

  const onInputClick = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    const element = event.target as HTMLInputElement
    element.value = ''
  }

  const handleCreateReviewProduct = async () => {
    if (!review && !file.length) return
    try {
      const formData = new FormData()
      formData.append('content', review)
      formData.append('productId', id as string)
      formData.append('rating', star)
      for (let index = 0; index < file.length; index++) {
        const image = file[index]
        formData.append('file', image)
      }
      setLoading(true)
      const { payload } = await productApiRequest.createReviewProduct(
        formData,
        clientSessionUser.accessToken
      )
      setLoading(false)
      handleAddComment(payload)
      setFile([])
      setImage([])
      setStar(5)
      setReview('')
      toast.success('Đánh giá sản phẩm thành công')
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại sau.')
    }
  }

  const handleSetStar = (star: number) => {
    if (isLoading) return
    setStar(star + 1)
  }

  return (
    <div className="flex gap-2 p-4">
      <Image
        src={user?.avatar}
        alt="avatar user"
        height={48}
        width={48}
        className="w-12 h-12 border rounded-full"
      />
      <div className="flex flex-col w-full gap-2">
        <h1 className="text-sm font-medium">{user?.userName}</h1>
        <div className="flex flex-col gap-2">
          <h1 className="text-sm font-medium">Đánh giá sản phẩm</h1>
          <div className="flex items-center gap-1 group">
            {Array.from({ length: 5 }).map((item, index) => (
              <Star
                key={index}
                size={18}
                onClick={() => handleSetStar(index)}
                onMouseLeave={() => setStarHover(0)}
                onMouseEnter={() => setStarHover(index)}
                className="text-amber-300"
                fill={
                  starHover >= index
                    ? '#fcd34d'
                    : star - 1 >= index
                    ? '#fcd34d'
                    : '#fff'
                }
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <h2 className="text-sm">Ảnh</h2>
          <Camera
            onClick={handleSetImage}
            className="text-gray-500"
          />
          <Input
            type="file"
            multiple
            ref={ref}
            disabled={isLoading}
            className="hidden"
            onClick={onInputClick}
            onChange={handleUploadThumb}
          />
        </div>
        {image.length ? (
          <div className="flex flex-wrap gap-4">
            {image.map((item, index) => (
              <div
                className="relative cursor-pointer w-auto h-auto flex items-center justify-center group"
                key={index}
                onClick={() => handleDeleteImage(item, index)}
              >
                <Image
                  alt="image"
                  src={item}
                  width={120}
                  height={120}
                  className="max-h-40 max-w-40 h-auto w-auto border"
                />
                <div className="absolute top-0 left-0 w-full h-full flex group-hover:bg-gray-200/30 items-center justify-center">
                  <Trash
                    size={22}
                    className="text-red-500 hidden group-hover:block "
                  />
                </div>
              </div>
            ))}
          </div>
        ) : null}
        <textarea
          disabled={isLoading}
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full border rounded-md resize-none border-gray-500 min-h-12 p-1 px-2"
        />
        <Button
          disabled={(!review && !file.length) || isLoading}
          variant={'primary'}
          onClick={handleCreateReviewProduct}
        >
          Đăng
        </Button>
      </div>
    </div>
  )
}

export default CreateRating
