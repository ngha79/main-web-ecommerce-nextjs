import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import { SocketProvider } from "@/components/contexts/SocketContext";
import LayoutSocket from "@/components/contexts/LayoutSocket";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShopDev | Mua ngay | ShopDev",
  description: "Trang mua bán mà bạn cần | Mua ngay | ShopDev",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-slate-100")}>
        <SocketProvider>
          <LayoutSocket>{children}</LayoutSocket>
        </SocketProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
