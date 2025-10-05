import { FiHome } from "react-icons/fi";
import { IoCreateOutline } from "react-icons/io5";
import { MdEditRoad } from "react-icons/md";
import SidebarButton from "./components/SidebarButton";

const Sidebar = () => {
  return (
    <div className="bg-[#F8F8F8] border-r border-gray-200 w-max min-w-[300px] h-screen flex flex-col p-5">
      <img
        src="/images/login-logo.svg"
        alt="Logo"
        width={200}
        height={100}
        className="mx-auto"
      />
      <div className="pt-8 space-y-4">
        <SidebarButton
          icon={<FiHome className="w-5 h-5 font-bold" />}
          text="Home"
          path="/app"
        />
        <SidebarButton
          icon={<IoCreateOutline className="w-5 h-5 font-bold" />}
          text="Create Post"
          path="/app/create-post"
        />
        <SidebarButton
          icon={<MdEditRoad className="w-5 h-5 font-bold" />}
          text="Manage Posts"
          path="/app/manage-posts"
        />
      </div>
    </div>
  );
};

export default Sidebar;
