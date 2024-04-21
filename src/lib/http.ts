import envConfig from '@/config'
import { normalizePath } from '@/lib/utils'
import { LoginResType } from '@/schemaValidations/auth.schema'

type CustomOptions = Omit<RequestInit, 'method'> & {
  baseUrl?: string | undefined
}

export const TOKEN_EXPIRED_ERROR_STATUS = 419
export const REFRESH_TOKEN_ERROR_STATUS = 403

type EntityErrorPayload = {
  message: string
  statusCode: number
}

export class HttpError extends Error {
  status: number
  payload: {
    message: string
    [key: string]: any
  }
  constructor({ status, payload }: { status: number; payload: any }) {
    super('Http Error')
    this.status = status
    this.payload = payload
  }
}

export class EntityError extends HttpError {
  status: 422
  payload: EntityErrorPayload
  constructor({
    status,
    payload,
  }: {
    status: 422
    payload: EntityErrorPayload
  }) {
    super({ status, payload })
    this.status = status
    this.payload = payload
  }
}

class SessionToken {
  private tokenAccess = ''
  private tokenRefresh = ''
  get accessToken() {
    return this.tokenAccess
  }
  set accessToken(accessToken: string) {
    // // Nếu gọi method này ở server thì sẽ bị lỗi
    if (typeof window === 'undefined') {
      throw new Error('Cannot set accessToken on server side')
    }
    this.tokenAccess = accessToken
  }
  get refreshToken() {
    return this.tokenRefresh
  }
  set refreshToken(refreshToken: string) {
    // // Nếu gọi method này ở server thì sẽ bị lỗi
    if (typeof window === 'undefined') {
      throw new Error('Cannot set refreshToken on server side')
    }
    this.tokenRefresh = refreshToken
  }
}

export const clientSessionUser = new SessionToken()

const request = async <Response>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  url: string,
  options?: CustomOptions | undefined
) => {
  const body = options?.body
    ? options.body instanceof FormData
      ? options.body
      : JSON.stringify(options.body)
    : undefined
  const baseHeaders =
    body instanceof FormData
      ? {
          Authorization: clientSessionUser.accessToken
            ? `Bearer ${clientSessionUser.accessToken}`
            : '',
        }
      : {
          'Content-Type': 'application/json',
          Authorization: clientSessionUser.accessToken
            ? `Bearer ${clientSessionUser.accessToken}`
            : '',
        }
  // Nếu không truyền baseUrl (hoặc baseUrl = undefined) thì lấy từ envConfig.NEXT_PUBLIC_API_ENDPOINT
  // Nếu truyền baseUrl thì lấy giá trị truyền vào, truyền vào '' thì đồng nghĩa với việc chúng ta gọi API đến Next.js Server

  const baseUrl =
    options?.baseUrl === undefined
      ? envConfig.NEXT_PUBLIC_BACKEND_URL
      : options.baseUrl

  const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`
  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    } as any,
    body,
    method,
  })
  const payload: Response = await res.json()
  const data = {
    status: res.status,
    payload,
  }
  // Interceptor là nời chúng ta xử lý request và response trước khi trả về cho phía component
  if (!res.ok) {
    if (res.status === REFRESH_TOKEN_ERROR_STATUS) {
      clientSessionUser.accessToken = ''
      clientSessionUser.refreshToken = ''
      location.href = '/login'
    } else if (res.status === TOKEN_EXPIRED_ERROR_STATUS) {
      if (typeof window !== 'undefined') {
        const newToken = await fetch('/auth/refresh-token', {
          method: 'POST',
          body: JSON.stringify({
            refreshToken: clientSessionUser.refreshToken,
          }),
          headers: {
            ...baseHeaders,
          } as any,
        })
        const payloadToken: Response = await newToken.json()
        const dataToken = {
          status: res.status,
          payload,
        }
        if (newToken.ok) {
          const response: any = payloadToken
          clientSessionUser.accessToken = response.tokens.accessToken
          clientSessionUser.refreshToken = response.tokens.refreshToken
        } else {
          if (newToken.status === REFRESH_TOKEN_ERROR_STATUS) {
            clientSessionUser.accessToken = ''
            clientSessionUser.refreshToken = ''
            location.href = '/login'
          }
          throw new HttpError(dataToken)
        }
      } else {
        throw new HttpError(data)
      }
    }
    throw new HttpError(data)
  }
  // Đảm bảo logic dưới đây chỉ chạy ở phía client (browser)
  if (typeof window !== 'undefined') {
    if (['/login', '/register'].some((item) => item === normalizePath(url))) {
      clientSessionUser.accessToken = (payload as LoginResType).accessToken
      clientSessionUser.refreshToken = (payload as LoginResType).refreshToken
    } else if ('/logout' === normalizePath(url)) {
      clientSessionUser.accessToken = ''
      clientSessionUser.refreshToken = ''
    }
  }
  return data
}

const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('GET', url, options)
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('POST', url, { ...options, body })
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('PUT', url, { ...options, body })
  },
  patch<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('PATCH', url, { ...options, body })
  },
  delete<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('DELETE', url, { ...options, body })
  },
}

export default http
