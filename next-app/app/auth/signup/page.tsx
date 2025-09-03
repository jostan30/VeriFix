"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Lock,
  Shield,
  CheckCircle,
  ArrowRight,
  Eye,
  EyeOff,
  MessageSquare,
  Smartphone,
  Timer,
  ArrowLeft,
  Sparkles,
  Zap
} from "lucide-react";
import GlowingCard from "@/components/civic/GlowingCard";
import FloatingOrb from "@/components/civic/FlowtingOrb";


interface FormState {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  otpMethod: "email" | "phone";
}

export default function SignupPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    otpMethod: "email",
  });

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [step, setStep] = useState("signup");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  // Countdown timer for resend OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const validateForm = () => {
    const newErrors: Partial<FormState> = {};

    if (form.name.length < 2) newErrors.name = "Name must be at least 2 characters";
    if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Please enter a valid email";
    if (!/^\+?[\d\s-()]+$/.test(form.phoneNumber)) newErrors.phoneNumber = "Please enter a valid phone number";
    if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords don't match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Signup failed");
        setIsLoading(false);
        return;
      }

      console.log("Signup response:", data);
      setIsLoading(false);
      setStep("verify");
      setCountdown(60); // start countdown for OTP
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
      setIsLoading(false);
    }
  };


  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      alert("Please enter the complete OTP");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/user/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, otp: otpValue }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "OTP verification failed");
        setIsLoading(false);
        return;
      }

      console.log("OTP verified:", data);
      setIsLoading(false);
      alert("✅ User signed up successfully!");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
      setIsLoading(false);
    }
  };


  const handleResendOTP = () => {
    setCountdown(60);
    console.log("Resending OTP via", form.otpMethod);
  };

  const goBack = () => {
    setStep("signup");
    setOtp(["", "", "", "", "", ""]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <FloatingOrb delay={0} color="teal" className="top-1/4 left-10" />
        <FloatingOrb delay={2} color="purple" className="top-1/3 right-1/4" />
        <FloatingOrb delay={4} color="orange" className="bottom-1/4 left-1/3" />
      </div>

      {/* Grid pattern background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="relative z-10 w-full max-w-md"
      >
        <GlowingCard className="relative overflow-hidden" glowColor="teal">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-teal-500/10 to-transparent rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-tr-full" />

          <AnimatePresence mode="wait">
            {step === "signup" && (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
              >
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, type: "spring", delay: 0.2 }}
                    className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-600 via-blue-600 to-purple-600 rounded-3xl mb-6 relative"
                  >
                    <Shield className="w-10 h-10 text-white" />
                    <motion.div
                      className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="w-3 h-3 text-white" />
                    </motion.div>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-4xl font-black mb-3"
                  >
                    <span className="bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Join Verifix
                    </span>
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-slate-600 leading-relaxed"
                  >
                    Create your account to start making a difference in your community
                  </motion.p>

                  {/* Trust badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="inline-flex items-center space-x-2 bg-teal-50 border border-teal-200 rounded-full px-3 py-1 mt-4"
                  >
                    <CheckCircle className="w-4 h-4 text-teal-600" />
                    <span className="text-sm font-medium text-teal-700">
                      Trusted by 10,000+ Citizens
                    </span>
                  </motion.div>
                </div>

                <form onSubmit={handleSignup} className="space-y-6">
                  {/* Name Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="space-y-2"
                  >
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <User className="w-4 h-4 text-teal-600" />
                      Full Name
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        value={form.name}
                        onChange={handleChange}
                        className={`w-full p-4 border-2 rounded-xl transition-all duration-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none bg-white/50 backdrop-blur-sm group-hover:bg-white/70 ${errors.name ? 'border-red-500' : 'border-gray-200'
                          }`}
                        required
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm flex items-center gap-1"
                      >
                        <span>⚠️</span>{errors.name}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Email Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="space-y-2"
                  >
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-600" />
                      Email Address
                    </label>
                    <div className="relative group">
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={handleChange}
                        className={`w-full p-4 border-2 rounded-xl transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none bg-white/50 backdrop-blur-sm group-hover:bg-white/70 ${errors.email ? 'border-red-500' : 'border-gray-200'
                          }`}
                        required
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm flex items-center gap-1"
                      >
                        <span>⚠️</span>{errors.email}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Phone Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="space-y-2"
                  >
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-purple-600" />
                      Phone Number
                    </label>
                    <div className="relative group">
                      <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Enter your phone number"
                        value={form.phoneNumber}
                        onChange={handleChange}
                        className={`w-full p-4 border-2 rounded-xl transition-all duration-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none bg-white/50 backdrop-blur-sm group-hover:bg-white/70 ${errors.phoneNumber ? 'border-red-500' : 'border-gray-200'
                          }`}
                        required
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                    {errors.phoneNumber && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm flex items-center gap-1"
                      >
                        <span>⚠️</span>{errors.phoneNumber}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Password Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.9 }}
                      className="space-y-2"
                    >
                      <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <Lock className="w-4 h-4 text-orange-600" />
                        Password
                      </label>
                      <div className="relative group">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Create password"
                          value={form.password}
                          onChange={handleChange}
                          className={`w-full p-4 pr-12 border-2 rounded-xl transition-all duration-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none bg-white/50 backdrop-blur-sm group-hover:bg-white/70 ${errors.password ? 'border-red-500' : 'border-gray-200'
                            }`}
                          required
                        />
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </motion.button>
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      </div>
                      {errors.password && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm flex items-center gap-1"
                        >
                          <span>⚠️</span>{errors.password}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 1.0 }}
                      className="space-y-2"
                    >
                      <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <Lock className="w-4 h-4 text-green-600" />
                        Confirm
                      </label>
                      <div className="relative group">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          placeholder="Confirm password"
                          value={form.confirmPassword}
                          onChange={handleChange}
                          className={`w-full p-4 pr-12 border-2 rounded-xl transition-all duration-300 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none bg-white/50 backdrop-blur-sm group-hover:bg-white/70 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                            }`}
                          required
                        />
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </motion.button>
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      </div>
                      {errors.confirmPassword && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm flex items-center gap-1"
                        >
                          <span>⚠️</span>{errors.confirmPassword}
                        </motion.p>
                      )}
                    </motion.div>
                  </div>

                  {/* OTP Method Selection */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                    className="space-y-3"
                  >
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-600" />
                      Verification Method
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setForm({ ...form, otpMethod: "email" })}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden ${form.otpMethod === "email"
                            ? 'border-teal-500 bg-teal-50/50 shadow-lg shadow-teal-500/20'
                            : 'border-gray-200 hover:border-gray-300 bg-white/30'
                          }`}
                      >
                        <div className="flex items-center gap-3 relative z-10">
                          <MessageSquare className={`w-5 h-5 ${form.otpMethod === "email" ? 'text-teal-600' : 'text-gray-400'}`} />
                          <div>
                            <div className={`font-semibold ${form.otpMethod === "email" ? 'text-teal-700' : 'text-gray-700'}`}>
                              Email
                            </div>
                            <div className="text-xs text-gray-500">Send via email</div>
                          </div>
                        </div>
                        {form.otpMethod === "email" && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-2 right-2"
                          >
                            <CheckCircle className="w-5 h-5 text-teal-600" />
                          </motion.div>
                        )}
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setForm({ ...form, otpMethod: "phone" })}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden ${form.otpMethod === "phone"
                            ? 'border-blue-500 bg-blue-50/50 shadow-lg shadow-blue-500/20'
                            : 'border-gray-200 hover:border-gray-300 bg-white/30'
                          }`}
                      >
                        <div className="flex items-center gap-3 relative z-10">
                          <Smartphone className={`w-5 h-5 ${form.otpMethod === "phone" ? 'text-blue-600' : 'text-gray-400'}`} />
                          <div>
                            <div className={`font-semibold ${form.otpMethod === "phone" ? 'text-blue-700' : 'text-gray-700'}`}>
                              SMS
                            </div>
                            <div className="text-xs text-gray-500">Send via SMS</div>
                          </div>
                        </div>
                        {form.otpMethod === "phone" && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-2 right-2"
                          >
                            <CheckCircle className="w-5 h-5 text-blue-600" />
                          </motion.div>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    whileHover={{ scale: 1.02, boxShadow: "0 15px 35px rgba(20, 184, 166, 0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative w-full bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 text-white p-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-3 relative z-10">
                        <motion.div
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Creating Account...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-3 relative z-10">
                        <Shield className="w-5 h-5" />
                        Create Account
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            )}

            {step === "verify" && (
              <motion.div
                key="verify"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 via-teal-500 to-blue-500 rounded-3xl mb-6 relative"
                  >
                    <CheckCircle className="w-10 h-10 text-white" />
                    <motion.div
                      className="absolute -inset-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full blur-xl"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </motion.div>

                  <h2 className="text-4xl font-black mb-3">
                    <span className="bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
                      Verify Account
                    </span>
                  </h2>

                  <p className="text-slate-600 leading-relaxed">
                    Enter the verification code sent to your {form.otpMethod}
                  </p>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="inline-flex items-center space-x-2 bg-green-50 border border-green-200 rounded-full px-3 py-1 mt-4"
                  >
                    <Timer className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-700">
                      Code expires in 10 minutes
                    </span>
                  </motion.div>
                </div>

                {/* Back Button */}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  onClick={goBack}
                  whileHover={{ x: -5 }}
                  className="flex items-center gap-2 text-slate-600 hover:text-teal-600 transition-all duration-300 mb-6 group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                  Back to signup
                </motion.button>

                <form onSubmit={handleVerify} className="space-y-8">
                  {/* OTP Input */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-6"
                  >
                    <label className="text-sm font-semibold text-slate-700 text-center block">
                      Enter Verification Code
                    </label>
                    <div className="flex gap-3 justify-center">
                      {otp.map((digit, index) => (
                        <motion.input
                          key={index}
                          id={`otp-${index}`}
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          whileFocus={{ scale: 1.05, boxShadow: "0 0 20px rgba(20, 184, 166, 0.3)" }}
                          className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/70"
                        />
                      ))}
                    </div>
                  </motion.div>

                  {/* Resend OTP */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center"
                  >
                    {countdown > 0 ? (
                      <div className="flex items-center justify-center gap-2 text-slate-500">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Timer className="w-4 h-4" />
                        </motion.div>
                        Resend code in {countdown}s
                      </div>
                    ) : (
                      <motion.button
                        type="button"
                        onClick={handleResendOTP}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-teal-600 hover:text-teal-700 font-semibold transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-teal-50"
                      >
                        Resend verification code
                      </motion.button>
                    )}
                  </motion.div>

                  {/* Verify Button */}
                  <motion.button
                    type="submit"
                    disabled={isLoading || otp.some(digit => !digit)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    whileHover={{ scale: 1.02, boxShadow: "0 15px 35px rgba(34, 197, 94, 0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative w-full bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 text-white p-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-3 relative z-10">
                        <motion.div
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Verifying...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-3 relative z-10">
                        <CheckCircle className="w-5 h-5" />
                        Verify Account
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Sparkles className="w-4 h-4" />
                        </motion.div>
                      </div>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="mt-8 pt-6 border-t border-gray-200/50 text-center"
          >
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Shield className="w-4 h-4 text-teal-600" />
              </motion.div>
              Your data is encrypted and secure
            </div>

            {/* Additional trust elements */}
            <div className="flex items-center justify-center gap-6 mt-4 text-xs text-slate-400">
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-green-500" />
                SSL Protected
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-green-500" />
                GDPR Compliant
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-green-500" />
                Bank Level Security
              </div>
            </div>
          </motion.div>
        </GlowingCard>
      </motion.div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(20, 184, 166, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20, 184, 166, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </div>
  );
}