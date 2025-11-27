const AlertModal = ({ type = "success", message, onClose }) => {
  // 🔥 Prevent showing on initial load if no message
  if (!message) return null;

  const bgColor = type === "success" ? "bg-green-600" : "bg-red-600";
  const title = type === "success" ? "Success" : "Failed";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-[999] animate-fade-in">
      <div className="w-80 p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 text-center relative animate-pop">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
        >
          ✕
        </button>

        {/* Header */}
        <div
          className={`text-white py-2 px-4 rounded-lg ${bgColor} font-semibold`}
        >
          {title}
        </div>

        {/* Message */}
        <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm">
          {message}
        </p>
      </div>
    </div>
  );
};

export default AlertModal;
