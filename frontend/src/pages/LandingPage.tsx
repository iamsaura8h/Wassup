import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-lilac text-gray-800 dark:bg-darkbg dark:text-white transition-colors duration-300">
      <header className="w-full p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">Wassup 💬</h1>
        <div className="space-x-4">
          <Link to="/login" className="px-4 py-2 bg-lilac-accent rounded hover:bg-lilac-deep transition">Login</Link>
          <Link to="/register" className="px-4 py-2 bg-lilac-deep text-white rounded hover:bg-lilac-accent transition">Register</Link>
        </div>
      </header>

      <main className="text-center px-6 py-20 max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-6">Real-Time Chat Simplified</h2>
        <p className="text-lg mb-8">
          Wassup is your go-to real-time chat app with secure messaging, avatars, and beautiful UI built with modern tech.
        </p>
        <img
          src="/chat-illustration.svg"
          alt="chat mockup"
          className="mx-auto w-3/4 max-w-md mb-10"
        />
        <Link
          to="/register"
          className="bg-lilac-deep px-6 py-3 rounded text-white hover:bg-lilac-accent transition"
        >
          Get Started
        </Link>
      </main>
    </div>
  );
};

export default LandingPage;
