import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

import bg from "../assets/desktopViewImages/introduceOurHero/bg_meet_hero.png";
import gobbler from "../assets/desktopViewImages/new-introduceOurHero/greengobblercard.svg";
import germZapper from "../assets/desktopViewImages/new-introduceOurHero/germzappercard.svg";
import flashingfloss from "../assets/desktopViewImages/new-introduceOurHero/flashingherocard.svg";
import hydroHero from "../assets/desktopViewImages/new-introduceOurHero/hydroHerocard.svg";
import brainy from "../assets/desktopViewImages/new-introduceOurHero/missBrainycard.svg";
import mightSmall from "../assets/desktopViewImages/new-introduceOurHero/mightycard.svg";

import brainyIcon from "../assets/meet_your_hero/brainyIcon.svg";
import brainyBig from "../assets/desktopViewImages/new-introduceOurHero/missBrainy.svg";
// import brainyBig from "../assets/desktopViewImages/new-introduceOurHero/";
import brainyName from "../assets/meet_your_hero/missBrainyName.svg";
// import activebrainy from "../assets/desktopViewImages/new-introduceOurHero/missBrainyBorder.svg";
import activebrainy from "../assets/desktopViewImages/new-introduceOurHero/missBrainyBorder.webp";

import flashingflosbig from "../assets/desktopViewImages/new-introduceOurHero/flashinghero.svg";
import flashingFlossName from "../assets/meet_your_hero/flashingFloosName.svg";
import flossIcon from "../assets/meet_your_hero/flossIcon.svg";
import activeflashing from "../assets/desktopViewImages/new-introduceOurHero/flashingheroborder.svg";

import germZapperBig from "../assets/desktopViewImages/new-introduceOurHero/germZapper.svg";
import germZapperName from "../assets/meet_your_hero/germZapperName.svg";
import germIcon from "../assets/meet_your_hero/germIcon.svg";
import activezapper from "../assets/desktopViewImages/new-introduceOurHero/germzapperborder.svg";

import gobblerIcon from "../assets/meet_your_hero/gobblerIcon.svg";
import greenGobblerName from "../assets/meet_your_hero/greenGobblerName.svg";
import greenGobblerBig from "../assets/desktopViewImages/new-introduceOurHero/GreenGobbler.svg";
import activegobbler from "../assets/desktopViewImages/new-introduceOurHero/greengobblerborder.svg";

import hydraHeroBig from "../assets/desktopViewImages/new-introduceOurHero/hydroHero.svg";
import hydraHeroName from "../assets/meet_your_hero/hydraHeroName.svg";
import hydralcon from "../assets/meet_your_hero/hydraIcon.svg";
import activehydra from "../assets/desktopViewImages/new-introduceOurHero/hydroHeroBorder.svg";

// import mightyBig from "../assets/desktopViewImages/new-introduceOurHero/mighty.svg";
import mightyBig from "../assets/desktopViewImages/new-introduceOurHero/mighty.webp";
import mighty_name from "../assets/meet_your_hero/mighty_name.svg";
import mightyManIcon from "../assets/meet_your_hero/mightyManIcon.svg";
import activemighty from "../assets/desktopViewImages/new-introduceOurHero/mightyBorder.svg";

import heading from "../assets/desktopViewImages/introduceOurHero/headingHero.svg";

function IntroducedHero() {
  const IMGS = [
    {
      image: brainy,
      activeimage: activebrainy,
      referenaceImage: brainyBig,
      title: brainyName,
      heading:
        "Infinite wisdom, solving challenges with brilliance and smart power.",
      backgroundClass: "bg-gradient-to-b from-[#7F4FEF] to-[#291558]",
      pointers: [
        {
          icon: brainyIcon,
          textinitial: "Fights Against: ",
          text: "Screentime spell that traps kids and steals their focus & learning.",
        },
        {
          icon: brainyIcon,
          textinitial: "Mission: ",
          text: "Read, learn, and play every day to build sharp focus.",
        },
        {
          icon: brainyIcon,
          textinitial: "Fun Fact: ",
          text: "Fun Fact: She can read a book by flipping the pages.",
        },
      ],
    },
    {
      image: gobbler,
      activeimage: activegobbler,
      referenaceImage: greenGobblerBig,
      title: greenGobblerName,
      heading: "Power-packed with veggies, fueling strength for every challenge.",
      backgroundClass: "bg-gradient-to-b from-[#489864] to-[#19542E]",
      pointers: [
        {
          icon: gobblerIcon,
          textinitial: "Fights Against: ",
          text: "Junk food, sugar, and processed food that makes you weak.",
        },
        {
          icon: gobblerIcon,
          textinitial:  "Mission: ",
          text: "Eat at least one green veggie per meal and enjoy fruits daily.",
        },
        { 
          icon: gobblerIcon,
          textinitial: "Fun Fact: ", 
          text: "He gets his power from eating spinach daily." 
        },
      ],
    },
    {
      image: flashingfloss,
      activeimage: activeflashing,
      referenaceImage: flashingflosbig,
      title: flashingFlossName,
      heading:
        "Fearless protector of smiles, guarding teeth with shining strength.",
      backgroundClass: "bg-gradient-to-b from-[#66B298] to-[#3D9678]",
      pointers: [
        {
          icon: flossIcon,
          textinitial: "Fights Against: ",
          text: "Cavities, gum problems, and Habit Hacker’s sneaky cavity monsters.",
        },
        {
          icon: flossIcon,
          textinitial: "Mission: ",
          text: "Brush twice, floss daily, and keep your smile bright.",
        },
        { 
          icon: flossIcon, 
          textinitial: "Fun Fact: ",
          text: "Her teeth once blinded Habit Hacker." 
        },
      ],
    },
    {
      image: hydroHero,
      activeimage: activehydra,
      referenaceImage: hydraHeroBig,
      title: hydraHeroName,
      heading: "Fighting dehydration, bringing refreshing energy to the town.",
      backgroundClass: "bg-gradient-to-b from-[#306FA6] to-[#184C7B]",
      pointers: [
        {
          icon: hydralcon,
          textinitial: "Fights Against: ",
          text: "Dehydration, tiredness, and Habit Hacker’s sugary drink tricks.",
        },
        {
          icon: hydralcon,
          textinitial: "Mission: ",
          text: "Every child should drink 8 glasses of water & avoid sugary drinks.",
        },
        { 
          icon: hydralcon,
          textinitial: "Fun Fact: ", 
          text: "She became a superhero thanks to water." 
        },
      ],
    },
    {
      image: germZapper,
      activeimage: activezapper,
      referenaceImage: germZapperBig,
      title: germZapperName,
      heading: "Destroying germs daily, keeping health safe and strong.",
      backgroundClass: "bg-gradient-to-b from-[#E47D4C] to-[#B8440C]",
      pointers: [
        {
          icon: germIcon,
          textinitial: "Fights Against: ",
          text: "Habit Hacker’s germs, dirty hands, and invisible sickness traps. ",
        },
        {
          icon: germIcon,
          textinitial: "Mission: ",
          text: "Wash hands before and after meals to stay healthy and strong.",
        },
        { 
          icon: germIcon,
          textinitial: "Fun Fact: ",     
          text: "He can defeat germs unseen by the eyes."
         },
      ],
    },
    {
      image: mightSmall,
      activeimage: activemighty,
      referenaceImage: mightyBig,
      title: mighty_name,
      heading: "The strongest superhero with the coolest physical exercises",
      backgroundClass: "bg-gradient-to-b from-[#F77E7C]  to-[#CB3E42]",
      pointers: [
        {
          icon: mightyManIcon,
          textinitial: "Fights Against: ",
          text: "Laziness, slouching, and Habit Hacker’s trap to make kids lethargic.",
        },
        {
          icon: mightyManIcon,
          textinitial: "Mission: ",
          text: "Jump, run, dance, or play a sport just move your body with energy.",
        },
        { 
          icon: mightyManIcon,
          textinitial: "Fun Fact: ",
          text: "He’s so strong he once lifted a mountain." 
        },
      ],
    },
  ];

  const [activeIndex, setActiveIndex] = useState(IMGS.length - 1);
  const activeHero = IMGS[activeIndex];

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="bg-[#EAD9FF] pb-12 px-5 flex flex-col justify-center items-center gap-10"
    style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <img src={heading} alt="heading" loading="lazy" decoding="async" />

      {/* WRAPPER */}
      <div className="flex flex-col xl:flex-row w-full max-w-7xl mx-auto gap-10">
        {/* LEFT HERO CARD */}
        <motion.div
          key={activeIndex}
          data-aos="fade-right"
          className={`flex-1 rounded-2xl text-white ${activeHero.backgroundClass} p-6 md:p-8 lg:p-10`}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row gap-6 lg:gap-10 py-12 md:py-16 lg:py-24">
            {/* HERO IMAGE + TITLE */}
            <div className="flex flex-col items-center">
              <img
                src={activeHero.title}
                alt="title"
                loading="lazy"
                decoding="async"
                className="h-[50px] md:h-[65px] lg:h-[80px] mb-4"
              />
              <img
                src={activeHero.referenaceImage}
                alt="hero"
                loading="lazy"
                decoding="async"
                className="w-[200px] md:w-[260px] lg:w-[320px] h-[340px] md:h-[420px] lg:h-[500px] object-cover rounded-xl"
              />
            </div>

            {/* HERO DESCRIPTION */}
            <div className="flex flex-col justify-center max-w-full md:max-w-[300px] lg:max-w-[340px] gap-4 md:gap-5">
              <h3 className="text-lg md:text-2xl lg:text-[32px] font-goldman font-black mb-2 md:mb-4 leading-snug md:leading-tight drop-shadow-lg uppercase tracking-tighter [-webkit-text-stroke:1.2px_black]">
                {activeHero.heading}
              </h3>
              {activeHero.pointers.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2 md:gap-3 mb-3 md:mb-4">
                  <img src={point.icon} alt="icon" className="w-4 md:w-5 mt-1" />
                  <p className="text-sm md:text-base font-gtwalsheim leading-relaxed">
                  <strong>{point.textinitial}</strong> {point.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE SMALL HERO IMAGES */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-2 gap-4 md:gap-6 mx-auto"
          data-aos="fade-left"
        >
          {IMGS.map((hero, idx) => (
            <motion.div
              key={idx}
              className="relative w-[130px] md:w-[150px] lg:w-[180px] h-[200px] md:h-[240px] lg:h-[270px] rounded-xl cursor-pointer overflow-hidden"
              onClick={() => setActiveIndex(idx)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Normal Image */}
              <img
                src={hero.image}
                alt="hero"
                loading="lazy"
                decoding="async"
                className={`absolute top-0 left-0 w-full h-full object-cover rounded-xl transition-opacity duration-500 ${
                  activeIndex === idx ? "opacity-0" : "opacity-100"
                }`}
              />

              {/* Active Image */}
              <img
                src={hero.activeimage}
                alt="active hero"
                loading="lazy"
                decoding="async"
                className={`absolute top-0 left-0 w-full h-full object-cover rounded-xl transition-opacity duration-500 ${
                  activeIndex === idx ? "opacity-100" : "opacity-0"
                }`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default IntroducedHero;
