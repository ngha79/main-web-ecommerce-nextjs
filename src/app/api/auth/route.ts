export async function POST(request: Request) {
  const body = await request.json()
  const accessToken = body.accessToken as string
  const refreshToken = body.refreshToken as string

  if (!accessToken && !refreshToken) {
    return Response.json(
      { message: 'Không nhận được token' },
      {
        status: 400,
      }
    )
  }
  const timeExpiredAccessToken = 3000
  const timeExpiredRefreshToken = 7 * 24 * 60 * 60
  // Construct the cookie string with both access token and refresh token
  const cookieString = `accessToken=${accessToken}; Path=/; HttpOnly; Max-Age=${timeExpiredAccessToken}; SameSite=Lax; Secure`
  const refreshCookieString = `refreshToken=${refreshToken}; Path=/; Max-Age=${timeExpiredRefreshToken}; HttpOnly; SameSite=Lax; Secure`

  return Response.json(body, {
    status: 200,
    headers: {
      'Set-Cookie': `${cookieString}, ${refreshCookieString}`,
    },
  })
}
