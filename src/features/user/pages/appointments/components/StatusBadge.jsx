// components/StatusBadge.jsx
export default function StatusBadge({ status }) {
  return (
    <span
      className={`px-2 py-1 rounded text-xs font-medium ${
        status === "Completed"
          ? "bg-green-100 text-green-700"
          : "bg-blue-100 text-blue-700"
      }`}
    >
      {status}
    </span>
  );
}
