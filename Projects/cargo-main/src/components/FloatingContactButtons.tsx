import { FaInstagram, FaTelegramPlane } from 'react-icons/fa';
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const FloatingContactButtons = () => {
  const [isVisible, setIsVisible] = useState(true);
  const footerObserver = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    footerObserver.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(!entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    footerObserver.current.observe(footer);

    return () => {
      if (footerObserver.current) {
        footerObserver.current.disconnect();
      }
    };
  }, []);

  const buttonVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
    hover: { 
      scale: 1.1,
      rotate: [0, -10, 10, -10, 0],
      transition: {
        rotate: {
          duration: 0.5,
          ease: "easeInOut"
        }
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-40">
          <motion.a
            href="https://t.me/your_telegram_link"
            className="bg-primary hover:bg-primary/90 text-white p-4 rounded-full shadow-lg"
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
          >
            <FaTelegramPlane className="w-6 h-6" />
          </motion.a>
          <motion.a
            href="https://www.instagram.com/your_instagram_link"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-secondary hover:bg-secondary/90 text-white p-4 rounded-full shadow-lg"
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
          >
            <FaInstagram className="w-6 h-6" />
          </motion.a>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FloatingContactButtons;
