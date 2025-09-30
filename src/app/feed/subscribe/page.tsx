import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "フィードを追加 | RSS Reader",
  description: "RSS/Atom フィードのURLを入力して登録します",
};

export default function FeedSubscribePage() {
  return (
    <main className="font-sans mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight mb-6">フィードを追加</h1>

      <form
        action="#"
        method="post"
        className="rounded-xl ring-1 ring-black/10 dark:ring-white/10 bg-white dark:bg-neutral-900 p-5 shadow-sm"
        aria-describedby="form-help"
      >
        <div className="mb-4">
          <label htmlFor="feed-url" className="block text-sm font-medium mb-1">
            フィードのURL
          </label>
          <input
            id="feed-url"
            name="url"
            type="url"
            required
            inputMode="url"
            placeholder="https://example.com/feed.xml"
            className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-3 py-2 text-sm shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/40 dark:focus-visible:ring-white/40"
            aria-describedby="url-hint"
          />
          <p id="url-hint" className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            RSS/Atom のURLを入力してください。例: https://example.com/rss.xml
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="inline-flex items-center rounded-md bg-neutral-900 text-white dark:bg-white dark:text-black px-4 py-2 text-sm hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/40 dark:focus-visible:ring-white/40"
          >
            追加する
          </button>
          <p id="form-help" className="text-xs text-neutral-500 dark:text-neutral-400">
            入力後の登録処理は今後の対応で実装されます。
          </p>
        </div>
      </form>
    </main>
  );
}
