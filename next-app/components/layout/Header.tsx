"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Header({ darkMode }: { darkMode: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const routes = {
    Home: "/",
    ReportIssues: "/reportissues",
    BrowseProgress: "/browseprogress",
    OrganizationDashboard: "/organizationdashboard",
    Community: "/community",
  };

  return (
    <header className="fixed top-0 w-full z-40 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <span className="font-bold text-2xl bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              VeriFix
            </span>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {Object.entries(routes).map(([label, path], index) => (
              <motion.a
                key={label}
                href={path}
                className="text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium transition-colors duration-300"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {label}
              </motion.a>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
            >
              Get Started
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Nav */}

        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden border-t border-gray-200 dark:border-slate-700 py-4"
          >
            {Object.entries(routes).map(([label, path], index) => (
              <motion.a
                key={label}
                href={path}
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="block py-2 text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400"
              >
                {label}
              </motion.a>
            ))}

          </motion.nav>
        )}
      </div>
    </header>
  );
}
