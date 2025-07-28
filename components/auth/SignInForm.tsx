// components/auth/SignInForm.tsx

"use client";

import { signIn } from "next-auth/react";

export default function SignInForm() {
  return (
    <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-md">
      {/* 7. Image Placeholder for Logo */}
      <div className="w-20 h-20 mx-auto bg-gray-200 rounded-full">
        {/* Your logo will go here */}
      </div>

      <div className="text-center">
        <h1 className="text-2xl font-bold">Sign In</h1>
        <p className="text-gray-500">Access your ViraCard dashboard</p>
      </div>

      <form className="space-y-4">
        {/* 1. Email Text Box */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* 2. Password Text Box */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* 4. Forgot Password Button */}
        <div className="text-right">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Forgot password?
          </a>
        </div>

        {/* 3. Sign In Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
        >
          Sign In
        </button>
      </form>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      {/* 5. Social Auth Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="inline-flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
        >
          <span className="text-xl">🇬</span>
          <span className="ml-2 text-sm font-medium text-gray-700">Google</span>
        </button>
        <button className="inline-flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
          <span className="text-xl">📺</span>
          <span className="ml-2 text-sm font-medium text-gray-700">
            YouTube
          </span>
        </button>
        <button className="inline-flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
          <span className="text-xl">X</span>
          <span className="ml-2 text-sm font-medium text-gray-700">X</span>
        </button>
        <button className="inline-flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
          <span className="text-xl">📘</span>
          <span className="ml-2 text-sm font-medium text-gray-700">
            Facebook
          </span>
        </button>
      </div>

      {/* 6. Secure OAuth Text */}
      <p className="mt-4 text-xs text-center text-gray-500">
        Secure OAuth only — we never post or store passwords.
      </p>
    </div>
  );
}