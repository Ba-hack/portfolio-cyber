import Link from "next/link";
import { Tag } from "./Tag";
import { formatDate } from "@/lib/format";

/**
 * Carte utilisée dans toutes les pages de liste (portfolio, formations,
 * recherches, veille) : un seul composant partagé pour garder un rendu
 * visuel cohérent entre les sections.
 */
export function ContentCard({
  href,
  title,
  description,
  date,
  tags,
  meta,
}: {
  href: string;
  title: string;
  description: string;
  date: string;
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
        <time dateTime={date}>{formatDate(date)}</time>
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
