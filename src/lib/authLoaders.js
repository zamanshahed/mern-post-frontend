import { redirect } from "react-router-dom";
import api from "../api/api";

/**
 * NOTE: it checks session via /auth/me (server must validate cookie/refresh)
 * If not authenticated, throw a redirect to /login (Router handles it).
 */
export async function requireAuthLoader({ request }) {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      const pathname = new URL(request.url).pathname;
      throw redirect(`/login?redirectTo=${encodeURIComponent(pathname)}`);
    }

    // Optional: validate token on server
    const resp = await api.get("/auth/me"); // axiosInstance already adds Authorization header
    return resp.data; // this becomes useLoaderData() in your protected route
  } catch (err) {
    const pathname = new URL(request.url).pathname;
    throw redirect(`/login?redirectTo=${encodeURIComponent(pathname)}`);
  }
}

/**
 * requireRoleLoader(role) -> loader that enforces a role after auth check
 */
export function requireRoleLoader(role) {
  return async (args) => {
    const user = await requireAuthLoader(args);
    if (!user?.roles || !user.roles.includes(role)) {
      // Use redirect or throw Response for proper error page
      throw new Response("Forbidden", { status: 403 });
    }
    return user;
  };
}
