"use client";

import React from "react";
import { useUser } from "../context/userContext";
import { useRouter } from "next/navigation";

export default function Settings() {
  const { user, setUser } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/delete-account`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        localStorage.clear();
        setUser(null);
        alert("Account deleted successfully.");
        router.push("/");
      } else {
        const data = await res.json();
        alert(data.message || "Failed to delete account.");
      }
    } catch (err) {
      alert("Error deleting account.");
      console.error(err);
    }
  };

  return (
    <div className="p-6 text-white bg-white rounded-3xl shadow-md w-full mx-auto">
      <div className="mb-3">
        <h1 className="text-3xl font-bold mb-1 text-black">Settings</h1>
        <p className="text-sm text-gray-600 mt-1">
          Manage your WeConnect account preferences and security options.
        </p>
      </div>
      <div className="overflow-y-auto md:max-h-[60vh] max-h-[72vh] space-y-6">
        {/* Profile Summary */}

        {/* Account Info */}
        <div className="bg-[#1a1a1a] rounded-2xl p-6 shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Account</h2>
          <p>
            <span className="font-semibold">Username:</span> {user?.username}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user?.email}
          </p>
        </div>

        {/* App Info */}
        <div className="bg-[#1a1a1a] rounded-2xl p-6 shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">About WeConnect</h2>
          <p className="mb-2">
            WeConnect is a blockchain-powered platform designed to help
            communities connect, share, and collaborate securely.
          </p>
          <p className="text-sm text-gray-400">
            Version 1.0.0 | Built for the future of decentralized connectivity
          </p>
        </div>

        <div className="bg-[#1a1a1a] p-6 rounded-2xl shadow-md space-y-3">
          <h2 className="text-xl font-semibold">Connected Wallets</h2>
          <p className="text-sm text-gray-400">
            Manage wallets linked to your WeConnect identity.
          </p>
          <ul className="mt-3 text-sm text-gray-300 list-disc list-inside">
            <li>Metamask Wallet (0xABC...1234)</li>
            <li>Ledger Hardware Wallet (0xDEF...5678)</li>
          </ul>
          <button className="mt-4 px-4 py-2 bg-[#3a3a3a] text-white text-sm rounded hover:bg-[#505050]">
            + Connect New Wallet
          </button>
        </div>

        {/* Security Tips */}
        <div className="bg-[#1a1a1a] rounded-2xl p-6 shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Security Tips</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Never share your private keys with anyone.</li>
            <li>Enable 2FA (when available).</li>
            <li>Only access your account from trusted devices.</li>
            <li>Always verify site URLs for authenticity.</li>
          </ul>
        </div>

        {/* Security */}
        <div className="bg-[#1a1a1a] p-6 rounded-2xl shadow-md space-y-3">
          <h2 className="text-xl font-semibold">Security</h2>
          <p className="text-sm text-gray-400">
            Your account is protected with JWT-based authentication. 2FA coming
            soon.
          </p>
          <div className="mt-3">
            <p className="text-sm text-yellow-400">2FA not enabled</p>
            <button className="mt-2 px-4 py-2 bg-[#3a3a3a] rounded hover:bg-[#505050] text-sm">
              Enable Two-Factor Authentication
            </button>
          </div>
        </div>

        {/* Community Guidelines */}
        <div className="bg-[#1a1a1a] rounded-2xl p-6 shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Community Guidelines</h2>
          <p className="text-gray-300">
            WeConnect is built on trust and transparency. Please interact
            respectfully, avoid spam or harmful content, and contribute to a
            positive decentralized environment.
          </p>
        </div>

        {/* Preferences */}
        <div className="bg-[#1a1a1a] p-6 rounded-2xl shadow-md space-y-3">
          <h2 className="text-xl font-semibold">Preferences</h2>
          <p className="text-sm text-gray-400">Personalize your experience.</p>
          <label className="flex items-center gap-2 mt-3 text-sm">
            <input type="checkbox" className="form-checkbox" disabled />
            Dark Mode (enabled by default)
          </label>
        </div>

        {/* Help & Support */}
        <div className="bg-[#1a1a1a] rounded-2xl p-6 shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Help & Support</h2>
          <p className="text-gray-300">
            Need assistance? Reach out to{" "}
            <a
              href="mailto:support@weconnect.io"
              className="underline text-blue-400"
            >
              support@weconnect.io
            </a>{" "}
            or visit our{" "}
            <a href="/faq" className="underline text-blue-400">
              FAQs
            </a>
            .
          </p>
        </div>

        {/* Legal */}
        <div className="bg-[#1a1a1a] rounded-2xl p-6 shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Legal</h2>
          <p className="text-gray-300">
            View our{" "}
            <a href="/privacy" className="underline text-blue-400">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="/terms" className="underline text-blue-400">
              Terms of Use
            </a>
            .
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 bg-[#2a0000] border border-red-500 p-6 rounded-2xl shadow-md">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-red-500 mb-2">
              Danger Zone
            </h2>
            <p className="text-sm text-gray-300">
              These actions are irreversible. Proceed with caution.
            </p>
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleLogout}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold md:py-2 py-1 md:px-6 px-4 rounded-xl transition"
            >
              Logout
            </button>
            <button
              onClick={handleDeleteAccount}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold md:py-2 py-1 md:px-6 px-4 rounded-xl transition"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
