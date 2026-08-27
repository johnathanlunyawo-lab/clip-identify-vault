import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function CreditBalanceCard({ credits }: { credits: number }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-panel">
      <p className="label-eyebrow">Credits remaining</p>
      <p className="mt-3 text-4xl font-semibold tabular-nums">{credits}</p>
      <p className="mt-1 text-sm text-muted-foreground">
        {credits === 1 ? "1 search" : `${credits} searches`}
      </p>
      <Button className="mt-5 w-full" variant="outline" asChild>
        <Link to="/pricing">Purchase credits</Link>
      </Button>
    </div>
  );
}
