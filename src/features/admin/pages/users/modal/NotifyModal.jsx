
import React, { useState } from "react";

export default function NotifyModal({ isOpen, onClose, onSend, user }) {
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 w-[420px] rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Send Notification</h2>

        <p className="text-gray-600 mb-4">
          Send a message to <span className="font-semibold">{user}</span>:
        </p>

        <textarea
          className="w-full border border-gray-300 rounded-xl p-3 h-32 resize-none"
          placeholder="Write your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="border border-gray-300 px-4 py-2 rounded-xl cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={() => onSend(message)}
            className="bg-[#2133ff] text-white px-4 py-2 rounded-xl cursor-pointer"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
