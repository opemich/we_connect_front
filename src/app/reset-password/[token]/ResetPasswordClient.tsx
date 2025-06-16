// "use client";

// import { useParams, useRouter } from "next/navigation";
// import { useState } from "react";

// export default function ResetPasswordClient() {
//   const { token } = useParams() as { token: string };
//   const router = useRouter();

//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleReset = async () => {
//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/auth/reset-password/${token}`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ password }),
//         }
//       );

//       let data;
//       try {
//         data = await res.json();
//       } catch {
//         throw new Error("Server returned invalid response.");
//       }

//       if (!res.ok) {
//         throw new Error(data.message || "Something went wrong");
//       }

//       setMessage("Password reset successful!");
//       setError("");
//       setTimeout(() => router.push("/"), 2000);
//     } catch (err: any) {
//       setError(err.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-8">
//       <h1 className="text-2xl font-bold mb-4">Reset Your Password</h1>
//       <input
//         type="password"
//         placeholder="New password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="border rounded p-2 mb-4 w-64"
//         required
//       />
//       <input
//         type="password"
//         placeholder="Confirm new password"
//         value={confirmPassword}
//         onChange={(e) => setConfirmPassword(e.target.value)}
//         className="border rounded p-2 mb-4 w-64"
//         required
//       />
//       <button
//         onClick={handleReset}
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//       >
//         Reset Password
//       </button>
//       {message && <p className="text-green-600 mt-4">{message}</p>}
//       {error && <p className="text-red-600 mt-4">{error}</p>}
//     </div>
//   );
// }
// // This component handles the reset password functionality on the client side.
// // It uses the token from the URL to send a request to the server to reset the password.

"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordClient() {
  const { token } = useParams() as { token: string };
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    setLoading(true);
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/reset-password/${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password, confirmPassword }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        const msg =
          data.errors?.[0]?.msg || data.message || "Something went wrong";
        throw new Error(msg);
      }

      setMessage("✅ Password reset successful!");
      setTimeout(() => router.push("/"), 2500);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-400 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 text-center">
        Reset Your Password
      </h1>

      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 mb-4 rounded text-black border border-gray-300 focus:outline-offset-1 outline-blue-700"
        required
      />
      <input
        type="password"
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full px-4 py-2 mb-4 rounded text-black border border-gray-300 focus:outline-offset-1 outline-blue-700"
        required
      />
      <button
        onClick={handleReset}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 w-full rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>

      {message && (
        <p className="text-green-500 text-sm border border-green-500 p-2 rounded bg-green-100">
          {message}
        </p>
      )}
      {error && (
        <p className="text-red-500 text-sm border border-red-500 p-2 rounded bg-red-100">
          {error}
        </p>
      )}

      <p className="mt-4 text-center text-sm">
        <Link href="/" className="text-blue-600 hover:underline">
          Back to Login
        </Link>
      </p>
    </div>
  );
}
// This component handles the reset password functionality on the client side.
// It uses the token from the URL to send a request to the server to reset the password.
