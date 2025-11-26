import * as XLSX from "xlsx";

export default function ExportExcel({ data, filename = "export.xlsx" }) {
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, filename);
  };

  return (
    <button
      onClick={exportExcel}
      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg"
    >
      Export Excel
    </button>
  );
}
