"use client";

import { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  FileSpreadsheet,
  FileText,
  ListFilter,
} from "lucide-react";

interface GrnItemRow {
  id: number;
  date: string;
  poNo: string;
  grnNo: string;
  billNo: string;
  supplierName: string;
  itemName: string;
  grnQty: number;
  alreadyBillQty: number;
  grnTotal: number;
  billTotal: number;
}

// Hardcoded for now — API wiring comes later
const initialRows: GrnItemRow[] = [
  {
    id: 1,
    date: "2026-09-07",
    poNo: "PUR1782229",
    grnNo: "GRN7501856",
    billNo: "",
    supplierName: "Mohin Business solution__",
    itemName: "Sand (FM 2.50)",
    grnQty: 5,
    alreadyBillQty: 0,
    grnTotal: 255,
    billTotal: 0,
  },
  {
    id: 2,
    date: "2026-09-08",
    poNo: "PUR4141481",
    grnNo: "PUR4141481",
    billNo: "",
    supplierName: "Safety First Suppliers__",
    itemName: "10mm Rod",
    grnQty: 100,
    alreadyBillQty: 0,
    grnTotal: 8200,
    billTotal: 0,
  },
  {
    id: 3,
    date: "2026-09-08",
    poNo: "PUR4141481",
    grnNo: "PUR4141481",
    billNo: "",
    supplierName: "Safety First Suppliers__",
    itemName: "16mm Rod",
    grnQty: 100,
    alreadyBillQty: 0,
    grnTotal: 8200,
    billTotal: 0,
  },
  {
    id: 4,
    date: "2026-09-08",
    poNo: "PUR4141481",
    grnNo: "PUR4141481",
    billNo: "",
    supplierName: "Safety First Suppliers__",
    itemName: "Cement (OPC/ CEM -I)",
    grnQty: 100,
    alreadyBillQty: 0,
    grnTotal: 48100,
    billTotal: 0,
  },
  {
    id: 5,
    date: "2026-09-08",
    poNo: "PUR4141481",
    grnNo: "PUR4141481",
    billNo: "",
    supplierName: "Safety First Suppliers__",
    itemName: "Sand (FM 2.50)",
    grnQty: 500,
    alreadyBillQty: 0,
    grnTotal: 46250,
    billTotal: 0,
  },
  {
    id: 6,
    date: "2026-09-07",
    poNo: "PUR8777873",
    grnNo: "PUR8777873",
    billNo: "",
    supplierName: "Mohin Business solution__",
    itemName: "10mm Rod",
    grnQty: 50,
    alreadyBillQty: 0,
    grnTotal: 4100,
    billTotal: 0,
  },
  {
    id: 7,
    date: "2026-09-07",
    poNo: "PUR8777873",
    grnNo: "PUR8777873",
    billNo: "",
    supplierName: "Mohin Business solution__",
    itemName: "Cement (OPC/ CEM -I)",
    grnQty: 50,
    alreadyBillQty: 0,
    grnTotal: 24050,
    billTotal: 0,
  },
  {
    id: 8,
    date: "2026-09-07",
    poNo: "PUR8777873",
    grnNo: "PUR8777873",
    billNo: "",
    supplierName: "Mohin Business solution__",
    itemName: "Main Door Frame",
    grnQty: 20,
    alreadyBillQty: 0,
    grnTotal: 70000,
    billTotal: 0,
  },
  {
    id: 9,
    date: "2026-09-08",
    poNo: "PUR8777874",
    grnNo: "PUR8777874",
    billNo: "",
    supplierName: "Mohin Business solution__",
    itemName: "Bamboo",
    grnQty: 1000,
    alreadyBillQty: 0,
    grnTotal: 450000,
    billTotal: 0,
  },
  {
    id: 10,
    date: "2026-09-07",
    poNo: "PUR7987200",
    grnNo: "PUR7987200",
    billNo: "",
    supplierName: "Delta Glass & Aluminium__",
    itemName: "Cement (PCC/ CEM -II)",
    grnQty: 500,
    alreadyBillQty: 0,
    grnTotal: 250000,
    billTotal: 0,
  },
  {
    id: 11,
    date: "2026-09-09",
    poNo: "PUR7987201",
    grnNo: "PUR7987201",
    billNo: "",
    supplierName: "Delta Glass & Aluminium__",
    itemName: "Aluminium Sheet",
    grnQty: 100,
    alreadyBillQty: 0,
    grnTotal: 50000,
    billTotal: 0,
  },
];

const tableHeaders = [
  "ID",
  "DATE",
  "PO NO",
  "GRN NO",
  "BILL NO",
  "SUPPLIER NAME",
  "ITEM NAME",
  "GRN QTY",
  "ALREADY BILL QTY",
  "GRN TOTAL",
  "BILL TOTAL",
];

const lgColumnWidths: Record<string, string> = {
  ID: "lg:w-[4%]",
  DATE: "lg:w-[8%]",
  "PO NO": "lg:w-[10%]",
  "GRN NO": "lg:w-[10%]",
  "BILL NO": "lg:w-[8%]",
  "SUPPLIER NAME": "lg:w-[15%]",
  "ITEM NAME": "lg:w-[16%]",
  "GRN QTY": "lg:w-[8%]",
  "ALREADY BILL QTY": "lg:w-[9%]",
  "GRN TOTAL": "lg:w-[8%]",
  "BILL TOTAL": "lg:w-[8%]",
};

const number = new Intl.NumberFormat("en-US");

const AssetPurchaseBillCreate = () => {
  const [rows] = useState<GrnItemRow[]>(initialRows);
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      [r.poNo, r.grnNo, r.billNo, r.supplierName, r.itemName].some((field) =>
        field.toLowerCase().includes(q)
      )
    );
  }, [search, rows]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRows.length / entriesPerPage)
  );
  const safePage = Math.min(currentPage, totalPages);
  const startIdx = (safePage - 1) * entriesPerPage;
  const visibleRows = filteredRows.slice(startIdx, startIdx + entriesPerPage);

  const totals = useMemo(
    () =>
      filteredRows.reduce(
        (acc, r) => ({
          grnQty: acc.grnQty + r.grnQty,
          alreadyBillQty: acc.alreadyBillQty + r.alreadyBillQty,
          grnTotal: acc.grnTotal + r.grnTotal,
          billTotal: acc.billTotal + r.billTotal,
        }),
        { grnQty: 0, alreadyBillQty: 0, grnTotal: 0, billTotal: 0 }
      ),
    [filteredRows]
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-700">
      <div className="flex-1 px-6 py-6 space-y-5">
        {/* Filter card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm shadow-slate-200/50 p-5 space-y-4">
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
                GRN(s)
              </label>
              <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[13px] text-slate-400">
                <span>Select Invoice(s)</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>

            <div>
              <label className="block text-[13px] text-slate-500 mb-1.5">
                Category
              </label>
              <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[13px] text-slate-400">
                <span>Select Category</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>

            <div>
              <label className="block text-[13px] text-slate-500 mb-1.5">
                Select Item
              </label>
              <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[13px] text-slate-400">
                <span>Select Item</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
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
                Select Project<span className="text-red-500">*</span>
              </label>
              <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[13px] text-slate-400">
                <span>Select Project</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:col-span-2 lg:col-span-2 lg:justify-end">
              <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-white bg-emerald-500 hover:bg-emerald-600 shadow-sm shadow-emerald-200 transition-colors">
                <FileSpreadsheet className="w-4 h-4" />
                Excel
              </button>
              <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-white bg-rose-500 hover:bg-rose-600 shadow-sm shadow-rose-200 transition-colors">
                <FileText className="w-4 h-4" />
                PDF
              </button>
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
                onChange={(e) => {
                  setEntriesPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
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
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-[13px] w-48 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1050px] lg:min-w-0 lg:table-fixed">
              <thead>
                <tr className="bg-indigo-50/70 text-indigo-700">
                  {tableHeaders.map((header) => (
                    <th
                      key={header}
                      className={`px-2.5 py-3 text-[11px] font-semibold tracking-wide whitespace-nowrap lg:whitespace-normal ${lgColumnWidths[header]}`}
                    >
                      {header === "ID" ? (
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
                    <td className="px-2.5 py-3 text-[13px] align-top whitespace-nowrap">
                      {row.date}
                    </td>
                    <td className="px-2.5 py-3 text-[13px] align-top whitespace-nowrap lg:whitespace-normal lg:break-words">
                      {row.poNo}
                    </td>
                    <td className="px-2.5 py-3 text-[13px] align-top whitespace-nowrap lg:whitespace-normal lg:break-words">
                      {row.grnNo}
                    </td>
                    <td className="px-2.5 py-3 text-[13px] align-top whitespace-nowrap">
                      {row.billNo || "—"}
                    </td>
                    <td className="px-2.5 py-3 text-[13px] align-top whitespace-nowrap lg:whitespace-normal lg:break-words">
                      {row.supplierName}
                    </td>
                    <td className="px-2.5 py-3 text-[13px] align-top whitespace-nowrap lg:whitespace-normal lg:break-words">
                      {row.itemName}
                    </td>
                    <td className="px-2.5 py-3 text-[13px] align-top whitespace-nowrap">
                      {number.format(row.grnQty)}
                    </td>
                    <td className="px-2.5 py-3 text-[13px] align-top whitespace-nowrap">
                      {number.format(row.alreadyBillQty)}
                    </td>
                    <td className="px-2.5 py-3 text-[13px] align-top whitespace-nowrap font-medium text-slate-800">
                      {number.format(row.grnTotal)}
                    </td>
                    <td className="px-2.5 py-3 text-[13px] align-top whitespace-nowrap">
                      {number.format(row.billTotal)}
                    </td>
                  </tr>
                ))}

                {visibleRows.length === 0 && (
                  <tr>
                    <td
                      colSpan={tableHeaders.length}
                      className="px-3 py-16"
                    >
                      <div className="flex flex-col items-center justify-center gap-2 text-center">
                        <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100">
                          <ListFilter className="w-5 h-5 text-slate-300" />
                        </div>
                        <p className="text-[13px] font-medium text-slate-500">
                          No data available in table
                        </p>
                        <p className="text-[12px] text-slate-400">
                          Adjust your filters to find GRN items.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
              {visibleRows.length > 0 && (
                <tfoot>
                  <tr className="bg-slate-50/70 border-t border-slate-100 font-semibold text-slate-700">
                    <td
                      className="px-2.5 py-3 text-[13px]"
                      colSpan={7}
                    />
                    <td className="px-2.5 py-3 text-[13px] whitespace-nowrap">
                      {number.format(totals.grnQty)}
                    </td>
                    <td className="px-2.5 py-3 text-[13px] whitespace-nowrap">
                      {number.format(totals.alreadyBillQty)}
                    </td>
                    <td className="px-2.5 py-3 text-[13px] whitespace-nowrap">
                      {number.format(totals.grnTotal)}
                    </td>
                    <td className="px-2.5 py-3 text-[13px] whitespace-nowrap">
                      {number.format(totals.billTotal)}
                    </td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>

          {/* Pagination footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-t border-slate-100">
            <span className="text-[12.5px] text-slate-400">
              Showing {filteredRows.length === 0 ? 0 : startIdx + 1} to{" "}
              {startIdx + visibleRows.length} of {filteredRows.length} entries
            </span>
            <div className="flex items-center gap-1.5">
              <button
                disabled={safePage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-3.5 py-1.5 rounded-lg text-[13px] font-medium text-slate-500 bg-slate-100 hover:bg-slate-200 disabled:text-slate-300 disabled:hover:bg-slate-100 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg text-[13px] font-medium transition-colors ${
                      page === safePage
                        ? "bg-indigo-600 text-white"
                        : "text-slate-500 bg-slate-100 hover:bg-slate-200"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                disabled={safePage === totalPages}
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                className="px-3.5 py-1.5 rounded-lg text-[13px] font-medium text-slate-500 bg-slate-100 hover:bg-slate-200 disabled:text-slate-300 disabled:hover:bg-slate-100 disabled:cursor-not-allowed transition-colors"
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

export default AssetPurchaseBillCreate;
