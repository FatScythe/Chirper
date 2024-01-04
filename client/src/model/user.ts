export interface IUser {
  id: number;
  userId?: number | null;
  name: string | null;
  avatar: string | null;
  readonly password?: string | null;
  email: string | null;
  description: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export type UserContextType = {
  isLoading: Boolean;
  user: IUser | null;
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
};
