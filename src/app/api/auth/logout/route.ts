import authApiRequest from '@/apiRequests/auth'
import { HttpError } from '@/lib/http'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const res = await request.json()
  const force = res.force as boolean | undefined
  if (force) {
    const cookieString = `accessToken=; Path=/; HttpOnly; Max-Age=0`
    const refreshCookieString = `refreshToken=; Path=/; HttpOnly; Max-Age=0`
    return Response.json(
      {
        message: 'Buộc đăng xuất thành công',
      },
      {
        status: 200,
        headers: {
          // Xóa cookie sessionToken
          'Set-Cookie': `${cookieString}, ${refreshCookieString}`,
        },
      }
    )
  }
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  const refreshToken = cookieStore.get('refreshToken')
  if (!accessToken || !refreshToken) {
    return Response.json(
      { message: 'Không nhận được access token' },
      {
        status: 401,
      }
    )
  }
  try {
    const result = await authApiRequest.logoutFromNextServerToServer(
      accessToken.value
    )
    const cookieString = `accessToken=; Path=/; HttpOnly; Max-Age=0`
    const refreshCookieString = `refreshToken=; Path=/; HttpOnly; Max-Age=0`
    return Response.json(result.payload, {
      status: 200,
      headers: {
        // Xóa cookie sessionToken
        'Set-Cookie': `${cookieString}, ${refreshCookieString}`,
      },
    })
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status,
      })
    } else {
      return Response.json(
        {
          message: 'Lỗi không xác định',
        },
        {
          status: 500,
        }
      )
    }
  }
}
