"use client";

import { useMemo, useState } from "react";
import { Search, Plus, Download } from "lucide-react";

export interface CrmColumn {
  key: string;
  label: string;
}

export interface CrmPageData {
  breadcrumb: string;
  title: string;
  description: string;
  addLabel?: string;
  columns: CrmColumn[];
  rows: Record<string, string | number>[];
}

export function CrmPageTemplate({
  breadcrumb,
  title,
  description,
  addLabel,
  columns,
  rows,
}: CrmPageData) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return rows;
    const q = query.toLowerCase();
    return rows.filter((row) =>
      columns.some((col) => String(row[col.key] ?? "").toLowerCase().includes(q)),
    );
  }, [query, rows, columns]);

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[11.5px] text-ink-faint">{breadcrumb}</p>
        <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-[family-name:var(--font-display)] text-[19px] font-semibold text-ink">
              {title}
            </h1>
            <p className="text-[13px] text-ink-muted mt-0.5">{description}</p>
          </div>
          {addLabel && (
            <button className="flex items-center gap-1.5 rounded-md bg-accent px-3.5 py-2 text-[13px] font-medium text-white transition-opacity hover:opacity-90">
              <Plus size={15} />
              {addLabel}
            </button>
          )}
        </div>
      </div>

      <div className="rounded-lg border border-border bg-surface">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-3.5">
          <div className="relative w-full max-w-xs">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full rounded-md border border-border bg-canvas pl-8 pr-3 py-1.5 text-[12.5px] text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent-soft"
            />
          </div>
          <button className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-[12.5px] font-medium text-ink-muted transition-colors hover:text-ink hover:bg-canvas">
            <Download size={13} />
            Export
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border bg-canvas">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="whitespace-nowrap px-4 py-2.5 text-[11.5px] font-semibold text-ink-muted"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((row, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-canvas/60">
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className="whitespace-nowrap px-4 py-2.5 text-[13px] text-ink"
                      >
                        {row[col.key]}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-8 text-center text-[12.5px] text-ink-faint"
                  >
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-[11.5px] text-ink-faint">
          <span>
            Showing {filtered.length} of {rows.length} entries
          </span>
        </div>
      </div>
    </div>
  );
}
