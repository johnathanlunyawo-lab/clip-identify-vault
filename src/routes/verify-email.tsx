import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthFormLayout } from "@/components/auth-form-layout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/verify-email")({
  head: () => ({
    meta: [
      { title: "Verify your email — Frame ID" },
      { name: "description", content: "Confirm your email address to activate your Frame ID account." },
      { property: "og:title", content: "Verify your email — Frame ID" },
      { property: "og:description", content: "Confirm your email address to activate your account." },
    ],
  }),
  component: VerifyEmailPage,
});

function VerifyEmailPage() {
  const { account, markEmailVerified } = useAuth();

  return (
    <AuthFormLayout
      title="Verify your email"
      description="A verification link will be sent to your address once the mail service is connected."
      footer={
        <p>
          <Link to="/dashboard" className="font-medium text-foreground underline underline-offset-4">
            Continue to dashboard
          </Link>
        </p>
      }
    >
      <div className="space-y-4">
        <dl className="space-y-1 text-sm">
          <dt className="label-eyebrow">Email address</dt>
          <dd className="awaiting-value">{account?.email || "[No account]"}</dd>
        </dl>
        <dl className="space-y-1 text-sm">
          <dt className="label-eyebrow">Status</dt>
          <dd className="awaiting-value">
            {account?.emailVerified ? "Verified" : "Pending verification"}
          </dd>
        </dl>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button variant="outline" className="w-full" type="button">
            Resend verification email
          </Button>
          <Button className="w-full" type="button" onClick={markEmailVerified} disabled={!account}>
            I have verified
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Placeholder flow. Verification will be enforced by the backend.
        </p>
      </div>
    </AuthFormLayout>
  );
}
