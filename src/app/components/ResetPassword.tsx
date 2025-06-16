// import React, { useState, useEffect } from "react";
// const router = useRouter();
// const { token } = router.query;
// // import { useRouter } from "next/navigation";

// interface ResetPasswordProps {
//   token: string;
//   onSuccess?: () => void;
//   onError?: (msg: string) => void;
// }

// const ResetPassword: React.FC<ResetPasswordProps> = ({
//   token,
//   onSuccess,
//   onError,
// }) => {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
//   const [userEmail, setUserEmail] = useState("");

//   // Verify token on component mount
//   useEffect(() => {
//     const verifyToken = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:5000/reset-password/${token}`
//         );
//         const data = await response.json();

//         if (data.success) {
//           setIsValidToken(true);
//           setUserEmail(data.email || "");
//         } else {
//           setIsValidToken(false);
//           setError(data.message || "Invalid or expired reset token");
//           if (onError) onError(data.message);
//         }
//       } catch (err) {
//         setIsValidToken(false);
//         setError("Network error. Please try again.");
//         if (onError) onError("Network error");
//       }
//     };

//     if (token) {
//       verifyToken();
//     }
//   }, [token, onError]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     if (password.length < 8) {
//       setError("Password must be at least 8 characters long");
//       return;
//     }

//     setIsLoading(true);
//     setMessage("");
//     setError("");

//     try {
//       const response = await fetch(
//         `http://localhost:5000/reset-password/${token}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ password, confirmPassword }),
//         }
//       );

//       const data = await response.json();

//       if (data.success) {
//         setMessage(data.message);
//         if (onSuccess) {
//           setTimeout(() => onSuccess(), 2000);
//         }
//       } else {
//         setError(data.message || "An error occurred. Please try again.");
//       }
//     } catch (err) {
//       setError("Network error. Please check your connection and try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (isValidToken === null) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Verifying reset token...</p>
//         </div>
//       </div>
//     );
//   }

//   if (isValidToken === false) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="max-w-md w-full text-center">
//           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
//             {error}
//           </div>
//           <div className="mt-4">
//             <a
//               href="/forgot-password"
//               className="text-indigo-600 hover:text-indigo-500 underline"
//             >
//               Request a new reset link
//             </a>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div className="text-center">
//           <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
//             Reset your password
//           </h2>
//           {userEmail && (
//             <p className="mt-2 text-sm text-gray-600">for {userEmail}</p>
//           )}
//         </div>

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="space-y-4">
//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 New Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 placeholder="Enter new password"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="confirmPassword"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Confirm Password
//               </label>
//               <input
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 type="password"
//                 required
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 placeholder="Confirm new password"
//               />
//             </div>
//           </div>

//           <div className="text-xs text-gray-500">
//             Password must be at least 8 characters long and contain uppercase,
//             lowercase, and numbers.
//           </div>

//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
//               {error}
//             </div>
//           )}

//           {message && (
//             <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative">
//               {message}
//               <div className="text-sm mt-2">Redirecting to login page...</div>
//             </div>
//           )}

//           <div>
//             <button
//               type="submit"
//               disabled={isLoading || !password || !confirmPassword}
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isLoading ? "Resetting..." : "Reset Password"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;


'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const router = useRouter();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await axios.patch(`http://localhost:5000/api/reset-password/${token}`, {
      password,
      confirmPassword
    });

    setMessage(res.data.message);
  } catch (err: any) {
    setError(err.response?.data?.message || 'Something went wrong');
  }
};
  if (password !== confirmPassword) {
    setError('Passwords do not match');
    return;
  }
  if (password.length < 8) {
    setError('Password must be at least 8 characters long');
    return;
  }
  setLoading(true);
  setError('');

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Reset Your Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          className="w-full px-4 py-2 border rounded"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full px-4 py-2 border rounded"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
      <div className="text-center mt-6">
  <Link href="/" className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
    Go to Login
  </Link>
</div>
    </div>
  );
};

export default ResetPassword;
