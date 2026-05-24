import type { User } from "./User";

export interface Artist {
  id: number;
  name: string;
  about: string;
  photoUrl: string;
  genres: string;
  samplesUrl: string;
  startPrice: string;
  user: User;
}