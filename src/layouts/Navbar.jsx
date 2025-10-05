import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="flex justify-between w-full bg-[#F8F8F8] border-b border-gray-200 p-5">
      <div>
        {/* {user ? (
          <div>Welcome, {user.name}!</div>
        ) : (
          <div>Please log in to continue.</div>
        )}*/}
      </div>

      <div className="flex items-center">
        <span className="text-lg font-semibold">
          {user ? `Welcome, ${user.name}!` : "Guest"}
        </span>
        {user && (
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
        )}
      </div>
    </div>
  );
};

export default Navbar;
