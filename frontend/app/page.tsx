"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import api from "../lib/api";

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      toast.success("Welcome to MedIntel!");

      setTimeout(() => {
        router.push("/dashboard");
      }, 800);

    } catch (error) {
      console.error(error);
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">

      <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-2xl">

        <div className="mb-8 text-center">

          <h1 className="text-5xl font-bold text-blue-600">
            MedIntel
          </h1>

          <p className="mt-3 text-gray-500">
            Hospital Management System
          </p>

        </div>

        <form
          onSubmit={login}
          className="space-y-5"
        >

          <div>

            <label className="mb-2 block font-semibold text-gray-700">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full rounded-xl border border-gray-300 bg-white p-3 text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />

          </div>

          <div>

            <label className="mb-2 block font-semibold text-gray-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full rounded-xl border border-gray-300 bg-white p-3 text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            {loading ? "Signing In..." : "Login"}
          </button>

        </form>

      </div>

    </main>
  );
}