import accountApiRequest from "@/apiRequests/account";
import { HttpError } from "@/lib/http";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  try {
    if (!accessToken)
      return Response.json(
        {
          message: "Missing Token",
        },
        {
          status: 401,
        }
      );
    const response: any = await accountApiRequest.me();
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
