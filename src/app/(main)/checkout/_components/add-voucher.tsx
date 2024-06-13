import React, { useEffect, useState, useTransition } from "react";

import discountApiRequest from "@/apiRequests/discount";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Voucher from "@/components/coupon/Voucher";

const AddVoucher = ({ shopId }: { shopId: string }) => {
  const [vouchers, setVouchers] = useState<any[]>([]);
  const [isLoading, startTransition] = useTransition();

  useEffect(() => {
    async function getVoucherShop() {
      startTransition(async () => {
        try {
          const response = await discountApiRequest.getVoucherShop(shopId);
          setVouchers(response.payload.data);
        } catch (error) {
          console.log("getvoucher shop Error", error);
        }
      });
    }
    getVoucherShop();
  }, [shopId]);

  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "text-xs text-blue-500 hover:text-blue-600"
        )}
      >
        Thêm voucher
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Kho Voucher</DialogHeader>
        {!isLoading ? (
          !vouchers.length ? (
            <DialogDescription className="h-64 flex items-center justify-center">
              Shop không có mã giảm giá nào
            </DialogDescription>
          ) : null
        ) : null}
        <div className="flex flex-col max-h-96 overflow-auto gap-2">
          {vouchers.map((voucher) => (
            <Voucher voucher={voucher} key={voucher.id} shopId={shopId} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddVoucher;
