import React, { useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DeleteCartItem = ({ handleDeleteProductCart }: any) => {
  const [isOpen, setOpen] = useState(false);

  const handleOpen = (open: boolean) => {
    setOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen} defaultOpen={false}>
      <DialogTrigger
        className={cn(
          buttonVariants({ variant: "link" }),
          "hover:text-red-500 w-1/4 text-center"
        )}
      >
        Xóa
      </DialogTrigger>
      <DialogContent className="w-max">
        <DialogHeader className="gap-4">
          <DialogTitle className="p-4">
            Bạn có muốn xóa sản phẩm này khỏi giỏ hàng
          </DialogTitle>
          <DialogDescription className="flex items-center justify-end w-full gap-8">
            <DialogClose>
              <Button variant={"destructive"} onClick={handleDeleteProductCart}>
                Xóa
              </Button>
            </DialogClose>
            <DialogClose>
              <Button variant={"outline"}>Hủy</Button>
            </DialogClose>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCartItem;
