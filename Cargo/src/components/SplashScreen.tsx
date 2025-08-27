import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      setTimeout(onComplete, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { 
      opacity: 0,
      transition: { duration: 0.5, ease: "easeInOut" }
    }
  };

  const letterVariants = {
    initial: { 
      y: 50,
      opacity: 0,
      scale: 0.5,
      rotateX: -90
    },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    })
  };

  const letters = "CARGO".split("");

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-orange-50 z-50"
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="flex overflow-hidden">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="initial"
                animate="animate"
                className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[16rem] font-bold inline-block text-blue-500 animate-[color-shift_3s_ease-in-out_infinite]"
                style={{
                  animationDelay: `${i * 0.2}s`,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
