import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import AppLayout from "./layouts/AppLayout";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/app/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import { requireAuthLoader, requireRoleLoader } from "./lib/authLoaders";
import CreatePost from "./pages/app/CreatePost";
import ManagePosts from "./pages/app/ManagePosts";
import EditPost from "./pages/app/EditPost";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      //PUBLIC ROUTES
      { index: true, element: <Home /> },
      { path: "post/:post_id", element: <Post /> },
    ],
  },
  {
    path: "/app",
    element: <AppLayout />,
    loader: requireAuthLoader,
    children: [
      // LOGGED USER ROUTES
      { index: true, element: <Dashboard /> },
      { path: "create-post", element: <CreatePost /> },
      { path: "manage-posts", element: <ManagePosts /> },
      { path: "manage-posts/:post_id", element: <EditPost /> },
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
