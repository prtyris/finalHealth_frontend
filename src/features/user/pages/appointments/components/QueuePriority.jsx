import { useQueues } from "../../../context/queues/useQueues";

export default function QueuePriority({ data, loading }) {
  const { updateQueueStatus } = useQueues();

  if (loading) return <p>Loading priority queue...</p>;

  if (!data.length)
    return <p className="text-gray-500">No priority patients in queue.</p>;

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-blue-700 font-semibold mb-3">Queue – Priority</h3>

      <table className="w-full border text-sm">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-2 text-left">Patient</th>
            <th className="p-2 text-left">Priority</th>
            <th className="p-2 text-left">Arrival Date</th>
            <th className="p-2 text-left">Arrival Time</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((q) => (
            <tr key={q.queueEntryId} className="border-t hover:bg-blue-50">
              <td className="p-2">{q.patientName}</td>
              <td className="p-2">{q.priorityLevel}</td>
              <td className="p-2">{q.arrivalDate}</td>
              <td className="p-2">{q.arrivalTime}</td>
              <td className="p-2">{q.status}</td>
              <td className="p-2 flex gap-2">
                <button
                  className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded"
                  onClick={() =>
                    updateQueueStatus(q.queueEntryId, "in-progress")
                  }
                >
                  In Progress
                </button>
                <button
                  className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded"
                  onClick={() => updateQueueStatus(q.queueEntryId, "completed")}
                >
                  Complete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
