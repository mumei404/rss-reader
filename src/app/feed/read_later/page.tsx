import type { Metadata } from "next";
import { FeedListClient } from "../FeedListClient";
import { feeds } from "../data";

export const metadata: Metadata = {
  title: "Read Later | RSS Reader",
  description: "後で読むに追加したフィードの一覧",
};

export default function ReadLaterPage() {
  return (
    <main className="font-sans mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight mb-6">Read Later</h1>

      <FeedListClient feeds={feeds} mode="read-later" />
    </main>
  );
}
