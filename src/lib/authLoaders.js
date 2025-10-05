import { redirect } from "react-router-dom";
import api from "../api/api";

/**
 * NOTE: it checks session via /auth/me (server must validate cookie/refresh)
 * If not authenticated, throw a redirect to /login (Router handles it).
 */
export async function requireAuthLoader({ request }) {
  try {
    // request.url gives the full URL; use it for redirectTo
    const resp = await api.get("/auth/me", { withCredentials: true }); // server must return 200 + user
    return resp.data; // this becomes useLoaderData()
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
      throw Error({ message: "Forbidden" }, { status: 403 });
    }
    return user;
  };
}
