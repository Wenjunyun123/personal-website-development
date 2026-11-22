import Link from "next/link";
import styles from "../components/portfolio/portfolio.module.css";

export default function NotFound() {
  return <main className={styles.surface}><div className={styles.page}><p className={styles.muted}>404</p><h1 className={styles.pageTitle}>这个页面还没到这里。</h1><p className={styles.pageIntro}>你可以回到首页，看看我最近做的项目。</p><Link href="/">返回首页 / Back home</Link></div></main>;
}
