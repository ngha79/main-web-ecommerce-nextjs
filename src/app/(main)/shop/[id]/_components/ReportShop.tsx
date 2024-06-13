import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import http from "@/lib/http";
import { ResponseExceptions } from "@/lib/utils";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export function ReportShop({ shopId }: { shopId: string }) {
  const [content, setContent] = useState<string>("");
  const [isLoading, startTransition] = useTransition();

  const handleCreateReport = () => {
    if (!content.length) return null;
    startTransition(async () => {
      try {
        await http.post(
          `/report`,
          { content, shopId },
          { token: true, cache: "no-store" }
        );
        setContent("");
        toast.success("Báo cáo Shop thành công.");
      } catch (error) {
        toast.error(ResponseExceptions.DEFAULT_ERROR);
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Báo cáo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Báo cáo Shop</DialogTitle>
          <DialogDescription>
            Nếu bạn cảm thấy Shop có cách hoạt động không phù hợp vui lòng báo
            cáo với chúng tôi.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nội dung
            </Label>
            <Input
              id="name"
              value={content}
              className="col-span-3"
              maxLength={255}
              onChange={(e) => setContent(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button
              type="submit"
              onClick={handleCreateReport}
              variant={"primary"}
              disabled={!content.length || isLoading}
            >
              Báo cáo
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
