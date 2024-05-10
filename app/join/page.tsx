"use client";

import React, { useState } from "react";
import Link from "next/link";

const Join = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nickname: "",
  });

  const signUp = async () => {
    try {
      const res = await fetch("/api/accounts/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          nickname: formData.nickname,
        }),
      });
      if (res.status === 400) {
        const data = await res.json();
        alert(data.message);
      } else if (!res.ok) {
        throw new Error("Failed to signup.");
      } else {
        location.href = "/";
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    signUp();
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-blue-100 flex-col mt-4 shadow-lg p-4 rounded-lg">
        <form onSubmit={handleSubmit} className="my-8">
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              required
              className="w-full bg-gray-50 border-gray-300 text-gray-900 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 focus:border-blue-500 px-4 py-2 mr-4"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full bg-gray-50 border-gray-300 text-gray-900 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 focus:border-blue-500 px-4 py-2 mr-4"
              placeholder="Your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="nickname"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Nickname
            </label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              required
              className="w-full bg-gray-50 border-gray-300 text-gray-900 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 focus:border-blue-500 px-4 py-2 mr-4"
              placeholder="Your nickname"
              value={formData.nickname}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between">
            <Link href="/login" legacyBehavior>
              <a className="inline-block text-blue-700 bg-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-2">
                Login
              </a>
            </Link>
            <div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-2"
              >
                Join
              </button>
            </div>
          </div>
        </form>
        <div className="text-center py-4">
          <Link href="/" legacyBehavior>
            <a className="text-blue-700 hover:underline">Go back to home</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Join;
