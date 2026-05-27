import type { User } from "../interfaces/User";

const AUTH_TOKEN_KEY = "toca_raul_auth_token";
const AUTH_USER_KEY = "toca_raul_auth_user";

export type AuthenticatedUser = Omit<User, "passHash">;
type AuthAccountType = "artist" | "venue_owner";

const sanitizeUser = (user: User): AuthenticatedUser => {
  const { passHash: _passHash, ...safeUser } = user;
  return safeUser;
};

export const saveAuthSession = (token: string, user?: User) => {
  if (token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }

  if (user) {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(sanitizeUser(user)));
  }
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

export const getAuthUser = (): AuthenticatedUser | null => {
  const storedUser = localStorage.getItem(AUTH_USER_KEY);

  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser) as AuthenticatedUser;
  } catch {
    localStorage.removeItem(AUTH_USER_KEY);
    return null;
  }
};

const decodeTokenPayload = (token: string): Record<string, unknown> | null => {
  const payload = token.split(".")[1];

  if (!payload) return null;

  try {
    const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
    const paddingLength = (4 - (normalizedPayload.length % 4)) % 4;
    const paddedPayload = normalizedPayload.padEnd(
      normalizedPayload.length + paddingLength,
      "=",
    );

    return JSON.parse(atob(paddedPayload)) as Record<string, unknown>;
  } catch {
    return null;
  }
};

const normalizeAccountType = (value: unknown): AuthAccountType | null => {
  if (typeof value !== "string") return null;

  const normalizedValue = value.toLowerCase();

  if (normalizedValue === "artist") return "artist";
  if (normalizedValue === "venue_owner" || normalizedValue === "venue") {
    return "venue_owner";
  }

  return null;
};

export const getAuthAccountType = (): AuthAccountType | null => {
  const userType = normalizeAccountType(getAuthUser()?.type);

  if (userType) return userType;

  const token = getAuthToken();
  const tokenPayload = token ? decodeTokenPayload(token) : null;

  return (
    normalizeAccountType(tokenPayload?.type) ??
    normalizeAccountType(tokenPayload?.accountType) ??
    normalizeAccountType(tokenPayload?.userType) ??
    normalizeAccountType(tokenPayload?.role)
  );
};

export const isAuthenticated = (): boolean => {
  return Boolean(getAuthToken() || getAuthUser());
};

export const getAuthenticatedHomePath = (): "/artists" | "/venues" | "/login" => {
  if (!isAuthenticated()) return "/login";

  return getAuthAccountType() === "venue_owner" ? "/venues" : "/artists";
};

export const clearAuthSession = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
};
