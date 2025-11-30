// Users.jsx
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import DeactivateModal from "./modal/DeactivateModal";
import AdminLayout from "../../components/AdminLayout";
import { getAllAdminUsers, deactivateUser } from "../../../../api/adminApi";

function UserRow({ name, onDeactivateClick }) {
  return (
    <div className="flex justify-between items-center border-b pb-4">
      <div className="text-lg">User: {name}</div>

      <button
        className="bg-[#2133ff] text-white px-4 py-2 rounded-xl cursor-pointer"
        onClick={() => onDeactivateClick(name)}
      >
        Deactivate
      </button>
    </div>
  );
}

export default function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDeactivate, setOpenDeactivate] = useState(false);

  // Load users from backend
  useEffect(() => {
    async function loadUsers() {
      const res = await getAllAdminUsers();
      if (res.success) setUsers(res.users);
    }
    loadUsers();
  }, []);

  const handleDeactivate = (name) => {
    setSelectedUser(name);
    setOpenDeactivate(true);
  };

  const confirmDeactivate = async () => {
    await deactivateUser(selectedUser);
    setUsers((prev) => prev.filter((u) => u.name !== selectedUser));
    setOpenDeactivate(false);
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
              />
            ))}
          </div>
        </div>

        {/* MODAL */}
        <DeactivateModal
          isOpen={openDeactivate}
          onClose={() => setOpenDeactivate(false)}
          onConfirm={confirmDeactivate}
          user={selectedUser}
        />
      </div>
    </AdminLayout>
  );
}
