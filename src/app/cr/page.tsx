"use client";

import { useState } from "react";
import {
  Search,
  CheckCircle2,
  Phone,
  Eye,
  FileText,
} from "lucide-react";

const summaryCards = [
  { title: "This Month Due for Recovery", value: "10,950,280.00", gradient: "from-emerald-400 to-teal-500" },
  { title: "This Month Due for Recovery Invoice", value: "3.00", gradient: "from-orange-400 to-rose-500" },
  { title: "This Month Recovered", value: "0.00", gradient: "from-blue-500 to-indigo-700" },
  { title: "This Month Recovered %", value: "0.00%", gradient: "from-amber-400 to-yellow-600" },
  { title: "Outstanding Debts", value: "102,799,225", gradient: "from-cyan-500 to-teal-600" },
  { title: "Outstanding Overdue", value: "10,950,280", gradient: "from-fuchsia-500 to-pink-600" },
  { title: "Overdue debt %", value: "0.00%", gradient: "from-violet-500 to-purple-700" },
  { title: "Overdue debt > 30D %", value: "0.00%", gradient: "from-teal-500 to-emerald-600" },
];

const tableRows = [
  {
    id: 1,
    project: "Sheba Eyecon Tower",
    flatLand: "F 3",
    customer: "Sagor kumar",
    totalValue: "10925000",
    paid: "122320",
    due: "10802680",
    installmentDate: "2026-09-03",
    installmentAmount: "10802680",
    installmentDue: "10802680",
    salesBy: "",
    daysOverdue: "6",
    delayAmount: "0",
    nextDueDate: "",
  },
];

const pendingVouchers = [
  { reference: "SaleOffer-5154844", project: "Sheba Eyecon Tower", contact: "Mr. Raju raz", addedBy: "Admin", date: "03-Sept-2026", note: "Approval Layer has not been set yet." },
  { reference: "SaleOffer-4181717", project: "Lake Garden", contact: "Mr. Raju raz", addedBy: "Admin", date: "03-Sept-2026", note: "Approval Layer has not been set yet." },
  { reference: "SaleOffer-566922", project: "Sheba Eyecon Tower", contact: "Mr. Raju raz", addedBy: "Admin", date: "03-Sept-2026", note: "Approval Layer has not been set yet." },
  { reference: "SaleOffer-8597937", project: "Sheba Eyecon Tower", contact: "Mr. Raju raz", addedBy: "Admin", date: "03-Sept-2026", note: "Approval Layer has not been set yet." },
];

const reportItems = [
  "Realization Summary Report",
  "Sale Collection Report",
  "Aging Report",
  "Installment Report",
];

const tabs = ["Today", "Weekly", "Monthly", "Yearly", "All"] as const;

export default function CreditRealizationPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("All");
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);

  return (
    <div className="flex flex-col bg-[#f4f5f7] text-slate-700" style={{ height: "100vh", overflow: "hidden" }}>
      {/* Top tabs */}
      <div className="shrink-0 bg-white border-b border-slate-200 px-5 py-2.5 flex items-center gap-1.5" style={{ overflow: "visible", position: "relative", zIndex: 50 }}>
        <button type="button" className="px-3.5 py-1.5 rounded-md bg-violet-600 text-white text-[13px] font-medium shadow-sm flex items-center gap-1.5">
          <span>$</span> Credit Realization (CR)
        </button>
        <button type="button" className="px-3.5 py-1.5 rounded-md text-slate-600 text-[13px] font-medium hover:bg-slate-100">
          Receipt Voucher
        </button>
        <button type="button" className="px-3.5 py-1.5 rounded-md text-slate-600 text-[13px] font-medium hover:bg-slate-100">
          Overdue list
        </button>

        {/* Native details dropdown – always works */}
        <details className="relative">
          <summary className="list-none px-3.5 py-1.5 rounded-md text-[13px] font-medium text-slate-600 hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer select-none [&::-webkit-details-marker]:hidden">
            <FileText className="w-3.5 h-3.5" />
            Reports
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>

          <div className="absolute left-0 top-full mt-1 w-56 bg-white rounded-md border border-slate-200 shadow-xl py-1 z-[9999]">
            {reportItems.map((label) => (
              <button
                key={label}
                type="button"
                onClick={(e) => {
                  const details = (e.target as HTMLElement).closest("details");
                  if (details) details.removeAttribute("open");
                  console.log("Report:", label);
                }}
                className="w-full text-left px-4 py-2.5 text-[13px] text-slate-700 hover:bg-violet-50 hover:text-violet-700 transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
        </details>
      </div>

      {/* Body */}
      <div className="flex-1 min-h-0 p-4 flex gap-4">
        {/* LEFT */}
        <div className="flex-1 min-w-0 min-h-0 flex flex-col gap-3">
          <div className="shrink-0 grid grid-cols-2 xl:grid-cols-4 gap-3">
            {summaryCards.map((card) => (
              <div key={card.title} className={`rounded-lg bg-gradient-to-br ${card.gradient} px-4 py-3 text-white shadow-sm`}>
                <p className="text-[11px] font-medium opacity-90 leading-snug">{card.title}</p>
                <p className="mt-1 text-[18px] font-bold tracking-tight tabular-nums">{card.value}</p>
              </div>
            ))}
          </div>

          <div className="shrink-0 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-[13px] text-slate-600">
              <span>Show</span>
              <select
                value={entries}
                onChange={(e) => setEntries(Number(e.target.value))}
                className="border border-slate-200 rounded px-2 py-1 text-[13px] bg-white"
              >
                {[10, 25, 50, 100].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
              <span>entries</span>
            </div>
            <div className="flex items-center gap-1.5 text-[13px]">
              <span className="text-slate-500">Search:</span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-slate-200 rounded px-2 py-1 text-[13px] w-36 bg-white"
              />
            </div>
          </div>

          <div className="flex-1 min-h-0 bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col overflow-hidden">
            <div className="flex-1 min-h-0 overflow-auto">
              <table className="w-full text-left text-[12.5px]">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
                    {["ID","PROJECT","FLAT/LAND","CUSTOMER NAME","TOTAL VALUE","PAID","DUE","INSTALLMENT DATE","INSTALLMENT AMOUNT","INSTALLMENT DUE","SALES BY","DAYS OVERDUE","DELAY AMOUNT","NEXT DUE DATE","ACTION"].map((h) => (
                      <th key={h} className="px-2.5 py-2.5 font-semibold whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row) => (
                    <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50/70">
                      <td className="px-2.5 py-2.5 text-slate-500">{row.id}</td>
                      <td className="px-2.5 py-2.5 font-medium text-slate-800">{row.project}</td>
                      <td className="px-2.5 py-2.5">{row.flatLand}</td>
                      <td className="px-2.5 py-2.5">{row.customer}</td>
                      <td className="px-2.5 py-2.5 tabular-nums">{row.totalValue}</td>
                      <td className="px-2.5 py-2.5 tabular-nums">{row.paid}</td>
                      <td className="px-2.5 py-2.5 tabular-nums font-medium text-rose-600">{row.due}</td>
                      <td className="px-2.5 py-2.5">{row.installmentDate}</td>
                      <td className="px-2.5 py-2.5 tabular-nums">{row.installmentAmount}</td>
                      <td className="px-2.5 py-2.5 tabular-nums">{row.installmentDue}</td>
                      <td className="px-2.5 py-2.5 text-slate-400">{row.salesBy || ""}</td>
                      <td className="px-2.5 py-2.5 text-center">
                        <span className="inline-flex items-center justify-center min-w-[24px] h-5 px-1 rounded-full bg-rose-100 text-rose-700 text-[11px] font-semibold">
                          {row.daysOverdue}
                        </span>
                      </td>
                      <td className="px-2.5 py-2.5 tabular-nums">{row.delayAmount}</td>
                      <td className="px-2.5 py-2.5 text-slate-400">{row.nextDueDate || ""}</td>
                      <td className="px-2.5 py-2.5">
                        <div className="flex items-center gap-1">
                          <button type="button" className="w-7 h-7 rounded-md bg-violet-600 text-white flex items-center justify-center hover:bg-violet-700">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </button>
                          <button type="button" className="w-7 h-7 rounded-md bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600">
                            <Phone className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="shrink-0 flex items-center justify-between px-3 py-2 border-t border-slate-100 text-[13px] text-slate-500">
              <span>Showing 1 to 1 of 1 entries</span>
              <div className="flex items-center gap-1">
                <button type="button" disabled className="px-2.5 py-1 rounded border border-slate-200 text-slate-400 disabled:opacity-50">Previous</button>
                <button type="button" className="px-2.5 py-1 rounded bg-violet-600 text-white font-medium">1</button>
                <button type="button" disabled className="px-2.5 py-1 rounded border border-slate-200 text-slate-400 disabled:opacity-50">Next</button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-[320px] shrink-0 min-h-0 flex flex-col">
          <div className="flex-1 min-h-0 bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col overflow-hidden">
            <div className="shrink-0 flex border-b border-slate-100">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 text-[11px] font-semibold ${
                    activeTab === tab ? "bg-violet-600 text-white" : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex-1 min-h-0 p-3.5 flex flex-col">
              <h3 className="shrink-0 text-[13px] font-semibold text-slate-800 text-center mb-3">
                Pending Voucher/Invoice
              </h3>
              <div className="shrink-0 relative mb-3">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search with Project/Code/Reference..."
                  className="w-full pl-8 pr-2.5 py-1.5 border border-slate-200 rounded-md text-[11px]"
                />
              </div>
              <div className="flex-1 min-h-0 overflow-y-auto space-y-2.5">
                {pendingVouchers.map((item) => (
                  <div key={item.reference} className="border border-slate-200 rounded-lg p-3 bg-white">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 text-[11px] leading-relaxed">
                        <p className="text-slate-500">Reference: <span className="font-medium text-slate-700">{item.reference}</span></p>
                        <p className="font-medium text-slate-800 mt-0.5">Project: {item.project}</p>
                        <p className="text-slate-500">Contact: {item.contact}</p>
                        <p className="text-slate-500">Added By: {item.addedBy}</p>
                        <p className="text-slate-400">{item.date}</p>
                      </div>
                      <span className="shrink-0 px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 text-[10px] font-semibold">Offer</span>
                    </div>
                    <p className="text-[11px] text-rose-600 font-medium mt-1.5">{item.note}</p>
                    <div className="flex justify-end mt-2">
                      <button type="button" className="w-6 h-6 rounded-full bg-violet-600 text-white flex items-center justify-center hover:bg-violet-700">
                        <Eye className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}