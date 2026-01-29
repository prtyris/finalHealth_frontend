import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import AdminLayout from "../../components/AdminLayout";
import SubscribersTable from "./SubscribersTable";
import SendNotificationModal from "../modals/SendNotificationModal";

export default function Subscribers() {
  const [subscribers, setSubscribers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubscribers, setSelectedSubscribers] = useState([]);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const itemsPerPage = 10;

  // Mock data - replace with API call
  useEffect(() => {
    const mockData = [
      {
        id: 1,
        name: "Mark Dela Cruz",
        email: "mark@domain.com",
        phone: "+63 912 345 6789",
        clinicName: "Dela Cruz Medical Center",
        address: "123 Main St, Manila",
        subscriptionType: "Premium",
        subscriptionDate: "2025-08-14",
        subscriptionEnd: "2026-08-14",
        status: "Active",
        paymentMethod: "Credit Card",
        lastPayment: "2025-12-14",
        notes: "Regular customer, always pays on time"
      },
      {
        id: 2,
        name: "Anna Reyes",
        email: "anna@domain.com",
        phone: "+63 917 654 3210",
        clinicName: "Reyes Family Clinic",
        address: "456 Oak Ave, Quezon City",
        subscriptionType: "Basic",
        subscriptionDate: "2025-09-02",
        subscriptionEnd: "2026-03-02",
        status: "Inactive",
        paymentMethod: "PayPal",
        lastPayment: "2025-12-02",
        notes: "Payment overdue, contacted on Dec 5"
      },
      {
        id: 3,
        name: "John Santos",
        email: "john@domain.com",
        phone: "+63 918 987 6543",
        clinicName: "Santos Health Clinic",
        address: "789 Pine St, Cebu City",
        subscriptionType: "Premium",
        subscriptionDate: "2025-10-15",
        subscriptionEnd: "2026-10-15",
        status: "Active",
        paymentMethod: "Bank Transfer",
        lastPayment: "2025-12-15",
        notes: "New subscriber, very satisfied"
      },
      {
        id: 4,
        name: "Maria Gonzales",
        email: "maria@domain.com",
        phone: "+63 919 876 5432",
        clinicName: "Gonzales Medical Group",
        address: "321 Maple Blvd, Davao",
        subscriptionType: "Enterprise",
        subscriptionDate: "2025-07-01",
        subscriptionEnd: "2026-07-01",
        status: "Active",
        paymentMethod: "Credit Card",
        lastPayment: "2025-12-01",
        notes: "Enterprise plan, multiple clinics"
      },
      {
        id: 5,
        name: "Carlos Lim",
        email: "carlos@domain.com",
        phone: "+63 920 123 4567",
        clinicName: "Lim Pediatrics",
        address: "654 Birch Rd, Makati",
        subscriptionType: "Basic",
        subscriptionDate: "2025-11-20",
        subscriptionEnd: "2026-05-20",
        status: "Active",
        paymentMethod: "Credit Card",
        lastPayment: "2025-12-20",
        notes: "Specializes in pediatric care"
      },
      // Add more mock data for pagination testing
      {
        id: 6,
        name: "Sarah Johnson",
        email: "sarah@domain.com",
        phone: "+63 921 234 5678",
        clinicName: "Johnson Medical Clinic",
        address: "789 Elm St, Pasig",
        subscriptionType: "Premium",
        subscriptionDate: "2025-06-10",
        subscriptionEnd: "2026-06-10",
        status: "Active",
        paymentMethod: "Credit Card",
        lastPayment: "2025-12-10",
        notes: "Regular checkups, satisfied customer"
      },
      {
        id: 7,
        name: "Robert Chen",
        email: "robert@domain.com",
        phone: "+63 922 345 6789",
        clinicName: "Chen Healthcare",
        address: "456 Cedar St, Mandaluyong",
        subscriptionType: "Enterprise",
        subscriptionDate: "2025-05-15",
        subscriptionEnd: "2026-05-15",
        status: "Active",
        paymentMethod: "Bank Transfer",
        lastPayment: "2025-12-15",
        notes: "Multiple locations, corporate account"
      },
      {
        id: 8,
        name: "Lisa Wong",
        email: "lisa@domain.com",
        phone: "+63 923 456 7890",
        clinicName: "Wong Medical Center",
        address: "123 Pine St, Taguig",
        subscriptionType: "Basic",
        subscriptionDate: "2025-04-20",
        subscriptionEnd: "2025-10-20",
        status: "Inactive",
        paymentMethod: "PayPal",
        lastPayment: "2025-10-20",
        notes: "Subscription expired, not renewed"
      },
      {
        id: 9,
        name: "Michael Tan",
        email: "michael@domain.com",
        phone: "+63 924 567 8901",
        clinicName: "Tan Family Clinic",
        address: "789 Oak St, Paranaque",
        subscriptionType: "Premium",
        subscriptionDate: "2025-03-25",
        subscriptionEnd: "2026-03-25",
        status: "Active",
        paymentMethod: "Credit Card",
        lastPayment: "2025-12-25",
        notes: "Long-term customer, loyal"
      },
      {
        id: 10,
        name: "Jennifer Lee",
        email: "jennifer@domain.com",
        phone: "+63 925 678 9012",
        clinicName: "Lee Medical Services",
        address: "456 Maple St, Alabang",
        subscriptionType: "Enterprise",
        subscriptionDate: "2025-02-28",
        subscriptionEnd: "2026-02-28",
        status: "Active",
        paymentMethod: "Bank Transfer",
        lastPayment: "2025-12-28",
        notes: "Enterprise client with special requirements"
      },
      {
        id: 11,
        name: "David Kim",
        email: "david@domain.com",
        phone: "+63 926 789 0123",
        clinicName: "Kim Medical Group",
        address: "123 Birch St, BGC",
        subscriptionType: "Premium",
        subscriptionDate: "2025-01-15",
        subscriptionEnd: "2026-01-15",
        status: "Active",
        paymentMethod: "Credit Card",
        lastPayment: "2025-12-15",
        notes: "New premium subscriber"
      },
      {
        id: 12,
        name: "Amanda Garcia",
        email: "amanda@domain.com",
        phone: "+63 927 890 1234",
        clinicName: "Garcia Health Clinic",
        address: "789 Cedar St, Makati",
        subscriptionType: "Basic",
        subscriptionDate: "2025-12-01",
        subscriptionEnd: "2026-06-01",
        status: "Active",
        paymentMethod: "Credit Card",
        lastPayment: "2025-12-01",
        notes: "Recently upgraded to basic plan"
      }
    ];
    setSubscribers(mockData);
  }, []);

  // Filter subscribers based on search and status
  const filteredSubscribers = subscribers.filter(subscriber => {
    const matchesSearch = 
      subscriber.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscriber.clinicName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || subscriber.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredSubscribers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSubscribers = filteredSubscribers.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedSubscribers(paginatedSubscribers.map(s => s.id));
    } else {
      setSelectedSubscribers([]);
    }
  };

  const handleSelectSubscriber = (id) => {
    setSelectedSubscribers(prev =>
      prev.includes(id)
        ? prev.filter(subId => subId !== id)
        : [...prev, id]
    );
  };

  const handleSendNotification = () => {
    setIsNotificationModalOpen(true);
  };

  const handleNotificationSent = (message) => {
    console.log("Notification sent to:", selectedSubscribers, "Message:", message);
    // Here you would typically make an API call
    alert(`Notification sent to ${selectedSubscribers.length} subscriber(s)`);
  };

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
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
                placeholder="Search by name, email, or clinic..."
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
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
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

        {/* Subscribers Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <SubscribersTable
            subscribers={paginatedSubscribers}
            selectedSubscribers={selectedSubscribers}
            onSelectAll={handleSelectAll}
            onSelectSubscriber={handleSelectSubscriber}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center p-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredSubscribers.length)} of {filteredSubscribers.length} subscribers
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
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2))
                    .map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          currentPage === page
                            ? "bg-[#2133ff] text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {page}
                    </button>
                  ))}
                </div>
                
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
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Send Notification Modal */}
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