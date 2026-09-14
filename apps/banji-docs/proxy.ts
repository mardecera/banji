import { isMarkdownPreferred, rewritePath } from "fumadocs-core/negotiation";
import { type NextRequest, NextResponse } from "next/server";
import { docsContentRoute, docsRoute } from "@/lib/shared";

const { rewrite: rewriteDocs } = rewritePath(
  `${docsRoute}{/*path}`,
  `${docsContentRoute}{/*path}/content.md`,
);
const { rewrite: rewriteSuffix } = rewritePath(
  `${docsRoute}{/*path}.md`,
  `${docsContentRoute}{/*path}/content.md`,
);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/docs") {
    return NextResponse.redirect(new URL("/", request.url), 308);
  }

  if (pathname.startsWith("/docs/")) {
    return NextResponse.redirect(new URL(pathname.slice(5) || "/", request.url), 308);
  }

  const suffixResult = rewriteSuffix(pathname);
  if (suffixResult) {
    return NextResponse.rewrite(new URL(suffixResult, request.nextUrl));
  }

  if (isMarkdownPreferred(request)) {
    const docsResult = rewriteDocs(pathname);

    if (docsResult) {
      return NextResponse.rewrite(new URL(docsResult, request.nextUrl), {
        headers: { Vary: "Accept" },
      });
    }
  }

  return NextResponse.next();
}
