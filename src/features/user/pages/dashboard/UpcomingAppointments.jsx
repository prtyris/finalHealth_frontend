export default function UpcomingAppointments() {
  const data = [
    {
      date: "Oct 28, 2025",
      time: "10:00 AM - 11:00 AM",
    },
    {
      date: "Oct 29, 2025",
      time: "02:00 PM - 03:00 PM",
    },
  ];

  return (
    <div className="bg-white shadow rounded-xl p-6 border border-gray-100">
      <h2 className="text-sm font-semibold text-blue-600 mb-4">
        Upcoming Appointments
      </h2>

      <div className="space-y-4">
        {data.map((apt, i) => (
          <div key={i} className="pb-3 border-b last:border-b-0">
            <p className="font-medium text-gray-800">{apt.date}</p>
            <p className="text-sm text-gray-500">{apt.time}</p>

            <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm">
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
