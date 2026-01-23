// src/utils/resolveImageUrl.js
export function resolveImageUrl(path) {
  if (!path) return null;

  // already absolute (cloud / future proof)
  if (path.startsWith("http")) return path;

  const API_BASE = import.meta.env.VITE_API_BASE;

  // ensure no double slashes
  return `${API_BASE}${path.startsWith("/") ? "" : "/"}${path}`;
}
