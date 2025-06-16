import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { motion } from "framer-motion"
import { Mail, Lock, Heart } from "lucide-react"
import { Link } from "react-router-dom"

export default function AuthLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState({ email: "", password: "" })
  const [debouncedEmail, setDebouncedEmail] = useState("")
  const [debouncedPassword, setDebouncedPassword] = useState("")

  // Debounce email validation
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedEmail(email)
    }, 550)

    return () => clearTimeout(timer)
  }, [email])

  // Debounce password validation
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedPassword(password)
    }, 550)

    return () => clearTimeout(timer)
  }, [password])

  // Validate email when debounced value changes
  useEffect(() => {
    if (debouncedEmail) {
      if (!validateEmail(debouncedEmail)) {
        setErrors((prev) => ({
          ...prev,
          email: "Please enter a valid email address",
        }))
      } else {
        setErrors((prev) => ({ ...prev, email: "" }))
      }
    }
  }, [debouncedEmail])

  // Validate password when debounced value changes
  useEffect(() => {
    if (debouncedPassword) {
      if (!validatePassword(debouncedPassword)) {
        setErrors((prev) => ({
          ...prev,
          password: "Password must be at least 8 characters long",
        }))
      } else {
        setErrors((prev) => ({ ...prev, password: "" }))
      }
    }
  }, [debouncedPassword])

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string) => {
    return password.length >= 8
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value
    setEmail(newEmail)
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: "" }))
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value
    setPassword(newPassword)
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: "" }))
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors = { email: "", password: "" }

    if (!email) {
      newErrors.email = "Email is required"
    }

    if (!password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)

    if (email && password && validateEmail(email)) {
      console.log("Logging in with:", { email, password, rememberMe })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 font-['Poppins'] flex items-center justify-center p-2 sm:p-4 lg:p-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-red-500 rounded-full opacity-10 -translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-orange-400 rounded-full opacity-10 translate-x-24 translate-y-24"></div>
      <div className="absolute top-1/2 left-0 w-24 h-24 bg-red-400 rounded-full opacity-10 -translate-x-12"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl flex flex-col lg:flex-row relative"
      >
        {/* Left Side - Pet Care Branding with Dog Image */}
        <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 sm:p-6 lg:p-8 text-white w-full lg:w-1/2 flex flex-col items-center justify-center relative min-h-[200px] sm:min-h-[250px] lg:min-h-auto">
          {/* Decorative circles */}
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8 w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 bg-white/10 rounded-full"></div>

          <div className="space-y-6 text-center z-10">
            {/* Logo/Icon */}
            <div className="bg-white/20 p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl inline-block backdrop-blur-sm">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white fill-current" />
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl font-bold">Pet Care</h2>
              <p className="text-red-100 text-lg">Admin Portal</p>
              <p className="text-red-200 text-sm max-w-xs">
                Sign In To Continue managing our furry friends and their loving families
              </p>
            </div>

            {/* Help Link */}
            <div className="mt-8 text-center">
              <p className="text-red-200 text-sm">
                Need help?{" "}
                <Button
                  variant="link"
                  className="text-white hover:text-red-100 p-0 text-sm font-semibold underline"
                  type="button"
                >
                  Contact Support
                </Button>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="p-8 w-full lg:w-1/2 flex flex-col justify-center">
          <form onSubmit={handleLogin} className="space-y-6 max-w-sm mx-auto w-full">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold text-gray-800">Welcome Back!</h1>
              <p className="text-gray-600 text-sm">Please enter your credentials to continue</p>
            </div>

            <div className="w-full sm:w-[98%] md:w-[94%] space-y-3 mx-auto">
              {/* Email Field */}
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    className="h-9 sm:h-10 text-sm sm:text-[15px] pl-9 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:ring-red-400/20 transition-colors"
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {errors.email && <p className="text-red-500 text-sm ml-1">{errors.email}</p>}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="h-9 sm:h-10 text-sm sm:text-[15px] pl-9 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:ring-red-400/20 transition-colors"
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {errors.password && <p className="text-red-500 text-sm ml-1">{errors.password}</p>}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked === true)}
                    className="border-2 border-gray-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                  />
                  <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
                    Remember Me
                  </label>
                </div>
                <Button
                  variant="link"
                  className="text-red-500 hover:text-red-600 p-0 text-sm font-medium"
                  type="button"
                >
                  Forgot Password?
                </Button>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full h-9 sm:h-10 font-semibold text-sm sm:text-base bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
              >
                Login
              </Button>

              {/* Sign Up Link */}
              <div className="text-center pt-2">
                <p className="text-sm text-gray-500">
                  Don't have account?{" "}
                  <Link to="/auth/register">
                    <Button
                      variant="link"
                      className="text-red-500 hover:text-red-600 p-0 text-sm font-semibold"
                      type="button"
                    >
                      Sign up now!
                    </Button>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
