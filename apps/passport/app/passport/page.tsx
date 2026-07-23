import { Button } from "@repo/ui";

export default function PassportPage() {
  return (
    <main className="mx-auto flex max-w-xl flex-col gap-4 p-8">
      <h1 className="text-2xl font-semibold tracking-tight">Passport zone</h1>
      <p className="text-muted-foreground">
        Served by <code className="text-foreground">apps/passport</code> under{" "}
        <code className="text-foreground">/passport</code>.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <Button>Sign in</Button>
        <Button variant="outline">Create account</Button>
        <a className="text-sm underline-offset-4 hover:underline" href="/">
          Home
        </a>
        <a
          className="text-sm underline-offset-4 hover:underline"
          href="/storybook/"
        >
          Storybook
        </a>
      </div>
    </main>
  );
}
