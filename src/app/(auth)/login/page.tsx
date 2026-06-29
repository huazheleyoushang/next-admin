import { SignInView } from "@/features/auth/sign-in"
import { SignForm } from "@/features/auth/sign-form"
import { GitHubStarsButton } from "@/components/github-stars-button"
import Link from "next/link"

export default function Page() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-6 md:p-10">
      {/* Top-right: GitHub repo link */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8">
        <GitHubStarsButton
          owner="kiranism"
          repo="next-shadcn-dashboard-starter"
          showRepo
          variant="outline"
          size="sm"
        />
      </div>

      {/* Center: Card header + Form */}
      <div className="w-full max-w-md">
        <SignInView />
        <SignForm />
      </div>

      {/* Bottom footer */}
      <div className="mt-8 space-y-3 text-center text-xs text-muted-foreground">
        <p>
          This is an{" "}
          <Link href="/about" className="hover:text-primary underline underline-offset-4">
            open-source project
          </Link>{" "}
          for demo purposes. Authentication is handled securely by Clerk.
        </p>
        <p>
          <Link
            href="https://github.com/kiranism/next-shadcn-dashboard-starter"
            target="_blank"
            className="hover:text-primary underline underline-offset-4"
          >
            View on GitHub
          </Link>
        </p>
        <p className="pt-2">
          By clicking continue, you agree to our{" "}
          <Link href="/terms-of-service" className="underline underline-offset-4 hover:text-primary">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy-policy" className="underline underline-offset-4 hover:text-primary">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
