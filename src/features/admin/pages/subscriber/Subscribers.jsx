// Subscribers.jsx
import React from "react";
import Header from "../../components/Header";

export default function Subscribers() {
  const subscribers = [
    {
      name: "Mark Dela Cruz",
      email: "mark@domain.com",
      status: "Active",
      date: "2025-08-14",
      color: "text-green-600",
    },
    {
      name: "Anna Reyes",
      email: "anna@domain.com",
      status: "Inactive",
      date: "2025-09-02",
      color: "text-yellow-600",
    },
  ];

  return (
    <div className="p-6">
      <Header title="Subscription Management" />

      <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-3xl font-bold mb-6">Subscription Management</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#2133ff] text-white">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Status</th>
                <th className="p-4">Subscription Date</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {subscribers.map((s, i) => (
                <tr key={i} className="border-b">
                  <td className="p-4">{s.name}</td>
                  <td className="p-4">{s.email}</td>
                  <td className={`p-4 font-semibold ${s.color}`}>{s.status}</td>
                  <td className="p-4">{s.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
