import { defineConfig } from "vitepress";

import enConfig from "./en.mts";

export default defineConfig({
  base: "/tanstack-query-optimistic-updates/",
  title: "Tanstack Query Optimistic Updates",
  description: "Tanstack Query Optimistic Updates",
  rewrites: {
    "en/:doc.md": ":doc.md",
    "en/react/:doc.md": "react/:doc.md"
  },
  head: [
    ["link", { rel: "icon", href: "/tanstack-query-optimistic-updates/tanstack-query-logo.png" }],
    ["meta", { property: "og:title", content: "Tanstack Query Optimistic Updates" }],
    ["meta", { property: "og:description", content: "Tanstack Query Optimistic Updates" }],
    ["meta", { property: "og:image", content: "/tanstack-query-optimistic-updates/tanstack-query-logo.png" }],
    ["meta", { name: "twitter:image", content: "/tanstack-query-optimistic-updates/tanstack-query-logo.png" }]
  ],
  locales: {
    root: { label: "English", ...enConfig }
  },
  themeConfig: {
    siteTitle: "Home",
    outline: { level: "deep" },
    socialLinks: [
      { icon: "github", link: "https://github.com/mugglim/tanstack-query-optimistic-updates" },
      { icon: "npm", link: "https://www.npmjs.com/package/tanstack-query-optimistic-updates" }
    ]
  }
});
