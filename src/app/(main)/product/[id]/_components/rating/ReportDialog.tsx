import { SetStateAction, useState } from "react";
import { toast } from "sonner";

import productApiRequest from "@/apiRequests/product";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export function ReportDialog({ commentId }: { commentId: string }) {
  const [content, setContent] = useState<string>("");

  const handleOnChange = (e: { target: { value: SetStateAction<string> } }) => {
    setContent(e.target.value);
  };
  const handleReportReview = async () => {
    if (!content) return toast.error("Bạn chưa thêm nội dung.");
    try {
      await productApiRequest.createReport({ content, commentId });
      toast.success("Báo cáo thành công.");
    } catch (error: any) {
      toast.error(
        error.payload.message || "Có lỗi xảy ra, vui lòng thử lại sau ít phút."
      );
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"destructive"} className="w-max">
          Báo cáo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            Báo cáo đánh giá sản phẩm
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Label htmlFor="content">Nội dung</Label>
            <textarea
              id="content"
              rows={4}
              className="p-2 border border-gray-500 rounded-md"
              onChange={handleOnChange}
              value={content}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button
              type="submit"
              variant={"destructive"}
              onClick={handleReportReview}
              disabled={!content}
            >
              Báo cáo
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
