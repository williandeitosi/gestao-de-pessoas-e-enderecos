"use client";
import { motion } from "framer-motion";
import React from "react";

const MagicButton = ({
  children,
  icon,
  position,
  handleClick,
  otherClasses,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  position?: string;
  handleClick?: () => void;
  otherClasses?: string;
}) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="relative inline-flex h-16 w-full overflow-hidden rounded-lg p-[2px] shadow-inner transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-4 md:mt-10 md:w-60"
      onClick={handleClick}
    >
      <span className="absolute inset-0 border-2 border-blue-500 rounded-lg animate-pulse" />
      <span className="absolute inset-0 rounded-lg bg-blue-900 opacity-30 blur-lg" />
      <span
        className={`relative inline-flex h-full w-full items-center justify-center gap-4 rounded-lg bg-gradient-to-br from-surface-dark-mantle via-surface-dark-crust to-surface-dark-base font-secondary text-lg font-medium backdrop-blur-3xl hover:font-bold ${otherClasses}`}
      >
        {icon && position === "left" && icon}
        {children}
        {icon && position === "right" && icon}
      </span>
    </motion.button>
  );
};

export default MagicButton;
