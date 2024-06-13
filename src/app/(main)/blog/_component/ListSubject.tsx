import React from "react";
import Topic from "./Topic";
import { getListTopicBlog } from "@/utils/actions/blog";

const ListSubject = async () => {
  let topicBlog = null;
  try {
    const response = await getListTopicBlog();
    topicBlog = response.payload;
  } catch (error) {
    throw new Error();
  }
  return (
    <div className="space-y-4">
      <h1 className="font-medium text-lg">Danh sách chủ đề</h1>
      <div className="flex items-center justify-start gap-4">
        {topicBlog?.map((topic: any) => (
          <Topic topic={topic} key={topic.id} />
        ))}
      </div>
    </div>
  );
};

export default ListSubject;
