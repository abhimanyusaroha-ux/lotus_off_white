import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";

export const metadata: Metadata = {
  title: "About · Lotus Property Group",
};

export default function About() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-canvas flex flex-col items-center justify-center px-6">
        <p className="caption font-sans text-gray-600 uppercase mb-6">
          Coming soon
        </p>
        <h1 className="display-md font-sans font-bold text-ink text-center max-w-[480px]">
          About Lotus Property Group
        </h1>
        <div className="mt-12">
          <Link
            href="/"
            className="body-sm font-sans text-ink underline underline-offset-2 decoration-[1px] hover:decoration-2 transition-all duration-150"
          >
            ← Back to home
          </Link>
        </div>
      </main>
    </>
  );
}
