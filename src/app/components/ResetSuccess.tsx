'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const ResetSuccess = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen p-4 md:p-1">
      <div className="max-w-md mx-auto p-6 bg-gray-400 shadow-md rounded-lg text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Password Reset Successful</h2>
        <p className="mb-6 text-gray-800">You can now login with your new password.</p>
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default ResetSuccess;
