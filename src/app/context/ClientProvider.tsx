// src/app/context/ClientProviders.tsx
"use client";

import React from "react";
import { UserProvider } from "./userContext";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return <UserProvider>{children}</UserProvider>;
}
