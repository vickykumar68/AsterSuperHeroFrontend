import React from "react";
import { motion } from "framer-motion";
import facebook from "../assets/desktopViewImages/stayconnected/facebook.png";
import instagram from "../assets/desktopViewImages/stayconnected/instagram.png";
import linkedin from "../assets/desktopViewImages/stayconnected/linkdin.png";
import tiktok from "../assets/desktopViewImages/stayconnected/tiktok.png";
import myaster from "../assets/desktopViewImages/stayconnected/myaster.png";
import youtube from "../assets/desktopViewImages/stayconnected/youtube.png";
import heading from "../assets/desktopViewImages/stayconnected/heading_stay.png";
import bgimage from "../assets/desktopViewImages/downloadJurnol/downloadJurnolBGD.svg";

function StayConnected() {
  const socialLinks = [
    { src: instagram, alt: "Instagram", link: "https://www.instagram.com/asterclinics/" },
    { src: youtube, alt: "YouTube", link: "https://www.youtube.com/@AsterClinicAE" },
    { src: facebook, alt: "Facebook", link: "https://www.facebook.com/AsterClinics/" },
    { src: tiktok, alt: "TikTok", link: "https://www.tiktok.com/@asterclinics.ae?_t=ZS-8zpQSnfFKmW&_r=1" },
    { src: myaster, alt: "MyAster", link: "https://www.myaster.com/en" },
    { src: linkedin, alt: "LinkedIn", link: "https://www.linkedin.com/showcase/17961293/admin/dashboard/" },    
  ];

  return (
    <div className="flex flex-col items-center justify-center pb-10 px-4"
    style={{
      backgroundImage: `url(${bgimage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
    >
      {/* Heading */}
      <motion.img
        src={heading}
        alt="Stay Connected"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-[851px] pb-10"
      />
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}  
        transition={{ duration: 0.6, delay: 0.2 }}  
        className="text-center max-w-3xl text-[28px] text-white mb-8 font-black font-goldman uppercase tracking-tighter [-webkit-text-stroke:0.6px_black]"
      >
        <p>Follow us and keep journalling</p>
         every day <span className="text-[#FEE20D]">to win big!</span> 
      </motion.p>
      {/* Social Icons */}
      <div className="flex flex-wrap gap-6 sm:gap-8 justify-center">
        {socialLinks.map((item, index) => (
          <motion.a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="transition-transform"
          >
            <img
              src={item.src}
              alt={item.alt}
              className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14"
            />
          </motion.a>
        ))}
      </div>
    </div>
  );
}

export default StayConnected;
