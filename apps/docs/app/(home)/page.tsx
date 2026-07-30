import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex max-w-3xl flex-1 flex-col justify-center gap-8 px-6 py-16 text-center">
      <div className="space-y-3">
        <p className="text-fd-muted-foreground text-sm font-medium tracking-wide uppercase">
          @dndproperty/betterliving-sdk · 0.1.0
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Better Living SDK
        </h1>
        <p className="text-fd-muted-foreground text-lg">
          Passport 회원 플로우 문서와 Better Living SDK 반응형 레이아웃 헬퍼. GitHub
          Packages로 배포합니다.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/docs/flows/overview"
          className="bg-fd-primary text-fd-primary-foreground inline-flex h-10 items-center rounded-md px-4 text-sm font-medium"
        >
          Flows
        </Link>
        <Link
          href="/docs/guides/installation"
          className="border-fd-border hover:bg-fd-accent inline-flex h-10 items-center rounded-md border px-4 text-sm font-medium"
        >
          Install
        </Link>
        <Link
          href="/docs/api/responsive"
          className="border-fd-border hover:bg-fd-accent inline-flex h-10 items-center rounded-md border px-4 text-sm font-medium"
        >
          API
        </Link>
      </div>
      <pre className="border-fd-border bg-fd-secondary/40 overflow-x-auto rounded-lg border p-4 text-left text-sm">
        <code>{`pnpm add @dndproperty/betterliving-sdk`}</code>
      </pre>
    </main>
  );
}
