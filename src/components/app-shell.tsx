import { Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

const authedNav = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/upload", label: "Upload" },
  { to: "/pricing", label: "Credits" },
  { to: "/account", label: "Account" },
] as const;

const publicNav = [{ to: "/pricing", label: "Pricing" }] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const { account, signOut } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const nav = account ? authedNav : publicNav;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2" aria-label="Frame ID home">
            <span className="grid h-7 w-7 place-items-center rounded-sm bg-primary font-mono text-xs font-semibold text-primary-foreground">
              FI
            </span>
            <span className="text-sm font-semibold tracking-tight">Frame ID</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                activeProps={{ className: "text-foreground bg-muted" }}
              >
                {item.label}
              </Link>
            ))}
            <div className="ml-3 flex items-center gap-2">
              {account ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    signOut();
                    router.navigate({ to: "/" });
                  }}
                >
                  Sign out
                </Button>
              ) : (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/login">Log in</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link to="/signup">Create account</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-border bg-background md:hidden">
            <nav className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-3" aria-label="Mobile">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                  activeProps={{ className: "text-foreground bg-muted" }}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 flex flex-col gap-2">
                {account ? (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setOpen(false);
                      signOut();
                      router.navigate({ to: "/" });
                    }}
                  >
                    Sign out
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" asChild onClick={() => setOpen(false)}>
                      <Link to="/login">Log in</Link>
                    </Button>
                    <Button asChild onClick={() => setOpen(false)}>
                      <Link to="/signup">Create account</Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-surface">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>Frame ID — media identification platform.</p>
          <nav className="flex gap-4" aria-label="Footer">
            <Link to="/pricing" className="hover:text-foreground">
              Pricing
            </Link>
            <Link to="/login" className="hover:text-foreground">
              Log in
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-2">
        {eyebrow && <p className="label-eyebrow">{eyebrow}</p>}
        <h1 className="text-2xl font-semibold sm:text-3xl">{title}</h1>
        {description && <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-md border border-dashed border-border-strong bg-surface px-6 py-10 text-center">
      <p className="text-sm font-medium">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
