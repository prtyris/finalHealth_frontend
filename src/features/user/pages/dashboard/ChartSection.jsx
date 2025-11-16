export default function ChartSection() {
  const bars = [40, 70, 60, 35];

  return (
    <div className="bg-white shadow rounded-xl p-6 border border-gray-100 h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-semibold text-gray-700">
          Appointments – This Month (% week)
        </h2>
        <span className="text-xs text-gray-500">Bar Chart</span>
      </div>

      <div className="flex items-end justify-between h-52 mt-4">
        {bars.map((height, i) => (
          <div key={i} className="flex flex-col items-center w-full">
            <div
              className="bg-blue-600 rounded-md w-12"
              style={{ height: `${height * 0.5}px` }}
            ></div>
            <p className="text-xs text-gray-500 mt-2">Week {i + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
