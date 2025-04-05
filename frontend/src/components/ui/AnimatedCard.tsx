import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export const AnimatedCard = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative overflow-hidden rounded-xl bg-white p-6 shadow-lg transition-colors hover:shadow-xl",
        className
      )}
      onClick={onClick}
    >
      <div className="relative z-10">{children}</div>
      <motion.div
        className="absolute inset-0 z-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 opacity-0 transition-opacity group-hover:opacity-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />
    </motion.div>
  );
}; 