import { useEffect, useState, useCallback, type ReactNode } from "react";
import { AppContext } from "@/types/AppContextType";

// Type the props for the provider component
interface AppContextProviderProps {
  children: ReactNode;
}

export default function AppContextProvider({ children }: AppContextProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize token from localStorage after component mounts
  useEffect(() => {
    // Clear any potentially invalid tokens
    const storedToken = localStorage.getItem("token");
    
    // Check if token exists and has a valid format
    if (storedToken && typeof storedToken === 'string' && storedToken.length > 10) {
      setToken(storedToken);
    } else {
      // Remove invalid token
      localStorage.removeItem("token");
    }
    
    setIsInitialized(true);
  }, []);

  // Use useCallback to memoize the function
  const fetchUser = useCallback(async () => {
    // Get the latest token value directly from localStorage
    const currentToken = localStorage.getItem("token");
    
    // Multiple safety checks
    if (!currentToken || typeof currentToken !== 'string' || currentToken.length < 10) {
      // Silently return if no valid token exists
      return;
    }
    
    setIsLoading(true);
    try {
      // Add console log to debug token being sent (remove in production)
      console.log("Attempting to fetch user with token prefix:", currentToken.substring(0, 10) + "...");
      
      const response = await fetch("/api/pets-user", {
        headers: {
          "Authorization": `Bearer ${currentToken}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      });

      if (!response.ok) {
        // If token is invalid, remove it
        if (response.status === 401) {
          console.log("Unauthorized: Clearing invalid token");
          localStorage.removeItem("token");
          setToken(null);
        }
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      setUser(data);
    } catch (error: unknown) {
      // Only log the error if it's not a 401 (since we handle that above)
      if (!(error instanceof Error && error.message.includes('401'))) {
        console.error("Error fetching user:", error);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Only fetch user data when we have a token AND the component is initialized
  useEffect(() => {
    // Delay the fetch slightly to ensure everything is ready
    if (isInitialized && token) {
      const timer = setTimeout(() => {
        fetchUser();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [token, fetchUser, isInitialized]);

  return (
    <AppContext.Provider
      value={{
        token,
        setToken,
        user,
        isLoading,
        refreshUser: fetchUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
