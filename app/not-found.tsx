"use client";

import { Home } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="w-full h-dvh grid place-items-center bg-background">
      <div className="max-w-md text-center">
        <h2 className="font-extrabold text-9xl bg-gradient-to-r from-blue-600 dark:from-blue-400 via-purple-500 to-blue-500 text-transparent bg-clip-text border-b w-max mx-auto border-muted">
          404
        </h2>
        <p className="mb-5 text-3xl font-bold text-muted-foreground">
          Not Found!
        </p>
        <p className="text-xl md:text-2xl text-muted-foreground mb-7">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="px-8 py-3 font-semibold rounded bg-primary hover:bg-primary/80 transition text-background"
        >
          <Home className="inline text-background mr-1" /> Back to homepage
        </Link>
      </div>
    </section>
  );
}
