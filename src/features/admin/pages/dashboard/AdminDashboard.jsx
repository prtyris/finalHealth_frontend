// Dashboard.jsx
import React from "react";
import Header from "../../components/Header";

function StatCard({ label, value }) {
  return (
    <div className="rounded-xl border border-gray-100 p-6">
      <div className="text-gray-500">{label}</div>
      <div className="text-3xl font-bold text-[#2133ff] mt-2">{value}</div>
    </div>
  );
}

export default function AdminDashboard() {
  const stats = [
    { label: "Total Users", value: "1,240" },
    { label: "Verified Doctors", value: "86" },
    { label: "Active Subscribers", value: "152" },
    { label: "New Signups (30d)", value: "324" },
  ];

  const recentActivity = [
    "New user registered: Mark Dela Cruz",
    "Doctor verified: Dr. Michael Cruz",
    "Subscriber renewed: Anna Reyes",
  ];

  return (
    <div className="p-6">
      <Header title="Dashboard" />

      <main className="mt-6">
        <section>
          <h2 className="text-3xl font-bold mb-6">Overview</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((item, index) => (
              <StatCard key={index} label={item.label} value={item.value} />
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Recent Activity</h3>

            <div className="rounded-xl border border-gray-100 p-6 bg-white">
              <ul className="list-disc pl-6 text-gray-700">
                {recentActivity.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
