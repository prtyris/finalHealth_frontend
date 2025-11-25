import React, { useState } from "react";

const ActivityHistory = () => {
  const [activityData, setActivityData] = useState([
    {
      logId: 74,
      user: "Carl Joseph Olmedo",
      action: "Added new doctor...",
      table: "doctors",
      recordId: 101,
      timestamp: "2025-10-26 09:02 AM",
    },
    {
      logId: 79,
      user: "Carlson Sampan",
      action: "Added new doctor...",
      table: "clinics",
      recordId: 206,
      timestamp: "2025-10-26 09:10 AM",
    },
    {
      logId: 76,
      user: "Kristine Olaivar",
      action: "Added new doctor...",
      table: "sessions",
      recordId: 310,
      timestamp: "2025-10-26 09:15 AM",
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Activity Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
          <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm">
            <option>Filter by User</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm">
            <option>Filter by Log Id</option>
          </select>
          <input
            type="date"
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            placeholder="mm/dd/yyyy"
          />
        </div>
      </div>

      {/* Activity Table */}
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
            {activityData.map((activity, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                  {activity.logId}
                </td>
                <td className="px-4 py-4 text-sm">
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    {activity.user}
                  </a>
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
