import { AppProvider } from "@/components/AppContext";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WarehouseMap from "@/components/WarehouseMap";
import Advantages from "@/components/Advantages";
import Calculator from "@/components/Calculator";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import SplashScreen from "@/components/SplashScreen";
import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from '@/hooks/LanguageContext.hooks';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <AppProvider>
      <SplashScreen onComplete={() => setShowSplash(false)} />
      <motion.div 
        className="min-h-screen overflow-x-hidden"
        initial="hidden"
        animate={!showSplash ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <Header />
        <motion.div variants={itemVariants}>
          <Hero />
        </motion.div>
        <motion.div variants={itemVariants}>
          <Services />
        </motion.div>
        <motion.div variants={itemVariants}>
          <Calculator />
        </motion.div>
        <motion.div variants={itemVariants}>
          <WarehouseMap />
        </motion.div>
        <motion.div variants={itemVariants}>
          <Advantages />
        </motion.div>
        <motion.div variants={itemVariants}>
          <Contact />
        </motion.div>
        <motion.div variants={itemVariants}>
          <Footer />
        </motion.div>
        <FloatingContactButtons />
      </motion.div>
    </AppProvider>
  );
};

export default Index;