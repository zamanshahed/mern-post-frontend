export function isPublicPath(pathname) {
  return !pathname.startsWith("/app");
}
