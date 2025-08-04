// app/(main)/reset-password/page.tsx

"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    // --- Validation Checks ---
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    // --- NEW: Password length check ---
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }
    // --- END: New Check ---

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        throw new Error(error.message || "Could not update password.");
      }
      setMessage("Your password has been reset successfully!");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // The JSX below remains the same
  return (
    <main 
      className="min-h-screen flex items-center justify-center p-4" 
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <div className="w-full max-w-md p-8 space-y-6 bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Set a New Password</h1>
          <p className="text-gray-400">Please enter your new password below.</p>
        </div>

        {message ? (
          <div className="text-center">
            <p className="text-green-400">{message}</p>
            <Link href="/" className="mt-4 inline-block px-6 py-2 bg-white text-black font-semibold rounded-lg">
              Go to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <label htmlFor="password-new" className="sr-only">New Password</label>
              <Input
                id="password-new"
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/30 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg h-12 pr-12"
                disabled={loading}
              />
               <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            
            <div>
              <label htmlFor="password-confirm" className="sr-only">Confirm New Password</label>
              <Input
                id="password-confirm"
                type="password"
                placeholder="Confirm New Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-black/30 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg h-12"
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-gray-200 font-medium h-12 rounded-lg"
              disabled={loading}
            >
              {loading ? "Saving..." : "Set New Password"}
            </Button>
            {error && <p className="text-red-400 text-center pt-2">{error}</p>}
          </form>
        )}
      </div>
    </main>
  );
}