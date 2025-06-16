"use client";

import React from "react";
import { useState, useEffect } from "react";
import { FormData } from "../types/FormData";
import Link from "next/link";

const MyForm = () => {
  const [successMessage, setSuccessMessage] = useState("");
  // This state will hold the success message after form submission
  const [errorMessage, setErrorMessage] = useState("");
  // This state will hold the error message if any error occurs during form submission
  const [passwordError, setPasswordError] = useState("");
  // This state will hold the password error message if passwords do not match

  const [data, setData] = useState<FormData>({
    fullname: "",
    username: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    country: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }; // This function handles input changes

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(""); // Clear previous messages
    setErrorMessage("");
    // Reset the error message before submission
    setPasswordError(""); // Clear previous error message for password mismatch
    // Check if passwords match

    if (data.password !== data.confirmPassword) {
      setPasswordError("Passwords does not match.");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/submit-form`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Form submitted successfully:", result);
      // Parse the JSON response

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }
      // If the response is ok, parse the JSON response

      setSuccessMessage(result.message || "Form submitted successfully."); // Set the success message from the response

      // Reset the form after successful submission
      setData({
        fullname: "",
        username: "",
        email: "",
        mobile: "",
        address: "",
        city: "",
        state: "",
        country: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      console.error("Error submitting form:", error);
      // setSuccessMessage("Something went wrong. Please try again.");
      setErrorMessage(
        error.message || "Failed to submit the form. Please try again."
      );
    }
  }; // This function handles form submission

  useEffect(() => {
    if (errorMessage || successMessage ) {
      const timer = setTimeout(() => {
        setErrorMessage("");
        setSuccessMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, successMessage]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8 uppercase">sign up</h1>
      {/* This is the title of the form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-gray-400 py-14 px-24 rounded-md shadow-md"
      >
        <div className="flex gap-4 items-center w-[500px] relative">
          <label htmlFor="fullname" className="text-black w-40">
            Full-Name:
          </label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={data.fullname}
            onChange={handleChange}
            required
            placeholder="Enter your fullname"
            className="border border-gray-300 rounded p-2 mt-2 w-full text-black focus:outline-offset-1 outline-blue-700"
          />
          <div className="text-sm text-red-500 absolute right-1 top-2">*</div>
        </div>
        <div className="flex gap-4 items-center w-[500px] relative">
          <label htmlFor="username" className="text-black w-40">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={data.username}
            onChange={handleChange}
            required
            placeholder="Enter your username"
            className="border border-gray-300 rounded p-2 mt-2 w-full text-black focus:outline-offset-1 outline-blue-700"
          />
          <div className="text-sm text-red-500 absolute right-1 top-2">*</div>
        </div>
        <div className="flex gap-4 items-center w-[500px] relative">
          <label htmlFor="email" className="text-black w-40">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
            placeholder="Enter your email..."
            className="border border-gray-300 rounded p-2 mt-2 w-full text-black focus:outline-offset-1 outline-blue-700"
          />
          <div className="text-sm text-red-500 absolute right-1 top-2">*</div>
        </div>
        <div className="flex gap-4 items-center w-[500px] relative">
          <label htmlFor="mobile" className="text-black w-40">
            Mobile:
          </label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={data.mobile}
            onChange={handleChange}
            maxLength={11}
            required
            placeholder="Enter your mobile number..."
            className="border border-gray-300 rounded p-2 mt-2 w-full text-black focus:outline-offset-1 outline-blue-700"
          />
          <div className="text-sm text-red-500 absolute right-1 top-2">*</div>
        </div>
        <div className="flex gap-4 items-center w-[500px] relative">
          <label htmlFor="address" className="text-black w-40">
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={data.address}
            onChange={handleChange}
            required
            placeholder="Enter your address..."
            className="border border-gray-300 rounded p-2 mt-2 w-full text-black focus:outline-offset-1 outline-blue-700"
          />
          <div className="text-sm text-red-500 absolute right-1 top-2">*</div>
        </div>
        <div className="flex gap-4 items-center w-[500px] relative">
          <label htmlFor="city" className="text-black w-40">
            City:
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={data.city}
            onChange={handleChange}
            required
            placeholder="Enter your city..."
            className="border border-gray-300 rounded p-2 mt-2 w-full text-black focus:outline-offset-1 outline-blue-700"
          />
          <div className="text-sm text-red-500 absolute right-1 top-2">*</div>
        </div>
        <div className="flex gap-4 items-center w-[500px] relative">
          <label htmlFor="state" className="text-black w-40">
            State:
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={data.state}
            onChange={handleChange}
            required
            placeholder="Enter your state..."
            className="border border-gray-300 rounded p-2 mt-2 w-full text-black focus:outline-offset-1 outline-blue-700"
          />
          <div className="text-sm text-red-500 absolute right-1 top-2">*</div>
        </div>
        <div className="flex gap-4 items-center w-[500px] relative">
          <label htmlFor="country" className="text-black w-40">
            Country:
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={data.country}
            onChange={handleChange}
            required
            placeholder="Enter your country..."
            className="border border-gray-300 rounded p-2 mt-2 w-full text-black focus:outline-offset-1 outline-blue-700"
          />
          <div className="text-sm text-red-500 absolute right-1 top-2">*</div>
        </div>
        <div className="flex gap-4 items-center w-[500px] relative">
          <label htmlFor="password" className="text-black w-40">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            required
            placeholder="Choose your password..."
            className="border border-gray-300 rounded p-2 mt-2 w-full text-black focus:outline-offset-1 focus:outline-blue-700"
          />
          <div className="text-sm text-red-500 absolute right-1 top-2">*</div>
        </div>
        <div className="flex gap-2 items-center w-[500px] relative">
          <label htmlFor="confirmpassword" className="text-black w-56">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm your password..."
            className="border border-gray-300 rounded p-2 mt-2 w-full text-black focus:outline-offset-1 focus:outline-blue-700"
          />
          <div className="text-sm text-red-500 absolute right-1 top-2">*</div>
        </div>
        <div className="space-x-4 mt-10">
          <button type="submit" className="bg-blue-500 py-1 px-6 rounded-lg">
            Sign Up
          </button>
          <Link href="/">
            <button type="submit" className="bg-gray-500 py-1 px-6 rounded-lg">
              Log In
            </button>
          </Link>
        </div>

        {(errorMessage || successMessage || passwordError) && (
          <div className="mt-4 bg-white p-4 rounded-md shadow-md border border-black">
            {errorMessage && (
              <p className="text-red-500 p-2 text-center text-sm mt-2">
                {errorMessage}
              </p>
            )}

            {/* success message */}
            {successMessage && (
              <p className="text-green-500 p-2 text-center text-sm mt-2">
                {successMessage}
              </p>
            )}

            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default MyForm;
