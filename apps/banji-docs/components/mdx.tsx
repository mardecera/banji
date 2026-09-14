import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { Preview } from "@/components/Preview";

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Preview,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
