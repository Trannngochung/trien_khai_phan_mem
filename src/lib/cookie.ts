import { Role } from "@prisma/client";
import Cookies from "js-cookie";

export function setRole(role: Role) {
  Cookies.set("role", role, {
    expires: 7, // 7 days
  });
}

export function getRole(): Role | null {
  const role = Cookies.get("role");
  return role ? (role as Role) : null;
}

export function setUsername(username: string) {
  Cookies.set("username", username, {
    expires: 7, // 7 days
  });
}

export function getUsername(): string | null {
  const username = Cookies.get("username");
  return username || null;
}
export function setProfile(profile: object) {
  Cookies.set("profile", JSON.stringify(profile), {
    expires: 7, // 7 days
  });
}

export function getProfile(): object | null {
  const profile = Cookies.get("profile");
  return profile ? JSON.parse(profile) : null;
}
export function clearCookie() {
  Cookies.remove("role");
  Cookies.remove("username");
  Cookies.remove("profile");
}
