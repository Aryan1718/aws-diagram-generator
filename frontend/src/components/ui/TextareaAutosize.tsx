import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

interface TextareaAutosizeProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  wrapperClassName?: string;
}

export const TextareaAutosize = React.forwardRef<
  HTMLTextAreaElement,
  TextareaAutosizeProps
>(({ className, wrapperClassName, value, ...props }, ref) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const adjustHeight = () => {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    textarea.addEventListener("input", adjustHeight);
    adjustHeight();

    return () => textarea.removeEventListener("input", adjustHeight);
  }, [value]);

  return (
    <motion.div
      className={cn(
        "relative w-full min-h-[100px] rounded-xl border border-neutral-200",
        wrapperClassName
      )}
      whileFocus={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <textarea
        ref={(node) => {
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
          textareaRef.current = node;
        }}
        className={cn(
          "w-full h-full min-h-[100px] p-4 rounded-xl bg-transparent outline-none resize-none",
          "placeholder:text-neutral-400 text-neutral-800",
          "focus:ring-2 focus:ring-neutral-400",
          className
        )}
        {...props}
      />
      <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-b from-neutral-50/50 to-neutral-100/50 opacity-0 transition-opacity group-focus-within:opacity-100" />
    </motion.div>
  );
}); 