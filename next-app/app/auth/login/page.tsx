"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  Shield,
  CheckCircle,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";
import GlowingCard from "@/components/civic/GlowingCard";
import FloatingOrb from "@/components/civic/FlowtingOrb";
import { useRouter } from "next/navigation";

interface FormState {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: Partial<FormState> = {};

    if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Please enter a valid email";
    if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Login failed");
        setIsLoading(false);
        return;
      }

      console.log("Login response:", data);
      setIsLoading(false);
      // Redirect to dashboard or handle successful login
      alert("✅ Login successful!");
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50 flex items-center justify-center p-4 pt-24 pb-8 relative overflow-hidden">
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
            <motion.div
              key="login"
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
                    Welcome Back
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-slate-600 leading-relaxed"
                >
                  Login to your account to continue making a difference in your community
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

              <form onSubmit={handleLogin} className="space-y-6">
                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
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

                {/* Password Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
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
                      placeholder="Enter your password"
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

                {/* Forgot Password Link */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="text-left"
                >
                  <a 
                    href="/auth/forgot-password" 
                    className="text-sm text-teal-600 hover:text-teal-700 font-medium hover:underline transition-colors"
                  >
                    Forgot your password?
                  </a>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
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
                      Logging in...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3 relative z-10">
                      <Shield className="w-5 h-5" />
                      Login to Account
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </AnimatePresence>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="mt-8 pt-6 border-t border-gray-200/50 text-center"
          >
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Shield className="w-4 h-4 text-teal-600" />
              </motion.div>
              Don&apos;t have an account?{" "}
              <a 
                href="/auth/signup" 
                className="text-teal-600 font-semibold hover:underline transition-colors"
              >
                Sign Up
              </a>
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