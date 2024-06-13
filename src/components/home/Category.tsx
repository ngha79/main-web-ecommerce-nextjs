import { BrandProductType } from "@/lib/interface";
import { slugCategory } from "@/utils/function";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Category = () => {
  const categoryList = BrandProductType;

  return (
    <div className="md:sticky max-h-[calc(100vh-144px)] top-28 lg:top-36 md:max-w-64">
      <div className="overflow-y-scroll scrollbar-hide bg-background p-2 rounded-md shadow-md">
        <h1 className="font-medium p-2">Danh mục</h1>
        <div className="md:flex md:flex-col gap-2 h-max grid grid-cols-2 sm:grid-cols-3">
          {categoryList.map((category, index) => (
            <Link
              key={index}
              href={`/category/${slugCategory(category)}`}
              className="p-2 hover:bg-gray-200 rounded-md text-[15px] flex items-center gap-2"
            >
              <Image alt="logo" src={"/login.png"} width={32} height={32} />
              {category}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
