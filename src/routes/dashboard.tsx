import { createFileRoute, Link } from "@tanstack/react-router";
import { Upload } from "lucide-react";
import { PageHeader, EmptyState } from "@/components/app-shell";
import { RequireAuth } from "@/components/require-auth";
import { CreditBalanceCard } from "@/components/credit-balance-card";
import { SearchHistoryTable } from "@/components/search-history-table";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Frame ID" },
      { name: "description", content: "Your credits, recent searches and account information." },
      { property: "og:title", content: "Dashboard — Frame ID" },
      { property: "og:description", content: "Your credits, recent searches and account information." },
    ],
  }),
  component: () => (
    <RequireAuth>
      <DashboardPage />
    </RequireAuth>
  ),
});

function DashboardPage() {
  const { account, credits, searches } = useAuth();
  const recent = searches.slice(0, 5);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <PageHeader
        eyebrow="Overview"
        title={account?.fullName ? `Welcome, ${account.fullName}` : "Dashboard"}
        description="Run an identification, review recent searches and manage your account."
        actions={
          <Button asChild>
            <Link to="/upload">
              <Upload className="h-4 w-4" aria-hidden="true" />
              Upload a clip
            </Link>
          </Button>
        }
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <CreditBalanceCard credits={credits} />

        <div className="rounded-lg border border-border bg-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <p className="label-eyebrow">Account information</p>
            <Link to="/account" className="text-sm underline underline-offset-4">
              Settings
            </Link>
          </div>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              ["Name", account?.fullName || "Not set"],
              ["Email", account?.email || "Not set"],
              ["Email status", account?.emailVerified ? "Verified" : "Pending verification"],
              ["Account ID", account?.id ?? "—"],
            ].map(([term, value]) => (
              <div key={term}>
                <dt className="label-eyebrow">{term}</dt>
                <dd className="mt-1 truncate font-mono text-sm">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent searches</h2>
          <Link to="/account" className="text-sm underline underline-offset-4">
            View all
          </Link>
        </div>
        <div className="mt-4">
          {recent.length === 0 ? (
            <EmptyState
              title="No searches yet"
              description="Your identification history will appear here after your first upload."
            />
          ) : (
            <SearchHistoryTable records={recent} />
          )}
        </div>
      </section>
    </div>
  );
}
