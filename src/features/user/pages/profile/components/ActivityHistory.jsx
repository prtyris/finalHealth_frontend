import React, { useEffect, useState, useMemo } from "react";
import { getMyLogs } from "../../../../../../src/api/AuditLogs.js";
import ExportExcel from "../../../../../components/ExportExcel.jsx";
import {
  FiActivity,
  FiCalendar,
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
  FiEye,
  FiFilter,
  FiHash,
  FiRefreshCw,
  FiSearch,
  FiUser,
  FiUsers,
  FiAlertCircle,
  FiAlertTriangle,
  FiTrash2,
  FiEdit,
  FiPlusCircle,
  FiLogIn,
  FiKey,
  FiEyeOff,
  FiCheckSquare,
  FiSquare,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

const ActivityHistory = () => {
  const [activityData, setActivityData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "logId",
    direction: "desc",
  });

  // Filter states
  const [filterUser, setFilterUser] = useState("");
  const [filterLogId, setFilterLogId] = useState("");
  const [filterAction, setFilterAction] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterTable, setFilterTable] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    yourActivity: 0,
    success: 0,
    warnings: 0,
  });

  useEffect(() => {
    async function loadLogs() {
      try {
        setLoading(true);
        const response = await getMyLogs();
        const logs = response.logs || [];

        const mapped = logs.map((log) => ({
          id: log.log_id,
          logId: log.log_id,
          user: log.user || `User #${log.actor_id || log.user_id || "Unknown"}`,
          action: log.action || "Unknown",
          table: log.table_affected || log.table || "-",
          recordId: log.record_id ? log.record_id.toString() : "-",
          rawDate: log.timestamp || new Date().toISOString(),
          timestamp: new Date(log.timestamp).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
          icon: getActionIcon(log.action),
          status: getActionStatus(log.action),
          statusColor: getStatusColor(getActionStatus(log.action)),
          isCurrentUser:
            log.actor_id === 33 ||
            log.user_id === 33 ||
            (log.user && log.user.includes("#33")),
        }));

        setActivityData(mapped);

        // Calculate stats
        const today = new Date().toISOString().split("T")[0];
        const todayCount = mapped.filter(
          (entry) =>
            new Date(entry.rawDate).toISOString().split("T")[0] === today,
        ).length;

        const yourActivityCount = mapped.filter(
          (entry) => entry.isCurrentUser,
        ).length;

        const successCount = mapped.filter(
          (entry) => getActionStatus(entry.action) === "success",
        ).length;

        const warningCount = mapped.filter(
          (entry) => getActionStatus(entry.action) === "warning",
        ).length;

        setStats({
          total: mapped.length,
          today: todayCount,
          yourActivity: yourActivityCount,
          success: successCount,
          warnings: warningCount,
        });
      } catch (err) {
        console.error("❌ Failed to load activity logs:", err.message);
      } finally {
        setLoading(false);
      }
    }

    loadLogs();
  }, []);

  // Helper functions
  const getActionIcon = (action) => {
    if (!action) return <FiActivity className="text-gray-500" />;

    const actionLower = action.toLowerCase();
    if (actionLower.includes("create") || actionLower.includes("insert"))
      return <FiPlusCircle className="text-green-500" />;
    if (actionLower.includes("update") || actionLower.includes("edit"))
      return <FiEdit className="text-blue-500" />;
    if (actionLower.includes("delete") || actionLower.includes("remove"))
      return <FiTrash2 className="text-red-500" />;
    if (actionLower.includes("login"))
      return <FiLogIn className="text-purple-500" />;
    if (actionLower.includes("logout"))
      return <FiLogIn className="text-gray-500 transform rotate-180" />;
    if (actionLower.includes("password"))
      return <FiKey className="text-blue-600" />;
    if (
      actionLower.includes("read") ||
      actionLower.includes("view") ||
      actionLower.includes("select")
    )
      return <FiEye className="text-teal-500" />;
    if (actionLower.includes("success"))
      return <FiCheckCircle className="text-green-500" />;
    if (actionLower.includes("fail") || actionLower.includes("error"))
      return <FiAlertCircle className="text-red-500" />;
    if (actionLower.includes("registration"))
      return <FiUser className="text-purple-500" />;
    return <FiActivity className="text-gray-500" />;
  };

  const getActionStatus = (action) => {
    if (!action) return "info";

    const actionLower = action.toLowerCase();
    if (
      actionLower.includes("fail") ||
      actionLower.includes("error") ||
      actionLower.includes("denied")
    )
      return "warning";
    if (actionLower.includes("delete")) return "danger";
    if (
      actionLower.includes("success") ||
      actionLower.includes("login_success") ||
      actionLower.includes("completed")
    )
      return "success";
    if (actionLower.includes("login")) return "info";
    if (actionLower.includes("registration")) return "info";
    return "info";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800 border-green-200";
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "danger":
        return "bg-red-100 text-red-800 border-red-200";
      case "info":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Filter logic
  const filteredData = useMemo(() => {
    let result = activityData.filter((entry) => {
      const matchUser =
        filterUser === "" ||
        entry.user.toLowerCase().includes(filterUser.toLowerCase());

      const matchLogId =
        filterLogId === "" || entry.logId.toString().includes(filterLogId);

      const matchAction =
        filterAction === "" ||
        entry.action.toLowerCase().includes(filterAction.toLowerCase());

      const matchTable =
        filterTable === "" ||
        entry.table.toLowerCase().includes(filterTable.toLowerCase());

      const matchDate =
        filterDate === "" ||
        new Date(entry.rawDate).toISOString().split("T")[0] === filterDate;

      return matchUser && matchLogId && matchAction && matchTable && matchDate;
    });

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === "logId") {
          aValue = parseInt(aValue);
          bValue = parseInt(bValue);
        }

        if (sortConfig.key === "rawDate") {
          aValue = new Date(aValue).getTime();
          bValue = new Date(bValue).getTime();
        }

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [
    activityData,
    filterUser,
    filterLogId,
    filterAction,
    filterTable,
    filterDate,
    sortConfig,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Handle sort
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Handle row selection
  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
    );
  };

  // Handle select all
  const handleSelectAll = () => {
    if (
      selectedRows.length === paginatedData.length &&
      paginatedData.length > 0
    ) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedData.map((activity) => activity.id));
    }
  };

  // Reset filters
  const handleReset = () => {
    setFilterUser("");
    setFilterLogId("");
    setFilterAction("");
    setFilterTable("");
    setFilterDate("");
    setSelectedRows([]);
    setCurrentPage(1);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading activity history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-8 relative">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent"></div>
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <FiActivity className="text-white text-2xl" />
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  Activity History
                </h1>
              </div>
              <p className="text-blue-100 mb-8">
                Track and monitor all system activities and user actions
              </p>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm rounded-xl p-4 border border-blue-300/30">
                  <div className="text-2xl font-bold text-white">
                    {stats.total}
                  </div>
                  <div className="text-sm text-blue-100">
                    Total Activities
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-400/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-4 border border-blue-300/30">
                  <div className="text-2xl font-bold text-white">
                    {stats.today}
                  </div>
                  <div className="text-sm text-blue-100">
                    Today's Activities
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-xl p-4 border border-purple-300/30">
                  <div className="text-2xl font-bold text-white">
                    {stats.yourActivity}
                  </div>
                  <div className="text-sm text-blue-100">Your Activities</div>
                </div>
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm rounded-xl p-4 border border-blue-300/30">
                  <div className="text-2xl font-bold text-white">
                    {stats.success}
                  </div>
                  <div className="text-sm text-blue-100">Successful</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-4 border border-purple-300/30">
                  <div className="text-2xl font-bold text-white">
                    {stats.warnings}
                  </div>
                  <div className="text-sm text-blue-100">Warnings</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex items-center gap-2 mb-6">
          <FiFilter className="text-blue-600 text-xl" />
          <h2 className="text-xl font-semibold text-gray-800">
            Filter Activities
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <FiUser className="text-blue-500" /> User
            </label>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Search user..."
                value={filterUser}
                onChange={(e) => setFilterUser(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <FiHash className="text-purple-500" /> Log ID
            </label>
            <input
              type="number"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
              placeholder="Enter log ID..."
              value={filterLogId}
              onChange={(e) => setFilterLogId(e.target.value)}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <FiActivity className="text-blue-500" /> Action
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Filter by action..."
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <FiCalendar className="text-purple-500" /> Date
            </label>
            <input
              type="date"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200">
              {selectedRows.length > 0
                ? `${selectedRows.length} selected`
                : `${filteredData.length} activities found`}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-5 py-2.5 text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl font-medium transition-all duration-200 border border-blue-200"
            >
              <FiRefreshCw className="text-blue-600" />
              Reset Filters
            </button>

            <ExportExcel
              data={
                selectedRows.length > 0
                  ? filteredData.filter((item) =>
                      selectedRows.includes(item.id),
                    )
                  : filteredData
              }
              filename="activity_logs.xlsx"
              buttonComponent={
                <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                  <FiDownload />
                  Export{" "}
                  {selectedRows.length > 0 ? `(${selectedRows.length})` : "All"}
                </button>
              }
            />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {filteredData.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full mb-4">
              <FiEyeOff className="text-blue-400 text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No activity data found
            </h3>
            <p className="text-gray-500">
              Try adjusting your filters or check back later for new activities.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleSelectAll}
                          className="text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          {selectedRows.length === paginatedData.length &&
                          paginatedData.length > 0 ? (
                            <FiCheckSquare className="text-blue-600 text-lg" />
                          ) : (
                            <FiSquare className="text-lg" />
                          )}
                        </button>
                        <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Select
                        </span>
                      </div>
                    </th>
                    <th
                      className="px-6 py-4 text-left cursor-pointer group"
                      onClick={() => handleSort("logId")}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          LOG ID
                        </span>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          {sortConfig.key === "logId" ? (
                            sortConfig.direction === "asc" ? (
                              <FiChevronUp className="text-blue-600" />
                            ) : (
                              <FiChevronDown className="text-blue-600" />
                            )
                          ) : (
                            <FiChevronDown className="text-gray-400" />
                          )}
                        </div>
                      </div>
                    </th>
                    <th
                      className="px-6 py-4 text-left cursor-pointer group"
                      onClick={() => handleSort("user")}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          USER
                        </span>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          {sortConfig.key === "user" ? (
                            sortConfig.direction === "asc" ? (
                              <FiChevronUp className="text-blue-600" />
                            ) : (
                              <FiChevronDown className="text-blue-600" />
                            )
                          ) : (
                            <FiChevronDown className="text-gray-400" />
                          )}
                        </div>
                      </div>
                    </th>
                    <th
                      className="px-6 py-4 text-left cursor-pointer group"
                      onClick={() => handleSort("action")}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          ACTION
                        </span>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          {sortConfig.key === "action" ? (
                            sortConfig.direction === "asc" ? (
                              <FiChevronUp className="text-purple-600" />
                            ) : (
                              <FiChevronDown className="text-purple-600" />
                            )
                          ) : (
                            <FiChevronDown className="text-gray-400" />
                          )}
                        </div>
                      </div>
                    </th>
                    <th
                      className="px-6 py-4 text-left cursor-pointer group"
                      onClick={() => handleSort("table")}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          TABLE AFFECTED
                        </span>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          {sortConfig.key === "table" ? (
                            sortConfig.direction === "asc" ? (
                              <FiChevronUp className="text-blue-600" />
                            ) : (
                              <FiChevronDown className="text-blue-600" />
                            )
                          ) : (
                            <FiChevronDown className="text-gray-400" />
                          )}
                        </div>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        RECORD ID
                      </span>
                    </th>
                    <th
                      className="px-6 py-4 text-left cursor-pointer group"
                      onClick={() => handleSort("rawDate")}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          TIMESTAMP
                        </span>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          {sortConfig.key === "rawDate" ? (
                            sortConfig.direction === "asc" ? (
                              <FiChevronUp className="text-purple-600" />
                            ) : (
                              <FiChevronDown className="text-purple-600" />
                            )
                          ) : (
                            <FiChevronDown className="text-gray-400" />
                          )}
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedData.map((activity) => (
                    <tr
                      key={activity.id}
                      className="hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-purple-50/30 transition-colors duration-150"
                    >
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleRowSelect(activity.id)}
                          className="text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          {selectedRows.includes(activity.id) ? (
                            <FiCheckSquare className="text-blue-600 text-lg" />
                          ) : (
                            <FiSquare className="text-lg" />
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm font-semibold text-gray-900">
                          {activity.logId}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <FiUser className="text-blue-500 text-sm" />
                            <div className="font-medium text-gray-900">
                              {activity.user}
                            </div>
                            {activity.isCurrentUser && (
                              <span className="text-xs bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
                                You
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-600 ml-6">
                            {activity.user.replace("User #", "ID: ")}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0">{activity.icon}</div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {activity.action}
                            </div>
                            <span
                              className={`text-xs px-3 py-1 rounded-full border ${getStatusColor(activity.status)}`}
                            >
                              {activity.status.charAt(0).toUpperCase() +
                                activity.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 text-sm font-medium rounded-lg border border-blue-200">
                          {activity.table}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm text-gray-600">
                          {activity.recordId}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">
                          {activity.timestamp}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gradient-to-r from-blue-50/50 to-purple-50/50">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-semibold">
                    {(currentPage - 1) * itemsPerPage + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold">
                    {Math.min(currentPage * itemsPerPage, filteredData.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold">{filteredData.length}</span>{" "}
                  activities
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <FiChevronLeft />
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(
                        (page) =>
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1),
                      )
                      .map((page, index, array) => {
                        if (index > 0 && array[index - 1] !== page - 1) {
                          return (
                            <span
                              key={`ellipsis-${page}`}
                              className="px-3 py-2 text-gray-500"
                            >
                              ...
                            </span>
                          );
                        }
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                              currentPage === page
                                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                                : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50"
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <FiChevronRight />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700">Rows per page:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </select>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ActivityHistory;