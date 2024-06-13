import authApiRequest from "@/apiRequests/auth";
import { HttpError } from "@/lib/http";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();
  const id = body.id as string;
  const cookieStore = cookies();
  try {
    const response: any = await authApiRequest.verifyUser(id);
    const timeExpiredAccessToken = 24 * 60 * 60;
    const timeExpiredRefreshToken = 30 * 24 * 60 * 60;
    cookieStore.set("accessToken", response.payload.accessToken, {
      path: "/",
      httpOnly: true,
      maxAge: timeExpiredAccessToken,
    });
    cookieStore.set("refreshToken", response.payload.refreshToken, {
      path: "/",
      httpOnly: true,
      maxAge: timeExpiredRefreshToken,
    });
    cookieStore.set("userId", response.payload.userId, {
      path: "/",
      httpOnly: true,
      maxAge: timeExpiredRefreshToken,
    });
    return Response.json(response.payload, {
      status: 200,
    });
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status,
      });
    } else {
      return Response.json(
        {
          message: "Lỗi không xác định",
        },
        {
          status: 500,
        }
      );
    }
  }
}
