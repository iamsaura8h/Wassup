import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4">
      <div className="text-center max-w-md space-y-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800">
          💬 ChatBroski
        </h1>
        <p className="text-gray-600 text-lg">
          Real-time messaging app built for casual chaos & sarcastic vibes.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-2 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-100 transition"
          >
            Register
          </Link>
        </div>

        <p className="text-xs text-gray-500 pt-2">
          🧠 Built with MERN + TypeScript + ShadCN vibes.
        </p>
      </div>
    </div>
  );
}
