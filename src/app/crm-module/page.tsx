"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sidebar } from "@/components/crm/sidebar";
import { Topbar } from "@/components/crm/topbar";
import { StatGrid } from "@/components/crm/stat-grid";
import { TodoStrip } from "@/components/crm/todo-strip";
import { LiveFeed } from "@/components/crm/live-feed";
import { CalendarPanel, RANGES } from "@/components/crm/calender-panel";
import { ActivityChart } from "@/components/crm/activity-chart";
import { PropertyStatusChart } from "@/components/crm/property-status-chart";
import { fetchStatCards, fetchTodoSummary, type StatCardData, type TodoSummaryItem } from "@/lib/api";

export default function CrmModulePage() {
  const [stats, setStats] = useState<StatCardData[]>([]);
  const [todo, setTodo] = useState<TodoSummaryItem[]>([]);
  const [range, setRange] = useState<(typeof RANGES)[number]>("Today");

  useEffect(() => {
    fetchStatCards().then(setStats);
    fetchTodoSummary().then(setTodo);
  }, []);

  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar />

      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar />

        <main className="flex-1 px-4 md:px-6 py-5 space-y-5 max-w-350 w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <h1 className="font-display text-[19px] font-semibold text-ink">
              Overview
            </h1>
            <p className="text-[13px] text-ink-muted mt-0.5">
              Lead activity and pipeline status across all agents.
            </p>
          </motion.div>

          <StatGrid stats={stats} />

          <TodoStrip items={todo} />

          <div className="grid grid-cols-1 xl:grid-cols-[1.3fr_1fr] gap-5">
            <div className="space-y-5">
              <LiveFeed />
              <ActivityChart range={range} />
              <PropertyStatusChart />
            </div>
            <CalendarPanel range={range} onRangeChange={setRange} />
          </div>
        </main>
      </div>
    </div>
  );
}