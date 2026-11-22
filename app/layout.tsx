import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wenjun You | AI 应用交付工程师（FDE）",
  description: "游文君，AI 应用交付工程师（FDE）。在业务现场把模糊需求落成可运行、可评测、可交接的 AI 应用。"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
