import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Navbar() {
  const { user, logout, loading } = useAuth();

  return (
    <nav className="bg-gray-900 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-2xl font-bold text-teal-400">
          AuthApp
        </Link>
        <div className="flex gap-4 items-center">
          {loading ? (
            // Loading placeholder
            <span className="text-gray-400 animate-pulse"></span>
          ) : user ? (
            <>
              <span className="text-gray-300">
                Hi, {user.name}
              </span>
              {/* {isAdmin() && (
                <Link
                  to="/admin"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
                >
                  Admin Panel
                </Link>
              )} */}
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-teal-400">
                Login
              </Link>
              <Link to="/register" className="hover:text-teal-400">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
