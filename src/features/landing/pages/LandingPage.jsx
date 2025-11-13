import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center">
      <h1 className="text-4xl font-bold mb-4 text-blue-600">
        FinalHealth EMR Platform
      </h1>
      <p className="text-gray-600 mb-6">
        Manage appointments, patients, and records seamlessly.
      </p>
      <div className="space-x-4">
        <Link
          to="/user/login"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Login
        </Link>
        <Link
          to="/user/register"
          className="border border-blue-600 text-blue-600 px-5 py-2 rounded-lg"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
