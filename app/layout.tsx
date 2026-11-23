import type { Metadata } from "next";
import "./globals.css";
import "./hallmark.css";

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Geist:wght@300..700&family=Geist+Mono:wght@400;500&family=Noto+Serif+SC:wght@400;500;600&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
