// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// type Props = {
//   params: {
//     token: string;
//   };
// };

// export default function ResetPasswordPage({ params }: Props) {
//   const { token } = params;
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleReset = async () => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ password }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Something went wrong");

//       setMessage(data.message || "Password reset successful.");
//       setError("");
//       setTimeout(() => router.push("/"), 2000); // Redirect to home or login
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

// "use client";

// import { useState } from "react";
// import { useRouter, useParams } from "next/navigation";

// export default function ResetPasswordPage() {
//   const { token } = useParams() as { token: string };
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleReset = async () => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ password }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Something went wrong");

//       setMessage(data.message || "Password reset successful.");
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
// // This code defines a reset password page in a Next.js application.
// // It allows users to reset their password using a token provided in the URL.


import ResetPasswordClient from "./ResetPasswordClient";

export default function ResetPasswordPage() {
  return <ResetPasswordClient />;
}
