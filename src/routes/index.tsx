import { createFileRoute, Link } from "@tanstack/react-router";
import { FileVideo, ShieldCheck, ReceiptText } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Frame ID — Identify movies and series from clips" },
      {
        name: "description",
        content:
          "Upload a clip, screenshot or image and get the title, year, cast and where to watch. Pay per search with credits.",
      },
      { property: "og:title", content: "Frame ID — Identify movies and series from clips" },
      {
        property: "og:description",
        content: "Upload a clip, screenshot or image and identify the movie or series behind it.",
      },
    ],
  }),
  component: Landing,
});

const steps = [
  {
    icon: FileVideo,
    title: "Upload a clip or image",
    body: "Video clips, screenshots and photos are accepted. One upload uses one credit.",
  },
  {
    icon: ShieldCheck,
    title: "Identification runs on our systems",
    body: "Your file is processed against film and television catalogues. Results are tied to your account only.",
  },
  {
    icon: ReceiptText,
    title: "Get a structured result",
    body: "Title, release year, cast, episode details, streaming availability and related titles in one record.",
  },
];

function Landing() {
  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="label-eyebrow">Media identification</p>
          <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight sm:text-5xl">
            Identify movies and series from clips.
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            You have a scene but not a name. Upload the clip, screenshot or image and receive a
            structured identification record for your account.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link to="/signup">Create an account</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/pricing">See pricing</Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Accounts are required. Searches are never anonymous and are billed per credit.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <h2 className="text-xl font-semibold sm:text-2xl">How a search works</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.title} className="rounded-lg border border-border bg-card p-6">
                <div className="flex items-center justify-between">
                  <step.icon className="h-5 w-5 text-accent" aria-hidden="true" />
                  <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                </div>
                <h3 className="mt-4 text-base font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-xl font-semibold sm:text-2xl">Built like a payments product</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Every search is metered, recorded and receipted. You can see your credit balance,
                transaction history and full search history from your account at any time.
              </p>
            </div>
            <dl className="grid gap-4 sm:grid-cols-2">
              {[
                ["Credits", "Prepaid, per search, no subscription."],
                ["History", "Every upload and result stored under your account."],
                ["Receipts", "Payment history available for each purchase."],
                ["Access", "Password reset and email verification on every account."],
              ].map(([term, desc]) => (
                <div key={term} className="rounded-md border border-border bg-card p-4">
                  <dt className="text-sm font-semibold">{term}</dt>
                  <dd className="mt-1 text-sm text-muted-foreground">{desc}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
