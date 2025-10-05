import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useEffect } from "react";

const AppLayout = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);
  return (
    <div>
      <div className="flex">
        <Sidebar />
        <div className="flex-grow">
          <Navbar />
          <div className="p-3">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
