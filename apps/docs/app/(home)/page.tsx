import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex max-w-3xl flex-1 flex-col justify-center gap-8 px-6 py-16 text-center">
      <div className="space-y-3">
        <p className="text-fd-muted-foreground text-sm font-medium tracking-wide uppercase">
          @dndproperty/betterliving-ui
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Better Living UI
        </h1>
        <p className="text-fd-muted-foreground text-lg">
          GitHub Packages로 배포하는 React + Tailwind v4 UI. Guides와 API로
          소비자가 바로 붙일 수 있게 정리합니다.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/docs/guides/introduction"
          className="bg-fd-primary text-fd-primary-foreground inline-flex h-10 items-center rounded-md px-4 text-sm font-medium"
        >
          Documentation
        </Link>
        <Link
          href="/docs/api/button"
          className="border-fd-border hover:bg-fd-accent inline-flex h-10 items-center rounded-md border px-4 text-sm font-medium"
        >
          API
        </Link>
      </div>
      <pre className="border-fd-border bg-fd-secondary/40 overflow-x-auto rounded-lg border p-4 text-left text-sm">
        <code>{`pnpm add @dndproperty/betterliving-ui`}</code>
      </pre>
    </main>
  );
}
