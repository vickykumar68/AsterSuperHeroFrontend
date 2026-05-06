import React, { useState } from "react";
import brainy from "../assets/new_meet_your_hero-mob/MissBrainy-card.svg";
import missBrainyBig from "../assets/new_meet_your_hero-mob/MissBrainy.svg";
import brainyName from "../assets/meet_your_hero/missBrainyName.svg";
import brainyIcon from "../assets/meet_your_hero/brainyIcon.svg";
import { motion, AnimatePresence } from "framer-motion";
import decorativebgBottomLeft from "../assets/meet_your_hero/decorativebgBottomLeft.svg";
import decorativebgRight from "../assets/meet_your_hero/decorativeBgRight.svg";
import heading from "../assets/meet_your_hero/headingNew.svg";
import bgMeetHero from "../assets/meet_your_hero/bg_meetHero.svg";
import HeroSlider from "./HeroSlider";

// Default hero (same as first in RollingGallery IMGS array)
const defaultHero = {
  image: brainy,
  referenaceImage: missBrainyBig,
  title: brainyName,
  heading:
    "Infinite wisdom, solving challenges with brilliance and smart power.",
  backgroundClass: "bg-gradient-to-b from-[#B89AFF] via-[#7F4FEF] to-[#291558]",
  pointers: [
    {
      icon: brainyIcon,
      text: "Fights Against: Habit Hacker’s endless Screen Spell that traps kids in scrolling and steals time they could use for learning and fun.",  
    },
    {
      icon: brainyIcon,
      text: "Mission: Read, learn, and play in the real world, build sharp focus without getting lost behind screens.",
    },
    {
      icon: brainyIcon,
      text: "Fun Fact: She can finish a whole book just by flipping the pages.",
    },
  ],
};

function MeetYourHero() {
  const [selectedHero, setSelectedHero] = useState(defaultHero);

  // Animation variants for the hero content
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const heroItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
      className="bg-[#E1CCFF] relative pb-6 flex flex-col items-center bg-center bg-cover"
      style={{
        backgroundImage: `url(${bgMeetHero})`,
      }}
    >
      <motion.img
        src={decorativebgBottomLeft}
        alt="decorativebgBottomLeft"
        className="absolute bottom-0 left-0 w-24 sm:w-40 opacity-90 -z-10"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />
      <motion.img
        src={decorativebgRight}
        alt="decorativebgRight"
        className="absolute top-1/2 right-0 w-40 sm:w-48 opacity-90 -z-10"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />
      <img src={heading} alt="Heading" className="w-full z-20" />
      <div className="relative z-10 max-w-4xl w-full px-4 -top-8">
        <AnimatePresence mode="wait">
          {selectedHero && (
            <motion.div
              key={selectedHero.id || selectedHero.name}
              className={`flex justify-between text-[14px] text-white px-4 pt-12 pb-2 h-[472px] ${selectedHero.backgroundClass}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {/* Left Side: Hero Image + Title */}
              <motion.div
                className="w-full max-w-[160px] flex flex-col items-center"
                variants={heroContainerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.img
                  src={selectedHero.title}
                  alt="hero_name"
                  className="w-[147px]"
                  variants={heroItemVariants}
                />
                <motion.div
                  className="relative mt-2 h-full"
                  variants={heroItemVariants}
                >
                  <img
                    src={selectedHero.referenaceImage}
                    alt="Background"
                    className="max-h-[450px] max-w-[250px] w-auto h-auto mx-auto transform scale-105 transition-transform duration-300 mt-3"
                  />
                </motion.div>
              </motion.div>

              {/* Right Side: Hero Details */}
              <motion.div
                className="w-full max-w-[180px] flex flex-col gap-6"
                variants={heroContainerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  className="font-black text-[14px] font-goldman uppercase leading-tight text-shadow-md [-webkit-text-stroke:0.4px_black] tracking-tighter"
                  variants={heroItemVariants}
                >
                  {selectedHero.heading}
                </motion.div>

                <motion.div
                  className="space-y-2"
                  variants={heroContainerVariants}
                >
                  {selectedHero.pointers.map((point, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-start gap-2 rounded-lg"
                      variants={heroItemVariants}
                      custom={idx}
                    >
                      <img
                        src={point.icon}
                        alt=""
                        className="w-4 h-4 mt-1 flex-shrink-0"
                      />
                      <p className="text-xs sm:text-sm leading-snug break-words max-w-xs font-gtwalsheim   ">
                        {point.text}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <div>
          <HeroSlider onHeroSelect={setSelectedHero} />
        </div>
      </div>
    </div>
  );
}

export default MeetYourHero;
