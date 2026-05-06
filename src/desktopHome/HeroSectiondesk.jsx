import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import logoright from "../assets/HeroImage/logoright.svg";
import star1 from "../assets/HeroImage/star1.svg";
import star2 from "../assets/HeroImage/star2.svg";
import cloudLeft from "../assets/desktopViewImages/herosection/cloudleftd.svg";
import cloudRight from "../assets/desktopViewImages/herosection/cloudrightd.svg";
import cloudCenter from "../assets/desktopViewImages/herosection/cloudcenter.svg";
import bgHerodesktop from "../assets/desktopViewImages/herosection/bgHerodesktop.svg";
import allHero from "../assets/desktopViewImages/herosection/allHero.svg";
import gradientButton from "../assets/desktopViewImages/herosection/hero_subheading.png";
import title from "../assets/desktopViewImages/herosection/title.svg";
import logo_aster from "../assets/HeroImage/logo_aster.svg";

function HeroSectiondesk() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    AOS.refresh();
  }, []);

  const starVariants = {
    animate: {
      rotate: 360,
      scale: [1, 1.2, 1],
      transition: {
        rotate: { duration: 8, repeat: Infinity, ease: "linear" },
        scale: { duration: 2, repeat: Infinity }
      }
    }
  };

  return (
    <motion.div
      className="relative w-full bg-cover bg-no-repeat flex flex-col items-center justify-between overflow-hidden"
      style={{ backgroundImage: `url(${bgHerodesktop})` }}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Floating Stars */}
      <motion.img
        src={star1}
        alt="star1"
        className="absolute top-40 left-72 w-[36px]"
        variants={starVariants}
        animate="animate"
      />
      <motion.img
        src={star1}
        alt="star1"
        className="absolute top-1/3 right-64 w-6"
        variants={starVariants}
        animate="animate"
      />
      <motion.img
        src={star2}
        alt="star2"
        className="absolute bottom-96 left-1/3 w-3"
        variants={starVariants}
        animate="animate"
      />
      {/* Clouds */}
      <motion.img
        src={cloudLeft}
        alt="cloudLeft"
        className="absolute top-1/3 left-0 w-[109px]"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <motion.img
        src={cloudCenter}
        alt="cloudLeft"
        className="absolute top-[330px] right-[430px] w-[109px]"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <motion.img
        src={cloudRight}
        alt="cloudRight"
        className="absolute top-36 right-0 w-[109px]"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <motion.img
        src={cloudLeft}
        alt="cloudLeft"
        className="absolute bottom-12 left-0 w-[200px] xl:w-[269px] z-20"
        initial={{ x: -120, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
      />
      <motion.img
        src={cloudRight}
        alt="cloudRight"
        className="absolute bottom-12 right-0 w-[200px] xl:w-[269px] z-20"
        initial={{ x: 120, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
      />

      {/* Header Logos */}
      <div className="flex justify-between items-center w-11/12 mt-4">
        <motion.img
          src={logo_aster}
          alt="Logo Left"
          className="w-[154px] h-auto"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        />
        <motion.img
          src={logoright}
          alt="Logo Right"
          className="w-16"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        />
      </div>

      {/* Title */}
      <motion.img
        src={title}
        alt="Join the Superpower Squad"
        className="w-7/12 max-w-[890px] my-2"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* Info Card */}
      <motion.div
        className="relative mt-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <img src={gradientButton} alt="Gradient Button" className="w-[480px] pb-5" />
      </motion.div>

      {/* All Heroes */}
      <div className="relative w-full flex justify-center items-end ">
        <img
          src={allHero}
          alt="Heroes"
          className="w-11/12 max-w-6xl object-contain relative z-10"
          data-aos="fade-up"
        />
      </div>
    </motion.div>
  );
}

export default HeroSectiondesk;
