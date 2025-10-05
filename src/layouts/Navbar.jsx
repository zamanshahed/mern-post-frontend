import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { FaUser } from "react-icons/fa";
import { isPublicPath } from "../utils/publicPath";

const Navbar = () => {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();
  const pathname = location.pathname;
  const isPublicLayout = isPublicPath(pathname);
  return (
    <div
      className={`flex justify-between w-full ${isPublicLayout ? "bg-[#0C0A25] text-white border-indigo-600" : "bg-[#F8F8F8] border-gray-200"} border-b py-2 px-5`}
    >
      <div>
        {isPublicLayout && (
          <div className="flex items-center gap-5">
            <img
              src="/images/login-logo.svg"
              alt="Newsx Logo"
              className=" mx-auto"
            />
            {user && (
              <Link
                to="/app"
                className="text-blue-50 hover:text-blue-300 font-semibold text-sm hover:text-base transition-all ease-in-out"
              >
                Dashboard
              </Link>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center">
        <span className="text-lg font-semibold">
          {user ? `Welcome, ${user.name}!` : "Welcome Guest!"}
        </span>
        {user ? (
          <Link
            to="/login"
            onClick={() => {
              localStorage.setItem("token", null);
              localStorage.setItem("user", null);
            }}
            className="bg-rose-500 text-white px-4 py-2 rounded-md ml-4 font-bold cursor-pointer"
          >
            Logout
          </Link>
        ) : (
          <Link
            to="/login"
            className=" text-white px-4 py-2 rounded-md ml-4 font-bold cursor-pointer"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
