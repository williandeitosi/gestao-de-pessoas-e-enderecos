"use client";
import { cn } from "../../utils/cn";
import { motion, stagger, useAnimate } from "framer-motion";
import { useEffect } from "react";

export const TextGenerateEffect = ({
  words,
  className,
  highlighted,
  highlightedClassName,
}: {
  words: string;
  className?: string;
  highlighted?: string[];
  highlightedClassName?: string;
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");
  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
      },
      {
        duration: 2,
        delay: stagger(0.2),
      }
    );
  }, [scope.current]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className={cn(
                "text-current opacity-0",
                highlighted &&
                  highlighted.some(
                    (match) => match.toLowerCase() === word.toLowerCase()
                  ) &&
                  highlightedClassName
              )}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold text-inherit", className)}>
      <div className="leading-snug tracking-wide">{renderWords()}</div>
    </div>
  );
};
