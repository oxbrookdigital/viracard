// components/auth/AuthButtons.tsx

"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButtons() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div className="h-10 w-48 animate-pulse rounded-lg bg-gray-200" />;
    }

    if (session) {
        return (
            <div className="flex items-center gap-4">
                <p>Signed in as {session.user.email}</p>
                <button
                    onClick={() => signOut()}
                    className="px-4 py-2 font-semibold text-white bg-red-500 rounded-lg shadow-md hover:bg-red-700"
                >
                    Sign Out
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={() => signIn("google")}
            className="px-6 py-3 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
        >
            Get Your Free Card (Sign in with Google)
        </button>
    );
}