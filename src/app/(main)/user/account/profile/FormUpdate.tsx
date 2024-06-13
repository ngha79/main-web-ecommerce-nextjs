"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn, ResponseExceptions } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { format, setDate } from "date-fns";
import React, {
  HtmlHTMLAttributes,
  useContext,
  useRef,
  useState,
  useTransition,
} from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { vi } from "date-fns/locale";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";
import Image from "next/image";
import { IUpdateProfile } from "@/lib/interface";
import { toast } from "sonner";
import accountApiRequest from "@/apiRequests/account";
import { SocketContext } from "@/components/contexts/SocketContext";
import { HttpError } from "@/lib/http";

interface InfoUser {
  userName: string;
  email: string;
  phoneNumber: string;
  avatar: string;
  background: string;
  gender: "male" | "female" | "other";
  dateOfBirdth: Date;
}

export const FormUpdate = () => {
  const { user, setUser } = useContext(SocketContext);

  const [isPending, startTransition] = useTransition();

  const [isUpdate, setUpdate] = useState<boolean>(false);
  const [info, setInfo] = useState<IUpdateProfile>({
    userName: user?.userName,
    phoneNumber: user?.phoneNumber,
    avatar: user?.avatar,
    background: user?.background,
  });
  const [date, setDate] = React.useState<Date>(new Date());
  const [gender, setGender] = React.useState<string>("male");
  const [avatar, setAvatar] = React.useState<string>("");
  const [file, setFile] = React.useState<File | null>(null);
  const image = useRef<HTMLInputElement>(null);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const clickBtn = () => {
    image.current?.click();
  };

  const handleSetUpdate = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: boolean | ((prevState: boolean) => boolean)
  ) => {
    e.preventDefault();
    setUpdate(value);
  };

  const handleUpdateProfile = async (e: React.ChangeEvent<EventTarget>) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        await accountApiRequest.updateProfile(info);
        toast.success("Cập nhật thông tin thành công.");
        setUpdate(false);
      } catch (error) {
        if (error instanceof HttpError) {
          toast.error(error.payload.message);
        } else {
          toast.error(ResponseExceptions.DEFAULT_ERROR);
        }
      }
    });
  };

  const handleSetAvatarUSer = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
      const avatar = URL.createObjectURL(e.target.files[0]);
      e.target.files = null;
      setAvatar(avatar);
    }
  };

  const handleCancelUpdateAvatar = () => {
    URL.revokeObjectURL(avatar);
    setAvatar("");
    setFile(null);
  };

  const handleUpdateAvatar = () => {
    if (avatar && file) {
      startTransition(async () => {
        try {
          const form = new FormData();
          form.append("fileAvatar", file);
          const response = await accountApiRequest.updateProfile(form);
          setUser({
            ...user,
            avatar: response.payload.avatar,
          });
          setUpdate(false);
          setAvatar("");
          setFile(null);
          toast.success("Cập nhật thông tin thành công.");
        } catch (error) {
          if (error instanceof HttpError) {
            toast.error(error.payload.message);
          } else {
            toast.error(ResponseExceptions.DEFAULT_ERROR);
          }
        }
      });
    }
  };

  return (
    <form
      className="flex flex-col gap-4 py-4 px-6"
      onSubmit={handleUpdateProfile}
    >
      <div className="flex flex-col gap-4 items-center justify-center">
        <Image
          alt="avatar user"
          src={avatar || user?.avatar || "/login.png"}
          width={128}
          height={128}
          className="border w-32 h-32 rounded-full cursor-pointer"
          onClick={clickBtn}
        />
        <Input
          type="file"
          id="image"
          className="hidden"
          ref={image}
          onChange={handleSetAvatarUSer}
        />
        <div className="flex items-center">
          {!avatar ? (
            <Button variant={"outline"} type="button" onClick={clickBtn}>
              Chọn ảnh
            </Button>
          ) : (
            <div className="flex items-center gap-4">
              <Button
                variant={"primary"}
                type="button"
                disabled={isPending}
                onClick={handleUpdateAvatar}
              >
                Cập nhật
              </Button>
              <Button
                variant={"destructive"}
                disabled={isPending}
                type="button"
                onClick={handleCancelUpdateAvatar}
              >
                Hủy
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="userName" className="w-32">
          Tên người dùng
        </Label>
        <Input
          type="text"
          placeholder="Nguyễn Văn A"
          defaultValue={user?.userName}
          disabled={!isUpdate}
          name="userName"
          onChange={handleOnChange}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="email" className="w-32">
          Email
        </Label>
        <Input
          type="email"
          placeholder="123@gmail.com"
          defaultValue={user?.email}
          className="bg-background border rounded-md px-4 py-2"
          name="email"
          disabled
          onChange={handleOnChange}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="phoneNumber" className="w-32">
          Số điện thoại
        </Label>
        <Input
          type="text"
          placeholder="0123456789"
          defaultValue={user?.phoneNumber}
          className="bg-background border rounded-md px-4 py-2"
          disabled={!isUpdate}
          name="phoneNumber"
          onChange={handleOnChange}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="gender" className="w-32">
          Giới tính
        </Label>
        <Select
          defaultValue={gender}
          disabled={!isUpdate}
          onValueChange={(value) => setGender(value)}
        >
          <SelectTrigger id="gender">
            <SelectValue placeholder="Chọn" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectGroup>
              <SelectItem value="male">Nam</SelectItem>
              <SelectItem value="female">Nữ</SelectItem>
              <SelectItem value="other">Khác</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="dateOfBirdth" className="w-32">
          Ngày sinh
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? (
                format(date, "dd/MM/yyyy", { locale: vi })
              ) : (
                <span>Chọn ngày</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-background shadow-login">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => setDate(date ? date : new Date())}
              disabled={!isUpdate || isPending}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex justify-end w-full">
        {isUpdate ? (
          <div className="flex items-center gap-2">
            <Button
              type="submit"
              variant={"primary"}
              className="w-24"
              disabled={isPending}
            >
              {!isPending ? (
                "Xác nhận"
              ) : (
                <div
                  className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              )}
            </Button>
            <Button
              type="reset"
              variant={"destructive"}
              onClick={(e) => handleSetUpdate(e, false)}
              disabled={isPending}
            >
              Hủy
            </Button>
          </div>
        ) : (
          <Button
            type="reset"
            className="w-max"
            variant={"primary"}
            onClick={(e) => handleSetUpdate(e, true)}
          >
            Chỉnh sửa
          </Button>
        )}
      </div>
    </form>
  );
};
