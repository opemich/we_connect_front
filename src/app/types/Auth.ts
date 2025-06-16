import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token }); // For real apps, decode token or fetch user profile
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return { user, logout };
}
