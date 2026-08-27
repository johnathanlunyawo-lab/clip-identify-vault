import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader, EmptyState } from "@/components/app-shell";
import { RequireAuth } from "@/components/require-auth";
import { SearchHistoryTable } from "@/components/search-history-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Account — Frame ID" },
      { name: "description", content: "Profile, payment history, search history and security settings." },
      { property: "og:title", content: "Account — Frame ID" },
      { property: "og:description", content: "Manage your profile, payments, history and security." },
    ],
  }),
  component: () => (
    <RequireAuth>
      <AccountPage />
    </RequireAuth>
  ),
});

function AccountPage() {
  const { account, transactions, searches, updateProfile } = useAuth();
  const [fullName, setFullName] = useState(account?.fullName ?? "");
  const [email, setEmail] = useState(account?.email ?? "");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setFullName(account?.fullName ?? "");
    setEmail(account?.email ?? "");
  }, [account?.fullName, account?.email]);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <PageHeader
        eyebrow="Account"
        title="Account settings"
        description="Profile details, payment records, search history and security."
      />

      <Tabs defaultValue="profile" className="mt-8">
        <TabsList className="flex w-full flex-wrap justify-start">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="payments">Payment history</TabsTrigger>
          <TabsTrigger value="searches">Search history</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <form
            className="max-w-lg space-y-5 rounded-lg border border-border bg-card p-6"
            onSubmit={async (e) => {
              e.preventDefault();
              await updateProfile({ fullName, email });
              setSaved(true);
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="fullName">Full name</Label>
              <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <p className="text-xs text-muted-foreground">
                Status: {account?.emailVerified ? "Verified" : "Pending verification"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button type="submit">Save changes</Button>
              {saved && (
                <span role="status" className="text-sm text-muted-foreground">
                  Saved
                </span>
              )}
            </div>
          </form>
        </TabsContent>

        <TabsContent value="payments" className="mt-6">
          {transactions.length === 0 ? (
            <EmptyState
              title="No payments yet"
              description="Credit purchases and receipts will be listed here once billing is connected."
            />
          ) : (
            <div className="overflow-x-auto rounded-lg border border-border bg-card">
              <table className="w-full min-w-[36rem] text-left text-sm">
                <caption className="sr-only">Payment history</caption>
                <thead className="border-b border-border">
                  <tr className="label-eyebrow">
                    <th scope="col" className="px-4 py-3 font-normal">Date</th>
                    <th scope="col" className="px-4 py-3 font-normal">Description</th>
                    <th scope="col" className="px-4 py-3 font-normal">Credits</th>
                    <th scope="col" className="px-4 py-3 font-normal">Amount</th>
                    <th scope="col" className="px-4 py-3 font-normal">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t) => (
                    <tr key={t.id} className="border-b border-border last:border-0">
                      <td className="px-4 py-3 text-muted-foreground">
                        {new Date(t.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">{t.description}</td>
                      <td className="px-4 py-3 tabular-nums">{t.credits}</td>
                      <td className="px-4 py-3 tabular-nums">
                        ${(t.amountCents / 100).toFixed(2)}
                      </td>
                      <td className="px-4 py-3">{t.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>

        <TabsContent value="searches" className="mt-6">
          {searches.length === 0 ? (
            <EmptyState
              title="No searches yet"
              description="Every identification you run will be recorded here."
            />
          ) : (
            <SearchHistoryTable records={searches} />
          )}
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <div className="max-w-lg space-y-6 rounded-lg border border-border bg-card p-6">
            <div>
              <h2 className="text-sm font-semibold">Password</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Change the password used to sign in to this account.
              </p>
              <form className="mt-4 space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current password</Label>
                  <Input id="currentPassword" type="password" autoComplete="current-password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New password</Label>
                  <Input id="newPassword" type="password" autoComplete="new-password" />
                </div>
                <Button type="submit" variant="outline">
                  Update password
                </Button>
              </form>
            </div>

            <div className="border-t border-border pt-6">
              <h2 className="text-sm font-semibold">Sessions</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Session management will be available once the backend issues real sessions.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
