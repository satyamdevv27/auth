import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex justify-center items-center px-4">

      <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-md w-full">

        <h1 className="text-3xl font-bold mb-3 text-blue-600">
          Auth System
        </h1>

        <p className="text-gray-600 mb-8">
          Secure authentication system with email OTP,
          JWT login, and password reset.
        </p>

        <div className="flex flex-col gap-3">

          <button
            onClick={() => navigate("/signup")}
            className="bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Sign Up
          </button>

          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
          >
            Dashboard
          </button>

        </div>
      </div>

    </div>
  );
}

export default Home;
