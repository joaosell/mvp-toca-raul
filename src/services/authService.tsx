import type { User } from "../interfaces/User";
import axiosClient from "./axiosClient";

export type LoginData = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user?: User;
};

export type UserAccountType = "artist" | "venue_owner";

export type RegisterArtistData = {
  name: string;
  genres: string;
  start_price: string;
  about: string;
  photo_url: string;
  samples_url: string;
};

export type RegisterVenueData = {
  name: string;
  location: string;
  capacity: string;
  genre: string;
  price: string;
  date: string;
  image: string;
  description?: string;
};

export type RegisterUserData = {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  type: UserAccountType;
  artist?: RegisterArtistData;
  venue?: RegisterVenueData;
};

export type RegisterResponse = {
  user: User;
  token?: string;
};

export const login = async (loginData: LoginData): Promise<LoginResponse> => {
  const response = await axiosClient.post<LoginResponse>("/auth/login", loginData);
  return response.data;
};

export const registerUser = async (
  userData: RegisterUserData,
): Promise<RegisterResponse> => {
  const response = await axiosClient.post<RegisterResponse>("/auth/register", userData);
  return response.data;
};

export {
  clearAuthSession,
  getAuthAccountType,
  getAuthToken,
  getAuthUser,
  getAuthenticatedHomePath,
  isAuthenticated,
  saveAuthSession,
} from "./authStorage";
