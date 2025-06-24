// app/page.tsx

import AuthButtons from "@/components/auth/AuthButtons";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 text-center">
            <div>
                <h1 className="text-4xl font-bold">Your Influencer Profile. Polished.</h1>
                <p className="mt-4 text-lg text-gray-600">
                    The Linktree-killer for creators who mean business.
                </p>
                <div className="mt-8">
                    <AuthButtons />
                </div>
            </div>
        </main>
    );
}
