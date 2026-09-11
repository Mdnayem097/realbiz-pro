"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  Plus,
  ChevronUp,
  Package,
} from "lucide-react";

interface ApprovalStep {
  label: string;
}

interface AssetRequisitionRow {
  id: number;
  projectType: string;
  project: string;
  titleOfWork: string;
  code: string;
  ref: string;
  date: string;
  demandDate: string;
  addedBy: string;
  approvalSteps: ApprovalStep[];
}

// No data yet — wire this up to the API later
const initialRows: AssetRequisitionRow[] = [];

const tableHeaders = [
  "ID",
  "SELECT",
  "PROJECT TYPE",
  "PROJECT",
  "TITLE/NAME OF WORK",
  "CODE",
  "REF",
  "DATE",
  "DEMAND DATE",
  "ADDED BY",
  "APPROVAL LAYER",
  "ATTACHMENT",
  "ACTION",
];

// lg+ column widths (table-fixed), sums to 100%
const lgColumnWidths: Record<string, string> = {
  ID: "lg:w-[3%]",
  SELECT: "lg:w-[5%]",
  "PROJECT TYPE": "lg:w-[8%]",
  PROJECT: "lg:w-[10%]",
  "TITLE/NAME OF WORK": "lg:w-[10%]",
  CODE: "lg:w-[8%]",
  REF: "lg:w-[5%]",
  DATE: "lg:w-[7%]",
  "DEMAND DATE": "lg:w-[8%]",
  "ADDED BY": "lg:w-[8%]",
  "APPROVAL LAYER": "lg:w-[12%]",
  ATTACHMENT: "lg:w-[7%]",
  ACTION: "lg:w-[9%]",
};

const AssetRequisitionList = () => {
  const [rows] = useState<AssetRequisitionRow[]>(initialRows);
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      [r.project, r.projectType, r.code, r.addedBy].some((field) =>
        field.toLowerCase().includes(q)
      )
    );
  }, [search, rows]);

  const visibleRows = filteredRows.slice(0, entriesPerPage);

  const allVisibleSelected =
    visibleRows.length > 0 &&
    visibleRows.every((r) => selectedRows.includes(r.id));

  const toggleSelectAll = () => {
    if (allVisibleSelected) {
      setSelectedRows((prev) =>
        prev.filter((id) => !visibleRows.some((r) => r.id === id))
      );
    } else {
      setSelectedRows((prev) => [
        ...prev,
        ...visibleRows.map((r) => r.id).filter((id) => !prev.includes(id)),
      ]);
    }
  };

  const toggleSelectRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-700">
      <div className="flex-1 px-6 py-6 space-y-5">
        {/* Page header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-md shadow-indigo-200">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-[19px] font-bold text-slate-800 tracking-tight">
                Asset Requisition List
              </h1>
              <nav className="flex items-center gap-1.5 text-[12.5px] text-slate-400">
                <Link href="/" className="hover:text-indigo-600 transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-3 h-3" />
                <button className="flex items-center gap-0.5 hover:text-indigo-600 transition-colors">
                  Requisition
                  <ChevronDown className="w-3 h-3" />
                </button>
                <ChevronRight className="w-3 h-3" />
                <span className="text-slate-500">List</span>
              </nav>
            </div>
          </div>

          <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[13px] font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition-colors">
            <Plus className="w-3.5 h-3.5" />
            New Asset Requisition
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm shadow-slate-200/50 p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-[13px] text-slate-500 mb-1.5">
                Select Date
              </label>
              <input
                type="text"
                readOnly
                value="1 September, 2026 - 30 September, 2026"
                className="w-full px-3.5 py-2.5 text-[13px] bg-slate-50 border border-slate-200 rounded-xl text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            <div>
              <label className="block text-[13px] text-slate-500 mb-1.5">
                Company
              </label>
              <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[13px] text-slate-700">
                <span>Somikoron IT Ltd</span>
                <div className="flex items-center gap-2 text-slate-400">
                  <button aria-label="Clear company">✕</button>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[13px] text-slate-500 mb-1.5">
                Supplier
              </label>
              <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[13px] text-slate-400">
                <span>Select an option</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>

            <div>
              <label className="block text-[13px] text-slate-500 mb-1.5">
                Project
              </label>
              <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[13px] text-slate-400">
                <span>Select value</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <div>
              <label className="block text-[13px] text-slate-500 mb-1.5">
                Title/Name of Work
              </label>
              <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[13px] text-slate-400">
                <span>Select Title/Name of Work</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Table card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm shadow-slate-200/50 overflow-hidden">
          {/* Table controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
            <div className="flex items-center gap-2 text-[13px] text-slate-500">
              <span>Show</span>
              <select
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-indigo-200"
              >
                {[10, 25, 50, 100].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              <span>entries</span>
            </div>

            <div className="flex items-center gap-2 text-[13px] text-slate-500">
              <span>Search:</span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-[13px] w-48 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px] lg:min-w-0 lg:table-fixed">
              <thead>
                <tr className="bg-indigo-50/70 text-indigo-700">
                  {tableHeaders.map((header) => (
                    <th
                      key={header}
                      className={`px-2.5 py-3 text-[11px] font-semibold tracking-wide whitespace-nowrap lg:whitespace-normal ${lgColumnWidths[header]}`}
                    >
                      {header === "SELECT" ? (
                        <div className="flex items-center gap-1.5">
                          <input
                            type="checkbox"
                            checked={allVisibleSelected}
                            onChange={toggleSelectAll}
                            className="w-3.5 h-3.5 accent-indigo-600"
                          />
                          {header}
                        </div>
                      ) : header === "ID" ? (
                        <div className="flex items-center gap-1">
                          {header}
                          <ChevronUp className="w-3 h-3" />
                        </div>
                      ) : (
                        header
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={`hover:bg-slate-50/70 transition-colors ${
                      idx !== visibleRows.length - 1
                        ? "border-b border-slate-100"
                        : ""
                    }`}
                  >
                    <td className="px-2.5 py-3 text-[13px] align-top">
                      {row.id}
                    </td>
                    <td className="px-2.5 py-3 align-top">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row.id)}
                        onChange={() => toggleSelectRow(row.id)}
                        className="w-3.5 h-3.5 accent-indigo-600"
                      />
                    </td>
                    <td className="px-2.5 py-3 text-[13px] align-top whitespace-nowrap lg:whitespace-normal lg:break-words">
                      {row.projectType}
                    </td>
                    <td className="px-2.5 py-3 text-[13px] align-top whitespace-nowrap lg:whitespace-normal lg:break-words">
                      {row.project}
                    </td>
                    <td className="px-2.5 py-3 text-[13px] align-top whitespace-nowrap lg:whitespace-normal lg:break-words">
                      {row.titleOfWork || "—"}
                    </td>
                    <td className="px-2.5 py-3 text-[13px] align-top whitespace-nowrap lg:whitespace-normal lg:break-words">
                      {row.code}
                    </td>
                    <td className="px-2.5 py-3 text-[13px] align-top whitespace-nowrap lg:whitespace-normal lg:break-words">
                      {row.ref || "—"}
                    </td>
                    <td className="px-2.5 py-3 text-[13px] align-top whitespace-nowrap lg:whitespace-normal">
                      {row.date}
                    </td>
                    <td className="px-2.5 py-3 text-[13px] align-top whitespace-nowrap lg:whitespace-normal">
                      {row.demandDate}
                    </td>
                    <td className="px-2.5 py-3 text-[13px] align-top whitespace-nowrap lg:whitespace-normal">
                      {row.addedBy}
                    </td>
                    <td className="px-2.5 py-3 text-[13px] align-top">
                      <div className="flex flex-col gap-0.5">
                        {row.approvalSteps.map((step) => (
                          <span
                            key={step.label}
                            className="flex items-center gap-1 text-emerald-600"
                          >
                            ✓ {step.label}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-2.5 py-3 text-[13px] align-top" />
                    <td className="px-2.5 py-3 align-top">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium text-white bg-indigo-500 hover:bg-indigo-600 transition-colors">
                        Action
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}

                {visibleRows.length === 0 && (
                  <tr>
                    <td
                      colSpan={tableHeaders.length}
                      className="px-3 py-6 text-center text-[13px] text-slate-400"
                    >
                      No data available in table
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-t border-slate-100">
            <span className="text-[12.5px] text-slate-400">
              Showing {visibleRows.length === 0 ? 0 : 1} to{" "}
              {visibleRows.length} of {filteredRows.length} entries
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled
                className="px-3.5 py-1.5 rounded-lg text-[13px] font-medium text-slate-400 bg-slate-100 cursor-not-allowed"
              >
                Previous
              </button>
              <button
                disabled
                className="px-3.5 py-1.5 rounded-lg text-[13px] font-medium text-slate-400 bg-slate-100 cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="flex flex-wrap items-center justify-between gap-2 px-6 py-4 bg-white border-t border-slate-100 text-[12px] text-slate-500">
        <span>2026 © Somikoron IT LTD</span>
        <span>Design &amp; Developed by Somikoron IT LTD</span>
      </footer>
    </div>
  );
};

export default AssetRequisitionList;
