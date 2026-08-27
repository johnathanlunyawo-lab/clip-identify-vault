import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { UploadCloud, FileCheck2 } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { RequireAuth } from "@/components/require-auth";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/upload")({
  head: () => ({
    meta: [
      { title: "Upload a clip — Frame ID" },
      { name: "description", content: "Upload a video clip, screenshot or image to run an identification." },
      { property: "og:title", content: "Upload a clip — Frame ID" },
      { property: "og:description", content: "Upload a video clip, screenshot or image to identify." },
    ],
  }),
  component: () => (
    <RequireAuth>
      <UploadPage />
    </RequireAuth>
  ),
});

const ACCEPT = "video/mp4,video/quicktime,video/webm,image/png,image/jpeg,image/webp";
const MAX_BYTES = 50 * 1024 * 1024;

function UploadPage() {
  const { createSearch, credits } = useAuth();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number | null>(null);

  function selectFile(next: File | null) {
    setError(null);
    if (!next) return;
    if (next.size > MAX_BYTES) {
      setError("File exceeds the 50 MB limit.");
      return;
    }
    setFile(next);
  }

  function submit() {
    if (!file) return;
    setProgress(0);
    let value = 0;
    const timer = setInterval(() => {
      value = Math.min(100, value + 20);
      setProgress(value);
      if (value >= 100) {
        clearInterval(timer);
        const record = createSearch({ name: file.name, type: file.type, size: file.size });
        router.navigate({ to: "/results/$searchId", params: { searchId: record.id } });
      }
    }, 250);
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <PageHeader
        eyebrow="New search"
        title="Upload a clip, screenshot or image"
        description="One upload consumes one credit. Files are processed against film and television catalogues."
      />

      <p className="mt-4 text-sm text-muted-foreground">
        Credits remaining: <span className="font-mono">{credits}</span>
      </p>

      <div
        className={`mt-6 rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
          dragging ? "border-accent bg-surface" : "border-border-strong bg-card"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          selectFile(e.dataTransfer.files?.[0] ?? null);
        }}
      >
        <UploadCloud className="mx-auto h-8 w-8 text-muted-foreground" aria-hidden="true" />
        <p className="mt-4 text-sm font-medium">Drag and drop a file here</p>
        <p className="mt-1 text-sm text-muted-foreground">or select one from your device</p>
        <Button
          type="button"
          variant="outline"
          className="mt-5"
          onClick={() => inputRef.current?.click()}
        >
          Choose file
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          className="sr-only"
          aria-label="Choose a file to upload"
          onChange={(e) => selectFile(e.target.files?.[0] ?? null)}
        />
        <p className="mt-5 font-mono text-xs text-muted-foreground">
          MP4, MOV, WEBM, PNG, JPG, WEBP · max 50 MB
        </p>
      </div>

      {error && (
        <p role="alert" className="mt-4 text-sm text-destructive">
          {error}
        </p>
      )}

      {file && (
        <div className="mt-6 rounded-lg border border-border bg-card p-5">
          <div className="flex items-start gap-3">
            <FileCheck2 className="mt-0.5 h-5 w-5 text-accent" aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{file.name}</p>
              <p className="font-mono text-xs text-muted-foreground">
                {file.type || "unknown type"} · {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          </div>

          {progress !== null && (
            <div className="mt-4" aria-live="polite">
              <Progress value={progress} />
              <p className="mt-2 font-mono text-xs text-muted-foreground">
                {progress < 100 ? `Uploading ${progress}%` : "Upload complete — starting analysis"}
              </p>
            </div>
          )}

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <Button onClick={submit} disabled={progress !== null} className="sm:w-auto">
              {progress !== null ? "Uploading…" : "Start identification"}
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setFile(null);
                setProgress(null);
              }}
              disabled={progress !== null}
            >
              Remove
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
