import { DefaultTheme, defineConfig } from "vitepress";

const sidebarList: DefaultTheme.SidebarItem[] = [
  {
    text: "Guide",
    items: [
      { text: "Introduction", link: "/intro.html" },
      { text: "Installation & Usage", link: "/installation.html" }
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
