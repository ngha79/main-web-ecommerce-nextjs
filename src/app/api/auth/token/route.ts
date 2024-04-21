import authApiRequest from '@/apiRequests/auth'
import { HttpError, REFRESH_TOKEN_ERROR_STATUS } from '@/lib/http'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const cookieStore = cookies()
  const refreshToken = cookieStore.get('refreshToken')
  if (!refreshToken?.value) {
    return Response.json(
      {
        message: 'Không tìm thấy RefreshToken',
      },
      {
        status: 403,
      }
    )
  }
  try {
    const response: any = await authApiRequest.refreshToken({
      refreshToken: refreshToken.value,
    })
    const timeExpiredAccessToken = 24 * 60 * 60
    const timeExpiredRefreshToken = 7 * 24 * 60 * 60
    cookieStore.set('accessToken', response.payload.tokens.accessToken, {
      path: '/',
      httpOnly: true,
      maxAge: timeExpiredAccessToken,
    })
    cookieStore.set('refreshToken', response.payload.tokens.refreshToken, {
      path: '/',
      httpOnly: true,
      maxAge: timeExpiredRefreshToken,
    })
    return Response.json(response.payload, {
      status: 200,
    })
  } catch (error) {
    if (error instanceof HttpError) {
      if (error.status === REFRESH_TOKEN_ERROR_STATUS) {
        cookieStore.delete('accessToken')
        cookieStore.delete('refreshToken')
      }
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
