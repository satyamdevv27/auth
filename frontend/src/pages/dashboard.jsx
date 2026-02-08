import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handlelogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">


      {/* Main Content */}
      <div className="flex flex-1 justify-center items-center">
        <div className="bg-white shadow-lg rounded-xl p-10 text-center max-w-md w-full">

          <h2 className="text-2xl font-semibold mb-4">
            Welcome 🎉
          </h2>

          <p className="text-gray-600 mb-6">
            You are successfully logged in. This is a protected dashboard page.
          </p>

          <button
            onClick={handlelogout}
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition cursor-pointer"
          >
            Logout
          </button>

        </div>
      </div>

    </div>
  );
}

export default Dashboard;
