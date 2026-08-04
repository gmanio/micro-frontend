import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { appName, gitConfig } from "./shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: appName,
    },
    links: [
      {
        text: "계약",
        url: "/docs/contract/overview",
        active: "nested-url",
      },
      {
        text: "자산",
        url: "/docs/asset/overview",
        active: "nested-url",
      },
      {
        text: "회원",
        url: "/docs/member/overview",
        active: "nested-url",
      },
      {
        text: "SDK",
        url: "/docs/guides/introduction",
        active: "nested-url",
      },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
