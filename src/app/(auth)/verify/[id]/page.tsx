"use client";

import authApiRequest from "@/apiRequests/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  useEffect(() => {
    async function verifyUser() {
      try {
        await authApiRequest.verifyUserServer({
          id: params.id,
        });
        router.push("/");
      } catch (error) {
        router.push("/");
      }
    }
    if (params.id) {
      verifyUser();
    }
  }, [params.id, router]);
  return null;
};

export default Page;
