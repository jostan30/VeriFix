"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  MapPin,
  Search,
  Users,
  Twitter,
  Linkedin,
  Github,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  Clock,
  Award,
  Globe,
  Moon,
  Sun,
  Star,
  TrendingUp,
  Phone,
  Mail
} from "lucide-react";
import { useRouter } from "next/navigation";
import GlowingCard from "@/components/civic/GlowingCard";
import AnimatedCounter from "@/components/civic/AnimatedCounter";

// function ThemeToggle({ darkMode, setDarkMode }: { darkMode: boolean; setDarkMode: React.Dispatch<React.SetStateAction<boolean>> }): React.JSX.Element {


//   return (

//     <motion.button
//       whileHover={{ scale: 1.1 }}
//       whileTap={{ scale: 0.9 }}
//       onClick={() => setDarkMode(!darkMode)}
//       className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-gray-200 dark:border-slate-700 transition-all duration-300"
//     >
//       {darkMode ? (
//         <Sun className="h-5 w-5 text-yellow-500" />
//       ) : (
//         <Moon className="h-5 w-5 text-slate-600" />
//       )}
//     </motion.button>
//   );
// }

type OrbColor = "teal" | "purple" | "orange";

const colorClasses: Record<OrbColor, string> = {
  teal: "from-teal-400/20 to-blue-500/20",
  purple: "from-purple-500/20 to-blue-500/20",
  orange: "from-orange-400/20 to-yellow-400/20"
};

const FloatingOrb = ({
  delay = 0,
  color = "teal"
}: { delay?: number; color?: OrbColor }) => {
  return (
    <motion.div
      className={`absolute w-64 h-64 rounded-full bg-gradient-to-r ${colorClasses[color]} blur-3xl`}
      animate={{
        y: [-20, 20, -20],
        x: [-10, 10, -10],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    />
  );
};



export default function Landing() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col relative overflow-hidden transition-colors duration-500`}>
      {/* Theme Toggle */}
      {/* <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} /> */}

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <FloatingOrb delay={0} color="teal" />
        <div className="absolute top-1/4 right-1/4">
          <FloatingOrb delay={2} color="purple" />
        </div>
        <div className="absolute bottom-1/4 left-1/4">
          <FloatingOrb delay={4} color="orange" />
        </div>
      </div>


      {/* Hero Section */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-teal-500/10 via-transparent to-transparent"
          style={{ y }}
        />

        {/* Animated grid background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 dark:opacity-10" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="grid lg:grid-cols-2 gap-12 items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="space-y-8" variants={itemVariants}>
              <div className="space-y-6">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center space-x-2 bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-700 rounded-full px-4 py-2"
                >
                  <Sparkles className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                  <span className="text-sm font-medium text-teal-700 dark:text-teal-300">
                    Trusted by 10,000+ Citizens
                  </span>
                </motion.div>

                <h1 className="text-4xl lg:text-7xl font-bold tracking-tight leading-tight">
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-slate-800 dark:text-white"
                  >
                    Verify and
                  </motion.span>
                  <br />
                  <motion.span
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 bg-clip-text text-transparent bg-300% animate-gradient-x"
                  >
                    Solve Civic
                  </motion.span>
                  <br />
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-slate-800 dark:text-white"
                  >
                    Issues Together
                  </motion.span>
                </h1>

                <motion.p
                  className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed"
                  variants={itemVariants}
                >
                  Report local problems, verify with{" "}
                  <span className="text-teal-600 dark:text-teal-400 font-semibold">real-time data</span>,
                  and connect with NGOs & authorities for{" "}
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">faster resolutions</span>.
                </motion.p>
              </div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                variants={itemVariants}
              >
                <motion.button
                  onClick={() => { router.push('/reportissues') }}
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(20, 184, 166, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  className="group text-lg px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white rounded-lg font-semibold shadow-lg transition-all duration-300 flex items-center justify-center"
                >
                  <Shield className="mr-2 h-5 w-5" />
                  ReportIssues
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-lg px-8 py-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-teal-50 dark:hover:bg-teal-900/30 border border-gray-300 dark:border-slate-600 hover:border-teal-400 dark:hover:border-teal-500 text-slate-700 dark:text-slate-300 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center"
                >
                  <Search className="mr-2 h-5 w-5" />
                  View Issues
                </motion.button>
              </motion.div>

              {/* Enhanced Stats */}
              <motion.div
                className="grid grid-cols-3 gap-6 pt-8"
                variants={containerVariants}
              >
                <GlowingCard className="text-center" delay={0.1} glowColor="green">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center"
                  >
                    <div className="relative mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center mb-2">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <motion.div
                        className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    <AnimatedCounter end={2547} />
                    <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                      Issues Resolved
                    </div>
                  </motion.div>
                </GlowingCard>

                <GlowingCard className="text-center" delay={0.2} glowColor="purple">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-2">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <AnimatedCounter end={89} suffix="%" />
                    <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                      Verification Rate
                    </div>
                  </motion.div>
                </GlowingCard>

                <GlowingCard className="text-center" delay={0.3} glowColor="orange">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center mb-2">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <AnimatedCounter end={156} />
                    <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                      Partner NGOs
                    </div>
                  </motion.div>
                </GlowingCard>
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative group"
              >
                <div className="relative group">
                  {/* Background gradient blur */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-teal-500/30 to-blue-500/30 rounded-3xl blur-2xl group-hover:blur-3xl transition duration-500"></div>

                  {/* Image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/hero-city.png"
                    alt="City with civic infrastructure"
                    className="relative w-full h-auto rounded-2xl shadow-2xl border border-white/10 dark:border-slate-700/50"
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white-500/20 to-transparent rounded-2xl"></div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-teal-500/20 to-transparent rounded-2xl" />

                {/* Floating elements on image */}
                <motion.div
                  className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg p-2 shadow-lg"
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </motion.div>

                <motion.div
                  className="absolute bottom-4 left-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg p-2 shadow-lg"
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                >
                  <TrendingUp className="h-6 w-6 text-blue-500" />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 dark:from-slate-800 to-white dark:to-slate-900" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center space-x-2 bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-700 rounded-full px-4 py-2 mb-6">
              <Award className="h-4 w-4 text-teal-600 dark:text-teal-400" />
              <span className="text-sm font-medium text-teal-700 dark:text-teal-300">How It Works</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-800 dark:text-white">
              Simple. Fast.{" "}
              <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                Effective.
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Three powerful steps to transform your community and create lasting change
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <GlowingCard delay={0.1} glowColor="teal">
              <div className="text-center space-y-4">
                <div className="relative mx-auto w-16 h-16 bg-gradient-to-br from-teal-600 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <MapPin className="h-8 w-8 text-white" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    1
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Track & Report</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Report issues with precise GPS location, photo evidence, and detailed descriptions for maximum impact.
                </p>
                <div className="flex items-center justify-center space-x-2 text-sm text-teal-600 dark:text-teal-400">
                  <Clock className="h-4 w-4" />
                  <span>Takes 2 minutes</span>
                </div>
              </div>
            </GlowingCard>

            <GlowingCard delay={0.2} glowColor="purple">
              <div className="text-center space-y-4">
                <div className="relative mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <Search className="h-8 w-8 text-white" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    2
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">AI Verification</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Advanced AI cross-references government APIs and community data for instant validation and priority scoring.
                </p>
                <div className="flex items-center justify-center space-x-2 text-sm text-blue-600 dark:text-blue-400">
                  <Zap className="h-4 w-4" />
                  <span>89% accuracy rate</span>
                </div>
              </div>
            </GlowingCard>

            <GlowingCard delay={0.3} glowColor="orange">
              <div className="text-center space-y-4">
                <div className="relative mx-auto w-16 h-16 bg-gradient-to-br from-purple-600 to-orange-500 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-white" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    3
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Connect & Resolve</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Smart routing connects you directly with relevant authorities and NGOs for rapid response and resolution.
                </p>
                <div className="flex items-center justify-center space-x-2 text-sm text-purple-600 dark:text-purple-400">
                  <CheckCircle className="h-4 w-4" />
                  <span>Average 7-day resolution</span>
                </div>
              </div>
            </GlowingCard>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
              What Citizens Say
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Real stories from people making a difference
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Priya Sharma",
                role: "Community Leader",
                content: "CivicVerify helped us resolve a major drainage issue in our neighborhood within just 5 days!",
                rating: 5
              },
              {
                name: "Rajesh Kumar",
                role: "Local Business Owner",
                content: "The AI verification system is incredible. It instantly validated our street lighting concerns.",
                rating: 5
              },
              {
                name: "Anita Patel",
                role: "Concerned Parent",
                content: "Finally, a platform that actually connects us with people who can solve problems. Highly recommended!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <GlowingCard key={index} delay={index * 0.1} className="text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  &quot;{testimonial.content}&quot;
                </p>
                <div className="border-t border-gray-200 dark:border-slate-600 pt-4">
                  <p className="font-semibold text-slate-800 dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                </div>
              </GlowingCard>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-blue-500/10 to-purple-500/10" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <div className="max-w-4xl mx-auto space-y-8">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
              className="inline-block"
            >
              <Sparkles className="h-12 w-12 text-teal-600 dark:text-teal-400 mx-auto mb-4" />
            </motion.div>

            <h2 className="text-4xl lg:text-6xl font-bold leading-tight text-slate-800 dark:text-white">
              Ready to Make a{" "}
              <span className="bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Real Difference?
              </span>
            </h2>

            <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Join thousands of passionate citizens working together to build stronger, more responsive communities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 15px 35px rgba(20, 184, 166, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                className="group text-xl px-10 py-4 bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 hover:shadow-2xl transition-all duration-500 text-white rounded-lg font-semibold flex items-center justify-center relative overflow-hidden"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Shield className="mr-3 h-6 w-6" />
                </motion.div>
                Start Reporting Issues
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="text-xl px-10 py-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-teal-50 dark:hover:bg-teal-900/30 border border-gray-300 dark:border-slate-600 hover:border-teal-400 dark:hover:border-teal-500 text-slate-700 dark:text-slate-300 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center"
              >
                <Globe className="mr-3 h-6 w-6" />
                Explore Platform
              </motion.button>
            </div>


            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 max-w-2xl mx-auto"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">10K+</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">156</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">NGO Partners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">2.5K</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Issues Resolved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">89%</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Success Rate</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-t from-white via-gray-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-t border-gray-200 dark:border-slate-700 py-16 mt-auto relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 dark:opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">C</span>
                </div>
                <span className="font-bold text-2xl bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                  Verifix
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed max-w-xs">
                Empowering communities through transparent civic engagement and real-time issue resolution.
              </p>
              <div className="flex space-x-4 pt-2">
                {[
                  { Icon: Twitter, color: "hover:text-blue-500" },
                  { Icon: Linkedin, color: "hover:text-blue-600" },
                  { Icon: Github, color: "hover:text-slate-700 dark:hover:text-slate-300" }
                ].map(({ Icon, color }, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <a href="#" className="group">
                      <div className="w-10 h-10 bg-gray-100 dark:bg-slate-700 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded-lg flex items-center justify-center transition-colors duration-300">
                        <Icon className={`h-5 w-5 text-slate-500 dark:text-slate-400 ${color} transition-colors`} />
                      </div>
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {[
              {
                title: "Platform",
                links: [
                  { name: "Browse Issues", href: "/issues" },
                  { name: "Report Issue", href: "/report" },
                  { name: "Dashboard", href: "/dashboard" },
                  { name: "Analytics", href: "/analytics" },
                ],
              },
              {
                title: "Support",
                links: [
                  { name: "Help Center", href: "/help" },
                  { name: "Contact Us", href: "/contact" },
                  { name: "Privacy Policy", href: "/privacy" },
                  { name: "Terms of Service", href: "/terms" },
                ],
              },
              {
                title: "Partners",
                links: [
                  { name: "NGO Partners", href: "/ngos" },
                  { name: "Government", href: "/government" },
                  { name: "API Access", href: "/api" },
                  { name: "Developer Docs", href: "/docs" },
                ],
              },
            ].map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                className="space-y-4"
              >
                <h3 className="font-bold text-lg text-slate-800 dark:text-white">{section.title}</h3>
                <div className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.div
                      key={linkIndex}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <a
                        href={link.href}
                        className="block text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-300"
                      >
                        {link.name}
                      </a>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="border-t border-gray-200 dark:border-slate-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-slate-500 dark:text-slate-400 text-center md:text-left"
              >
                &copy; 2024 CivicVerify. Building better communities, one issue at a time.
              </motion.p>

              <div className="flex items-center space-x-6 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>hello@civicverify.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .animate-gradient-x {
          animation: gradient-x 15s ease infinite;
          background-size: 400% 400%;
        }
        
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(20, 184, 166, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20, 184, 166, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        
        .bg-300\\% {
          background-size: 300% 300%;
        }
      `}</style>
    </div>
  );
}