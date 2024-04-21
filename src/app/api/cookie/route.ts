import { HttpError } from '@/lib/http'

export async function POST(request: Request) {
  const body = await request.json()
  const accessToken = body.accessToken as string
  const refreshToken = body.refreshToken as string
  try {
    const timeExpiredAccessToken = 100
    const timeExpiredRefreshToken = 7 * 24 * 60 * 60
    const cookieString = `accessToken=${accessToken}; Path=/; HttpOnly; Max-Age=${timeExpiredAccessToken}; SameSite=Lax; Secure`
    const refreshCookieString = `refreshToken=${refreshToken}; Path=/; Max-Age=${timeExpiredRefreshToken}; HttpOnly; SameSite=Lax; Secure`

    return Response.json(body, {
      status: 200,
      headers: {
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
