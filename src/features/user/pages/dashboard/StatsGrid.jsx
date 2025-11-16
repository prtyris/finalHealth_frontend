export default function StatsGrid() {
  const stats = [
    { label: "Total Clinics", value: 4 },
    { label: "Appointments (This Month)", value: 56 },
    { label: "Completed", value: 48 },
    { label: "Cancelled", value: 8 },
    { label: "Upcoming", value: 12 },
    {
      label: "Current Plan",
      value: "Pro Plan",
      sub: "Renews on: Jan 15, 2025",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-white shadow rounded-xl p-5 border border-gray-100"
        >
          <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{stat.value}</p>
          {stat.sub && <p className="text-xs text-gray-500 mt-1">{stat.sub}</p>}
        </div>
      ))}
    </div>
  );
}
