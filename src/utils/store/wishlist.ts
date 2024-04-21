'use server'

import axiosServer from '@/lib/axios-server.config'

export const getListWishlist = async ({
  page = 1,
  limit,
  search = '',
}: any) => {
  const res = await axiosServer({
    url: `/wishlist?page=${page}&limit=${limit}&search=${search}`,
    method: 'GET',
  })
  return res
}

export const addProductToWishlist = async ({
  productId,
}: {
  productId: string
}) => {
  const res = await axiosServer({
    url: '/wishlist',
    method: 'POST',
    data: { productId },
  })
  return res
}

export const removeProductWishList = async ({ ids }: any) => {
  const res = await axiosServer({
    url: '/wishlist',
    method: 'DELETE',
    data: { ids },
  })
  return res
}
