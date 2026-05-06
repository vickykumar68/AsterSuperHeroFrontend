import React from "react";
import { motion } from "framer-motion";
import bgDecorateBottomLeft from "../assets/how_to_join/bg-decorate-bottom-left.svg";
import bgDecorateRight from "../assets/how_to_join/bg-decorative-right.svg";
import bgDecorateTopLeft from "../assets/how_to_join/g-decorative-lefttop.svg";
import button from "../assets/how_to_join/button.svg";
import calender from "../assets/how_to_join/calender.svg";
import heading_how from "../assets/how_to_join/heading_how.svg";
import leaderbord from "../assets/how_to_join/leaderbord.svg";
import trophy from "../assets/how_to_join/trophy.svg";
import user from "../assets/how_to_join/user.svg";
import currency from "../assets/currency-image.png";
function HowToJoin() {
  return (
    <div className="relative bg-[#D7FFCC] overflow-hidden flex flex-col items-center">
      {/* Decorative BG elements with wave animation */}
      <motion.img
        src={bgDecorateTopLeft}
        alt=""
        className="absolute top-10 left-0 w-40 sm:w-48 opacity-90"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />
      <motion.img
        src={bgDecorateRight}
        alt=""
        className="absolute top-20 right-0 w-40 sm:w-48 opacity-90"
        animate={{ y: [0, -12, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />
      <motion.img
        src={bgDecorateBottomLeft}
        alt=""
        className="absolute bottom-0 left-0 w-40 sm:w-48 opacity-90"
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />
      <img
        src={heading_how}
        alt="Heading"
        className="absolute w-full z-20"
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center px-4 top-9 pb-24">
        {/* Blue Info Box */}
        <div className="bg-[#25276B] text-white rounded-lg shadow-lg pt-12 pb-6 px-6 text-sm sm:text-base font-extrabold leading-relaxed text-center max-w-2xl font-goldman tracking-tight uppercase [-webkit-text-stroke:0.3px_black] "
        
        >
          Every daily mission you complete brings you closer to winning
          {" "}
          <span className="text-yellow-300 uppercase [-webkit-text-stroke:0.3px_black] tracking-tighter">
            rewards worth a total of <img
                                src={currency}
                                alt="Heading"
                                className="inline w-8 h-5 mb-1"
                              />  5000!   &#x20AF;
          </span>
        </div>

        {/* How to Join Button */}
        <div data-aos="fade-down" className="mt-6 relative">
          <img src={button} alt="How to Join" className="w-56 sm:w-64" />
          <p className="absolute inset-0 flex items-center justify-center text-white font-extrabold [-webkit-text-stroke:0.3px_black] tracking-tighter"
            
          >
            HOW IT WORKS 
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-3xl font-goldman"
          style={{
            textShadow: '2px 2px 0px rgba(0,0,0,0.4), 1px 1px 0px rgba(0,0,0,0.6)',
            WebkitTextStroke: '1px rgba(0,0,0,0.5)'
          }}
        >
          {/* Step 1 */}
          <div data-aos="fade-right" className="bg-[#8C54B5] rounded-lg shadow-md px-2 py-2 flex flex-col items-center justify-center text-center text-white font-extrabold min-h-[140px] border-[4px] border-collapse border-[#7028a2]">
            <img src={user} alt="User" className="w-14 h-20 mb-2" />
            <p className="text-sm sm:text-base leading-snug tracking-tight [-webkit-text-stroke:0.4px_black]">
              STEP 1: <span className="text-[#FEE20D] uppercase">Sign up and create your hero profile.</span>
            </p>
          </div>

          {/* Step 2 */}
          <div data-aos="fade-left" className="bg-[#8C54B5] rounded-lg shadow-md p-2 flex flex-col items-center justify-center text-center text-white font-extrabold min-h-[140px] border-[4px] border-collapse border-[#7028a2]">
            <img src={calender} alt="Calendar" className="w-14 h-20 mb-2" />
            <p className="text-sm sm:text-base leading-snug tracking-tight [-webkit-text-stroke:0.4px_black]">
              STEP 2: <span className="text-[#FEE20D] uppercase">Journal your good habits daily.</span>
            </p>
          </div>

          {/* Step 3 */}
          <div data-aos="fade-right" className="bg-[#8C54B5] rounded-lg shadow-md p-2 flex flex-col items-center justify-center text-center text-white font-extrabold min-h-[140px] border-[4px] border-collapse border-[#7028a2]">
            <img src={leaderbord} alt="Leaderboard" className="w-14 h-20 mb-2" />
            <p className="text-sm sm:text-base leading-snug tracking-tight [-webkit-text-stroke:0.4px_black]">
              STEP 3: <span className="text-[#FEE20D] uppercase"> ️Stay consistent to be on the top.</span>
            </p>
          </div>

          {/* Step 4 */}
          <div data-aos="fade-left" className="bg-[#8C54B5] rounded-lg shadow-md p-2 flex flex-col items-center justify-center text-center text-white font-extrabold min-h-[140px] border-[4px] border-collapse border-[#7028a2]">
            <img src={trophy} alt="Trophy" className="w-14 h-20 mb-2" />
            <p className="text-sm sm:text-base leading-snug tracking-tight [-webkit-text-stroke:0.4px_black]">
              STEP 4: <span className="text-[#FEE20D] uppercase">Win an iPad, smartwatch or other big prizes!</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default HowToJoin;
