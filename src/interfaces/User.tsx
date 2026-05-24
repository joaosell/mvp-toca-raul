export interface User {
  id: number;
  firstName: string;
  lastName: string | null;
  createdAt: string;
  email: string;
  type: string;
  passHash: string;
}