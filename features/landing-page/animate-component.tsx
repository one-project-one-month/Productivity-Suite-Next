"use client";
import { motion } from "framer-motion";

export default function AnimateComponent({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "anticipate", delay: delay || 0.1 }}
    >
      {children}
    </motion.div>
  );
}
