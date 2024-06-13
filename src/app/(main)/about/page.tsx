import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="h-full flex flex-col">
      <Image
        alt="thumb nail page about"
        src={"/about/thumb-1.webp"}
        className="object-cover bg-no-repeat bg-center w-full max-md:h-64 h-96"
        width={3000}
        height={600}
      />
      <div className="cotainer flex flex-col gap-8 items-center p-12 md:p-16">
        <h1 className="font-semibold text-3xl text-center">
          ShopDev là nền tảng Thương mại Điện tử mới nhanh chóng và tiện lợi
        </h1>
        <span className="text-center break-words text-gray-600">
          ShopDev mang đến cho người dùng trong khu vực trải nghiệm mua sắm trực
          tuyến đơn giản, an toàn và nhanh chóng thông qua hệ thống hỗ trợ thanh
          toán và vận hành vững mạnh. Chúng tôi tin rằng trải nghiệm mua sắm
          trực tuyến cần đơn giản, dễ dàng và mang lại niềm vui cho người dùng.
          Sứ mệnh này cũng là nguồn cảm hứng thúc đẩy chúng tôi phát triển từng
          ngày.
        </span>
        <Link
          href={"/"}
          className={cn(
            buttonVariants({ variant: "primary", size: "lg" }),
            "capitalize rounded-lg"
          )}
        >
          Tìm hiểu thêm
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col p-8 gap-2 border shadow-lg rounded-md h-full">
            <h1 className="text-2xl font-medium text-center">
              Mục tiêu của chúng tôi
            </h1>
            <span className="text-center break-words text-gray-600">
              ShopDev mong muốn góp phần làm cho thế giới trở nên tốt đẹp hơn
              bằng sức mạnh công nghệ thông qua việc kết nối cộng đồng người mua
              và người bán.
            </span>
          </div>
          <div className="flex flex-col p-8 gap-2 border shadow-lg rounded-md">
            <h1 className="text-2xl font-medium text-center">
              Định vị của chúng tôi
            </h1>
            <span className="text-center break-words text-gray-600">
              Thông qua ShopDev, người dùng Internet trên toàn khu vực có thể
              trải nghiệm mua sắm trực tuyến với các sản phẩm đa dạng, kết nối
              với cộng đồng người bán, và tận hưởng quá trình nhận hàng liền
              mạch.
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-8 border rouned-md shadow-lg text-center">
          <div className="space-y-4">
            <h1 className="text-2xl font-medium">Phương châm của chúng tôi</h1>
            <span className="break-words text-gray-600">
              Phương châm Simple, Happy and Together xác định tính cách thương
              hiệu ShopDev thông qua lời nói và hành động. Phương châm này hiện
              hữu ở bất cứ đâu trong hành trình phát triển của chúng tôi.
            </span>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-4 ">
              <Image
                alt="simple"
                src={"/about/simple.png"}
                width={500}
                height={500}
                className="w-full"
              />
              <h1 className="text-2xl">Simple</h1>
              <span className="break-words text-gray-600">
                Chúng tôi tin vào sự đơn giản và toàn vẹn, đảm bảo một cuộc sống
                chân thật và đúng với bản thân mình.
              </span>
            </div>
            <div className="flex flex-col gap-4 ">
              <Image
                alt="simple"
                src={"/about/happy.png"}
                width={500}
                height={500}
                className="w-full"
              />
              <h1 className="text-2xl">Happy</h1>
              <span className="break-words text-gray-600">
                Chúng tôi thân thiện, vui vẻ, và tràn đầy năng lượng, lan tỏa
                niềm vui với mọi người.
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <Image
                alt="simple"
                src={"/about/together.png"}
                width={500}
                height={500}
                className="w-full"
              />
              <h1 className="text-2xl">Together</h1>
              <span className="break-words text-gray-600">
                Chúng tôi thích dành thời gian cùng nhau, khi mua sắm trực tuyến
                với bạn bè và gia đình - cùng nhau làm những việc chúng tôi yêu
                thích
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-12 flex items-center justify-center flex-col">
        <h1 className="text-center text-2xl font-semibold">Giá trị Cốt lõi</h1>
        <div className="w-full flex items-center justify-center">
          <Image
            alt="thumb nail page about"
            src={"/about/about_values.png"}
            className="object-cover bg-no-repeat bg-center h-96 md:h-[450px]"
            width={3000}
            height={700}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
