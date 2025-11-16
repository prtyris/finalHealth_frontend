export default function ClinicsTable() {
  const clinics = [
    { name: "Happy Clinic", address: "Davao City", contact: "09871027946" },
    {
      name: "City Care Clinic",
      address: "Taal, Cavite City",
      contact: "09348203458",
    },
    {
      name: "Wellness Hub",
      address: "Manila, Davao City",
      contact: "09710864856",
    },
  ];

  return (
    <div className="bg-white shadow rounded-xl border border-gray-100">
      <div className="px-6 py-4 border-b">
        <h2 className="text-sm font-semibold text-gray-700">
          Affiliated Clinics
        </h2>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="py-3 px-4 text-left">Clinic Name</th>
            <th className="py-3 px-4 text-left">Address</th>
            <th className="py-3 px-4 text-left">Contact Number</th>
          </tr>
        </thead>

        <tbody>
          {clinics.map((c, i) => (
            <tr key={i} className="border-b last:border-b-0">
              <td className="py-3 px-4">{c.name}</td>
              <td className="py-3 px-4">{c.address}</td>
              <td className="py-3 px-4">{c.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
