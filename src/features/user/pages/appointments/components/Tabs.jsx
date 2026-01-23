export default function Tabs({ activeTab, setActiveTab }) {
  const tabs = [
    { key: "appointments", label: "Appointments" },
    { key: "queue-normal", label: "Queue – Normal" },
    { key: "queue-priority", label: "Queue – Priority" },
  ];

  return (
    <div className="flex gap-2">
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => setActiveTab(t.key)}
          className={`px-4 py-2 rounded ${
            activeTab === t.key
              ? "bg-blue-600 text-white"
              : "border border-blue-600 text-blue-600"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
