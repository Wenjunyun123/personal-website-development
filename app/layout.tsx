import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wenjun You | AI Frontend Engineer",
  description: "Personal website for Wenjun You, AI Frontend Engineer for productized AI workflows."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
