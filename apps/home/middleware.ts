import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Exact `/storybook` (no slash) breaks relative `./index.json` → `/index.json`.
 * Next strips trailing slashes from `Location` when `trailingSlash` is false, so a
 * normal redirect to `/storybook/` loops — return a tiny HTML replace instead.
 */
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/storybook") {
    const target = `/storybook/${request.nextUrl.search}${request.nextUrl.hash}`;
    return new NextResponse(
      `<!doctype html><meta charset="utf-8"><script>location.replace(${JSON.stringify(target)})</script>`,
      {
        status: 200,
        headers: { "content-type": "text/html; charset=utf-8" },
      },
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/storybook"],
};
