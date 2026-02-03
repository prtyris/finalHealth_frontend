import React, { useState, useEffect, useContext } from "react";
import Header from "../../components/Header";
import AdminLayout from "../../components/AdminLayout";
import SubscribersTable from "./SubscribersTable";
import SendNotificationModal from "../modals/SendNotificationModal";
import { useAdmin } from "../../../admin/context/useAdmin";

export default function Subscribers() {
  const { subscribers, loading, error, getAllSubscribers } = useAdmin();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubscribers, setSelectedSubscribers] = useState([]);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  const itemsPerPage = 10;

  /* ---------------- FETCH SUBSCRIBERS ---------------- */
  useEffect(() => {
    getAllSubscribers();
  }, []);

  /* ---------------- FILTERING ---------------- */
  const filteredSubscribers = subscribers.filter((subscriber) => {
    const matchesSearch = subscriber.email
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      subscriber.subscription.status.toLowerCase() ===
        statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  /* ---------------- PAGINATION ---------------- */
  const totalPages = Math.ceil(filteredSubscribers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSubscribers = filteredSubscribers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  /* ---------------- SELECTION ---------------- */
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedSubscribers(
        paginatedSubscribers.map((s) => `${s.userId}-${s.subscription.id}`),
      );
    } else {
      setSelectedSubscribers([]);
    }
  };

  const handleSelectSubscriber = (key) => {
    setSelectedSubscribers((prev) =>
      prev.includes(key) ? prev.filter((id) => id !== key) : [...prev, key],
    );
  };

  /* ---------------- NOTIFICATION ---------------- */
  const handleSendNotification = () => {
    setIsNotificationModalOpen(true);
  };

  const handleNotificationSent = (message) => {
    console.log(
      "Notification sent to:",
      selectedSubscribers,
      "Message:",
      message,
    );
    alert(`Notification sent to ${selectedSubscribers.length} subscriber(s)`);
  };

  /* ---------------- PAGINATION CONTROLS ---------------- */
  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <Header title="Subscription Management" />

        {/* Control Panel */}
        <div className="mt-6 bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <input
                type="text"
                placeholder="Search by email..."
                className="w-full md:w-80 rounded-xl border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2133ff] focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <select
                className="rounded-xl border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2133ff] focus:border-transparent"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
              </select>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <button
                onClick={handleSendNotification}
                disabled={selectedSubscribers.length === 0}
                className={`px-6 py-2 rounded-xl font-semibold transition-all duration-200 ${
                  selectedSubscribers.length === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#2133ff] text-white hover:bg-blue-700"
                }`}
              >
                Send Notification ({selectedSubscribers.length})
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading && (
            <div className="p-6 text-center text-gray-500">
              Loading subscribers...
            </div>
          )}

          {error && <div className="p-6 text-center text-red-500">{error}</div>}

          {!loading && !error && (
            <SubscribersTable
              subscribers={paginatedSubscribers}
              selectedSubscribers={selectedSubscribers}
              onSelectAll={handleSelectAll}
              onSelectSubscriber={handleSelectSubscriber}
            />
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center p-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1} to{" "}
                {Math.min(
                  startIndex + itemsPerPage,
                  filteredSubscribers.length,
                )}{" "}
                of {filteredSubscribers.length} subscribers
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium ${
                    currentPage === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-[#2133ff] hover:bg-gray-100"
                  }`}
                >
                  Previous
                </button>

                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium ${
                    currentPage === totalPages
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-[#2133ff] hover:bg-gray-100"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Notification Modal */}
        <SendNotificationModal
          isOpen={isNotificationModalOpen}
          onClose={() => setIsNotificationModalOpen(false)}
          onSend={handleNotificationSent}
          selectedCount={selectedSubscribers.length}
        />
      </div>
    </AdminLayout>
  );
}
