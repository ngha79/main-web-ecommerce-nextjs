import http from "@/lib/http";
import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
} from "@/schemaValidations/auth.schema";

const authApiRequest = {
  loginServer: (body: LoginBodyType) =>
    http.post<LoginResType>("/api/auth/login", body, {
      baseUrl: "",
    }),
  login: (body: LoginBodyType) => http.post<LoginResType>("/auth/login", body),
  registerUser: (body: RegisterBodyType) =>
    http.post<any>("/auth/register", body),
  auth: (body: { accessToken: string; refreshToken: string }) =>
    http.post("/api/auth", body, {
      baseUrl: "",
    }),
  refreshToken: (body: { refreshToken: string }) =>
    http.post("/auth/refresh-token", body),
  verifyUser: (id: string) => http.get(`/auth/verify/${id}`),
  verifyUserServer: (body: any) =>
    http.post("/api/auth", body, {
      baseUrl: "",
    }),
  forgotPassword: (body: any) => http.post("/auth/forgot-password", body),
};

export default authApiRequest;
