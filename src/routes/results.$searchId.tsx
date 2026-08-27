import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { RequireAuth } from "@/components/require-auth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/results/$searchId")({
  head: () => ({
    meta: [
      { title: "Identification result — Frame ID" },
      { name: "description", content: "Structured identification record for an uploaded clip or image." },
      { property: "og:title", content: "Identification result — Frame ID" },
      { property: "og:description", content: "Structured identification record for your upload." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <RequireAuth>
      <ResultPage />
    </RequireAuth>
  ),
});

/** Fields the backend will populate. Values stay empty until the API responds. */
const RESULT_FIELDS = [
  { key: "title", label: "Movie / Series Title" },
  { key: "releaseYear", label: "Release Year" },
  { key: "actors", label: "Actors" },
  { key: "episode", label: "Episode Information" },
  { key: "streaming", label: "Streaming Availability" },
  { key: "recommendations", label: "Recommendations" },
] as const;

function ResultPage() {
  const { searchId } = Route.useParams();
  const { getSearch, completeSearch } = useAuth();
  const record = getSearch(searchId);
  const [processing, setProcessing] = useState(record?.status === "processing");

  useEffect(() => {
    if (record?.status !== "processing") {
      setProcessing(false);
      return;
    }
    const timer = setTimeout(() => {
      completeSearch(searchId);
      setProcessing(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [record?.status, searchId, completeSearch]);

  if (!record) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-16 text-center sm:px-6">
        <h1 className="text-xl font-semibold">Search not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This search record is not available on your account.
        </p>
        <Button className="mt-6" asChild>
          <Link to="/dashboard">Back to dashboard</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <PageHeader
        eyebrow={`Search ${record.id.slice(0, 8)}`}
        title="Identification result"
        description={record.fileName}
        actions={
          <Button variant="outline" asChild>
            <Link to="/upload">New search</Link>
          </Button>
        }
      />

      <div className="mt-6 flex items-center gap-3">
        <Badge variant={processing ? "secondary" : "outline"}>
          {processing ? "Processing" : "Awaiting API result"}
        </Badge>
        {processing && (
          <span className="flex items-center gap-2 text-sm text-muted-foreground" aria-live="polite">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Analysing upload
          </span>
        )}
      </div>

      <dl className="mt-8 divide-y divide-border overflow-hidden rounded-lg border border-border bg-card">
        {RESULT_FIELDS.map((field) => (
          <div key={field.key} className="grid gap-1 px-5 py-4 sm:grid-cols-3 sm:gap-4">
            <dt className="label-eyebrow sm:pt-1">{field.label}</dt>
            <dd className="awaiting-value sm:col-span-2">
              {processing ? "[Processing]" : "[Awaiting API result]"}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-4 text-xs text-muted-foreground">
        This record is a structured placeholder. Values are populated by the identification API once
        connected.
      </p>
    </div>
  );
}
