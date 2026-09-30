import Link from "next/link";
import { Tag } from "./Tag";
import { formatDate } from "@/lib/format";

/** Carte utilisée sur la page de liste /portfolio. */
export function ContentCard({
  href,
  title,
  description,
  date,
  dateLabel,
  tags,
  meta,
}: {
  href: string;
  title: string;
  description: string;
  date: string;
  /** Texte affiché à la place de la date formatée (ex. une période "22 juin – 28 août 2026"). */
  dateLabel?: string;
  tags?: string[];
  /** Emplacement libre pour une info spécifique à la section (ex: niveau, source). */
  meta?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="block rounded-lg border border-border p-5 transition-colors hover:border-accent"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
        <time dateTime={date}>{dateLabel ?? formatDate(date)}</time>
        {meta}
      </div>

      <h3 className="mt-2 font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>

      {tags && tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      )}
    </Link>
  );
}
