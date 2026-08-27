import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Frame ID credits" },
      { name: "description", content: "One credit package: $4 for 8 searches. No subscription." },
      { property: "og:title", content: "Pricing — Frame ID credits" },
      { property: "og:description", content: "One credit package: $4 for 8 searches. No subscription." },
    ],
  }),
  component: PricingPage,
});

const included = [
  "8 identification searches",
  "Structured result record per search",
  "Search history stored on your account",
  "Receipt in your payment history",
];

function PricingPage() {
  const { account } = useAuth();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
      <p className="label-eyebrow">Pricing</p>
      <h1 className="mt-3 text-2xl font-semibold sm:text-3xl">Pay per search with credits</h1>
      <p className="mt-3 max-w-xl text-sm text-muted-foreground">
        One package. No subscription, no tiers. Credits do not expire.
      </p>

      <div className="mt-10 max-w-md rounded-lg border border-border bg-card p-6 shadow-panel">
        <p className="label-eyebrow">Credit package</p>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-4xl font-semibold">$4</span>
          <span className="text-sm text-muted-foreground">/ 8 searches</span>
        </div>
        <p className="mt-1 font-mono text-xs text-muted-foreground">$0.50 per search</p>

        <ul className="mt-6 space-y-3">
          {included.map((item) => (
            <li key={item} className="flex gap-3 text-sm">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          {account ? (
            <Button className="w-full" disabled title="Payments not enabled yet">
              Purchase credits
            </Button>
          ) : (
            <Button className="w-full" asChild>
              <Link to="/signup">Create an account to buy credits</Link>
            </Button>
          )}
          <p className="mt-3 text-xs text-muted-foreground">
            Checkout is not enabled yet. This action will open the payment provider once billing is
            connected.
          </p>
        </div>
      </div>
    </div>
  );
}
