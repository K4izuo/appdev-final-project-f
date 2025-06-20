import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { motion } from "framer-motion"
import { Mail, Lock, UserCheck } from "lucide-react"
import { Link } from "react-router-dom"

interface FormData {
  email: string
  password: string
}

interface FormErrors {
  email: string
  password: string
}

export default function ModeratorLoginPage() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  })

  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({ email: "", password: "" })

  const [debouncedValues, setDebouncedValues] = useState({
    email: "",
    password: "",
  })

  // Debounce email validation
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValues((prev) => ({ ...prev, email: formData.email }))
    }, 550)
    return () => clearTimeout(timer)
  }, [formData.email])

  // Debounce password validation
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValues((prev) => ({ ...prev, password: formData.password }))
    }, 550)
    return () => clearTimeout(timer)
  }, [formData.password])

  // Validate email when debounced value changes
  useEffect(() => {
    if (debouncedValues.email) {
      if (!validateEmail(debouncedValues.email)) {
        setErrors((prev) => ({
          ...prev,
          email: "Please enter a valid email address",
        }))
      } else {
        setErrors((prev) => ({ ...prev, email: "" }))
      }
    }
  }, [debouncedValues.email])

  // Validate password when debounced value changes
  useEffect(() => {
    if (debouncedValues.password) {
      if (!validatePassword(debouncedValues.password)) {
        setErrors((prev) => ({
          ...prev,
          password: "Password must be at least 8 characters long",
        }))
      } else {
        setErrors((prev) => ({ ...prev, password: "" }))
      }
    }
  }, [debouncedValues.password])

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string) => {
    return password.length >= 8
  }

  const handleInputChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors = { email: "", password: "" }

    if (!formData.email) {
      newErrors.email = "Email is required"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)

    if (formData.email && formData.password && validateEmail(formData.email)) {
      console.log("Moderator logging in with:", { ...formData, rememberMe })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 font-['Poppins'] flex items-center justify-center p-2 sm:p-4 lg:p-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-green-600 rounded-full opacity-10 -translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-500 rounded-full opacity-10 translate-x-24 translate-y-24"></div>
      <div className="absolute top-1/2 left-0 w-24 h-24 bg-green-500 rounded-full opacity-10 -translate-x-12"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl flex flex-col lg:flex-row relative"
      >
        {/* Left Side - Moderator Branding */}
        <div className="bg-gradient-to-br from-green-600 to-emerald-700 p-4 sm:p-6 lg:p-8 text-white w-full lg:w-1/2 flex flex-col items-center justify-center relative min-h-[200px] sm:min-h-[250px] lg:min-h-auto">
          {/* Decorative circles */}
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8 w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 bg-white/10 rounded-full"></div>

          <div className="space-y-6 text-center z-10">
            {/* Logo/Icon */}
            <div className="bg-white/20 p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl inline-block backdrop-blur-sm">
              <UserCheck className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl font-bold">Moderator Portal</h2>
              <p className="text-green-100 text-lg">Content Management</p>
              <p className="text-green-200 text-sm max-w-xs">
                Access moderation tools to review, approve, and manage community content and user interactions
              </p>
            </div>

            {/* Help Link */}
            <div className="mt-8 text-center">
              <p className="text-green-200 text-sm">
                Need help?{" "}
                <Button
                  variant="link"
                  className="text-white hover:text-green-100 p-0 text-sm font-semibold underline"
                  type="button"
                >
                  Moderation Guide
                </Button>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="p-8 w-full lg:w-1/2 flex flex-col justify-center">
          <form onSubmit={handleLogin} className="space-y-6 max-w-sm mx-auto w-full">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold text-gray-800">Moderator Access</h1>
              <p className="text-gray-600 text-sm">Please enter your moderator credentials</p>
            </div>

            <div className="w-full sm:w-[98%] md:w-[94%] space-y-3 mx-auto">
              {/* Email Field */}
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Moderator Email"
                    value={formData.email}
                    onChange={handleInputChange("email")}
                    className="h-9 sm:h-10 text-sm sm:text-[15px] pl-9 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-green-500/20 transition-colors"
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
                    value={formData.password}
                    onChange={handleInputChange("password")}
                    className="h-9 sm:h-10 text-sm sm:text-[15px] pl-9 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-green-500/20 transition-colors"
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
                    className="border-2 border-gray-300 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                  />
                  <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
                    Remember Me
                  </label>
                </div>
                <Button
                  variant="link"
                  className="text-green-600 hover:text-green-700 p-0 text-sm font-medium"
                  type="button"
                >
                  Forgot Password?
                </Button>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full h-9 sm:h-10 font-semibold text-sm sm:text-base bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
              >
                Access Moderation Panel
              </Button>

              {/* Additional Links */}
              <div className="text-center pt-2 space-y-1">
                <p className="text-xs text-gray-400">
                  <Link to="/auth/user-login">
                    <Button variant="link" className="text-gray-500 hover:text-gray-600 p-0 text-xs" type="button">
                      Regular User Login
                    </Button>
                  </Link>
                  {" | "}
                  <Link to="/auth/admin-login">
                    <Button variant="link" className="text-gray-500 hover:text-gray-600 p-0 text-xs" type="button">
                      Admin Login
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
