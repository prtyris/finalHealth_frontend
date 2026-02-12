import { useQueues } from "../../../context/queues/useQueues";

export default function QueuePriority({ data, loading }) {
  const { updateQueueStatus } = useQueues();

  if (loading) return <p>Loading priority queue...</p>;

  if (!data.length)
    return <p className="text-gray-500">No priority patients in queue.</p>;

return (
  <div className="bg-white rounded-lg shadow p-4">
    <h3 className="text-blue-700 font-semibold mb-3">
      Queue – Priority
    </h3>

    {/* Scroll Container */}
    <div className="w-full overflow-x-auto overflow-y-auto max-h-[400px]">
      <table className="min-w-[800px] w-full border text-sm">
        <thead className="bg-blue-600 text-white sticky top-0 z-10">
          <tr>
            <th className="p-2 text-left whitespace-nowrap">Patient</th>
            <th className="p-2 text-left whitespace-nowrap">Priority</th>
            <th className="p-2 text-left whitespace-nowrap">Arrival Date</th>
            <th className="p-2 text-left whitespace-nowrap">Arrival Time</th>
            <th className="p-2 text-left whitespace-nowrap">Status</th>
            <th className="p-2 text-left whitespace-nowrap">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((q) => (
            <tr key={q.queueEntryId} className="border-t hover:bg-blue-50">
              <td className="p-2 whitespace-nowrap">{q.patientName}</td>
              <td className="p-2 whitespace-nowrap">{q.priorityLevel}</td>
              <td className="p-2 whitespace-nowrap">{q.arrivalDate}</td>
              <td className="p-2 whitespace-nowrap">{q.arrivalTime}</td>
              <td className="p-2 whitespace-nowrap">{q.status}</td>
              <td className="p-2 flex gap-2 whitespace-nowrap">
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
                  onClick={() =>
                    updateQueueStatus(q.queueEntryId, "completed")
                  }
                >
                  Complete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

}
