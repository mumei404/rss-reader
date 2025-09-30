import type { Metadata } from "next";
import { FeedListClient } from "./FeedListClient";
import { feeds } from "./data";

export const metadata: Metadata = {
  title: "フィード一覧 | RSS Reader",
  description: "登録中のRSSフィード一覧を表示します",
};

export default function FeedPage() {
  return (
    <main className="font-sans mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight mb-6">フィード一覧</h1>

      <FeedListClient feeds={feeds} />
    </main>
  );
}
