"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.message);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-black px-4 overflow-hidden">

      <div className="w-full max-w-md p-8 rounded-2xl
                bg-gradient-to-br from-red-600/20 via-black/40 to-pink-600/20
                backdrop-blur-xl
                border border-red-500/30
                shadow-[0_0_40px_rgba(255,0,0,0.3)]">


        <h2 className="text-2xl font-semibold text-white text-center mb-1">
          Welcome Back
        </h2>

        <p className="text-gray-400 text-center mb-6 text-sm">
          Login to continue
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-500/10 
                          border border-red-500/30 p-2 rounded-md text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block text-xs text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full h-10 px-3 text-sm
                         bg-white/10 border border-white/20
                         rounded-md text-white
                         placeholder-gray-400
                         focus:outline-none focus:ring-1 focus:ring-red-600"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full h-10 px-3 text-sm
                         bg-white/10 border border-white/20
                         rounded-md text-white
                         placeholder-gray-400
                         focus:outline-none focus:ring-1 focus:ring-red-600"
            />
          </div>

          <div className="text-right text-xs">
            <span className="text-gray-400 hover:text-red-500 cursor-pointer">
              Forgot password?
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 rounded-md text-sm font-medium text-white
                       bg-gradient-to-r from-red-600 to-pink-600
                       hover:opacity-90 transition
                       disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="text-red-500 hover:underline"
          >
            Signup
          </Link>
        </p>

      </div>
    </div>
  );
}
