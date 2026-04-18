import Link from "next/link";

export const proGradient =
  "linear-gradient(135deg,#8B3A1E 0%,#C4622A 34%,#E8924A 68%,#F5C472 100%)";

export const proTextGradient = "linear-gradient(90deg,#C4622A 0%,#E8924A 48%,#F5C472 100%)";

export function ProWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={className}>
      <span className="text-[var(--pro-warm-white)]">Roost </span>
      <span className="bg-clip-text text-transparent" style={{ backgroundImage: proTextGradient }}>
        Pro
      </span>
    </span>
  );
}

export function ProInline({ className = "" }: { className?: string }) {
  return (
    <span className={className}>
      <span>Roost </span>
      <span className="bg-clip-text text-transparent" style={{ backgroundImage: proTextGradient }}>
        Pro
      </span>
    </span>
  );
}

export function ProBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`pro-shimmer relative inline-flex h-[18px] items-center overflow-hidden rounded-full px-2 text-[10px] font-medium text-[#FFF8F2] ${className}`}
      style={{ backgroundImage: proTextGradient }}
    >
      Pro
    </span>
  );
}

export function ProButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`pro-shimmer relative inline-flex min-h-[52px] items-center justify-center overflow-hidden rounded-full px-7 text-[15px] font-bold text-[#8B3A1E] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C472]/50 ${className}`}
      style={{ backgroundImage: proGradient }}
    >
      <span className="relative z-10">{children}</span>
    </Link>
  );
}
