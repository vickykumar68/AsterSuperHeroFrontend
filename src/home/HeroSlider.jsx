import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// --- Assets imports ---
import gobbler from "../assets/new_meet_your_hero-mob/GreenGobbler-card.svg";
import germZapper from "../assets/new_meet_your_hero-mob/Germ-card.svg";
import flashingfloss from "../assets/new_meet_your_hero-mob/Flashing-card.svg";
import hydroHero from "../assets/new_meet_your_hero-mob/HydroHero-card.svg";
import brainy from "../assets/new_meet_your_hero-mob/MissBrainy-card.svg";
import mightSmall from "../assets/new_meet_your_hero-mob/MightyMan-card.svg";

import brainyIcon from "../assets/meet_your_hero/brainyIcon.svg";
import brainyName from "../assets/meet_your_hero/missBrainyName.svg";
import missBrainyBig from "../assets/new_meet_your_hero-mob/MissBrainy.svg";

import flashingflosbig from "../assets/new_meet_your_hero-mob/FlashingHero.svg";
import flashingFlossName from "../assets/meet_your_hero/flashingFloosName.svg";
import flossIcon from "../assets/meet_your_hero/flossIcon.svg";

import germZapperBig from "../assets/new_meet_your_hero-mob/GermZapper.svg";
import germZapperName from "../assets/meet_your_hero/germZapperName.svg";
import germIcon from "../assets/meet_your_hero/germIcon.svg";

import gobblerIcon from "../assets/meet_your_hero/gobblerIcon.svg";
import greenGobblerName from "../assets/meet_your_hero/greenGobblerName.svg";
import greenGobblerBig from "../assets/new_meet_your_hero-mob/GreenGobbler.svg";

import hydraHeroBig from "../assets/new_meet_your_hero-mob/HydroHero.svg";
import hydraHeroName from "../assets/meet_your_hero/hydraHeroName.svg";
import hydralcon from "../assets/meet_your_hero/hydraIcon.svg";

import mightyBig from "../assets/meet_your_hero/mightyManBig.svg";
import mighty_name from "../assets/meet_your_hero/mighty_name.svg";
import mightyManIcon from "../assets/meet_your_hero/mightyManIcon.svg";

// --- Data ---
const IMGS = [
  {
    image: brainy,
    referenaceImage: missBrainyBig,
    title: brainyName,
    heading:
      "Infinite wisdom, solving challenges with brilliance and smart power.",
    backgroundClass:
      "bg-gradient-to-b from-[#B89AFF] via-[#7F4FEF] to-[#291558]",
    pointers: [
      {
        icon: brainyIcon,
        textinitial: "Fights Against: ",
        text: "Fights Against: Screentime spell that traps kids and steals their focus & learning.  ",
      },
      {
        icon: brainyIcon,
        textinitial: "Mission: ",
        text: "Read, learn, and play every day to build sharp focus. ",
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
    referenaceImage: greenGobblerBig,
    title: greenGobblerName,
    heading: "Power-packed with veggies, fueling strength for every challenge.",
    backgroundClass:
      "bg-gradient-to-b from-[#81D69F] via-[#489864] to-[#19542E]",
    pointers: [
      {
        icon: gobblerIcon,
        textinitial: "Fights Against: ",
        text: "Fights Against: Junk food, sugar, and processed food that makes you weak. ",
      },
      {
        icon: gobblerIcon,
        textinitial:  "Mission: ",
        text: "Eat at least one green veggie per meal and enjoy fruits daily. ",
      },
      {
        icon: gobblerIcon,
        textinitial: "Fun Fact: ",
        text: "Fun Fact: He gets his power from eating spinach daily. ",
      },
    ],
  },
  {
    image: flashingfloss,
    referenaceImage: flashingflosbig,
    title: flashingFlossName,
    heading:
      "Fearless protector of smiles, guarding teeth with shining strength.",
    backgroundClass:
      "bg-gradient-to-b from-[#B8FBE4] via-[#66B298] to-[#3D9678]",
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
        text: "Her teeth once blinded Habit Hacker.",
      },
    ],
  },
  {
    image: hydroHero,
    referenaceImage: hydraHeroBig,
    title: hydraHeroName,
    heading: "Fighting dehydration, bringing refreshing energy to the town.",
    backgroundClass:
      "bg-gradient-to-b from-[#60B1F9] via-[#306FA6] to-[#184C7B]",
    pointers: [
      {
        icon: hydralcon,
        textinitial: "Fights Against: ",
        text: " Dehydration, tiredness, and Habit Hacker’s sugary drink tricks.",
      },
      {
        icon: hydralcon,
        textinitial: "Mission: ",
        text: "Every child should drink 8 glasses of water & avoid sugary drinks.",
      },
      {
        icon: hydralcon,
        textinitial: "Fun Fact: ",
        text: "She became a superhero thanks to water.",
      },
    ],
  },
  {
    image: germZapper,
    referenaceImage: germZapperBig,
    title: germZapperName,
    heading: "Destroying germs daily, keeping health safe and strong.",
    backgroundClass:
      "bg-gradient-to-b from-[#E98351] via-[#E47D4C] to-[#B8440C]",
    pointers: [
      {
        icon: germIcon,
        textinitial: "Fights Against: ",
        text: "Habit Hacker’s germs, dirty hands, and invisible sickness traps.",
      },
      {
        icon: germIcon,
        textinitial: "Mission: ",
        text: "Wash hands before and after meals to stay healthy and strong.",
      },
      {
        icon: germIcon,
        textinitial: "Fun Fact: ",
        text: "He can defeat germs unseen by the eyes.",
      },
    ],
  },
  {
    image: mightSmall,
    referenaceImage: mightyBig,
    title: mighty_name,
    heading: "The strongest superhero with the coolest physical exercises",
    backgroundClass:
      "bg-gradient-to-b from-[#FFD0D0] via-[#F77E7C] to-[#CB3E42]",
    pointers: [
      {
        icon: mightyManIcon,
        textinitial: "Fights Against: ",
        text: "Laziness, slouching, and Habit Hacker’s trap to make kids lethargic.",
      },
      {
        icon: mightyManIcon,
        textinitial: "Mission: ",
        text: "Jump, run, dance, or play a sport just move your body with energy.  ",
      },
      {
        icon: mightyManIcon,
        textinitial: "Fun Fact: ",
        text: "He’s so strong he once lifted a mountain.",
      },
    ],
  },
];

function HeroSlider({ onHeroSelect }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 6000, // 🔹 slower transition speed
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
    autoplay: true, // 🔹 enables auto scroll
    autoplaySpeed: 0, // 🔹 continuous scroll
    cssEase: "linear", // 🔹 smooth continuous loop
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1.5,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {IMGS.map((hero, index) => (
       
        <div
          key={index}
          className="p-3 cursor-pointer"
          onClick={() => onHeroSelect(hero)}
        >
          <div className="rounded-xl transition-all duration-500 -mb-8">
            <img
              src={hero.image}
              alt={hero.title}
              className="w-[120%] h-[220px] mx-auto"
            />
          </div>
        </div>
      ))}
    </Slider>
  );
}

export default HeroSlider;
