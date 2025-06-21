import { createContext, type Dispatch, type SetStateAction } from "react";

// Define user type based on your API response
interface User {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  address?: string;
  // Add other properties your API returns
  // [key: string]: any; // Allow for additional properties
}

// Define the type for our context data
export interface AppContextType {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  user: User;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
}

// Create default value for the context
const defaultContextValue: AppContextType = {
  token: null,
  setToken: () => {},
  user: {},
  isLoading: false,
  refreshUser: async () => {},
};

// Create context with proper typing and default value
export const AppContext = createContext<AppContextType>(defaultContextValue);