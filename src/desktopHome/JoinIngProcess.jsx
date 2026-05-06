import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

import heading from "../assets/desktopViewImages/joiningProcess/heading.svg";
import joinButton from "../assets/desktopViewImages/joiningProcess/joinButton.svg";
import calender from "../assets/how_to_join/calender.svg";
import leaderbord from "../assets/how_to_join/leaderbord.svg";
import trophy from "../assets/how_to_join/trophy.svg";
import user from "../assets/how_to_join/user.svg";
import bg from "../assets/desktopViewImages/joiningProcess/bg_howto_join.png"
import currency from "../assets/currency-image.png";
function JoinIngProcess() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const steps = [
    {
      img: user,
      text: (
        <>
          STEP 1:{" "}
          <span className="text-yellow-400">
            {" "}
            Sign up and create your hero profile.
          </span>
        </>
      ),
    },
    {
      img: calender,
      text: (
        <>
          STEP 2:{" "}
          <span className="text-yellow-400">
            {" "}
            Journal your good habits daily.{" "}
          </span>
        </>
      ),
    },
    {
      img: leaderbord,
      text: (
        <>
          STEP 3:{" "}
          <span className="text-yellow-400">Stay consistent to be on the top.</span>
        </>
      ),
    },
    {
      img: trophy,
      text: (
        <>
          STEP 4:{" "}
          <span className="text-yellow-400"> Win an iPad, smartwatch or other big prizes!</span>
        </>
      ),
    },
  ];

  return (
    <div className="bg-[#D7FFCC] pb-16 px-4 sm:px-8 lg:px-16 text-center relative overflow-hidden"
    style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Heading */}
      <motion.img
        src={heading}
        alt="Complete Simple Missions"
        className="relative mx-auto -mb-16 z-10 w-[80%] sm:w-[60%] lg:w-auto"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Subtitle */}
      <motion.div
        data-aos="fade-up"
        className="bg-[#343279] text-white rounded-lg pb-10 pt-20 px-6 sm:px-12 md:px-16 lg:px-24 max-w-7xl mx-auto mb-20 z-0"
      >
        <p
          className="font-black text-base sm:text-lg md:text-2xl lg:text-[28px] font-goldman leading-snug tracking-tighter uppercase py-5"
          style={{
            WebkitTextStroke: "1.3px rgba(0,0,0,0.6)",
            fontWeight: "900",
          }}
        >
          Every daily mission you complete brings you closer to winning{" "}
          <span className="text-yellow-400 block">
            rewards worth a total of <img
                    src={currency}
                    alt="Heading"
                    className="inline w-8 h-5 mb-1"
                  />   5000!
          </span>
        </p>
      </motion.div>

      {/* Join Button */}
      <motion.img
        src={joinButton}
        alt="How to Join"
        className="mx-auto mb-10 cursor-pointer w-[200px] sm:w-[240px] md:w-[280px] lg:w-auto"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        data-aos="zoom-in"
      />

      {/* Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8 max-w-7xl mx-auto">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            data-aos="flip-left"
            className="bg-[#A97ACA] border-[4px] border-collapse border-[#7028a2] rounded-xl shadow-md 
            flex flex-col items-center justify-center text-center text-white
            w-[90%] sm:w-[280px] md:w-[320px] lg:w-[294px] 
            h-auto min-h-[220px] md:min-h-[250px] lg:h-[269px] 
            px-4 py-6 mx-auto"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={step.img}
              alt="step icon"
              className="w-[80px] h-[80px] sm:w-[90px] sm:h-[90px] md:w-[100px] md:h-[100px] lg:w-[106px] lg:h-[106px] mb-4"
            />
            <p className="font-black text-sm sm:text-base md:text-lg lg:text-[24px] uppercase font-goldman tracking-tighter leading-snug [-webkit-text-stroke:0.5px_black]">
              {step.text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default JoinIngProcess;
