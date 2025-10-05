import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div>
      Public Layout <Outlet />
    </div>
  );
};

export default PublicLayout;
