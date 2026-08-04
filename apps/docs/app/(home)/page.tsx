import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex max-w-3xl flex-1 flex-col justify-center gap-8 px-6 py-16 text-center">
      <div className="space-y-3">
        <p className="text-fd-muted-foreground text-sm font-medium tracking-wide uppercase">
          @dndproperty/betterliving-sdk · 0.1.0
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Better Living
        </h1>
        <p className="text-fd-muted-foreground text-lg">
          계약 · 자산 · 회원 도메인 문서와 SDK 반응형 헬퍼.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/docs/contract/overview"
          className="bg-fd-primary text-fd-primary-foreground inline-flex h-10 items-center rounded-md px-4 text-sm font-medium"
        >
          계약
        </Link>
        <Link
          href="/docs/asset/overview"
          className="border-fd-border hover:bg-fd-accent inline-flex h-10 items-center rounded-md border px-4 text-sm font-medium"
        >
          자산
        </Link>
        <Link
          href="/docs/member/overview"
          className="border-fd-border hover:bg-fd-accent inline-flex h-10 items-center rounded-md border px-4 text-sm font-medium"
        >
          회원
        </Link>
        <Link
          href="/docs/guides/installation"
          className="border-fd-border hover:bg-fd-accent inline-flex h-10 items-center rounded-md border px-4 text-sm font-medium"
        >
          SDK
        </Link>
      </div>
      <pre className="border-fd-border bg-fd-secondary/40 overflow-x-auto rounded-lg border p-4 text-left text-sm">
        <code>{`pnpm add @dndproperty/betterliving-sdk`}</code>
      </pre>
    </main>
  );
}
