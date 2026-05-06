import React from "react";
import { motion } from "framer-motion";
import facebook from "../assets/newFooter/facebook.svg";
import instagram from "../assets/newFooter/instagram.svg";
import linkedin from "../assets/newFooter/linkdin.svg"; 
import twitter from "../assets/newFooter/twiter.svg";   
import youtube from "../assets/newFooter/youtube.svg";
import myaster from "../assets/desktopViewImages/stayconnected/myaster.png";
import heading from "../assets/newFooter/newfooterHeading.svg";
import bgimage from "../assets/newFooter/newFooterBackground.svg";

function NewFooter() {
  const socialLinks = [
    { src: facebook, alt: "Facebook", link: "https://www.facebook.com/AsterClinics/" },
    { src: twitter, alt: "Twitter", link: "https://twitter.com" },
    { src: youtube, alt: "YouTube", link: "https://www.youtube.com/@AsterClinicAE" },
    { src: instagram, alt: "Instagram", link: "https://www.instagram.com/asterclinics/" },
     { src: myaster, alt: "MyAster", link: "https://www.myaster.com/en" },
    { src: linkedin, alt: "LinkedIn", link: "https://www.linkedin.com/showcase/17961293/admin/dashboard/" },
  ];

  return (
    <div
      className="flex flex-col items-center justify-center pb-6 px-0"
      style={{
        backgroundImage: `url(${bgimage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Heading */}
      {/* Heading */}
<motion.img
  src={heading}
  alt="Stay Connected"
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="w-full mb-6 object-contain"
/>


      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center text-white font-goldman uppercase px-6 [-webkit-text-stroke:0.4px_black] tracking-tighter text-[18px]"
        
      >
        <p>Follow us and keep</p>
        <p>journalling every day</p>
        <p>
           <span className="text-[#FEE20D] [-webkit-text-stroke:0.3px_black] tracking-tighter text-[18px]">to win big!</span>
        </p>
      </motion.div>

      {/* Social Icons */}
      <div className="flex flex-wrap gap-4 sm:gap-6 justify-center mt-6 mb-12 px-4">
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
              className="w-10 h-10 sm:w-12 sm:h-12"
            />
          </motion.a>
        ))}
      </div>
    </div>
  );
}

export default NewFooter;
