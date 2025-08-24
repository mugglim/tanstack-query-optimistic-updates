import { DefaultTheme, defineConfig } from "vitepress";

const sidebarList: DefaultTheme.SidebarItem[] = [
  {
    text: "Guide",
    items: [
      { text: "Introduction", link: "/intro.html" },
      { text: "Getting Started", link: "/getting-started.html" }
    ]
  },
  {
    text: "Reference",
    items: [{ text: "react", items: [{ text: "useOptimisticMutation", link: "/react/useOptimisticMutation.html" }] }]
  }
];

const enConfig = defineConfig({
  lang: "en-US",
  themeConfig: {
    sidebar: sidebarList
  }
});

export default enConfig;
