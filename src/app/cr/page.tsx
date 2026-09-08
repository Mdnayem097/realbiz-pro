"use client";

import { useState } from "react";
import {
  Search,
  CheckCircle2,
  Phone,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* ───────────────── Static mock data ───────────────── */
const summaryCards = [
  {
    title: "This Month Due for Recovery",
    value: "10,950,280.00",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    title: "This Month Due for Recovery Invoice",
    value: "3.00",
    gradient: "from-orange-400 to-red-500",
  },
  {
    title: "This Month Recovered",
    value: "0.00",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    title: "This Month Recovered %",
    value: "0.00%",
    gradient: "from-amber-400 to-yellow-600",
  },
  {
    title: "Outstanding Debts",
    value: "102,799,225",
    gradient: "from-cyan-500 to-teal-600",
  },
  {
    title: "Outstanding Overdue",
    value: "10,950,280",
    gradient: "from-fuchsia-500 to-pink-600",
  },
  {
    title: "Overdue debt %",
    value: "0.00%",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    title: "Overdue debt > 30D %",
    value: "0.00%",
    gradient: "from-teal-500 to-emerald-600",
  },
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
    daysOverdue: "5",
    delayAmount: "0",
    nextDueDate: "",
  },
];

const pendingVouchers = [
  {
    reference: "SaleOffer-5154844",
    project: "Sheba Eyecon Tower",
    contact: "Mr. Raju raz",
    addedBy: "Admin",
    date: "03-Sept-2026",
    note: "Approval Layer has not been set yet.",
  },
  {
    reference: "SaleOffer-4181717",
    project: "Lake Garden",
    contact: "Mr. Raju raz",
    addedBy: "Admin",
    date: "03-Sept-2026",
    note: "Approval Layer has not been set yet.",
  },
  {
    reference: "SaleOffer-566922",
    project: "Sheba Eyecon Tower",
    contact: "Mr. Raju raz",
    addedBy: "Admin",
    date: "03-Sept-2026",
    note: "Approval Layer has not been set yet.",
  },
  {
    reference: "SaleOffer-8597937",
    project: "Sheba Eyecon Tower",
    contact: "Mr. Raju raz",
    addedBy: "Admin",
    date: "03-Sept-2026",
    note: "Approval Layer has not been set yet.",
  },
];

const tabs = ["Today", "Weekly", "Monthly", "Yearly", "All"] as const;

export default function CreditRealizationPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("All");
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-700">
      {/* Top bar / module tabs */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center gap-2 flex-wrap">
        <button className="px-4 py-1.5 rounded-lg bg-violet-600 text-white text-sm font-medium shadow-sm">
          Credit Realization (CR)
        </button>
        <button className="px-4 py-1.5 rounded-lg text-slate-600 text-sm font-medium hover:bg-slate-100">
          Receipt Voucher
        </button>
        <button className="px-4 py-1.5 rounded-lg text-slate-600 text-sm font-medium hover:bg-slate-100">
          Overdue list
        </button>
        <button className="px-4 py-1.5 rounded-lg text-slate-600 text-sm font-medium hover:bg-slate-100 flex items-center gap-1">
          Reports
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <div className="p-5 flex gap-5">
        {/* ───────── Left main content ───────── */}
        <div className="flex-1 min-w-0 space-y-5">
          {/* Summary cards – 2 rows of 4 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {summaryCards.map((card) => (
              <div
                key={card.title}
                className={`rounded-xl bg-gradient-to-br ${card.gradient} p-4 text-white shadow-md`}
              >
                <p className="text-[12px] font-medium opacity-90 leading-tight">
                  {card.title}
                </p>
                <p className="mt-2 text-xl font-bold tracking-tight">
                  {card.value}
                </p>
              </div>
            ))}
          </div>

          {/* Table toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span>Show</span>
              <select
                value={entries}
                onChange={(e) => setEntries(Number(e.target.value))}
                className="border border-slate-200 rounded-md px-2 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-violet-300"
              >
                {[10, 25, 50, 100].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              <span>entries</span>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search:"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-3 py-1.5 border border-slate-200 rounded-lg text-sm w-52 focus:outline-none focus:ring-2 focus:ring-violet-300 bg-white"
              />
            </div>
          </div>

          {/* Data table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
                    <th className="px-3 py-3 font-medium whitespace-nowrap">ID</th>
                    <th className="px-3 py-3 font-medium whitespace-nowrap">PROJECT</th>
                    <th className="px-3 py-3 font-medium whitespace-nowrap">FLAT/LAND</th>
                    <th className="px-3 py-3 font-medium whitespace-nowrap">CUSTOMER NAME</th>
                    <th className="px-3 py-3 font-medium whitespace-nowrap">TOTAL VALUE</th>
                    <th className="px-3 py-3 font-medium whitespace-nowrap">PAID</th>
                    <th className="px-3 py-3 font-medium whitespace-nowrap">DUE</th>
                    <th className="px-3 py-3 font-medium whitespace-nowrap">INSTALLMENT DATE</th>
                    <th className="px-3 py-3 font-medium whitespace-nowrap">INSTALLMENT AMOUNT</th>
                    <th className="px-3 py-3 font-medium whitespace-nowrap">INSTALLMENT DUE</th>
                    <th className="px-3 py-3 font-medium whitespace-nowrap">SALES BY</th>
                    <th className="px-3 py-3 font-medium whitespace-nowrap">DAYS OVERDUE</th>
                    <th className="px-3 py-3 font-medium whitespace-nowrap">DELAY AMOUNT</th>
                    <th className="px-3 py-3 font-medium whitespace-nowrap">NEXT DUE DATE</th>
                    <th className="px-3 py-3 font-medium whitespace-nowrap">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="px-3 py-3 text-slate-500">{row.id}</td>
                      <td className="px-3 py-3 font-medium text-slate-800">
                        {row.project}
                      </td>
                      <td className="px-3 py-3">{row.flatLand}</td>
                      <td className="px-3 py-3">{row.customer}</td>
                      <td className="px-3 py-3">{row.totalValue}</td>
                      <td className="px-3 py-3">{row.paid}</td>
                      <td className="px-3 py-3 font-medium text-rose-600">
                        {row.due}
                      </td>
                      <td className="px-3 py-3">{row.installmentDate}</td>
                      <td className="px-3 py-3">{row.installmentAmount}</td>
                      <td className="px-3 py-3">{row.installmentDue}</td>
                      <td className="px-3 py-3">{row.salesBy || "—"}</td>
                      <td className="px-3 py-3 text-center">
                        <span className="inline-flex items-center justify-center min-w-[28px] h-6 px-1.5 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold">
                          {row.daysOverdue}
                        </span>
                      </td>
                      <td className="px-3 py-3">{row.delayAmount}</td>
                      <td className="px-3 py-3">{row.nextDueDate || "—"}</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-1.5">
                          <button
                            title="Approve / Mark"
                            className="w-8 h-8 rounded-lg bg-violet-100 text-violet-700 flex items-center justify-center hover:bg-violet-200 transition-colors"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                          <button
                            title="Call"
                            className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center hover:bg-sky-200 transition-colors"
                          >
                            <Phone className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 text-sm text-slate-500">
              <span>Showing 1 to 1 of 1 entries</span>
              <div className="flex items-center gap-1">
                <button className="px-2.5 py-1 rounded-md border border-slate-200 hover:bg-slate-50 disabled:opacity-40" disabled>
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="px-3 py-1 rounded-md bg-violet-600 text-white font-medium">
                  1
                </button>
                <button className="px-2.5 py-1 rounded-md border border-slate-200 hover:bg-slate-50 disabled:opacity-40" disabled>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ───────── Right sidebar – Pending Voucher/Invoice ───────── */}
        <div className="w-[340px] shrink-0">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden sticky top-5">
            {/* Period tabs */}
            <div className="flex border-b border-slate-100">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2.5 text-xs font-medium transition-colors ${
                    activeTab === tab
                      ? "bg-violet-600 text-white"
                      : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-4">
              <h3 className="text-sm font-semibold text-slate-800 mb-3">
                Pending Voucher/Invoice
              </h3>

              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search with Project/Code/Reference..."
                  className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-violet-300"
                />
              </div>

              <div className="space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
                {pendingVouchers.map((item) => (
                  <div
                    key={item.reference}
                    className="border border-slate-150 rounded-xl p-3.5 bg-slate-50/50 hover:bg-white hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="min-w-0">
                        <p className="text-[11px] text-slate-500">
                          Reference:{" "}
                          <span className="font-medium text-slate-700">
                            {item.reference}
                          </span>
                        </p>
                        <p className="text-[12px] font-medium text-slate-800 mt-0.5 truncate">
                          Project: {item.project}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Contact: {item.contact}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Added By: {item.addedBy}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {item.date}
                        </p>
                      </div>
                      <span className="shrink-0 px-2 py-0.5 rounded-md bg-orange-100 text-orange-700 text-[10px] font-semibold">
                        Offer
                      </span>
                    </div>

                    <p className="text-[11px] text-rose-600 font-medium mb-2">
                      {item.note}
                    </p>

                    <div className="flex justify-end">
                      <button className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center hover:bg-violet-200 transition-colors">
                        <Eye className="w-3.5 h-3.5" />
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