import { Inter } from "next/font/google";
import { Provider } from "@/components/provider";
import type { Metadata } from "next";
import "./global.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Better Living SDK",
    template: "%s | Better Living SDK",
  },
  description:
    "Better Living SDK — Passport auth flows and responsive layout helpers.",
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={inter.className} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
