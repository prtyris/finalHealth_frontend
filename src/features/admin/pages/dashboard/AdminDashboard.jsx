// AdminDashboard.jsx
import React, { useState } from "react";
import Header from "../../components/Header";
import AdminLayout from "../../components/AdminLayout";

// ---- ICONS (inline SVG so no extra dependencies needed) ----

const IconUsers = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconUserCheck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <polyline points="17 11 19 13 23 9" />
  </svg>
);

const IconCreditCard = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const IconUserPlus = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <line x1="20" y1="8" x2="20" y2="14" />
    <line x1="23" y1="11" x2="17" y2="11" />
  </svg>
);

const IconTrendingUp = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const IconTrendingDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
    <polyline points="17 18 23 18 23 12" />
  </svg>
);

const IconClock = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const IconActivity = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const IconBarChart = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="20" x2="12" y2="10" />
    <line x1="18" y1="20" x2="18" y2="4" />
    <line x1="6" y1="20" x2="6" y2="16" />
  </svg>
);

const IconCalendar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const IconRefresh = ({ spinning }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={spinning ? "animate-spin" : ""}
  >
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

// ---- COMPONENTS ----

function StatCard({ label, value, icon: Icon, color, bgColor, trend, trendValue }) {
  return (
    <div className="group relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-gray-200 overflow-hidden">
      <div
        className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-10 transition-transform duration-300 group-hover:scale-150"
        style={{ backgroundColor: color }}
      />

      <div className="flex items-start justify-between relative z-10">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 tracking-wide uppercase">
            {label}
          </p>
          <p className="text-3xl font-bold mt-2" style={{ color }}>
            {value}
          </p>

          {trend && (
            <div className="flex items-center mt-3 gap-1">
              <span style={{ color: trend === "up" ? "#10b981" : "#ef4444" }}>
                {trend === "up" ? <IconTrendingUp /> : <IconTrendingDown />}
              </span>
              <span
                className="text-sm font-medium"
                style={{ color: trend === "up" ? "#10b981" : "#ef4444" }}
              >
                {trendValue}
              </span>
              <span className="text-xs text-gray-400 ml-1">vs last month</span>
            </div>
          )}
        </div>

        <div
          className="flex items-center justify-center w-12 h-12 rounded-xl transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: bgColor, color }}
        >
          <Icon />
        </div>
      </div>

      <div className="mt-4 w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            backgroundColor: color,
            width: `${Math.min(parseInt(value.replace(/,/g, "")) / 15, 100)}%`,
          }}
        />
      </div>
    </div>
  );
}

function ActivityItem({ item, index }) {
  const getActivityStyle = (text) => {
    if (text.toLowerCase().includes("registered") || text.toLowerCase().includes("user"))
      return { icon: IconUserPlus, color: "#2133ff", bg: "#eef0ff" };
    if (text.toLowerCase().includes("verified") || text.toLowerCase().includes("doctor"))
      return { icon: IconUserCheck, color: "#10b981", bg: "#ecfdf5" };
    if (text.toLowerCase().includes("subscriber") || text.toLowerCase().includes("renewed"))
      return { icon: IconCreditCard, color: "#f59e0b", bg: "#fffbeb" };
    return { icon: IconActivity, color: "#6b7280", bg: "#f3f4f6" };
  };

  const { icon: Icon, color, bg } = getActivityStyle(item);
  const timeAgo = ["2 minutes ago", "15 minutes ago", "1 hour ago", "3 hours ago", "Yesterday"];

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 hover:bg-gray-50 cursor-pointer group">
      <div
        className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
        style={{ backgroundColor: bg, color }}
      >
        <Icon />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 truncate">{item}</p>
        <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
          <IconClock />
          {timeAgo[index] || "Recently"}
        </p>
      </div>

      <span className="text-gray-300 group-hover:text-gray-500 transition-colors flex-shrink-0">
        <IconChevronRight />
      </span>
    </div>
  );
}

function QuickActionButton({ icon: Icon, label, color, bgColor }) {
  return (
    <button className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 bg-white transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-gray-200 group w-full">
      <div
        className="flex items-center justify-center w-10 h-10 rounded-lg transition-transform duration-200 group-hover:scale-110"
        style={{ backgroundColor: bgColor, color }}
      >
        <Icon />
      </div>
      <span className="text-xs font-medium text-gray-600 group-hover:text-gray-800">
        {label}
      </span>
    </button>
  );
}

// ---- MAIN DASHBOARD ----

export default function AdminDashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const stats = [
    {
      label: "Total Users",
      value: "1,240",
      icon: IconUsers,
      color: "#2133ff",
      bgColor: "#eef0ff",
      trend: "up",
      trendValue: "+12.5%",
    },
    {
      label: "Verified Doctors",
      value: "86",
      icon: IconUserCheck,
      color: "#10b981",
      bgColor: "#ecfdf5",
      trend: "up",
      trendValue: "+4.2%",
    },
    {
      label: "Active Subscribers",
      value: "152",
      icon: IconCreditCard,
      color: "#f59e0b",
      bgColor: "#fffbeb",
      trend: "up",
      trendValue: "+8.1%",
    },
    {
      label: "New Signups (30d)",
      value: "324",
      icon: IconUserPlus,
      color: "#8b5cf6",
      bgColor: "#f5f3ff",
      trend: "down",
      trendValue: "-2.3%",
    },
  ];

  const recentActivity = [
    "New user registered: Mark Dela Cruz",
    "Doctor verified: Dr. Michael Cruz",
    "Subscriber renewed: Anna Reyes",
    "New user registered: Sarah Johnson",
    "Doctor verified: Dr. Emily Santos",
  ];

  const quickActions = [
    { icon: IconUserPlus, label: "Add User", color: "#2133ff", bgColor: "#eef0ff" },
    { icon: IconUserCheck, label: "Verify Doctor", color: "#10b981", bgColor: "#ecfdf5" },
    { icon: IconBarChart, label: "Reports", color: "#f59e0b", bgColor: "#fffbeb" },
    { icon: IconActivity, label: "Analytics", color: "#8b5cf6", bgColor: "#f5f3ff" },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-50/50 min-h-screen">
        <Header title="Dashboard" />

        <main className="mt-6 max-w-7xl mx-auto">
          {/* Welcome Banner */}
          <section className="mb-8">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#2133ff] to-[#4f5fff] p-8 text-white shadow-lg">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
              <div className="absolute -bottom-8 -right-4 w-28 h-28 rounded-full bg-white/5" />
              <div className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-white/5" />

              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold">
                      {getGreeting()}, Admin! 👋
                    </h1>
                    <p className="mt-2 text-blue-100 flex items-center gap-2">
                      <IconCalendar />
                      {today}
                    </p>
                    <p className="mt-1 text-blue-200 text-sm">
                      Here's what's happening with your platform today.
                    </p>
                  </div>

                  <button
                    onClick={handleRefresh}
                    className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-200 text-sm font-medium backdrop-blur-sm"
                  >
                    <IconRefresh spinning={isRefreshing} />
                    Refresh
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Overview Stats */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-[#2133ff]"><IconBarChart /></span>
                Overview
              </h2>
              <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-[#2133ff]/20 focus:border-[#2133ff]">
                <option>Last 30 days</option>
                <option>Last 7 days</option>
                <option>Last 90 days</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {stats.map((item, index) => (
                <StatCard
                  key={index}
                  label={item.label}
                  value={item.value}
                  icon={item.icon}
                  color={item.color}
                  bgColor={item.bgColor}
                  trend={item.trend}
                  trendValue={item.trendValue}
                />
              ))}
            </div>
          </section>

          {/* Quick Actions */}
          <section className="mt-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-[#2133ff]"><IconActivity /></span>
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <QuickActionButton
                  key={index}
                  icon={action.icon}
                  label={action.label}
                  color={action.color}
                  bgColor={action.bgColor}
                />
              ))}
            </div>
          </section>

          {/* Recent Activity + Today's Summary */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-[#2133ff]"><IconClock /></span>
                  Recent Activity
                </h3>
                <button className="text-sm text-[#2133ff] hover:text-[#1a29cc] font-medium transition-colors flex items-center gap-1">
                  View All
                  <IconChevronRight />
                </button>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-50">
                  {recentActivity.map((item, i) => (
                    <ActivityItem key={i} item={item} index={i} />
                  ))}
                </div>
              </div>
            </div>

            {/* Today's Summary */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-[#2133ff]"><IconCalendar /></span>
                Today's Summary
              </h3>

              <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="text-sm text-gray-500">New Users</span>
                    <span className="text-sm font-semibold text-gray-800 bg-blue-50 px-2.5 py-1 rounded-md">
                      +12
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="text-sm text-gray-500">Appointments</span>
                    <span className="text-sm font-semibold text-gray-800 bg-green-50 px-2.5 py-1 rounded-md">
                      28
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="text-sm text-gray-500">Revenue</span>
                    <span className="text-sm font-semibold text-gray-800 bg-amber-50 px-2.5 py-1 rounded-md">
                      ₱15,400
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="text-sm text-gray-500">Pending Verifications</span>
                    <span className="text-sm font-semibold text-red-600 bg-red-50 px-2.5 py-1 rounded-md">
                      3
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AdminLayout>
  );
}