"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

export type Language = "en" | "zh";

const languageListeners = new Set<() => void>();

function readStoredLanguage(): Language {
  if (typeof window === "undefined") {
    return "en";
  }

  const saved = window.localStorage.getItem("site-language");
  return saved === "zh" || saved === "en" ? saved : "zh";
}

function readServerLanguage(): Language {
  return "zh";
}

function subscribeToLanguage(listener: () => void) {
  languageListeners.add(listener);

  function handleStorage(event: StorageEvent) {
    if (event.key === "site-language") {
      listener();
    }
  }

  window.addEventListener("storage", handleStorage);

  return () => {
    languageListeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

export function useLanguage() {
  const language = useSyncExternalStore(subscribeToLanguage, readStoredLanguage, readServerLanguage);

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }, [language]);

  const setLanguage = useCallback((nextLanguage: Language) => {
    window.localStorage.setItem("site-language", nextLanguage);
    languageListeners.forEach((listener) => listener());
  }, []);

  return { language, setLanguage };
}

export function LanguageToggle({
  language,
  setLanguage
}: {
  language: Language;
  setLanguage: (language: Language) => void;
}) {
  return (
    <div className="language-toggle" aria-label="Language switcher">
      <button type="button" aria-pressed={language === "en"} onClick={() => setLanguage("en")}>
        English
      </button>
      <button type="button" aria-pressed={language === "zh"} onClick={() => setLanguage("zh")}>
        中文
      </button>
    </div>
  );
}
