import envConfig from "@/config";
import { getSession } from "@/utils/actions/account";
import { ResponseExceptions } from "./utils";

type CustomOptions = Omit<RequestInit, "method"> & {
  baseUrl?: string | undefined;
  token?: boolean;
};

export const TOKEN_EXPIRED_ERROR_STATUS = 419;
export const REFRESH_TOKEN_ERROR_STATUS = 403;

export class HttpError extends Error {
  status: number;
  payload: {
    message: string;
    [key: string]: any;
  };
  constructor({ status, payload }: { status: number; payload: any }) {
    super("Http Error");
    this.status = status;
    this.payload = payload;
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  url: string,
  options?: CustomOptions | undefined
) => {
  const requestBody = options?.body
    ? options.body instanceof FormData
      ? options.body
      : JSON.stringify(options.body)
    : undefined;

  const headers =
    requestBody instanceof FormData
      ? { Authorization: "" }
      : { Authorization: "", "Content-Type": "application/json" };

  if (options?.token) {
    const accessToken = await getSession();
    headers.Authorization = accessToken ? `Bearer ${accessToken}` : "";
  }

  const baseUrl = options?.baseUrl ?? envConfig.NEXT_PUBLIC_BACKEND_URL;
  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  const response = await fetch(fullUrl, {
    ...options,
    headers: {
      ...headers,
      ...options?.headers,
    } as any,
    body: requestBody,
    method,
  });

  const payload: Response = await response.json();
  const data = {
    status: response.status,
    payload,
  };

  if (!response.ok) {
    if (
      response.status === TOKEN_EXPIRED_ERROR_STATUS &&
      typeof window !== "undefined"
    ) {
      try {
        const newTokens = await fetch("/api/token", { method: "POST" }).then(
          (res) => res.json()
        );
        if (!newTokens.tokens.accessToken) {
          throw new HttpError(data);
        }
        headers.Authorization = `Bearer ${newTokens.tokens.accessToken}`;
        const newResponse = await fetch(fullUrl, {
          ...options,
          headers: {
            ...headers,
            ...options?.headers,
          } as any,
          body: requestBody,
          method,
        });
        const newPayload: Response = await newResponse.json();
        const newData = {
          status: newResponse.status,
          payload: newPayload,
        };
        if (!newResponse.ok) {
          throw new HttpError(newData);
        }
        return newData;
      } catch {
        throw new HttpError({
          status: 400,
          payload: { message: ResponseExceptions.DEFAULT_ERROR },
        });
      }
    }
    throw new HttpError(data);
  }

  return data;
};

const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("GET", url, options);
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("POST", url, { ...options, body });
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PUT", url, { ...options, body });
  },
  patch<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PATCH", url, { ...options, body });
  },
  delete<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("DELETE", url, { ...options, body });
  },
};

export default http;
