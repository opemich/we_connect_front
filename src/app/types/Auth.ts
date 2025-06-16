import { useEffect, useState } from "react";

interface User {
  token: string;
  // Add more fields if you decode or fetch actual user info later
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Just storing the token for now
      setUser({ token });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return { user, logout };
}

