"use client";

import React from "react";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

interface CardProps
  extends Omit<
    HTMLMotionProps<"div">,
    "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd" | "onDragOver"
  > {
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverEffect = true,
  className = "",
  ...props
}) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -4, transition: { duration: 0.2 } } : {}}
      className={`glass-card rounded-2xl p-6 shadow-[0px_4px_20px_rgba(26,43,74,0.02)] hover:shadow-[0px_10px_30px_rgba(26,43,74,0.06)] transition-shadow duration-200 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
