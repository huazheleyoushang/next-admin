'use client';

import { GitHubStarsButton } from "@/components/github-stars-button";
import { SignForm } from "@/features/auth/sign-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="relative flex w-full flex-1 flex-col items-center justify-center p-6 md:p-10">
      {/* Top-right: GitHub repo link */}
      <div className="absolute top-6 md:top-6">
        <GitHubStarsButton
          owner="huazheleyoushang"
          repo="next-admin"
          showRepo
          variant="outline"
          size="sm"
        />
      </div>

      {/* Center: Card header + Form */}
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Sign in to Next Admin
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Welcome back! Please sign in to continue
          </p>
        </div>
        <SignForm />
      </div>

      {/* Bottom footer */}
      <div className="mt-6 space-y-2 text-center text-xs text-muted-foreground">
        <p>
          This is an{" "}
          <Link href="/about" className="hover:text-primary underline underline-offset-4">
            open-source project
          </Link>{" "}
          for demo purposes.
        </p>
      </div>
    </div>
  );
}
