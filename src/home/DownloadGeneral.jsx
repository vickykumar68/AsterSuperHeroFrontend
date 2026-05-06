import React from "react";
import { motion } from "framer-motion";
import decorativeFooter from "../assets/downloadGeneral/decorative_footer.svg";

function DownloadGeneral() {
  // Generate instant sound using Web Audio API
  const playBeep = () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = "sine"; // sound type: sine, square, triangle
    oscillator.frequency.setValueAtTime(600, ctx.currentTime); // Hz (pitch)

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2); // fade out
    oscillator.stop(ctx.currentTime + 0.2);
  };

  return (
    <div className="relative bg-[#66C4FF] px-4 py-10 text-center overflow-hidden">
      {/* Decorative dots at bottom */}
      <img
        src={decorativeFooter}
        alt="decor"
        className="absolute bottom-0 left-0 w-full object-cover z-0"
      />

      {/* Content */}
      <div className="relative z-10 max-w-sm mx-auto">
        <h2
          className="text-lg font-extrabold text-white mb-4 font-goldman"
          style={{
            textShadow:
              "2px 2px 0px rgba(0,0,0,0.6), 1px 1px 0px rgba(0,0,0,0.8)",
          }}
        >
          TRACK HABITS THE FUN WAY – AT HOME!
        </h2>

        <p className="text-[14px] text-[#10334E] leading-relaxed mb-8 font-medium px-3">
          Download the printable Habit Tracker Journal to help your child stay
          consistent, reflect daily, and celebrate small wins together.
        </p>

        {/* Button with sound + animation */}
        <motion.button
          onClick={playBeep}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9, rotate: -2 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="w-full 
                        text-white font-extrabold text-[16px] py-4 
                        rounded-xl border-2 border-black font-goldman"
          style={{
            background: "linear-gradient(to bottom, #FEE20E, #FCD113, #FCD113, #F6BA06)",
            textShadow: "2px 2px 0px rgba(0,0,0,0.6), 1px 1px 0px rgba(0,0,0,0.8)",
          }}
        >
          DOWNLOAD JOURNAL PDF
        </motion.button>

      </div>
    </div>
  );
}

export default DownloadGeneral;

