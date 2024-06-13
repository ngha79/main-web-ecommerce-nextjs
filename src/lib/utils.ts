import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const urlAxios = (endpoint: string) => {
  return `${BACKEND_URL}${endpoint}`;
};

/**
 * Xóa đi ký tự `/` đầu tiên của path
 */
export const normalizePath = (path: string) => {
  return path.startsWith("/") ? path.slice(1) : path;
};

export const ResponseExceptions = {
  DEFAULT_ERROR: "Có lỗi xảy ra, vui lòng thử lại sau.",
};
