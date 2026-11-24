import type { Metadata } from "next";
import Link from "next/link";
import { WenjunSite } from "../../components/wenjun-os/site-shell";
import styles from "./os.module.css";

export const metadata: Metadata = {
  title: "Wenjun OS | 游文君 Wenjun You",
  description: "游文君的个人桌面彩蛋：终端启动、项目窗口与 FDE 交付记录。",
  robots: { index: false, follow: false }
};

export default function OsPage() {
  return (
    <div className={styles.page}>
      <WenjunSite />
      <Link prefetch={false} className={styles.back} href="/">
        <span aria-hidden="true">←</span> 返回交付记录
      </Link>
    </div>
  );
}
