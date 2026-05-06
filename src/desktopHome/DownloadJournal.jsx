import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import bgimage from "../assets/desktopViewImages/downloadJurnol/downloadJurnolBGD.svg";

function DownloadGeneral() {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    // Sound effect
    const playBeep = () => {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(600, ctx.currentTime);

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(
            0.0001,
            ctx.currentTime + 0.2
        );
        oscillator.stop(ctx.currentTime + 0.2);
    };

    return (
        <div className="relative bg-[#66C4FF] px-6 md:px-10 lg:px-20 py-16 text-center overflow-hidden bg-cover bg-center"
            style={{
                backgroundImage: `url(${bgimage})`
            }}>

            {/* Content */}
            <div
                className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-8"
                data-aos="fade-up"
            >
                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-xl md:text-2xl lg:text-3xl font-black text-white text-center font-goldman"
                    style={{
                        textShadow:
                        "2px 2px 0px rgba(0,0,0,0.6), 1px 1px 0px rgba(0,0,0,0.8)",
                         WebkitTextStroke: '1px rgba(0,0,0,0.4)',
                    }}
                >
                    TRACK HABITS THE FUN WAY – AT HOME!
                </motion.h2>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-sm md:text-base lg:text-lg text-[#10334E] font-gtwalsheim leading-relaxed font-medium max-w-2xl px-4"
                >
                    Download the printable Habit Tracker Journal to help your child stay
                    consistent, reflect daily, and celebrate small wins together.
                </motion.p>

                {/* Download Button */}
                <motion.button
                    onClick={playBeep}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92, rotate: -3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="w-full md:w-[600px] text-white font-black text-lg md:text-xl py-6 rounded-2xl border-2 border-black font-goldman shadow-lg"
                    style={{
                        background:
                            "linear-gradient(to bottom, #FEE20E, #FCD113, #FCD113, #F6BA06)",
                        textShadow:
                            "2px 2px 0px rgba(0,0,0,0.6), 1px 1px 0px rgba(0,0,0,0.8)",
                            WebkitTextStroke: '1px rgba(0,0,0,0.4)',
                    }}
                    data-aos="zoom-in"
                >
                    DOWNLOAD JOURNAL PDF
                </motion.button>
            </div>
        </div>
    );
}

export default DownloadGeneral;

