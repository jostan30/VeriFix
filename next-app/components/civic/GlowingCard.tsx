import { motion } from "framer-motion";

type GlowingCardProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  glowColor?: "teal" | "purple" | "orange" | "green";
};

export default function GlowingCard({
  children,
  className = "",
  delay = 0,
  glowColor = "teal",
}: GlowingCardProps) {
  const glowClasses: Record<string, string> = {
    teal: "from-teal-500 to-blue-500",
    purple: "from-purple-500 to-blue-500",
    orange: "from-orange-500 to-yellow-500",
    green: "from-green-500 to-teal-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{
        y: -5,
        boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
      }}
      className={`relative group ${className}`}
    >
      {/* Glow effect */}
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r ${glowClasses[glowColor]} 
        rounded-xl opacity-0 group-hover:opacity-20 
        transition duration-500 blur`}
      />
      {/* Card content */}
      <div className="relative bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 backdrop-blur-sm rounded-xl p-6 hover:border-teal-500/50 transition-all duration-300 shadow-lg">
        {children}
      </div>
    </motion.div>
  );
}
