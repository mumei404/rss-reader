"use client";

import { useEffect, useMemo, useState } from "react";

type Feed = {
  id: string;
  title: string;
  description: string;
  siteUrl: string;
  latestArticleUrl: string;
  updatedAt: string; // ISO8601
};

function hostname(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

type Mode = "all" | "read-later";

export function FeedListClient({ feeds, mode = "all" }: { feeds: Feed[]; mode?: Mode }) {
  const sites = useMemo(() => {
    const hs = Array.from(new Set(feeds.map((f) => hostname(f.siteUrl))));
    return hs.sort((a, b) => a.localeCompare(b));
  }, [feeds]);

  const [siteFilter, setSiteFilter] = useState<string>("");
  const [readLater, setReadLater] = useState<Set<string>>(new Set());
  const [read, setRead] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const r = JSON.parse(localStorage.getItem("readFeedIds") || "[]");
      const rl = JSON.parse(localStorage.getItem("readLaterFeedIds") || "[]");
      if (Array.isArray(r)) setRead(new Set(r));
      if (Array.isArray(rl)) setReadLater(new Set(rl));
    } catch (error) {
      console.warn("localStorage読み込みエラー:", error);
    }
  }, []);

  const filtered = useMemo(() => {
    if (!siteFilter) return feeds;
    return feeds.filter((f) => hostname(f.siteUrl) === siteFilter);
  }, [feeds, siteFilter]);

  const displayed = useMemo(() => {
    switch (mode) {
      case "read-later":
        return filtered.filter((f) => readLater.has(f.id));
      case "all":
      default:
        return filtered.filter((f) => !read.has(f.id));
    }
  }, [filtered, read, readLater, mode]);

  const saveReadLater = (set: Set<string>) => {
    try {
      localStorage.setItem("readLaterFeedIds", JSON.stringify(Array.from(set)));
    } catch (error) {
      console.warn("localStorage保存エラー (readLaterFeedIds):", error);
    }
  };

  const saveRead = (set: Set<string>) => {
    try {
      localStorage.setItem("readFeedIds", JSON.stringify(Array.from(set)));
    } catch (error) {
      console.warn("localStorage保存エラー (readFeedIds):", error);
    }
  };

  const toggleReadLater = (id: string) => {
    setReadLater((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      saveReadLater(next);
      return next;
    });
  };

  const toggleRead = (id: string) => {
    setRead((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      saveRead(next);
      return next;
    });
  };

  return (
    <>
      <div className="mb-6 flex items-end gap-4">
        <div>
          <label htmlFor="site-filter" className="block text-sm font-medium mb-1">
            サイトで絞り込み
          </label>
          <select
            id="site-filter"
            value={siteFilter}
            onChange={(e) => setSiteFilter(e.target.value)}
            className="min-w-56 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/40 dark:focus-visible:ring-white/40"
          >
            <option value="">すべてのサイト</option>
            {sites.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <section aria-label="フィード一覧" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayed.map((f) => {
          const isLater = readLater.has(f.id);
          const isRead = read.has(f.id);
          return (
            <article
              key={f.id}
              aria-labelledby={`card-${f.id}-title`}
              className="rounded-xl ring-1 ring-black/10 dark:ring-white/10 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition-shadow focus-within:ring-black/20 dark:focus-within:ring-white/20"
            >
              <div className="p-5">
                <h2 id={`card-${f.id}-title`} className="text-lg font-medium mb-2">
                  {f.title}
                </h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-4">
                  {f.description}
                </p>

                <dl className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">
                  <dt className="sr-only">更新日</dt>
                  <dd>
                    <time dateTime={f.updatedAt}>
                      更新: {new Date(f.updatedAt).toLocaleDateString("ja-JP", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </dd>
                  <dd className="mt-1">サイト: {hostname(f.siteUrl)}</dd>
                </dl>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={f.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-md border border-neutral-300 dark:border-neutral-700 px-3 py-1.5 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/40 dark:focus-visible:ring-white/40"
                    aria-label={`${f.title} のサイトを開く`}
                  >
                    サイト
                  </a>
                  <a
                    href={f.latestArticleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-md bg-neutral-900 text-white dark:bg-white dark:text-black px-3 py-1.5 text-sm hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/40 dark:focus-visible:ring-white/40"
                    aria-label={`${f.title} の最新記事を開く`}
                  >
                    最新記事
                  </a>
                  <button
                    type="button"
                    onClick={() => toggleReadLater(f.id)}
                    aria-pressed={isLater}
                    className={`inline-flex items-center rounded-md px-3 py-1.5 text-sm border focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/40 dark:focus-visible:ring-white/40 ${
                      isLater
                        ? "bg-amber-500 text-white border-amber-600 hover:opacity-90"
                        : "border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                    }`}
                    aria-label={`${f.title} を後で読むに${isLater ? "解除" : "追加"}`}
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="currentColor"
                    >
                      <path d="M6 2h12a2 2 0 0 1 2 2v18l-8-4-8 4V4a2 2 0 0 1 2-2z" />
                    </svg>
                    <span className="sr-only">{isLater ? "saved" : "read later"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleRead(f.id)}
                    aria-pressed={isRead}
                    className={`inline-flex items-center rounded-md px-3 py-1.5 text-sm border focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/40 dark:focus-visible:ring-white/40 ${
                      isRead
                        ? "bg-emerald-600 text-white border-emerald-700 hover:opacity-90"
                        : "border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                    }`}
                    aria-label={`${f.title} を${isRead ? "未読に戻す" : "既読にする"}`}
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="sr-only">{isRead ? "read" : "mark read"}</span>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
}
