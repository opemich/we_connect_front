// components/ProtectedRoute.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/"); // Redirect to home if not authenticated
    }
  }, [router]);

  return <>{children}</>;
};

export default ProtectedRoute;
// Usage example:
// import ProtectedRoute from './components/ProtectedRoute';