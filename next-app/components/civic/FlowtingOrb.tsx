import { motion } from "framer-motion";

export default function  FloatingOrb ({ delay = 0, color = "teal", className = "" })  {
  const colorClasses = {
    teal: "from-teal-400/20 to-blue-500/20",
    purple: "from-purple-500/20 to-blue-500/20",
    orange: "from-orange-400/20 to-yellow-400/20"
  };

  return (
    <motion.div
      className={`absolute w-64 h-64 rounded-full bg-gradient-to-r ${colorClasses[color]} blur-3xl ${className}`}
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