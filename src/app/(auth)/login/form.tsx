"use client";

import Link from "next/link";
import { Github, Loader2 } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AuthLoginCredentialsValidator,
  IAuthLoginCredentialsValidator,
} from "@/lib/validators/account-credentials-validator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import authApiRequest from "@/apiRequests/auth";

const LoginForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthLoginCredentialsValidator>({
    resolver: zodResolver(AuthLoginCredentialsValidator),
  });

  const onSubmit = async ({
    email,
    password,
  }: IAuthLoginCredentialsValidator) => {
    startTransition(async () => {
      try {
        await authApiRequest.loginServer({
          email,
          password,
        });
        router.replace("/");
        router.refresh();
      } catch (error: any) {
        toast.error(error?.payload?.message ?? "Lỗi không xác định");
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-[480px] w-full mx-auto gap-5 p-8 flex flex-col rounded-lg bg-white shadow-login"
    >
      <div className="flex flex-col gap-2.5">
        <h1 className="leading-tight text-2xl font-bold">Chào mừng trở lại</h1>
        <span className="text-sm font-medium text-gray-500 space-x-2">
          <span>Bạn chưa có tài khoản?</span>
          <Link href={"/register"} className="text-blue-600">
            Đăng ký
          </Link>
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          {...register("email")}
          className={cn({
            "focus-visible:ring-red-500": errors.email,
          })}
          placeholder="you@example.com"
        />
        {errors?.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          {...register("password")}
          type="password"
          className={cn({
            "focus-visible:ring-red-500": errors.password,
          })}
          placeholder="Password"
        />
        {errors?.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>
      <Button disabled={isPending} variant={"primary"}>
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Đăng nhập
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

export default LoginForm;
