import { motion } from "framer-motion";

export default function GlowingCard ({ children, className = "", delay = 0, glowColor = "teal" })  {
  const glowColors = {
    teal: "shadow-teal-500/20 hover:shadow-teal-500/30",
    purple: "shadow-purple-500/20 hover:shadow-purple-500/30",
    orange: "shadow-orange-500/20 hover:shadow-orange-500/30",
    green: "shadow-green-500/20 hover:shadow-green-500/30"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-lg hover:shadow-xl ${glowColors[glowColor]} transition-all duration-500 ${className}`}
    >
      {children}
    </motion.div>
  );
};
