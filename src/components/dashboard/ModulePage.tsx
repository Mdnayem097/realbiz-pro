import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { findNode, moduleLabel, type MenuNode, type ModuleKey } from "@/lib/menus";

import AccountsDashboard from "./AccountsDashboard";
import AllDashboard from "./AllDashboard";
import CrDashboard from "./CrDashboard";
import CrmDashboard from "./CrmDashboard";
import HrmDashboard from "./HrmDashboard";
import InventoryDashboard from "./InventoryDashboard";
import LamsDashboard from "./LamsDashboard";
import ProcurementDashboard from "./ProcurementDashboard";
import ProjectsDashboard from "./ProjectsDashboard";



export function ModulePage({ module, path }: { module: ModuleKey; path: string }) {
  const node = path ? findNode(module, path) : undefined;

  const crumbs = path.split("/").filter(Boolean);

  const title = node?.label ?? "Overview";

  const isOverview = !path || node?.slug === "dashboard";

  /*
   * ==========================================
   * CONDITIONAL DASHBOARD COMPONENT
   * ==========================================
   */

  const renderModuleDashboard = () => {
    // Only overview/dashboard route
    if (!isOverview) {
      return null;
    }

    switch (module) {
      case "inventory":
        return <InventoryDashboard />;

      case "accounts":
        return <AccountsDashboard />;

      case "crm":
        return <CrmDashboard />;

      case "hrm":
        return <HrmDashboard />;

      case "project":
        return <ProjectsDashboard />;

      case "cr":
        return <CrDashboard />;

      case "lams":
        return <LamsDashboard />;

      case "procurement":
        return <ProcurementDashboard />;

      case "all":
        return <AllDashboard />;

      default:
        return null;
    }
  };

  const moduleDashboard = renderModuleDashboard();

  return (
    <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
      {/* ==========================================
          CUSTOM MODULE DASHBOARD
      ========================================== */}

      {moduleDashboard ? (
        <div className="mt-6">{moduleDashboard}</div>
      ) : node?.children?.length ? (
        /* ==========================================
           CHILD MENU
        ========================================== */

        <div className=" grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {node.children.map((c: MenuNode) => (
            <Link
              key={c.path}
              href={`/dashboard/${module}/${c.path}`}
              className="
                group rounded-xl border border-border
                bg-card p-5 transition
                hover:-translate-y-0.5 hover:shadow-lg
              "
            >
              <div className="font-display text-lg font-semibold">{c.label}</div>

              <div className="mt-1 text-sm text-muted-foreground">
                {c.children?.length ? `${c.children.length} sections` : "Open"}
              </div>

              <div
                className="
                  mt-3 text-sm font-semibold text-foreground/70
                  transition group-hover:translate-x-1
                "
              >
                Open →
              </div>
            </Link>
          ))}
        </div>
      ) : (
        /* ==========================================
           GENERIC PAGE
        ========================================== */

        <div className="mt-6 rounded-xl border border-border bg-card p-6 shadow-xs">
          <h1 className="text-xl font-bold text-foreground">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Demo Component for {title} — Route:{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              /dashboard/{module}/{path}
            </code>
          </p>
        </div>
      )}
    </div>
  );
}
