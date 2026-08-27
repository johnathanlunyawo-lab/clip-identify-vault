import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import type { SearchRecord } from "@/lib/account-store";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatSize(bytes: number) {
  if (!bytes) return "—";
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export function SearchHistoryTable({ records }: { records: SearchRecord[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card">
      <table className="w-full min-w-[36rem] text-left text-sm">
        <caption className="sr-only">Search history</caption>
        <thead className="border-b border-border">
          <tr className="label-eyebrow">
            <th scope="col" className="px-4 py-3 font-normal">File</th>
            <th scope="col" className="px-4 py-3 font-normal">Submitted</th>
            <th scope="col" className="px-4 py-3 font-normal">Size</th>
            <th scope="col" className="px-4 py-3 font-normal">Status</th>
            <th scope="col" className="px-4 py-3 font-normal text-right">Result</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id} className="border-b border-border last:border-0">
              <td className="max-w-[14rem] truncate px-4 py-3 font-medium">{record.fileName}</td>
              <td className="px-4 py-3 text-muted-foreground">{formatDate(record.createdAt)}</td>
              <td className="px-4 py-3 tabular-nums text-muted-foreground">
                {formatSize(record.fileSize)}
              </td>
              <td className="px-4 py-3">
                <Badge variant={record.status === "processing" ? "secondary" : "outline"}>
                  {record.status}
                </Badge>
              </td>
              <td className="px-4 py-3 text-right">
                <Link
                  to="/results/$searchId"
                  params={{ searchId: record.id }}
                  className="underline underline-offset-4"
                >
                  Open
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
