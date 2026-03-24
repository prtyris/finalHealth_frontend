import React, { useState } from "react";
import Header from "../../components/Header";
import AdminLayout from "../../components/AdminLayout";

// ---- ICONS ----

const IconSearch = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const IconUser = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconDollar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const IconDownload = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const IconChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const IconChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const IconEye = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconX = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconMail = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconCalendar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

// ---- CUSTOMER DETAIL MODAL ----

function CustomerDetailModal({ customer, onClose }) {
  if (!customer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">Customer Revenue Details</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          >
            <IconX />
          </button>
        </div>

        {/* Customer Info */}
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-lg font-bold"
              style={{ backgroundColor: customer.avatarColor }}
            >
              {customer.name.charAt(0)}
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-800">{customer.name}</h4>
              <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                <IconMail /> {customer.email}
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-blue-50">
              <p className="text-xs text-blue-600 font-medium uppercase">Total Spent</p>
              <p className="text-xl font-bold text-[#2133ff] mt-1">{customer.totalRevenue}</p>
            </div>
            <div className="p-4 rounded-xl bg-green-50">
              <p className="text-xs text-green-600 font-medium uppercase">Transactions</p>
              <p className="text-xl font-bold text-emerald-600 mt-1">{customer.transactions}</p>
            </div>
            <div className="p-4 rounded-xl bg-amber-50">
              <p className="text-xs text-amber-600 font-medium uppercase">Current Plan</p>
              <p className="text-lg font-bold text-amber-600 mt-1">{customer.plan}</p>
            </div>
            <div className="p-4 rounded-xl bg-purple-50">
              <p className="text-xs text-purple-600 font-medium uppercase">Member Since</p>
              <p className="text-lg font-bold text-purple-600 mt-1 flex items-center gap-1">
                <IconCalendar /> {customer.joinDate}
              </p>
            </div>
          </div>

          {/* Transaction History */}
          <h5 className="text-sm font-bold text-gray-800 mb-3">Payment History</h5>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {customer.history.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div>
                  <p className="text-sm font-medium text-gray-800">{item.description}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.date}</p>
                </div>
                <span className="text-sm font-bold text-gray-800">{item.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#2133ff] rounded-xl hover:bg-[#1a29cc] transition-colors">
            <IconDownload />
            Export
          </button>
        </div>
      </div>
    </div>
  );
}

// ---- MAIN COMPONENT ----

export default function CustomerRevenue() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [sortBy, setSortBy] = useState("totalRevenue");
  const [planFilter, setPlanFilter] = useState("all");

  const avatarColors = ["#2133ff", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444", "#06b6d4", "#ec4899", "#84cc16"];

  const customers = [
    {
      id: 1, name: "Anna Reyes", email: "anna.reyes@email.com", plan: "Premium",
      totalRevenue: "₱45,000", totalRevenueNum: 45000, transactions: 24,
      lastPayment: "Dec 15, 2024", status: "Active", joinDate: "Mar 2023",
      avatarColor: avatarColors[0],
      history: [
        { description: "Premium Monthly", date: "Dec 15, 2024", amount: "₱1,500" },
        { description: "Premium Monthly", date: "Nov 15, 2024", amount: "₱1,500" },
        { description: "Premium Monthly", date: "Oct 15, 2024", amount: "₱1,500" },
        { description: "Premium Monthly", date: "Sep 15, 2024", amount: "₱1,500" },
      ],
    },
    {
      id: 2, name: "Dr. Michael Cruz", email: "m.cruz@clinic.com", plan: "Doctor Pro",
      totalRevenue: "₱84,000", totalRevenueNum: 84000, transactions: 18,
      lastPayment: "Dec 14, 2024", status: "Active", joinDate: "Jan 2023",
      avatarColor: avatarColors[1],
      history: [
        { description: "Doctor Pro Monthly", date: "Dec 14, 2024", amount: "₱3,500" },
        { description: "Doctor Pro Monthly", date: "Nov 14, 2024", amount: "₱3,500" },
        { description: "Doctor Pro Monthly", date: "Oct 14, 2024", amount: "₱3,500" },
      ],
    },
    {
      id: 3, name: "Mark Dela Cruz", email: "mark.dc@email.com", plan: "Basic",
      totalRevenue: "₱19,200", totalRevenueNum: 19200, transactions: 20,
      lastPayment: "Dec 13, 2024", status: "Active", joinDate: "Jun 2023",
      avatarColor: avatarColors[2],
      history: [
        { description: "Basic Monthly", date: "Dec 13, 2024", amount: "₱800" },
        { description: "Basic Monthly", date: "Nov 13, 2024", amount: "₱800" },
        { description: "Basic Monthly", date: "Oct 13, 2024", amount: "₱800" },
      ],
    },
    {
      id: 4, name: "Sarah Johnson", email: "sarah.j@email.com", plan: "Premium",
      totalRevenue: "₱62,500", totalRevenueNum: 62500, transactions: 15,
      lastPayment: "Dec 10, 2024", status: "Active", joinDate: "Feb 2023",
      avatarColor: avatarColors[3],
      history: [
        { description: "Premium Annual", date: "Dec 10, 2024", amount: "₱15,000" },
        { description: "Premium Annual", date: "Dec 10, 2023", amount: "₱15,000" },
      ],
    },
    {
      id: 5, name: "Luis Garcia", email: "luis.g@email.com", plan: "Basic",
      totalRevenue: "₱9,600", totalRevenueNum: 9600, transactions: 10,
      lastPayment: "Dec 8, 2024", status: "Inactive", joinDate: "Aug 2023",
      avatarColor: avatarColors[4],
      history: [
        { description: "Basic Monthly", date: "Dec 8, 2024", amount: "₱800" },
        { description: "Basic Monthly", date: "Nov 8, 2024", amount: "₱800" },
      ],
    },
    {
      id: 6, name: "Dr. Emily Santos", email: "emily.s@clinic.com", plan: "Doctor Pro",
      totalRevenue: "₱70,000", totalRevenueNum: 70000, transactions: 16,
      lastPayment: "Dec 12, 2024", status: "Active", joinDate: "Apr 2023",
      avatarColor: avatarColors[5],
      history: [
        { description: "Doctor Pro Monthly", date: "Dec 12, 2024", amount: "₱3,500" },
        { description: "Doctor Pro Monthly", date: "Nov 12, 2024", amount: "₱3,500" },
      ],
    },
    {
      id: 7, name: "Patricia Lim", email: "patricia.l@email.com", plan: "Premium",
      totalRevenue: "₱36,000", totalRevenueNum: 36000, transactions: 22,
      lastPayment: "Dec 11, 2024", status: "Active", joinDate: "May 2023",
      avatarColor: avatarColors[6],
      history: [
        { description: "Premium Monthly", date: "Dec 11, 2024", amount: "₱1,500" },
        { description: "Premium Monthly", date: "Nov 11, 2024", amount: "₱1,500" },
      ],
    },
    {
      id: 8, name: "Robert Tan", email: "robert.t@email.com", plan: "Basic",
      totalRevenue: "₱14,400", totalRevenueNum: 14400, transactions: 14,
      lastPayment: "Dec 9, 2024", status: "Active", joinDate: "Jul 2023",
      avatarColor: avatarColors[7],
      history: [
        { description: "Basic Monthly", date: "Dec 9, 2024", amount: "₱800" },
        { description: "Basic Monthly", date: "Nov 9, 2024", amount: "₱800" },
      ],
    },
  ];

  // Filter + Sort
  let filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = planFilter === "all" || c.plan === planFilter;
    return matchesSearch && matchesPlan;
  });

  filteredCustomers.sort((a, b) => {
    if (sortBy === "totalRevenue") return b.totalRevenueNum - a.totalRevenueNum;
    if (sortBy === "transactions") return b.transactions - a.transactions;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusStyle = (status) => {
    return status === "Active"
      ? "bg-emerald-50 text-emerald-600"
      : "bg-gray-100 text-gray-500";
  };

  const getPlanStyle = (plan) => {
    switch (plan) {
      case "Premium":
        return "bg-purple-50 text-purple-600";
      case "Doctor Pro":
        return "bg-blue-50 text-blue-600";
      case "Basic":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  // Top customers for summary
  const topCustomers = [...customers].sort((a, b) => b.totalRevenueNum - a.totalRevenueNum).slice(0, 3);
  const totalAllRevenue = customers.reduce((sum, c) => sum + c.totalRevenueNum, 0);

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-50/50 min-h-screen">
        <Header title="Customer Revenue" />

        <main className="mt-6 max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#eef0ff] text-[#2133ff]">
                  <IconUser />
                </span>
                Customer Revenue
              </h2>
              <p className="text-gray-500 mt-1">Revenue breakdown per customer</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-[#2133ff] text-white rounded-xl hover:bg-[#1a29cc] transition-colors text-sm font-medium shadow-sm">
              <IconDownload />
              Export All
            </button>
          </div>

          {/* Top 3 Customers + Total */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {/* Total Revenue Card */}
            <div className="group relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-[#2133ff] opacity-10" />
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Revenue</p>
              <p className="text-3xl font-bold text-[#2133ff] mt-2">
                ₱{totalAllRevenue.toLocaleString()}
              </p>
              <p className="text-xs text-gray-400 mt-2">{customers.length} customers</p>
            </div>

            {/* Top 3 */}
            {topCustomers.map((customer, i) => (
              <div
                key={customer.id}
                className="group relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedCustomer(customer)}
              >
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-10" style={{ backgroundColor: customer.avatarColor }} />
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: customer.avatarColor }}
                  >
                    {i + 1}
                  </div>
                  <p className="text-sm font-medium text-gray-500 truncate">{customer.name}</p>
                </div>
                <p className="text-2xl font-bold text-gray-800">{customer.totalRevenue}</p>
                <p className="text-xs text-gray-400 mt-1">{customer.transactions} transactions</p>
              </div>
            ))}
          </div>

          {/* Customer Table */}
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            {/* Filters */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h3 className="text-lg font-bold text-gray-800">All Customers</h3>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                  {/* Search */}
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <IconSearch />
                    </span>
                    <input
                      type="text"
                      placeholder="Search customers..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full sm:w-56 pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2133ff]/20 focus:border-[#2133ff]"
                    />
                  </div>

                  {/* Plan Filter */}
                  <select
                    value={planFilter}
                    onChange={(e) => {
                      setPlanFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-[#2133ff]/20 focus:border-[#2133ff]"
                  >
                    <option value="all">All Plans</option>
                    <option value="Basic">Basic</option>
                    <option value="Premium">Premium</option>
                    <option value="Doctor Pro">Doctor Pro</option>
                  </select>

                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-[#2133ff]/20 focus:border-[#2133ff]"
                  >
                    <option value="totalRevenue">Sort: Highest Revenue</option>
                    <option value="transactions">Sort: Most Transactions</option>
                    <option value="name">Sort: Name A-Z</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50/80">
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Plan</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Revenue</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Transactions</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Payment</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {paginatedCustomers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50/50 transition-colors">
                      {/* Customer */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                            style={{ backgroundColor: customer.avatarColor }}
                          >
                            {customer.name.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">{customer.name}</p>
                            <p className="text-xs text-gray-400 truncate">{customer.email}</p>
                          </div>
                        </div>
                      </td>
                      {/* Plan */}
                      <td className="px-6 py-4">
                        <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-semibold ${getPlanStyle(customer.plan)}`}>
                          {customer.plan}
                        </span>
                      </td>
                      {/* Revenue */}
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-gray-800">{customer.totalRevenue}</span>
                      </td>
                      {/* Transactions */}
                      <td className="px-6 py-4 text-sm text-gray-600">{customer.transactions}</td>
                      {/* Last Payment */}
                      <td className="px-6 py-4 text-sm text-gray-500">{customer.lastPayment}</td>
                      {/* Status */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${getStatusStyle(customer.status)}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${customer.status === "Active" ? "bg-emerald-500" : "bg-gray-400"}`} />
                          {customer.status}
                        </span>
                      </td>
                      {/* Action */}
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedCustomer(customer)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#2133ff] bg-[#eef0ff] rounded-lg hover:bg-[#dde1ff] transition-colors"
                        >
                          <IconEye />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {paginatedCustomers.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <p className="text-sm">No customers found.</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, filteredCustomers.length)} of{" "}
                  {filteredCustomers.length} customers
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <IconChevronLeft />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                        currentPage === i + 1
                          ? "bg-[#2133ff] text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <IconChevronRight />
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Customer Detail Modal */}
        {selectedCustomer && (
          <CustomerDetailModal
            customer={selectedCustomer}
            onClose={() => setSelectedCustomer(null)}
          />
        )}
      </div>
    </AdminLayout>
  );
}