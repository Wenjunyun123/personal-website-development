import type { Metadata } from "next";
import "./globals.css";

/* eslint-disable @next/next/no-page-custom-font */

export const metadata: Metadata = {
  title: "游文君 Wenjun You | AI 交付工程师（FDE）",
  description: "游文君的个人操作系统：AI 应用、Agent 工作流、插件发布治理与带证据的交付闭环。"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Fira+Code:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;600;700;900&family=Noto+Serif+SC:wght@700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
