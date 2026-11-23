"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { HomeOS } from "./home-os";
import { SystemCanvas } from "./system-canvas";
import { WorkReport } from "./work-report";
import styles from "./site-shell.module.css";

type SiteTab = "home" | "works" | "system";
const tabs: SiteTab[] = ["home", "works", "system"];

function tabFromHash(): SiteTab {
  if (typeof window === "undefined") return "home";
  const value = window.location.hash.slice(1) as SiteTab;
  return tabs.includes(value) ? value : "home";
}

function subscribeToHash(onStoreChange: () => void) {
  window.addEventListener("hashchange", onStoreChange);
  return () => window.removeEventListener("hashchange", onStoreChange);
}

export function WenjunSite() {
  const activeTab = useSyncExternalStore(subscribeToHash, tabFromHash, () => "home");
  const [introReady, setIntroReady] = useState(false);
  const [launched, setLaunched] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.style.scrollBehavior = "auto";
    root.style.overflow = activeTab === "home" && !launched ? "hidden" : "auto";
    window.scrollTo(0, 0);
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      requestAnimationFrame(() => window.scrollTo(0, 0));
    });
    return () => {
      root.style.scrollBehavior = "";
      root.style.overflow = "";
    };
  }, [activeTab, launched]);

  function navigate(tab: SiteTab) {
    if (window.location.hash === `#${tab}`) {
      window.scrollTo(0, 0);
      return;
    }
    window.location.hash = tab;
  }

  return (
    <main className={styles.shell}>
      <section className={activeTab === "home" ? styles.activePage : styles.hiddenPage} aria-hidden={activeTab !== "home"}>
        <HomeOS onIntroReadyChange={setIntroReady} onLaunchedChange={setLaunched} />
      </section>
      <section className={activeTab === "works" ? styles.activePage : styles.hiddenPage} aria-hidden={activeTab !== "works"}>
        <WorkReport />
      </section>
      <section className={activeTab === "system" ? styles.activePage : styles.hiddenPage} aria-hidden={activeTab !== "system"}>
        {activeTab === "system" ? <SystemCanvas /> : null}
      </section>

      <nav className={`${styles.pillNav} ${activeTab === "home" && !introReady ? styles.navHidden : ""}`} aria-label="个人网站场景">
        <span className={styles.navMark}>游文君 <em>Wenjun You</em></span>
        <div className={styles.navLinks}>
          <button className={activeTab === "home" ? styles.active : ""} type="button" onClick={() => navigate("home")} aria-current={activeTab === "home" ? "page" : undefined}><span>01</span>首页</button>
          <button className={activeTab === "works" ? styles.active : ""} type="button" onClick={() => navigate("works")} aria-current={activeTab === "works" ? "page" : undefined}><span>02</span>作品集</button>
          <button className={activeTab === "system" ? styles.active : ""} type="button" onClick={() => navigate("system")} aria-current={activeTab === "system" ? "page" : undefined}><span>03</span>我的OS</button>
        </div>
      </nav>
    </main>
  );
}
