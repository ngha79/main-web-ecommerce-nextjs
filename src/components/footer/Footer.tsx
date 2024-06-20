import { BrandProductType } from "@/lib/interface";
import { slugCategory } from "@/utils/function";
import { Facebook, Github } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full bg-background shadow-sm p-4 flex flex-col gap-4 py-12">
      <div className="container flex flex-col items-center md:grid grid-cols-4 gap-4">
        <div className="flex flex-col gap-2 max-md:items-center justify-start h-full">
          <h1 className="text-lg font-medium mb-2">Hỗ trợ khách hàng</h1>
          <span className="text-xs text-gray-700 hover:underline">
            Gửi yêu cầu hỗ trợ
          </span>
          <span className="text-xs text-gray-700 hover:underline">
            Gửi yêu cầu hỗ trợ
          </span>
        </div>
        <div className="flex flex-col gap-2 max-md:items-center justify-start h-full">
          <h1 className="text-lg font-medium mb-2">Về ShopDev</h1>
          <Link
            href={"/about"}
            className="text-xs text-gray-700 hover:underline"
          >
            Giới thiệu ShopDev
          </Link>
          <Link
            href={"/blog"}
            className="text-xs text-gray-700 hover:underline"
          >
            ShopDev Blog
          </Link>
        </div>
        <div className="flex flex-col gap-2 max-md:items-center justify-start h-full">
          <h1 className="text-lg font-medium mb-2">Về ShopDev</h1>
          <Link
            href={"/about"}
            className="text-xs text-gray-700 hover:underline"
          >
            Giới thiệu ShopDev
          </Link>
          <Link
            href={"/blog"}
            className="text-xs text-gray-700 hover:underline"
          >
            ShopDev Blog
          </Link>
        </div>
        <div className="flex flex-col gap-2 max-md:items-center justify-start h-full">
          <h1 className="text-lg font-medium mb-2">Kết nối với chúng tôi</h1>
          <div className="flex items-center justify-start gap-4">
            <Link
              href={"https://www.facebook.com/profile.php?id=100032924077866"}
              className="text-xs text-gray-700 hover:underline p-2 rounded-full bg-blue-500 border border-transparent w-max"
            >
              <Facebook className="w-4 h-4 fill-background text-background" />
            </Link>
            <Link
              href={"https://github.com/ngha79"}
              className="text-xs text-gray-700 hover:underline p-2 rounded-full bg-background border w-max"
            >
              <Github className="w-4 h-4 fill-foreground" />
            </Link>
          </div>
        </div>
      </div>
      <div className="container flex flex-col gap-4 border-y py-4">
        <h1 className="text-lg font-medium">
          ShopDev - Thật nhanh, thật chất lượng, thật rẻ
        </h1>
        <div className="flex flex-col gap-1 text-gray-600">
          <h3 className="text-sm">ShopDev có tất cả</h3>
          <span className="text-xs">
            Với hàng triệu sản phẩm từ các thương hiệu, cửa hàng uy tín, hàng
            nghìn loại mặt hàng từ Điện thoại smartphone tới Rau củ quả tươi,
            kèm theo dịch vụ giao hàng siêu tốc, ShopDev mang đến cho bạn một
            trải nghiệm mua sắm online bắt đầu bằng chữ tín. Thêm vào đó, ở
            ShopDev bạn có thể dễ dàng sử dụng vô vàn các tiện ích khác như mua
            thẻ cào, thanh toán hoá đơn điện nước, các dịch vụ bảo hiểm.
          </span>
        </div>
        <div className="flex flex-col gap-1 text-gray-600">
          <h3 className="text-sm">Khuyến mãi, ưu đãi tràn ngập</h3>
          <span className="text-xs">
            Bạn muốn săn giá sốc, ShopDev có giá sốc mỗi ngày cho bạn! Bạn là
            tín đồ của các thương hiệu, các cửa hàng Official chính hãng đang
            chờ đón bạn. Không cần săn mã freeship, vì ShopDev đã có hàng triệu
            sản phẩm trong chương trình Freeship+, không giới hạn lượt đặt, tiết
            kiệm thời gian vàng bạc của bạn. Mua thêm gói ShopDevNOW tiết kiệm
            để nhận 100% free ship 2h & trong ngày, hoặc mua gói ShopDevNOW cao
            cấp để nhận được 100% freeship, áp dụng cho 100% sản phẩm, 100% tỉnh
            thành Việt Nam. Bạn muốn tiết kiệm hơn nữa?
          </span>
        </div>
      </div>
      <div className="container flex flex-col gap-4">
        <h1 className="text-lg font-medium">Danh Mục Sản Phẩm</h1>
        <div className="flex flex-wrap gap-x-8 gap-y-6 text-xs text-gray-700">
          {BrandProductType.map((cate, i) => (
            <Link
              key={i}
              href={`/category/${slugCategory(cate)}`}
              className="hover:underline font-medium"
            >
              {cate}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
