import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { appName, gitConfig } from "./shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: appName,
    },
    links: [
      {
        text: "Flows",
        url: "/docs/flows/overview",
        active: "nested-url",
      },
      {
        text: "Guides",
        url: "/docs/guides/introduction",
        active: "nested-url",
      },
      {
        text: "API",
        url: "/docs/api/responsive",
        active: "nested-url",
      },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
