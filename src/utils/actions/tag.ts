"use server";

import { revalidateTag } from "next/cache";

export const reFetchTag = (tag: string) => {
  return revalidateTag(tag);
};
