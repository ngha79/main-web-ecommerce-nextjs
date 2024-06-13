"use client";

import authApiRequest from "@/apiRequests/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const ForgotPasswordValidator = z.object({
  email: z.string().email({
    message: "Email không đúng định dạng.",
  }),
});

type TForgotPasswordValidator = z.infer<typeof ForgotPasswordValidator>;
const Page = () => {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForgotPasswordValidator>({
    resolver: zodResolver(ForgotPasswordValidator),
  });

  const onSubmit = async ({ email }: TForgotPasswordValidator) => {
    startTransition(async () => {
      try {
        await authApiRequest.forgotPassword({
          email,
        });
        toast.success("Truy cập email của bạn để nhận thông tin mới.");
      } catch (error: any) {
        toast.error(error?.payload?.message ?? "Lỗi không xác định");
      }
    });
  };
  return (
    <div className="container h-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-background border relative max-w-md flex content-center flex-col w-full px-8 py-4 rounded-md shadow-md gap-8"
      >
        <h1 className="text-center text-2xl font-semibold">Quên mật khẩu</h1>
        <div className="flex flex-col gap-2">
          <Label>Email của bạn</Label>
          <Input
            type="email"
            placeholder="name@example.com"
            {...register("email")}
            className={cn({
              "focus-visible:ring-red-500": errors.email,
            })}
          />
          {errors?.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <Button variant={"primary"} disabled={isPending}>
          Xác nhận
        </Button>
        <Link href={"/login"} className="text-sm font-medium text-blue-600">
          Bạn đã có tài khoản?
        </Link>
      </form>
    </div>
  );
};

export default Page;
