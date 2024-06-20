import React from "react";
import Topic from "./Topic";
import { getListTopicBlog } from "@/utils/actions/blog";

const ListSubject = async () => {
  let topicBlog = null;
  try {
    const response = await getListTopicBlog();
    topicBlog = response.payload;
  } catch (error) {
    return null;
  }
  return (
    <div className="space-y-4">
      <h1 className="font-medium text-lg">Danh sách chủ đề</h1>
      <div className="flex items-center justify-start gap-4">
        {topicBlog?.length ? (
          topicBlog.map((topic: any) => <Topic topic={topic} key={topic.id} />)
        ) : (
          <div className="flex items-center justify-center flex-1 text-gray-700">
            <span>Không tìm thấy chủ đề nào</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListSubject;
