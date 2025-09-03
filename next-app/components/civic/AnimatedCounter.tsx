"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type AnimatedCounterProps = {
  end: number;
  suffix?: string;
};

export default function AnimatedCounter({ end, suffix = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count < end) {
      const timer = setTimeout(() => {
        setCount((prev) => Math.min(prev + Math.ceil(end / 50), end));
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [count, end]);

  return (
    <motion.div
      className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent"
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {count}
      {suffix}
    </motion.div>
  );
}
