"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function TextGenerateEffect({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const words = text.split(" ");

  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((word, idx) => (
        <motion.span
          key={`${word}-${idx}`}
          className="inline-block"
          initial={{ opacity: 0, filter: "blur(8px)", y: 6 }}
          animate={
            inView
              ? { opacity: 1, filter: "blur(0px)", y: 0 }
              : { opacity: 0, filter: "blur(8px)", y: 6 }
          }
          transition={{
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1],
            delay: delay + idx * 0.04,
          }}
          aria-hidden
        >
          {word}
          {idx < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </span>
  );
}
