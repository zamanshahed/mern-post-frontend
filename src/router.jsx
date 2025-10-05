import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import AppLayout from "./layouts/AppLayout";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Dashboard from "./pages/app/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import { requireAuthLoader, requireRoleLoader } from "./lib/authLoaders";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      //PUBLIC ROUTES
      { index: true, element: <Home /> },
      { path: "post/:slug", element: <Post /> },
      // { path: "login", element: <Login /> },
    ],
  },
  {
    path: "/app",
    element: <AppLayout />,
    loader: requireAuthLoader,
    children: [
      // LOGGED USER ROUTES
      { index: true, element: <Dashboard /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    loader: requireRoleLoader("admin"),
    errorElement: <div>Not authorized</div>,
    children: [
      // ADMIN ROUTES
      { index: true, element: <AdminDashboard /> },
    ],
  },
]);

export default router;
