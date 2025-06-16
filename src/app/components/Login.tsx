"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginForm = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setSuccess("");

  try {
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    });

    let data;

    try {
      data = await res.json();

       if (res.ok) {
      localStorage.setItem("token", data.token); // ✅ Save token
    } else {
      // alert(data.error);
    }

    } catch (jsonErr) {
      const text = await res.text(); // fallback to raw response
      console.error("Raw server response:", text);
      throw new Error("Server returned invalid JSON");
    }

    if (!res.ok) {
      throw new Error(data.error || "Login failed");
    }

    // Save token to localStorage
    localStorage.setItem("token", data.token);

    setSuccess("Login successful!");
    setIdentifier("");
    setPassword("");

    // Redirect after a delay
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  } catch (err: any) {
    setError(err.message || "Something went wrong");
  }
};


  return (
    <div className="space-y-4 bg-gray-400 p-14 px-20 rounded-md shadow-md">
      <h2 className="text-center text-4xl text-gray-900 font-semibold uppercase">
        Login
      </h2>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username or Email
          </label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            className="border border-gray-300 rounded p-2 mt-2 w-full text-black focus:outline-offset-1 outline-blue-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password} // Handle password input
            onChange={(e) => setPassword(e.target.value)} // Handle password change
            required
            className="border border-gray-300 rounded p-2 mt-2 w-full text-black focus:outline-offset-1 outline-blue-700"
          />
        </div>

        <div>
          <button type="submit" className="bg-blue-500 py-1 px-6 rounded-lg">
            Sign In
          </button>
          <Link href="/signup">
            <button
              type="button"
              className="bg-gray-500 py-1 px-6 rounded-lg ml-4"
            >
              Sign Up
            </button>
          </Link>
          <div className="text-red-500 text-sm mt-1">
            <Link href="/forgot-password" className="hover:underline">
              Forgot Password?
            </Link>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm border border-red-500 p-2 rounded bg-red-100">{error}</p>}
        {success && <p className="text-green-500 text-sm border border-green-500 p-2 rounded bg-green-100">{success}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
