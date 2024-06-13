"use client";

import Link from "next/link";
import { toast } from "sonner";
import React, { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Github } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from "@/lib/validators/account-credentials-validator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import authApiRequest from "@/apiRequests/auth";
import { HttpError } from "@/lib/http";

const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });
  const router = useRouter();

  const onSubmit = async ({
    email,
    password,
    phoneNumber,
    userName,
  }: TAuthCredentialsValidator) => {
    startTransition(async () => {
      try {
        await authApiRequest.registerUser({
          email,
          password,
          phoneNumber,
          userName,
        });
        toast.success("Vui lòng truy cập email của bạn để xác nhận tài khoản.");
      } catch (error) {
        if (error instanceof HttpError) {
          toast.error(error.payload.message);
        } else {
          toast.error("Không thể đăng ký, vui lòng thử lại sau.");
        }
      }
    });
  };

  return (
    <form
      className="w-[480px] mx-auto gap-5 p-8 flex flex-col rounded-lg bg-white shadow-login"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2.5">
        <h1 className="leading-tight text-2xl font-bold">Tạo tài khoản</h1>
        <span className="text-sm font-medium text-gray-500 space-x-2">
          <span>Bạn đã có tài khoản?</span>
          <Link href={"/login"} className="text-blue-600">
            Đăng nhập
          </Link>
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email
        </Label>
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

      <div className="flex flex-col gap-2">
        <Label htmlFor="password" className="text-sm font-medium">
          Mật khẩu
        </Label>
        <Input
          type="password"
          placeholder="............"
          {...register("password")}
          className={cn({
            "focus-visible:ring-red-500": errors.password,
          })}
        />
        {errors?.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="userName" className="text-sm font-medium">
          Tên người dùng
        </Label>
        <Input
          type="text"
          {...register("userName")}
          className={cn({
            "focus-visible:ring-red-500": errors.userName,
          })}
          name="userName"
        />
        {errors?.userName && (
          <p className="text-sm text-red-500">{errors.userName.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="phoneNumber" className="text-sm font-medium">
          Số điện thoại
        </Label>
        <Input
          type="text"
          placeholder="0129312842"
          {...register("phoneNumber")}
          className={cn({
            "focus-visible:ring-red-500": errors.phoneNumber,
          })}
        />
        {errors?.phoneNumber && (
          <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
        )}
      </div>
      <Button disabled={isPending} type="submit" variant={"primary"}>
        {isPending ? (
          <div
            className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        ) : (
          <span>Đăng ký</span>
        )}
      </Button>
      <div className="flex items-center gap-6">
        <div className="w-full border border-gray-200"></div>
        <span className="text-base font-medium text-gray-500 text-center">
          Hoặc
        </span>
        <div className="w-full border border-gray-200"></div>
      </div>
      <div className="flex flex-col gap-4">
        <Button
          variant={"outline"}
          className="rounded-lg gap-2 flex items-center justify-center"
        >
          <span className="text-sm font-medium text-gray-900">
            Sign up with Google
          </span>
        </Button>
        <Button
          variant={"outline"}
          className="rounded-lg gap-2 flex items-center justify-center"
        >
          <Github />
          <span className="text-sm font-medium text-gray-900">
            Sign up with Github
          </span>
        </Button>
      </div>
      <Link
        href={"/forgot-password"}
        className="text-sm font-medium text-blue-600"
      >
        Quên mật khẩu?
      </Link>
    </form>
  );
};
export default RegisterForm;
