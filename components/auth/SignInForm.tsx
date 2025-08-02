// components/auth/SignInForm.tsx

"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signIn } from "next-auth/react"

// Floating particle component - only visible in light beam
const FloatingParticle = ({ delay = 0 }: { delay?: number }) => {
  const startX = Math.random() * 400 + 100
  const endX = startX + (Math.random() - 0.5) * 80

  return (
    <motion.div
      className="absolute w-0.5 h-0.5 bg-white/60 rounded-full"
      style={{
        filter: "blur(0.5px)",
      }}
      initial={{
        x: startX,
        y: -20,
        opacity: 0,
      }}
      animate={{
        x: endX,
        y: 200,
        opacity: [0, 0.8, 0.6, 0.4, 0],
      }}
      transition={{
        duration: Math.random() * 4 + 3,
        delay: delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
    />
  )
}

// Sparkle component - only in light beam
const Sparkle = ({ delay = 0 }: { delay?: number }) => {
  return (
    <motion.div
      className="absolute w-1 h-1"
      style={{
        left: Math.random() * 300 + 50,
        top: Math.random() * 150 + 30,
      }}
      initial={{
        scale: 0,
        rotate: 0,
        opacity: 0,
      }}
      animate={{
        scale: [0, 1, 0],
        rotate: [0, 180, 360],
        opacity: [0, 0.6, 0],
      }}
      transition={{
        duration: 2.5,
        delay: delay,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: Math.random() * 6 + 4,
      }}
    >
      <div className="w-full h-full bg-white/50 transform rotate-45" />
      <div className="absolute top-0 left-0 w-full h-full bg-white/50 transform -rotate-45" />
    </motion.div>
  )
}

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [particles, setParticles] = useState<number[]>([])
  const [sparkles, setSparkles] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setParticles(Array.from({ length: 25 }, (_, i) => i))
    setSparkles(Array.from({ length: 12 }, (_, i) => i))
  }, [])

  const handleSocialSignIn = async (provider: string) => {
    setIsLoading(true)
    try {
      await signIn(provider, { callbackUrl: "/dashboard" })
    } catch (error) {
      console.error(`${provider} sign-in error:`, error)
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // Handle email/password sign in
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/dashboard",
      })
    } catch (error) {
      console.error("Sign-in error:", error)
      setIsLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden flex items-center justify-center p-4"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Seamlessly blended heavenly light - no visible edges */}
      <div
        className="absolute -top-40 left-1/2 transform -translate-x-1/2 w-[1200px] h-[700px] pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(ellipse 40px 80px at 50% 0%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.065) 15%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.038) 45%, rgba(255,255,255,0.028) 60%, rgba(255,255,255,0.02) 75%, rgba(255,255,255,0.014) 85%, rgba(255,255,255,0.009) 92%, rgba(255,255,255,0.005) 96%, rgba(255,255,255,0.002) 98%, transparent 100%),
            radial-gradient(ellipse 80px 140px at 50% 5%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.048) 18%, rgba(255,255,255,0.037) 32%, rgba(255,255,255,0.028) 46%, rgba(255,255,255,0.021) 60%, rgba(255,255,255,0.015) 74%, rgba(255,255,255,0.011) 84%, rgba(255,255,255,0.007) 91%, rgba(255,255,255,0.004) 96%, rgba(255,255,255,0.002) 98%, transparent 100%),
            radial-gradient(ellipse 140px 220px at 50% 10%, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.036) 20%, rgba(255,255,255,0.028) 35%, rgba(255,255,255,0.021) 50%, rgba(255,255,255,0.016) 64%, rgba(255,255,255,0.012) 76%, rgba(255,255,255,0.008) 86%, rgba(255,255,255,0.005) 93%, rgba(255,255,255,0.003) 97%, rgba(255,255,255,0.001) 99%, transparent 100%),
            radial-gradient(ellipse 220px 320px at 50% 18%, rgba(255,255,255,0.032) 0%, rgba(255,255,255,0.026) 22%, rgba(255,255,255,0.02) 38%, rgba(255,255,255,0.015) 54%, rgba(255,255,255,0.011) 68%, rgba(255,255,255,0.008) 80%, rgba(255,255,255,0.006) 88%, rgba(255,255,255,0.004) 94%, rgba(255,255,255,0.002) 98%, rgba(255,255,255,0.001) 99%, transparent 100%),
            radial-gradient(ellipse 320px 420px at 50% 25%, rgba(255,255,255,0.022) 0%, rgba(255,255,255,0.018) 25%, rgba(255,255,255,0.014) 42%, rgba(255,255,255,0.011) 58%, rgba(255,255,255,0.008) 72%, rgba(255,255,255,0.006) 83%, rgba(255,255,255,0.004) 91%, rgba(255,255,255,0.003) 96%, rgba(255,255,255,0.002) 98%, rgba(255,255,255,0.001) 99%, transparent 100%),
            radial-gradient(ellipse 450px 520px at 50% 32%, rgba(255,255,255,0.015) 0%, rgba(255,255,255,0.012) 28%, rgba(255,255,255,0.009) 45%, rgba(255,255,255,0.007) 61%, rgba(255,255,255,0.005) 75%, rgba(255,255,255,0.004) 86%, rgba(255,255,255,0.003) 93%, rgba(255,255,255,0.002) 97%, rgba(255,255,255,0.001) 99%, transparent 100%)
          `,
          filter: "blur(15px)",
        }}
      />
      <div
        className="absolute -top-35 left-1/2 transform -translate-x-1/2 w-[1000px] h-[600px] pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(ellipse 35px 70px at 50% 0%, rgba(255,255,255,0.065) 0%, rgba(255,255,255,0.052) 16%, rgba(255,255,255,0.04) 32%, rgba(255,255,255,0.03) 48%, rgba(255,255,255,0.022) 64%, rgba(255,255,255,0.016) 78%, rgba(255,255,255,0.011) 88%, rgba(255,255,255,0.007) 94%, rgba(255,255,255,0.004) 98%, rgba(255,255,255,0.002) 99%, transparent 100%),
            radial-gradient(ellipse 70px 120px at 50% 8%, rgba(255,255,255,0.048) 0%, rgba(255,255,255,0.038) 19%, rgba(255,255,255,0.029) 36%, rgba(255,255,255,0.022) 52%, rgba(255,255,255,0.016) 67%, rgba(255,255,255,0.012) 79%, rgba(255,255,255,0.008) 88%, rgba(255,255,255,0.005) 95%, rgba(255,255,255,0.003) 98%, rgba(255,255,255,0.001) 99%, transparent 100%),
            radial-gradient(ellipse 120px 190px at 50% 15%, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.028) 21%, rgba(255,255,255,0.022) 39%, rgba(255,255,255,0.017) 55%, rgba(255,255,255,0.013) 70%, rgba(255,255,255,0.009) 82%, rgba(255,255,255,0.006) 90%, rgba(255,255,255,0.004) 96%, rgba(255,255,255,0.002) 99%, transparent 100%),
            radial-gradient(ellipse 190px 280px at 50% 22%, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.02) 24%, rgba(255,255,255,0.016) 42%, rgba(255,255,255,0.012) 59%, rgba(255,255,255,0.009) 74%, rgba(255,255,255,0.007) 85%, rgba(255,255,255,0.005) 93%, rgba(255,255,255,0.003) 97%, rgba(255,255,255,0.002) 99%, transparent 100%),
            radial-gradient(ellipse 280px 360px at 50% 30%, rgba(255,255,255,0.018) 0%, rgba(255,255,255,0.014) 27%, rgba(255,255,255,0.011) 46%, rgba(255,255,255,0.008) 63%, rgba(255,255,255,0.006) 77%, rgba(255,255,255,0.005) 88%, rgba(255,255,255,0.003) 95%, rgba(255,255,255,0.002) 98%, rgba(255,255,255,0.001) 99%, transparent 100%)
          `,
          filter: "blur(12px)",
        }}
      />
      <div
        className="absolute -top-28 left-1/2 transform -translate-x-1/2 w-[800px] h-[500px] pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(ellipse 30px 60px at 50% 0%, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.04) 17%, rgba(255,255,255,0.032) 34%, rgba(255,255,255,0.025) 51%, rgba(255,255,255,0.019) 67%, rgba(255,255,255,0.014) 80%, rgba(255,255,255,0.01) 90%, rgba(255,255,255,0.007) 96%, rgba(255,255,255,0.004) 99%, transparent 100%),
            radial-gradient(ellipse 60px 100px at 50% 12%, rgba(255,255,255,0.038) 0%, rgba(255,255,255,0.03) 20%, rgba(255,255,255,0.024) 38%, rgba(255,255,255,0.018) 55%, rgba(255,255,255,0.014) 70%, rgba(255,255,255,0.01) 82%, rgba(255,255,255,0.007) 91%, rgba(255,255,255,0.005) 97%, rgba(255,255,255,0.003) 99%, transparent 100%),
            radial-gradient(ellipse 100px 160px at 50% 20%, rgba(255,255,255,0.028) 0%, rgba(255,255,255,0.022) 22%, rgba(255,255,255,0.017) 41%, rgba(255,255,255,0.013) 58%, rgba(255,255,255,0.01) 73%, rgba(255,255,255,0.007) 85%, rgba(255,255,255,0.005) 93%, rgba(255,255,255,0.003) 98%, rgba(255,255,255,0.002) 99%, transparent 100%),
            radial-gradient(ellipse 160px 220px at 50% 28%, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.016) 25%, rgba(255,255,255,0.012) 44%, rgba(255,255,255,0.009) 62%, rgba(255,255,255,0.007) 76%, rgba(255,255,255,0.005) 87%, rgba(255,255,255,0.004) 95%, rgba(255,255,255,0.002) 99%, transparent 100%)
          `,
          filter: "blur(8px)",
        }}
      />
      <div
        className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-[600px] h-[350px] pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(ellipse 25px 50px at 50% 0%, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.032) 18%, rgba(255,255,255,0.025) 36%, rgba(255,255,255,0.019) 54%, rgba(255,255,255,0.015) 70%, rgba(255,255,255,0.011) 83%, rgba(255,255,255,0.008) 92%, rgba(255,255,255,0.005) 98%, rgba(255,255,255,0.003) 99%, transparent 100%),
            radial-gradient(ellipse 50px 80px at 50% 15%, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.024) 21%, rgba(255,255,255,0.019) 40%, rgba(255,255,255,0.015) 57%, rgba(255,255,255,0.011) 72%, rgba(255,255,255,0.008) 84%, rgba(255,255,255,0.006) 93%, rgba(255,255,255,0.004) 98%, rgba(255,255,255,0.002) 99%, transparent 100%),
            radial-gradient(ellipse 80px 120px at 50% 25%, rgba(255,255,255,0.022) 0%, rgba(255,255,255,0.018) 24%, rgba(255,255,255,0.014) 43%, rgba(255,255,255,0.011) 60%, rgba(255,255,255,0.008) 75%, rgba(255,255,255,0.006) 86%, rgba(255,255,255,0.004) 94%, rgba(255,255,255,0.003) 98%, rgba(255,255,255,0.002) 99%, transparent 100%)
          `,
          filter: "blur(5px)",
        }}
      />
      <div
        className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-[400px] h-[200px] pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(ellipse 20px 40px at 50% 0%, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.024) 19%, rgba(255,255,255,0.019) 38%, rgba(255,255,255,0.015) 56%, rgba(255,255,255,0.011) 72%, rgba(255,255,255,0.008) 85%, rgba(255,255,255,0.006) 94%, rgba(255,255,255,0.004) 98%, rgba(255,255,255,0.002) 99%, transparent 100%),
            radial-gradient(ellipse 40px 60px at 50% 20%, rgba(255,255,255,0.022) 0%, rgba(255,255,255,0.018) 22%, rgba(255,255,255,0.014) 42%, rgba(255,255,255,0.011) 60%, rgba(255,255,255,0.008) 76%, rgba(255,255,255,0.006) 88%, rgba(255,255,255,0.004) 95%, rgba(255,255,255,0.003) 99%, transparent 100%)
          `,
          filter: "blur(3px)",
        }}
      />

      {/* Enhanced dust particles in light beam */}
      <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-[500px] h-[300px] pointer-events-none z-10">
        {particles.map((particle) => (
          <FloatingParticle key={particle} delay={particle * 0.3} />
        ))}
        {sparkles.map((sparkle) => (
          <Sparkle key={sparkle} delay={sparkle * 1.0} />
        ))}
      </div>

      {/* Main modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-md z-20"
      >
        {/* Modal content */}
        <div className="relative bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Enhanced top light reflection - brighter and wider */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

          {/* Additional side reflections from the light hitting the modal */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

          {/* Enhanced interior glow from the heavenly light hitting the modal */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white/[0.05] via-white/[0.02] to-transparent rounded-t-2xl pointer-events-none" />

          {/* V Logo */}
          <div className="flex justify-center mb-4">
            <img src="/images/ViraLogo.png" alt="ViraCard Logo" className="w-12 h-12 object-contain" />
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-white mb-2">ViraCard</h1>
            <p className="text-gray-400 text-sm">Trusted by creators. Loved by brands</p>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email input */}
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/30 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg h-12"
                required
                disabled={isLoading}
              />
            </div>

            {/* Password input */}
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/30 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg h-12 pr-12"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Sign in button */}
            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-gray-100 font-medium h-12 rounded-lg transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Continue"}
            </Button>
          </form>

          {/* Forgot password */}
          <div className="text-center mt-4">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Forgot password?
            </a>
          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-600"></div>
            <span className="px-4 text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-600"></div>
          </div>

          {/* Social login buttons */}
          <div className="flex justify-center gap-4">
            {/* Google */}
            <Button
              variant="outline"
              className="flex-1 bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700/50 h-12 rounded-lg transition-all duration-200"
              onClick={() => handleSocialSignIn("google")}
              disabled={isLoading}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </Button>

            {/* YouTube */}
            <Button
              variant="outline"
              className="flex-1 bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700/50 h-12 rounded-lg transition-all duration-200"
              onClick={() => handleSocialSignIn("youtube")}
              disabled={isLoading}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                />
              </svg>
            </Button>

            {/* X (Twitter) */}
            <Button
              variant="outline"
              className="flex-1 bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700/50 h-12 rounded-lg transition-all duration-200"
              onClick={() => handleSocialSignIn("twitter")}
              disabled={isLoading}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                />
              </svg>
            </Button>

            {/* Facebook */}
            <Button
              variant="outline"
              className="flex-1 bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700/50 h-12 rounded-lg transition-all duration-200"
              onClick={() => handleSocialSignIn("facebook")}
              disabled={isLoading}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                />
              </svg>
            </Button>
          </div>

          {/* Security notice */}
          <div className="text-center mt-4">
            <p className="text-gray-400 text-sm">Secure OAuth only — we never post or store passwords</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}