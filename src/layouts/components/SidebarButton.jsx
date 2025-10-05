import { Link, useLocation } from "react-router-dom";

const SidebarButton = ({ icon, text, path = "#" }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const isActivePath = pathname === path;

  return (
    <Link
      to={path}
      className={`flex items-center cursor-pointer select-none p-2 rounded-md ${isActivePath ? "bg-blue-200" : "bg-gray-200 hover:bg-gray-300"}`}
    >
      {icon}
      <span className="ml-2">{text}</span>
    </Link>
  );
};

export default SidebarButton;
