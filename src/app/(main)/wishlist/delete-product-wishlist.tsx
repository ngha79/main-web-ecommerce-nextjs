"use client";

import wishlistApiRequest from "@/apiRequests/wishlist";
import { Button } from "@/components/ui/button";
import { reFetchTag } from "@/utils/actions/tag";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const DeleteProductWishlist = ({ id }: any) => {
  const router = useRouter();

  const handleDeleteProductWishlist = async () => {
    try {
      await wishlistApiRequest.removeProductWishList({ ids: [id] });
      await reFetchTag("wishlist");
      router.refresh();
    } catch (error) {
      toast.error("Có lỗi xảy ra vui lòng thử lại sau.");
    }
  };
  return (
    <Button
      variant={"destructive"}
      className="flex items-center gap-1"
      onClick={handleDeleteProductWishlist}
    >
      <Trash size={16} />
      Xóa
    </Button>
  );
};

export default DeleteProductWishlist;
