import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AuthFormLayout } from "@/components/auth-form-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset your password — Frame ID" },
      { name: "description", content: "Request a password reset link for your Frame ID account." },
      { property: "og:title", content: "Reset your password — Frame ID" },
      { property: "og:description", content: "Request a password reset link for your account." },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <AuthFormLayout
      title="Reset your password"
      description="Enter the email address on your account and we will send a reset link."
      footer={
        <p>
          <Link to="/login" className="font-medium text-foreground underline underline-offset-4">
            Back to log in
          </Link>
        </p>
      }
    >
      {sent ? (
        <div role="status" className="space-y-3">
          <p className="text-sm font-medium">Reset link requested</p>
          <p className="text-sm text-muted-foreground">
            If an account exists for {email || "that address"}, a reset link will be sent. Delivery
            is handled by the mail service once connected.
          </p>
        </div>
      ) : (
        <form
          className="space-y-5"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Send reset link
          </Button>
        </form>
      )}
    </AuthFormLayout>
  );
}
