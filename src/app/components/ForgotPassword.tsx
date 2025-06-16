// import Link from 'next/link';
// import React, { useState } from 'react';

// interface ForgotPasswordProps {
//   onSuccess?: () => void;
// }

// const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onSuccess }) => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setMessage('');
//     setError('');

//     try {
//       const response = await fetch('http://localhost:5000/forgot-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         setMessage(data.message);
//         setEmail(''); // Clear the form
//         if (onSuccess) onSuccess();
//       } else {
//         setError(data.message || 'An error occurred. Please try again.');
//       }
//     } catch (err) {
//       setError('Network error. Please check your connection and try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div className="text-center">
//           <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
//             Forgot your password?
//           </h2>
//           <p className="mt-2 text-sm text-gray-600">
//             Enter your email address and we'll send you a link to reset your password.
//           </p>
//         </div>

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="email" className="sr-only">
//               Email address
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               autoComplete="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//               placeholder="Email address"
//             />
//           </div>

//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
//               {error}
//             </div>
//           )}

//           {message && (
//             <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative">
//               {message}
//             </div>
//           )}

//           <div>
//             <button
//               type="submit"
//               disabled={isLoading || !email}
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isLoading ? 'Sending...' : 'Send Reset Link'}
//             </button>
//           </div>

//           <div className="text-center">
//             <Link href="/" className="text-indigo-600 hover:text-indigo-500 text-sm underline">
//               Back to login
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;

"use client";

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/forgot-password",
        { email }
      );
      setMessage(res.data.message || "Reset link sent. Check your email.");
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-400 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">
        Forgot Password
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          className="w-full px-4 py-2 rounded text-black border border-gray-300 focus:outline-offset-1 outline-blue-700"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
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
      </form>
      <p className="mt-4 text-center text-sm">
        <Link href="/" className="text-blue-600 hover:underline">
          Back to Login
        </Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
