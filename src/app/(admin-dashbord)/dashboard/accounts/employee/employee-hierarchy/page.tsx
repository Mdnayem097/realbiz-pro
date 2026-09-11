"use client";

import React, { useState } from "react";

// API থেকে আসা Hierarchy Data-র TypeScript Interface (ভবিষ্যতের জন্য)
interface HierarchyNode {
  id: number;
  name: string;
  designation: string;
  children?: HierarchyNode[];
}

export default function EmployeeHierarchyPage() {
  // Search State & API Data State
  const [searchTerm, setSearchTerm] = useState("");
  const [hierarchyData, setHierarchyData] = useState<HierarchyNode[]>([]);

  /* 
    TODO: API Integration Example
    useEffect(() => {
      const fetchHierarchy = async () => {
        try {
          const res = await fetch('/api/employee-hierarchy');
          const data = await res.json();
          setHierarchyData(data);
        } catch (error) {
          console.error("Failed to fetch employee hierarchy", error);
        }
      };
      fetchHierarchy();
    }, []);
  */

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-800 dark:text-slate-100 p-4 md:p-6 transition-colors duration-200 flex flex-col justify-between">
      <div>
        {/* Page Title */}
        <div className="mb-4">
          <h1 className="text-base md:text-lg font-medium text-slate-800 dark:text-slate-200">
            Employee Hierarchy
          </h1>
        </div>

        {/* Main Card Container */}
        <div className="bg-white dark:bg-[#080d1a] rounded-xl shadow-lg border border-slate-200 dark:border-[#131c31] p-5 mb-6 min-h-[520px]">
          {/* Top Right Search Bar */}
          <div className="flex justify-end mb-6">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search... type ? to get help."
              className="w-full sm:w-72 px-3.5 py-2 text-xs bg-slate-50 dark:bg-[#030712] border border-slate-200 dark:border-[#1e293b] rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors"
            />
          </div>

          {/* Hierarchy Render Area (Ready for API Tree / Chart integration) */}
          <div className="w-full h-full flex items-center justify-center p-8">
            {/* API থেকে ডেটা আসলে এখানে Tree view বা Chart রেন্ডার হবে */}
          </div>
        </div>
      </div>

      {/* Page Footer */}
      <footer className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 dark:text-slate-600 border-t border-slate-200/60 dark:border-[#131c31] pt-4 mt-auto">
        <div>2026 © Somikoron IT LTD</div>
        <div>Design &amp; Developed by Somikoron IT LTD</div>
      </footer>
    </div>
  );
}