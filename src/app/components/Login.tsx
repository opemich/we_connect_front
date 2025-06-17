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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
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
        console.error("Failed to parse JSON response:", jsonErr);
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
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="space-y-4 bg-gray-400 p-14 md:px-20 rounded-md shadow-md">
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

        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-6 rounded-lg w-full md:w-auto hover:bg-blue-600 transition"
            >
              Sign In
            </button>

            <Link href="/signup" className="flex justify-center">
              <button
                type="button"
                className="bg-gray-500 text-white py-2 px-4 md:px-6 rounded-lg md:w-full hover:bg-gray-600 transition"
              >
                Sign Up
              </button>
            </Link>
          </div>

          <div className="text-sm text-center">
            <Link
              href="/forgot-password"
              className="text-red-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-sm border border-red-500 p-2 rounded bg-red-100">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-500 text-sm border border-green-500 p-2 rounded bg-green-100">
            {success}
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginForm;

// "use client";

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";

// const LoginForm = () => {
//   const [identifier, setIdentifier] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ identifier, password }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Login failed");

//       localStorage.setItem("token", data.token);
//       setSuccess("Login successful!");
//       setIdentifier("");
//       setPassword("");

//       setTimeout(() => {
//         router.push("/dashboard");
//       }, 1000);
//     } catch (err: unknown) {
//       if (err instanceof Error) setError(err.message);
//       else setError("Something went wrong");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="w-full max-w-sm sm:max-w-md bg-gray-400 p-6 sm:p-10 rounded-md shadow-md space-y-6">
//         <h2 className="text-center text-3xl sm:text-4xl text-gray-900 font-semibold uppercase">
//           Login
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4 ">
//           <div>
//             <label className="block text-sm font-medium text-gray-900">
//               Username or Email
//             </label>
//             <input
//               type="text"
//               value={identifier}
//               onChange={(e) => setIdentifier(e.target.value)}
//               required
//               className="border border-gray-300 rounded-md p-2 mt-1 w-full text-black focus:outline-blue-600"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-900">
//               Password
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="border border-gray-300 rounded-md p-2 mt-1 w-full text-black focus:outline-blue-600"
//             />
//           </div>

//           <div className="flex flex-col gap-2">
//             <button
//               type="submit"
//               className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
//             >
//               Log In
//             </button>
//             <Link href="/signup" className="text-center">
//               <button
//                 type="button"
//                 className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
//               >
//                 Sign Up
//               </button>
//             </Link>
//             <Link
//               href="/forgot-password"
//               className="text-sm text-red-600 hover:underline text-center mt-1"
//             >
//               Forgot Password?
//             </Link>
//           </div>

//           {error && (
//             <p className="text-red-600 text-sm border border-red-300 p-2 rounded bg-red-100">
//               {error}
//             </p>
//           )}
//           {success && (
//             <p className="text-green-600 text-sm border border-green-300 p-2 rounded bg-green-100">
//               {success}
//             </p>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;
