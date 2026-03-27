import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-12 px-6" role="contentinfo">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {APP_NAME} · {year}
        </p>
        <div className="flex flex-col items-center gap-2 text-center sm:items-end sm:text-right">
          <p className="text-sm text-muted-foreground">
            Your data lives in your own private database.{" "}
            <span className="text-muted-foreground/60">
              No tracking, no ads, no third parties.
            </span>
          </p>
          <Link
            href="/privacy"
            className="text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
