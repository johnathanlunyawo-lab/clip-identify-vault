import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { AuthFormLayout } from "@/components/auth-form-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — Frame ID" },
      { name: "description", content: "Log in to your Frame ID account to run identifications." },
      { property: "og:title", content: "Log in — Frame ID" },
      { property: "og:description", content: "Access your credits, searches and payment history." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await signIn({ email, password });
    setSubmitting(false);
    router.navigate({ to: "/dashboard" });
  }

  return (
    <AuthFormLayout
      title="Log in"
      description="Access your credits, searches and payment history."
      footer={
        <p>
          No account yet?{" "}
          <Link to="/signup" className="font-medium text-foreground underline underline-offset-4">
            Create one
          </Link>
        </p>
      }
    >
      <form onSubmit={onSubmit} className="space-y-5" noValidate>
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
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-xs text-muted-foreground underline underline-offset-4">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? "Signing in…" : "Log in"}
        </Button>
      </form>
    </AuthFormLayout>
  );
}
