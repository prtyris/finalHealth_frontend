import React from "react";
import SubscriberDetailsModal from "../modals/SubscriberDetailsModal";

export default function SubscribersTable({
  subscribers,
  selectedSubscribers,
  onSelectAll,
  onSelectSubscriber
}) {
  const [selectedSubscriber, setSelectedSubscriber] = React.useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = React.useState(false);

  const handleRowClick = (subscriber) => {
    setSelectedSubscriber(subscriber);
    setIsDetailsModalOpen(true);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#2133ff] text-white">
              <th className="p-4">
                <input
                  type="checkbox"
                  className="rounded"
                  onChange={onSelectAll}
                  checked={
                    subscribers.length > 0 &&
                    subscribers.every(s => selectedSubscribers.includes(s.id))
                  }
                />
              </th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Subscription Type</th>
              <th className="p-4">Status</th>
              <th className="p-4">Start Date</th>
              <th className="p-4">End Date</th>
            </tr>
          </thead>
          
          <tbody>
            {subscribers.map((subscriber) => (
              <tr 
                key={subscriber.id} 
                className="border-b hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                onClick={() => handleRowClick(subscriber)}
              >
                <td className="p-4" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    className="rounded"
                    checked={selectedSubscribers.includes(subscriber.id)}
                    onChange={() => onSelectSubscriber(subscriber.id)}
                  />
                </td>
                <td className="p-4 font-medium">{subscriber.name}</td>
                <td className="p-4 text-gray-600">{subscriber.email}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    subscriber.subscriptionType === "Premium" 
                      ? "bg-blue-100 text-blue-800"
                      : subscriber.subscriptionType === "Enterprise"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {subscriber.subscriptionType}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    subscriber.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {subscriber.status}
                  </span>
                </td>
                <td className="p-4">{subscriber.subscriptionDate}</td>
                <td className="p-4">{subscriber.subscriptionEnd}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {subscribers.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No subscribers found
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedSubscriber && (
        <SubscriberDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          subscriber={selectedSubscriber}
        />
      )}
    </>
  );
}