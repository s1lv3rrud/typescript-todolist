"use client";
import React, { useState } from "react";
import Link from "next/link";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async () => {
    try {
      const response = await fetch("/api/accounts/auth/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to login.");
      } else if (response.status === 200) {
        setIsLoggedIn(true);
        const data = await response.json();
        console.log(data.user);
        localStorage.setItem("user_id", data.user.id);
        localStorage.setItem("nickname", data.user.nickname);
        location.href = "/";
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch("/api/accounts/auth", {
        method: "DELETE",
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to logout.");
      } else if (response.status === 200) {
        localStorage.removeItem("user_id");
        localStorage.removeItem("nickname");
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Logout failed:", error);
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
    console.log("Login Form Data:", formData);
    login();
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
          <div className="flex justify-end">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-2"
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link href="/join" legacyBehavior>
            <a className="text-blue-700 hover:underline">
              Need an account? Join
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
