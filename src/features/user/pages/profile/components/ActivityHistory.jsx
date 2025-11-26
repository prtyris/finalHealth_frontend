import React, { useEffect, useState, useMemo } from "react";
import { getMyLogs } from "../../../../../../src/api/AuditLogs.js";
import ExportExcel from "../../../../../components/ExportExcel.jsx"; // adjust path if needed

const ActivityHistory = () => {
  const [activityData, setActivityData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [filterUser, setFilterUser] = useState("");
  const [filterLogId, setFilterLogId] = useState("");
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    async function loadLogs() {
      try {
        const response = await getMyLogs();
        const logs = response.logs || [];

        const mapped = logs.map((log) => ({
          logId: log.log_id,
          user: `User #${log.actor_id}`,
          action: log.action,
          table: log.table_affected ?? "-",
          recordId: log.record_id ?? "-",
          rawDate: log.timestamp,
          timestamp: new Date(log.timestamp).toLocaleString("en-PH", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
        }));

        setActivityData(mapped);
      } catch (err) {
        console.error("❌ Failed to load activity logs:", err.message);
      } finally {
        setLoading(false);
      }
    }

    loadLogs();
  }, []);

  // ==========================
  //      FILTER LOGIC
  // ==========================
  const filteredData = useMemo(() => {
    return activityData.filter((entry) => {
      const matchUser =
        filterUser === "" ||
        entry.user.toLowerCase().includes(filterUser.toLowerCase());

      const matchLogId =
        filterLogId === "" || entry.logId.toString().includes(filterLogId);

      const matchDate =
        filterDate === "" ||
        new Date(entry.rawDate).toISOString().split("T")[0] === filterDate;

      return matchUser && matchLogId && matchDate;
    });
  }, [activityData, filterUser, filterLogId, filterDate]);

  if (loading)
    return <p className="text-center text-gray-500">Loading activity...</p>;

  return (
    <div className="space-y-6">
      {/* Filters + Export */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
          {/* Filter by User */}
          <input
            type="text"
            placeholder="Filter by User"
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            value={filterUser}
            onChange={(e) => setFilterUser(e.target.value)}
          />

          {/* Filter by Log ID */}
          <input
            type="number"
            placeholder="Filter by Log ID"
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            value={filterLogId}
            onChange={(e) => setFilterLogId(e.target.value)}
          />

          {/* Filter by Date */}
          <input
            type="date"
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>

        {/* Excel Export */}
        <ExportExcel data={filteredData} filename="activity_logs.xlsx" />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Log ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                User
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Action
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Table Affected
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Record ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Timestamp
              </th>
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredData.map((activity, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                  {activity.logId}
                </td>
                <td className="px-4 py-4 text-sm">
                  <span className="text-blue-600 dark:text-blue-400">
                    {activity.user}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                  {activity.action}
                </td>
                <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                  {activity.table}
                </td>
                <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                  {activity.recordId}
                </td>
                <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                  {activity.timestamp}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityHistory;
