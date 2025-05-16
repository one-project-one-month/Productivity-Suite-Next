"use client";

import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="w-full h-dvh grid place-items-center bg-background">
      <div className="text-center">
        <h1 className="text-5xl font-mono text-red-600 font-black">404</h1>
        <p className="text-red-900 mb-2 border-y border-red-500/30">
          Not Found
        </p>
        <p className="">
          Go back to{" "}
          <Link href="/" className="underline text-blue-500">
            Home
          </Link>
        </p>
      </div>
    </section>
  );
}
