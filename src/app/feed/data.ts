export type Feed = {
  id: string;
  title: string;
  description: string;
  siteUrl: string;
  latestArticleUrl: string;
  updatedAt: string; // ISO8601
};

export const feeds: Feed[] = [
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
  {
    id: "4",
    title: "TypeScript Blog",
    description: "TypeScript の公式ブログ",
    siteUrl: "https://devblogs.microsoft.com/typescript/",
    latestArticleUrl: "https://devblogs.microsoft.com/typescript/announcing-typescript-5-6/",
    updatedAt: "2024-10-05T00:00:00.000Z",
  },
  {
    id: "5",
    title: "React Blog",
    description: "React のブログ",
    siteUrl: "https://react.dev/blog",
    latestArticleUrl: "https://react.dev/blog/2024/08/01/react-19",
    updatedAt: "2024-08-01T00:00:00.000Z",
  },
  {
    id: "6",
    title: "WebKit Blog",
    description: "WebKit の更新情報",
    siteUrl: "https://webkit.org/blog/",
    latestArticleUrl: "https://webkit.org/blog/15000/webkit-updates/",
    updatedAt: "2024-09-10T00:00:00.000Z",
  },
  {
    id: "7",
    title: "Chromium Blog",
    description: "Chrome/Chromium の開発ブログ",
    siteUrl: "https://blog.chromium.org/",
    latestArticleUrl: "https://blog.chromium.org/2024/09/chrome-updates.html",
    updatedAt: "2024-09-20T00:00:00.000Z",
  },
  {
    id: "8",
    title: "Node.js Blog",
    description: "Node.js リリース情報",
    siteUrl: "https://nodejs.org/en/blog",
    latestArticleUrl: "https://nodejs.org/en/blog/release/v22.9.0",
    updatedAt: "2024-09-25T00:00:00.000Z",
  },
];
