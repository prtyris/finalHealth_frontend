// Users.jsx
import React, { useState } from "react";
import Header from "../../components/Header";
import DeactivateModal from "./modal/DeactivateModal";
import NotifyModal from "./modal/NotifyModal";
import AdminLayout from "../../components/AdminLayout";

function UserRow({ name, onDeactivateClick, onNotifyClick }) {
  return (
    <div className="flex justify-between items-center border-b pb-4">
      <div className="text-lg">User: {name}</div>

      <div className="flex gap-4">
        <button
          className="bg-[#2133ff] text-white px-4 py-2 rounded-xl cursor-pointer"
          onClick={() => onDeactivateClick(name)}
        >
          Deactivate
        </button>

        <button
          className="border border-gray-200 px-4 py-2 rounded-xl cursor-pointer"
          onClick={() => onNotifyClick(name)}
        >
          Notify
        </button>
      </div>
    </div>
  );
}

export default function Users() {
  const users = [{ name: "John Doe" }, { name: "Jane Smith" }];

  const [selectedUser, setSelectedUser] = useState(null);
  const [openDeactivate, setOpenDeactivate] = useState(false);
  const [openNotify, setOpenNotify] = useState(false);

  const handleDeactivate = (name) => {
    setSelectedUser(name);
    setOpenDeactivate(true);
  };

  const handleNotify = (name) => {
    setSelectedUser(name);
    setOpenNotify(true);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <Header title="Users" />

        <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-3xl font-bold mb-6">User Management</h2>

          <div className="space-y-4">
            {users.map((u, i) => (
              <UserRow
                key={i}
                name={u.name}
                onDeactivateClick={handleDeactivate}
                onNotifyClick={handleNotify}
              />
            ))}
          </div>
        </div>

        {/* MODALS */}
        <DeactivateModal
          isOpen={openDeactivate}
          onClose={() => setOpenDeactivate(false)}
          onConfirm={() => {
            console.log("Deactivated:", selectedUser);
            setOpenDeactivate(false);
          }}
          user={selectedUser}
        />

        <NotifyModal
          isOpen={openNotify}
          onClose={() => setOpenNotify(false)}
          onSend={(msg) => {
            console.log("Notification sent to", selectedUser, ":", msg);
            setOpenNotify(false);
          }}
          user={selectedUser}
        />
      </div>
    </AdminLayout>
  );
}
