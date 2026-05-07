import React, { useEffect} from 'react';
import { motion } from 'framer-motion';

import logoleft from "../assets/HeroImage/Logo_Left.svg";
import aster_logo from "../assets/HeroImage/logo_aster.svg";
import logoright from "../assets/HeroImage/Logo_Right.svg";
import title from "../assets/HeroImage/title.svg";
import cardimage from "../assets/HeroImage/cardimage.svg"
import star1 from "../assets/HeroImage/star1.svg";
import star2 from "../assets/HeroImage/star2.svg";
import cloudLeft from "../assets/HeroImage/cloudLeft.svg";
import cloudCenter from "../assets/desktopViewImages/herosection/cloudcenter.svg";
import cloudRight from "../assets/HeroImage/cloudRight.svg";
import bghero from "../assets/HeroImage/bghero.svg";
// import allHero from "../assets/HeroImage/AllHeros.svg";
import allHero from "../assets/HeroImage/AllHeros.webp";
import currencyImg from "../assets/currency-image.png"; 
import AOS from 'aos';
import 'aos/dist/aos.css';

function HeroSection() {
   useEffect(() => {
    AOS.refresh(); // Refresh AOS after component mounts
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
      className="relative w-full min-h-screen bg-cover bg-no-repeat flex flex-col items-center pt-4 pb-10 overflow-hidden"
      style={{ backgroundImage: `url(${bghero})` }}
      initial={{ opacity: 0, scale: 0.98 }}   // start slightly dim & small
      animate={{ opacity: 1, scale: 1 }}      // fade & grow smoothly
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <motion.img
        src={star1}
        alt="star1"
        className="absolute top-36 left-14 w-6"
        variants={starVariants}
        animate="animate"
      />
      <motion.img
        src={star1}
        alt="star1"
        className="absolute bottom-[380px] right-24 w-6"
        variants={starVariants}
        animate="animate"
        initial={{ scale: 0 }}
      />
      <motion.img
        src={star2}
        alt="star2"
        className="absolute bottom-[330px] left-32 w-3"
        variants={starVariants}
        animate="animate"
        initial={{ scale: 0 }}
      />
      <motion.img
        src={star2}
        alt="star2"
        className="absolute top-72 right-10 w-3"
        variants={starVariants}
        animate="animate"
        initial={{ scale: 0 }}
      />
      <motion.img
        src={star2}
        alt="star2"
        className="absolute top-72 left-10 w-3"
        variants={starVariants}
        animate="animate"
        initial={{ scale: 0 }}
      />
      <motion.img
        src={cloudLeft}
        alt="cloudLeft"
        className="absolute bottom-[350px] left-0 w-16"
        initial={{ x: -100, opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }}   
        transition={{ duration: 1, ease: "easeOut" }}
      />

      {/* Center Cloud */}
      <motion.img
        src={cloudCenter}
        alt="cloudCenter"
        className="absolute top-[23rem] -right-10 w-24"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay : 0.5 }}
      />

      {/* Top Right Cloud */}
      <motion.img
        src={cloudRight}
        alt="cloudRight"
        className="absolute top-32 right-0 w-16"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay : 0.5 }}
      />

      {/* Bottom Left Cloud */}
      <motion.img
        src={cloudLeft}
        alt="cloudLeft"
        className="absolute -bottom-1 left-0 w-24 z-50"
        initial={{ x: -120, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay : 0.5 }}
      />

      {/* Bottom Right Cloud */}
      <motion.img
        src={cloudRight}
        alt="cloudRight"
        className="absolute -bottom-2 right-0 w-24 z-50"
        initial={{ x: 120, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay : 0.5 }}
      />

      <div className="flex justify-between items-center w-11/12 mb-20 mt-12 px-5">
         <motion.img
            src={aster_logo}
            alt="Aster Clinic Logo"
            className="w-[95px] h-auto"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          />
          <motion.img
            src={logoright}
            alt="Other Logo"
            className="w-12"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          />
      </div>

      {/* Title */}
      <motion.img
        src={title}
        alt="Join the Superpower Squad"
        className="w-9/12 max-w-xs mb-8"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* Info Card */}
      <motion.div
        className="relative w-11/12 max-w-sm mb-10 tracking-tighter"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
            WebkitTextStroke: '1.3px rgba(0,0,0,0.5)',
            fontWeight: '1000',
        }}
      >
        <motion.img
          src={cardimage}
          alt="Card Background"
          className="w-full px-4"
          initial={{ opacity: 0, y: 20 }}   
          animate={{ opacity: 1, y: 0 }}    
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
        />
        <div data-aos="zoom-in-down" className="absolute inset-0 flex flex-col justify-center items-center text-center px-2 font-goldman font-extrabold">
          
          <p className="text-white text-[16px] leading-tight  uppercase [-webkit-text-stroke:0.5px_black] tracking-tighter">
            Journal your daily missions here 
          </p>
          <p className="text-white text-[16px] leading-tight uppercase [-webkit-text-stroke:0.5px_black] tracking-tighter">
            daily and 3 lucky winners could win
          </p>
         <p className="text-[#00FFAE] text-[16px] uppercase [-webkit-text-stroke:0.6px_black] tracking-tighter flex items-center gap-1">
            prizes worth a total of
            <img
              src={currencyImg}
              alt="Currency"
              className="inline-block w-[14px] h-[14px] mx-1 mb-1"
            />
            5,000!
          </p>

          
        </div>
      </motion.div>


      <div data-aos="flip-up"
        className="relative w-full flex justify-center items-end mt-3"
      >
        <img
          src={allHero}
          alt="allHero"
          className="w-[340px] max-w-[600px] object-contain relative z-10 -bottom-14 -left-1 "
          style={{ transform: "scale(1.3)" }}
        />
      </div>
    </motion.div>
  );
}

export default HeroSection;
