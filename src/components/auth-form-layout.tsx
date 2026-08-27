import { Link } from "@tanstack/react-router";

export function AuthFormLayout({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-md px-4 py-12 sm:px-6 sm:py-20">
      <Link to="/" className="label-eyebrow">
        Frame ID
      </Link>
      <h1 className="mt-3 text-2xl font-semibold">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <div className="mt-8 rounded-lg border border-border bg-card p-6 shadow-panel">{children}</div>
      {footer && <div className="mt-6 text-sm text-muted-foreground">{footer}</div>}
    </div>
  );
}
