"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  ArrowLeftRight,
  Plus,
  ChevronUp,
  FileText,
  SquarePen,
  ShoppingCart,
  ClipboardList,
  RefreshCw,
  Trash2,
  Check,
  X,
} from "lucide-react";

interface ApprovalStep {
  label: string;
}

interface RequisitionRow {
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

const initialRows: RequisitionRow[] = [
  {
    id: 1,
    projectType: "Real Estate",
    project: "Hena Heights",
    titleOfWork: "",
    code: "taz00017",
    ref: "",
    date: "08 Sept 2026",
    demandDate: "08 Sept 2026",
    addedBy: "Admin",
    approvalSteps: [{ label: "All Approvals Completed" }],
  },
  {
    id: 2,
    projectType: "Office",
    project: "Rifat Eyecon City",
    titleOfWork: "",
    code: "taz00016",
    ref: "",
    date: "08 Sept 2026",
    demandDate: "08 Sept 2026",
    addedBy: "Admin",
    approvalSteps: [{ label: "All Approvals Completed" }],
  },
  {
    id: 3,
    projectType: "Office",
    project: "Rifat Eyecon City",
    titleOfWork: "",
    code: "taz00015",
    ref: "",
    date: "08 Sept 2026",
    demandDate: "08 Sept 2026",
    addedBy: "Tazmul Reza",
    approvalSteps: [
      { label: "All Approvals Completed" },
      { label: "Rifat Hosain" },
      { label: "Admin" },
    ],
  },
  {
    id: 4,
    projectType: "Real Estate",
    project: "Lake Garden",
    titleOfWork: "",
    code: "taz00014",
    ref: "",
    date: "05 Sept 2026",
    demandDate: "06 Sept 2026",
    addedBy: "Admin",
    approvalSteps: [{ label: "All Approvals Completed" }],
  },
];

const actionButtons = [
  { label: "Multiple PO Convert", color: "bg-cyan-500 hover:bg-cyan-600" },
  { label: "Multiple RFQ Convert", color: "bg-violet-500 hover:bg-violet-600" },
  {
    label: "Multiple Purchase Convert",
    color: "bg-cyan-500 hover:bg-cyan-600",
  },
];

const tableHeaders = [
  "ID",
  "SELECT",
  "PROJECT TYPE",
  "PROJECT",
  "TITLE/NAME OF WORK",
  "CODE",
  "DATE",
  "DEMAND DATE",
  "ADDED BY",
  "APPROVAL LAYER",
  "ACTION",
];

// lg+ column widths (table-fixed), sums to 100%
const lgColumnWidths: Record<string, string> = {
  ID: "lg:w-[4%]",
  SELECT: "lg:w-[6%]",
  "PROJECT TYPE": "lg:w-[9%]",
  PROJECT: "lg:w-[11%]",
  "TITLE/NAME OF WORK": "lg:w-[11%]",
  CODE: "lg:w-[10%]",
  DATE: "lg:w-[8%]",
  "DEMAND DATE": "lg:w-[9%]",
  "ADDED BY": "lg:w-[9%]",
  "APPROVAL LAYER": "lg:w-[13%]",
  ACTION: "lg:w-[10%]",
};

// Editable text columns rendered as their own <td>, in table order.
// "code" also carries the Ref value underneath (Ref has no dedicated column).
const editableFields: { key: keyof RequisitionRow; placeholder?: string }[] = [
  { key: "projectType" },
  { key: "project" },
  { key: "titleOfWork", placeholder: "—" },
  { key: "code" },
  { key: "date" },
  { key: "demandDate" },
  { key: "addedBy" },
];

type RowActionKey =
  | "view"
  | "edit"
  | "convertToPurchase"
  | "convertToPurchaseOrder"
  | "convertToRfq"
  | "delete";

const rowActionMenu: {
  key: RowActionKey;
  label: string;
  icon: React.ElementType;
  color: string;
}[] = [
  { key: "view", label: "View", icon: FileText, color: "bg-indigo-500 hover:bg-indigo-600" },
  { key: "edit", label: "Edit", icon: SquarePen, color: "bg-teal-500 hover:bg-teal-600" },
  {
    key: "convertToPurchase",
    label: "Convert To Purchase",
    icon: ShoppingCart,
    color: "bg-teal-500 hover:bg-teal-600",
  },
  {
    key: "convertToPurchaseOrder",
    label: "Convert To Purchase Order",
    icon: ClipboardList,
    color: "bg-teal-500 hover:bg-teal-600",
  },
  {
    key: "convertToRfq",
    label: "Convert To RFQ",
    icon: RefreshCw,
    color: "bg-teal-500 hover:bg-teal-600",
  },
  { key: "delete", label: "Delete", icon: Trash2, color: "bg-red-500 hover:bg-red-600" },
];

const MaterialRequisitionList = () => {
  const [rows, setRows] = useState<RequisitionRow[]>(initialRows);
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [openActionRow, setOpenActionRow] = useState<number | null>(null);
  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  const [draftRow, setDraftRow] = useState<RequisitionRow | null>(null);

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
        ...visibleRows
          .map((r) => r.id)
          .filter((id) => !prev.includes(id)),
      ]);
    }
  };

  const toggleSelectRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const startEdit = (row: RequisitionRow) => {
    setDraftRow({ ...row });
    setEditingRowId(row.id);
    setOpenActionRow(null);
  };

  const cancelEdit = () => {
    setEditingRowId(null);
    setDraftRow(null);
  };

  const saveEdit = () => {
    if (!draftRow) return;
    setRows((prev) =>
      prev.map((r) => (r.id === draftRow.id ? draftRow : r))
    );
    setEditingRowId(null);
    setDraftRow(null);
  };

  const updateDraftField = (key: keyof RequisitionRow, value: string) => {
    setDraftRow((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const deleteRow = (id: number) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
    setSelectedRows((prev) => prev.filter((r) => r !== id));
    setOpenActionRow(null);
  };

  const handleRowAction = (key: RowActionKey, row: RequisitionRow) => {
    if (key === "edit") {
      startEdit(row);
      return;
    }
    if (key === "delete") {
      deleteRow(row.id);
      return;
    }
    // View / Convert actions: hooked up once the API is in place
    setOpenActionRow(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-700">
      <div className="flex-1 px-6 py-6 space-y-5">
        {/* Page header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-md shadow-indigo-200">
              <ClipboardList className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-[19px] font-bold text-slate-800 tracking-tight">
                Material Requisition List
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

          <div className="flex flex-wrap gap-2">
            {actionButtons.map((btn) => (
              <button
                key={btn.label}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[13px] font-medium text-white shadow-sm transition-colors ${btn.color}`}
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
                {btn.label}
              </button>
            ))}
            <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[13px] font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition-colors">
              <Plus className="w-3.5 h-3.5" />
              New Material Requisition
            </button>
          </div>
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
            <table className="w-full text-left border-collapse min-w-[900px] lg:min-w-0 lg:table-fixed">
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
              {visibleRows.map((row, idx) => {
                const isEditing = editingRowId === row.id;
                const activeRow = isEditing && draftRow ? draftRow : row;

                return (
                  <tr
                    key={row.id}
                    className={`hover:bg-slate-50/70 transition-colors ${
                      idx !== visibleRows.length - 1 ? "border-b border-slate-100" : ""
                    } ${isEditing ? "bg-indigo-50/40" : ""}`}
                  >
                    <td className="px-2.5 py-3 text-[13px] align-top">{row.id}</td>
                    <td className="px-2.5 py-3 align-top">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row.id)}
                        onChange={() => toggleSelectRow(row.id)}
                        className="w-3.5 h-3.5 accent-indigo-600"
                      />
                    </td>

                    {editableFields.map(({ key, placeholder }) => (
                      <td
                        key={key}
                        className="px-2.5 py-3 text-[13px] align-top whitespace-nowrap lg:whitespace-normal lg:break-words"
                      >
                        {isEditing ? (
                          <div className="space-y-1">
                            <input
                              type="text"
                              value={activeRow[key] as string}
                              onChange={(e) => updateDraftField(key, e.target.value)}
                              className="w-full min-w-[100px] px-2 py-1 text-[13px] border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            />
                            {key === "code" && (
                              <input
                                type="text"
                                value={activeRow.ref}
                                onChange={(e) => updateDraftField("ref", e.target.value)}
                                placeholder="Ref"
                                className="w-full min-w-[100px] px-2 py-1 text-[12px] border border-indigo-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                              />
                            )}
                          </div>
                        ) : (
                          <>
                            {(row[key] as string) || placeholder || "—"}
                            {key === "code" && row.ref && (
                              <span className="block text-[11px] text-slate-400">
                                Ref: {row.ref}
                              </span>
                            )}
                          </>
                        )}
                      </td>
                    ))}

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
                    <td className="px-2.5 py-3 align-top">
                      {isEditing ? (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={saveEdit}
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[12px] font-medium text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
                          >
                            <Check className="w-3.5 h-3.5" />
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[12px] font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="relative">
                          <button
                            onClick={() =>
                              setOpenActionRow((prev) =>
                                prev === row.id ? null : row.id
                              )
                            }
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium text-white bg-indigo-500 hover:bg-indigo-600 transition-colors"
                          >
                            Action
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>

                          {openActionRow === row.id && (
                            <div className="absolute right-0 mt-1.5 w-52 bg-white rounded-xl shadow-xl border border-slate-100 p-1.5 space-y-1 z-10">
                              {rowActionMenu.map(({ key, label, icon: Icon, color }) => (
                                <button
                                  key={key}
                                  onClick={() => handleRowAction(key, row)}
                                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[12.5px] font-medium text-white transition-colors ${color}`}
                                >
                                  <Icon className="w-3.5 h-3.5" />
                                  {label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}

              {visibleRows.length === 0 && (
                <tr>
                  <td
                    colSpan={tableHeaders.length}
                    className="px-3 py-6 text-center text-[13px] text-slate-400"
                  >
                    No matching records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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

export default MaterialRequisitionList;
