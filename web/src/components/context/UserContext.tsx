import { createContext } from "react";

export type UserContextType = {
  user?: any;
  setUser: (user: any) => void;
  getCurrentUser: () => void;
};

export const UserContext = createContext<UserContextType>({
  user: undefined,
  setUser: () => {},
  getCurrentUser: () => {},
});
