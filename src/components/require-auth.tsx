import { Link } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

/**
 * Client-side session gate. Replace with a server-validated guard once the
 * backend issues real sessions.
 */
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { hydrated, account } = useAuth();

  if (!hydrated) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6" aria-busy="true">
        <div className="h-6 w-40 animate-pulse rounded bg-muted" />
        <div className="mt-4 h-40 animate-pulse rounded bg-muted" />
      </div>
    );
  }

  if (!account) {
    return (
      <div className="mx-auto w-full max-w-md px-4 py-20 text-center sm:px-6">
        <h1 className="text-xl font-semibold">Sign in required</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This area is only available to account holders.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <Button asChild>
            <Link to="/login">Log in</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/signup">Create account</Link>
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
