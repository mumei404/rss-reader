import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "フィード一覧 | RSS Reader",
  description: "登録中のRSSフィード一覧を表示します",
};

// 仮データ（後日 DB へ移行予定）

type Feed = {
  id: string;
  title: string;
  description: string;
  siteUrl: string;
  latestArticleUrl: string;
  updatedAt: string; // ISO8601
};

const feeds: Feed[] = [
  {
    id: "1",
    title: "Next.js Blog",
    description: "Next.js の公式ブログ。リリース情報やベストプラクティスを配信。",
    siteUrl: "https://nextjs.org/blog",
    latestArticleUrl: "https://nextjs.org/blog/next-15",
    updatedAt: "2024-09-15T09:00:00.000Z",
  },
  {
    id: "2",
    title: "Vercel Changelog",
    description: "Vercel の変更履歴。新機能や改善点のまとめ。",
    siteUrl: "https://vercel.com/changelog",
    latestArticleUrl: "https://vercel.com/changelog/vercel-september-updates",
    updatedAt: "2024-10-01T12:00:00.000Z",
  },
  {
    id: "3",
    title: "MDN Web Docs",
    description: "Web 標準とブラウザ実装の最新情報。",
    siteUrl: "https://developer.mozilla.org/",
    latestArticleUrl: "https://developer.mozilla.org/en-US/blog/",
    updatedAt: "2024-08-20T00:00:00.000Z",
  },
];

export default function FeedPage() {
  return (
    <main className="font-sans mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight mb-6">フィード一覧</h1>

      <section aria-label="フィード一覧" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {feeds.map((f) => (
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
                    更新: {new Date(f.updatedAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                </dd>
              </dl>

              <div className="flex gap-3">
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
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
