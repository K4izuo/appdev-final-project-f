import type React from "react"
import { useState, useEffect, useContext } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { motion } from "framer-motion"
import { Mail, Lock, User, Phone, MapPin } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { AppContext } from "@/types/AppContextType"

interface FormData {
  first_name: string
  last_name: string
  email: string
  phone_number: string
  address: string
  password: string
  password_confirmation: string
}

interface FormErrors {
  first_name: string
  last_name: string
  email: string
  phone_number: string
  address: string
  password: string
  password_confirmation: string
  terms: string
}

export default function AuthRegisterPage() {

  const navigate = useNavigate();
  const {setToken} = useContext(AppContext);

  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
    password: "",
    password_confirmation: "",
  })

  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
    password: "",
    password_confirmation: "",
    terms: "",
  })

  const [debouncedValues, setDebouncedValues] = useState({
    email: "",
    phone_number: "",
    password: "",
    password_confirmation: "",
  })

  // Debounce email validation
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValues((prev) => ({ ...prev, email: formData.email }))
    }, 550)

    return () => clearTimeout(timer)
  }, [formData.email])

  // Debounce phone validation
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValues((prev) => ({ ...prev, phone_number: formData.phone_number }))
    }, 550)

    return () => clearTimeout(timer)
  }, [formData.phone_number])

  // Debounce password validation
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValues((prev) => ({ ...prev, password: formData.password }))
    }, 550)

    return () => clearTimeout(timer)
  }, [formData.password])

  // Debounce confirm password validation
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValues((prev) => ({ ...prev, password_confirmation: formData.password_confirmation }))
    }, 550)

    return () => clearTimeout(timer)
  }, [formData.password_confirmation])

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

  // Validate phone when debounced value changes
  useEffect(() => {
    if (debouncedValues.phone_number) {
      if (!validatePhone(debouncedValues.phone_number)) {
        setErrors((prev) => ({
          ...prev,
          phone_number: "Please enter a valid phone number",
        }))
      } else {
        setErrors((prev) => ({ ...prev, phone_number: "" }))
      }
    }
  }, [debouncedValues.phone_number])

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

  // Validate confirm password when debounced value changes
  useEffect(() => {
    if (debouncedValues.password_confirmation && debouncedValues.password) {
      if (debouncedValues.password_confirmation !== debouncedValues.password) {
        setErrors((prev) => ({
          ...prev,
          password_confirmation: "Passwords do not match",
        }))
      } else {
        setErrors((prev) => ({ ...prev, password_confirmation: "" }))
      }
    }
  }, [debouncedValues.password_confirmation, debouncedValues.password])

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
    return phoneRegex.test(phone.replace(/[\s\-()]/g, ""))
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
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()

    const newErrors = {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      address: "",
      password: "",
      password_confirmation: "",
      terms: "",
    }

    if (!formData.first_name) {
      newErrors.first_name = "First name is required"
    }

    if (!formData.last_name) {
      newErrors.last_name = "Last name is required"
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
    }

    if (!formData.phone_number) {
      newErrors.phone_number = "Phone number is required"
    }

    if (!formData.address) {
      newErrors.address = "Address is required"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    if (!formData.password_confirmation) {
      newErrors.password_confirmation = "Please confirm your password"
    }

    if (formData.password && formData.password_confirmation && formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = "Passwords do not match"
    }

    if (!agreeToTerms) {
      newErrors.terms = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)

    // If all fields are valid, proceed with registration
    if (
      formData.first_name &&
      formData.last_name &&
      formData.email &&
      formData.phone_number &&
      formData.address &&
      formData.password &&
      formData.password_confirmation &&
      formData.password === formData.password_confirmation &&
      validateEmail(formData.email) &&
      validatePhone(formData.phone_number) &&
      agreeToTerms
    ) {

      const response = await fetch("/api/pet-user/register", {
        method: "post",
        body: JSON.stringify(formData),
      });

      // if (!response.ok) {
      //   console.error(`Registration failed: ${response.status} ${response.statusText}`);
      //   // Handle the error (show message to user, etc.)
      //   return;
      // }

      try {
        const data = await response.json();
        console.log("Registering with:", data);
        localStorage.setItem("token", data.token);
        setToken(data.token);
        navigate("/auth/user-login");
      } catch (error) {
        console.error("Failed to parse response:", error);
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-red-500 rounded-full opacity-10 -translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-orange-400 rounded-full opacity-10 translate-x-24 translate-y-24"></div>
      <div className="absolute top-1/2 right-0 w-24 h-24 bg-red-400 rounded-full opacity-10 translate-x-12"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl relative"
      >
        <div className="p-8 w-full flex flex-col justify-center">
          <form onSubmit={handleRegister} className="space-y-4 max-w-2xl mx-auto w-full">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
              <p className="text-gray-600 text-sm">Please fill in your details to register</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* First Name Field */}
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="First Name"
                    value={formData.first_name}
                    onChange={handleInputChange("first_name")}
                    className="h-9 sm:h-10 text-sm sm:text-[15px] pl-9 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:ring-red-400/20 transition-colors"
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>}
              </div>

              {/* Last Name Field */}
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={handleInputChange("last_name")}
                    className="h-9 sm:h-10 text-sm sm:text-[15px] pl-9 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:ring-red-400/20 transition-colors"
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>}
              </div>

              {/* Email Field - Full Width */}
              <div className="space-y-2 sm:col-span-2">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange("email")}
                    className="h-9 sm:h-10 text-sm sm:text-[15px] pl-9 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:ring-red-400/20 transition-colors"
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone_number}
                    onChange={handleInputChange("phone_number")}
                    className="h-9 sm:h-10 text-sm sm:text-[15px] pl-9 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:ring-red-400/20 transition-colors"
                  />
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {errors.phone_number && <p className="text-red-500 text-xs mt-1">{errors.phone_number}</p>}
              </div>

              {/* Address Field */}
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange("address")}
                    className="h-9 sm:h-10 text-sm sm:text-[15px] pl-9 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:ring-red-400/20 transition-colors"
                  />
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange("password")}
                    className="h-9 sm:h-10 text-sm sm:text-[15px] pl-9 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:ring-red-400/20 transition-colors"
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.password_confirmation}
                    onChange={handleInputChange("password_confirmation")}
                    className="h-9 sm:h-10 text-sm sm:text-[15px] pl-9 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:ring-red-400/20 transition-colors"
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {errors.password_confirmation && <p className="text-red-500 text-xs mt-1">{errors.password_confirmation}</p>}
              </div>
            </div>

            {/* Terms and Conditions - Full Width */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreeToTerms}
                  onCheckedChange={(checked) => setAgreeToTerms(checked === true)}
                  className="border-2 border-gray-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                />
                <label htmlFor="terms" className="text-xs sm:text-sm text-gray-600 cursor-pointer leading-relaxed">
                  I agree to the{" "}
                  <Button variant="link" className="text-red-500 hover:text-red-600 p-0 text-xs sm:text-sm underline">
                    Terms and Conditions
                  </Button>{" "}
                  and{" "}
                  <Button variant="link" className="text-red-500 hover:text-red-600 p-0 text-xs sm:text-sm underline">
                    Privacy Policy
                  </Button>
                </label>
              </div>
              {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms}</p>}
            </div>

            {/* Register Button - Full Width */}
            <Button
              type="submit"
              className="w-full h-9 sm:h-10 font-semibold text-sm sm:text-base bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
            >
              Create Account
            </Button>

            {/* Login Link */}
            <div className="text-center pt-2">
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link to="/auth/login">
                  <Button
                    variant="link"
                    className="text-red-500 hover:text-red-600 p-0 text-sm font-semibold"
                    type="button"
                  >
                    Sign in here!
                  </Button>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
