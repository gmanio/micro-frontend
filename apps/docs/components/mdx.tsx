import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import {
  DemoBadge,
  DemoButton,
  DemoCard,
  DemoInput,
  DemoSkeleton,
} from "@/components/demos";

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    DemoButton,
    DemoBadge,
    DemoInput,
    DemoSkeleton,
    DemoCard,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
