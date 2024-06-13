import { Star, ThumbsUp } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import ShopFeedback from "../ShopFeedback";
import { Button } from "@/components/ui/button";
import { vi } from "date-fns/locale";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { ReportDialog } from "./ReportDialog";
import Link from "next/link";
import productApiRequest from "@/apiRequests/product";

const UserRating = ({ review }: { review: any }) => {
  const {
    user,
    shopComment,
    rating,
    createdAt,
    id,
    totalLike,
    content,
    commentImage,
  } = review;
  const [likes, setLikes] = useState<number>(totalLike || 0);

  const handleLikeComment = async () => {
    try {
      const { payload } = await productApiRequest.likeComment(id);
      if (payload) {
        setLikes((likes) => likes + 1);
        toast.success("Bạn đã thích bình luận.");
      } else {
        setLikes((likes) => likes - 1);
        toast.error("Bạn đã bỏ thích bình luận.");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra.");
    }
  };
  return (
    <div className="flex flex-1 gap-2 p-4 last:border-b-0 border-b border-b-gray-300 items-start">
      <Link href={`/profile/${user.id}`}>
        <Image
          alt="avatar-user"
          src={user.avatar || "/login.png"}
          width={40}
          height={40}
          className="rounded-full border w-12 h-12"
        />
      </Link>
      <div className="flex flex-col text-sm gap-4 flex-1">
        <div className="flex flex-col gap-y-1">
          <Link href={`/profile/${user.id}`}>{user.userName}</Link>
          <div className="flex items-center">
            {Array.from({ length: rating }).map((item, index) => (
              <Star
                key={index}
                size={18}
                className="text-amber-300"
                fill="#fcd34d"
              />
            ))}
            {Array.from({ length: 5 - rating }).map((item, index) => (
              <Star key={index} size={18} className="text-amber-300" />
            ))}
          </div>
          <span className="text-gray-500 text-sm">
            {formatDistanceToNow(new Date(createdAt), {
              addSuffix: true,
              locale: vi,
            })}
          </span>
        </div>
        <span>{content}</span>
        {commentImage?.length ? (
          <div className="flex items-center h-20 gap-2 flex-wrap">
            {commentImage.map((item: any) => (
              <Image
                alt="avatar-user"
                src={item.image_url}
                width={80}
                height={80}
                className="border"
                key={item.id}
              />
            ))}
          </div>
        ) : null}
        {shopComment?.length
          ? shopComment.map((item: any) => (
              <ShopFeedback key={item.id} feedback={review} />
            ))
          : null}
        <div className="flex justify-between w-full">
          <div className="flex gap-1 items-center">
            <Button
              onClick={handleLikeComment}
              variant={"ghost"}
              className="gap-1"
            >
              <ThumbsUp size={16} color="#cbd5e1" fill="#cbd5e1" />
              <span className="text-gray-500">{likes}</span>
            </Button>
          </div>
          <ReportDialog commentId={id} />
        </div>
      </div>
    </div>
  );
};

export default UserRating;
