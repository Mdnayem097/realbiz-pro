import { ProcurementStat, OverflowMaterial, PendingVoucher } from "@/types/procurement";

export const procurementStats: ProcurementStat[] = [
  {
    id: "pending-requisition",
    title: "Pending Requisition",
    value: 0,
    icon: "clipboard",
    type: "pending",
<<<<<<< HEAD
    color: "red", // ✅ যোগ করুন
    change: 0, // ✅ যোগ করুন
    changeLabel: "vs last month", // ✅ যোগ করুন
    chart: [10, 15, 12, 18, 14, 20, 17, 22], // ✅ যোগ করুন
=======
    color: "red",
    change: 0, 
    changeLabel: "vs last month",
    chart: [10, 15, 12, 18, 14, 20, 17, 22], 
    route: "/procurement/purchase-orders",
>>>>>>> d787c21efbdea32481c9ad8c6d6ba76865860d2f
  },
  {
    id: "requisition",
    title: "Requisition",
    value: 3,
    icon: "file",
    type: "total",
<<<<<<< HEAD
    color: "blue", // ✅ যোগ করুন
    change: 5.2, // ✅ যোগ করুন
=======
    color: "blue",   
    change: 5.2,
>>>>>>> d787c21efbdea32481c9ad8c6d6ba76865860d2f
    changeLabel: "vs last month",
    chart: [20, 24, 18, 27, 22, 31, 26, 35],
    route: "/procurement/purchase-orders",
  },
  {
    id: "pending-purchase-order",
    title: "Pending Purchase Order",
    value: 0,
    icon: "shopping-cart",
    type: "pending",
<<<<<<< HEAD
    color: "green", // ✅ যোগ করুন
=======
    color: "green",  
>>>>>>> d787c21efbdea32481c9ad8c6d6ba76865860d2f
    change: 0,
    changeLabel: "vs last month",
    chart: [8, 12, 10, 15, 11, 13, 9, 14],
    route: "/procurement/purchase-orders",
  },
  {
    id: "purchase-order",
    title: "Purchase Order",
    value: 3,
    icon: "package",
    type: "total",
<<<<<<< HEAD
    color: "purple", // ✅ যোগ করুন
=======
    color: "purple",  
>>>>>>> d787c21efbdea32481c9ad8c6d6ba76865860d2f
    change: 3.8,
    changeLabel: "vs last month",
    chart: [25, 22, 28, 24, 30, 26, 29, 27],
    route: "/procurement/purchase-orders",
  },
  {
    id: "pending-grn",
    title: "Pending GRN",
    value: 0,
    icon: "truck",
    type: "pending",
<<<<<<< HEAD
    color: "orange", // ✅ যোগ করুন
=======
    color: "orange",   
>>>>>>> d787c21efbdea32481c9ad8c6d6ba76865860d2f
    change: 0,
    changeLabel: "vs last month",
    chart: [5, 8, 6, 10, 7, 9, 11, 8],
    route: "/procurement/purchase-orders",
  },
  {
    id: "pending-purchase-bill",
    title: "Pending Purchase Bill",
    value: 0,
    icon: "receipt",
    type: "pending",
    color: "cyan",
    change: 0,
    changeLabel: "vs last month",
    chart: [12, 15, 10, 13, 11, 14, 9, 12],
    route: "/procurement/purchase-orders",
  },
];

export const overflowMaterials: OverflowMaterial[] = [
  {
    id: "OM-001",
    description: "Cement",
    budgetQty: 500,
    budgetAmount: 350000,
    issueQty: 450,
    issueAmount: 315000,
    status: "Issued",
  },
  {
    id: "OM-002",
    description: "Rod",
    budgetQty: 200,
    budgetAmount: 1800000,
    issueQty: 160,
    issueAmount: 1440000,
    status: "Pending",
  },
  {
    id: "OM-003",
    description: "Bricks",
    budgetQty: 10000,
    budgetAmount: 120000,
    issueQty: 9500,
    issueAmount: 114000,
    status: "Completed",
  },
  {
    id: "OM-004",
    description: "Sand",
    budgetQty: 300,
    budgetAmount: 180000,
    issueQty: 250,
    issueAmount: 150000,
    status: "Issued",
  },
  {
    id: "OM-005",
    description: "Sand",
    budgetQty: 300,
    budgetAmount: 180000,
    issueQty: 250,
    issueAmount: 150000,
    status: "Issued",
  },
  {
    id: "OM-006",
    description: "Sand",
    budgetQty: 300,
    budgetAmount: 180000,
    issueQty: 250,
    issueAmount: 150000,
    status: "Issued",
  },
  {
    id: "OM-007",
    description: "Sand",
    budgetQty: 300,
    budgetAmount: 180000,
    issueQty: 250,
    issueAmount: 150000,
    status: "Issued",
  },
  {
    id: "OM-008",
    description: "Sand",
    budgetQty: 300,
    budgetAmount: 180000,
    issueQty: 250,
    issueAmount: 150000,
    status: "Issued",
  },
];

export const pendingVouchers: PendingVoucher[] = [
  {
    id: "PV-001",
    reference: "SaleOffer-5154844",
    project: "Sheba Eyecon Tower",
    contact: "Mr. Raju raz",
    addedBy: "Admin",
    date: "03-Sep-2026",
    saleOffer: "SaleOffer-5154844",
    status: "Approval Layer has not been set yet.",
  },
  {
    id: "PV-002",
    reference: "SaleOffer-4181717",
    project: "Lake Garden",
    contact: "Mr. Raju raz",
    addedBy: "Admin",
    date: "03-Sep-2026",
    saleOffer: "SaleOffer-4181717",
    status: "Approval Layer has not been set yet.",
  },
  {
    id: "PV-003",
    reference: "SaleOffer-566922",
    project: "Lake Garden",
    contact: "Mr. Raju raz",
    addedBy: "Admin",
    date: "03-Sep-2026",
    saleOffer: "SaleOffer-566922",
    status: "Approval Layer has not been set yet.",
  },
];
