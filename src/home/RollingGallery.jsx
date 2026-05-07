import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
} from "motion/react";
import gobbler from "../assets/meet_your_hero/gobbler.svg";
import germZapper from '../assets/meet_your_hero/germZapper.svg';
import flashingfloss from '../assets/meet_your_hero/flashingFloss.svg';
import hydroHero from '../assets/meet_your_hero/hydroHero.svg';
import brainy from "../assets/meet_your_hero/brainy.svg";
import mightSmall from "../assets/meet_your_hero/mightysmall.svg";
// Meet Your Hero SVG Imports
import brainyIcon from "../assets/meet_your_hero/brainyIcon.svg";
import brainyName from "../assets/meet_your_hero/missBrainyName.svg";

import flashingflosbig from "../assets/meet_your_hero/flashingfloosbig.svg";
import flashingFlossName from "../assets/meet_your_hero/flashingFloosName.svg";

import flossIcon from "../assets/meet_your_hero/flossIcon.svg";

// import germZapper from "../assets/meet_your_hero/germZapper.svg";
import germZapperBig from "../assets/meet_your_hero/germZapperBig.svg";
import germZapperName from "../assets/meet_your_hero/germZapperName.svg";
import germIcon from "../assets/meet_your_hero/germIcon.svg";

// import gobbler from "../assets/meet_your_hero/gobbler.svg";
import gobblerIcon from "../assets/meet_your_hero/gobblerIcon.svg";
import greenGobblerName from "../assets/meet_your_hero/greenGobblerName.svg";
import greenGobblerBig from "../assets/meet_your_hero/greenGobblerBig.svg";

// import hydroHero from "../assets/meet_your_hero/hydroHero.svg";
import hydraHeroBig from "../assets/meet_your_hero/hydraHeroBig.svg";
import hydraHeroName from "../assets/meet_your_hero/hydraHeroName.svg";
import hydralcon from "../assets/meet_your_hero/hydraIcon.svg";

import mightySmall from "../assets/meet_your_hero/mightysmall.svg";
import mightyBig from "../assets/meet_your_hero/mightyManBig.svg";
import mighty_name from "../assets/meet_your_hero/mighty_name.svg";
import mightyManIcon from "../assets/meet_your_hero/mightyManIcon.svg";
import missBrainyBig from "../assets/meet_your_hero/missBrainyBig.svg";


const IMGS = [
  {
    image: brainy,
    referenaceImage: missBrainyBig,
    title: brainyName,
    heading: "Infinite wisdom, solving challenges with brilliance and smart power.",
    backgroundClass: "bg-gradient-to-b from-[#B89AFF] via-[#7F4FEF] to-[#291558]",
    pointers: [
      { icon: brainyIcon, text: "Fights Against: Habit Hacker’s endless Screen Spell that traps kids in scrolling and steals time they could use for learning and fun." },
      { icon: brainyIcon, text: "Mission: Read, learn, and play in the real world, build sharp focus without getting lost behind screens." },
      { icon: brainyIcon, text: "Fun Fact: She can finish a whole book just by flipping the pages." }
    ]
  },
  {
    image: gobbler,
    referenaceImage: greenGobblerBig,
    title: greenGobblerName,
    heading: "Power-packed with veggies, fueling strength for every challenge.",
    backgroundClass: "bg-gradient-to-b from-[#81D69F] via-[#489864] to-[#19542E]",
    pointers: [
      { icon: gobblerIcon, text: "Fights Against: Junk food temptations, sugar overload, and Habit Hacker’s sneaky plans that weaken kids and take away their real strength. " },
      { icon: gobblerIcon, text: "Mission: Add at least one veggie to every meal and enjoy fresh fruits daily for true superhero energy." },
      { icon: gobblerIcon, text: "Fun Fact: He eats spinach instead of junk food, that’s why he’s so strong!" }
    ]
  },
  {
    image: flashingfloss,
    referenaceImage: flashingflosbig,
    title: flashingFlossName,
    heading: "Fearless protector of smiles, guarding teeth with shining strength.",
    backgroundClass: "bg-gradient-to-b from-[#B8FBE4] via-[#66B298] to-[#3D9678]",
    pointers: [
      { icon: flossIcon, text: "Fights Against: Cavities, gum problems, and Habit Hacker’s cavity monsters who sneak in when kids forget to brush and floss properly." },
      { icon: flossIcon, text: "Mission: Brush twice a day, floss daily, and keep your smile shining bright with superhero confidence." },
      { icon: flossIcon, text: "Fun Fact: Her teeth shine so bright, they once blinded Habit Hacker." }
    ]
  },
  {
    image: hydroHero,
    referenaceImage: hydraHeroBig,
    title: hydraHeroName,
    heading: "Fighting dehydration, bringing refreshing energy to the town.",
    backgroundClass: "bg-gradient-to-b from-[#60B1F9] via-[#306FA6] to-[#184C7B]",
    pointers: [
      { icon: hydralcon, text: "Fights Against: Battles dehydration, tiredness, and Habit Hacker’s sugary drink tricks that weaken kids and stop them from building real strength." },
      { icon: hydralcon, text: "Mission: Every child should aim to drink at least 8 glasses of fresh, healthy water every single day." },
      { icon: hydralcon, text: "Fun Fact: She was just a normal kid until water made her a superhero." }
    ]
  },
  {
    image: germZapper,
    referenaceImage: germZapperBig,
    title: germZapperName,
    heading: "Destroying germs daily, keeping health safe and strong.",
    backgroundClass: "bg-gradient-to-b from-[#E98351] via-[#E47D4C] to-[#B8440C]",
    pointers: [
      { icon: germIcon, text: "Fights Against: Habit Hacker’s germ trap, dirty hands, and invisible germs that spread sickness and try to weaken every young hero’s health." },
      { icon: germIcon, text: "Mission: Wash hands before and after meals and keep up simple hygiene habits to stay healthy and strong." },
      { icon: germIcon, text: "Fun Fact: He can see and defeat the germs that can’t be seen with the eyes. " }
    ]
  },
  {
    image: mightSmall,
    referenaceImage: mightyBig,
    title: mighty_name,
    heading: "The strongest superhero with the coolest physical exercises",
    backgroundClass: "bg-gradient-to-b from-[#FFD0D0] via-[#F77E7C] to-[#CB3E42]",
    pointers: [
      { icon: mightyManIcon, text: "Fights Against: Laziness, slouching, and Habit Hacker’s lazy trap that wants kids to sit still all day and have no movement." },
      { icon: mightyManIcon, text: "Mission: Jump, run, dance, or play a sport — just move your body with energy every single day." },
      { icon: mightyManIcon, text: "Fun Fact: He’s so strong he once lifted a mountain." }
    ]
  }
];

const RollingGallery = ({
  autoplay = false,
  pauseOnHover = false,
  images = [],
  onImageClick,
}) => {
  images = images.length > 0 ? images : IMGS;

  const [isScreenSizeSm, setIsScreenSizeSm] = useState(
    window.innerWidth <= 640
  );
  useEffect(() => {
    const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
  const faceCount = images.length;
  const faceWidth = (cylinderWidth / faceCount) * 1.5;
  const radius = cylinderWidth / (2 * Math.PI);

  const dragFactor = 0.05;
  const rotation = useMotionValue(0);
  const controls = useAnimation();
  const borderControls = useAnimation();

  const transform = useTransform(
    rotation,
    (val) => `rotate3d(0,1,0,${val}deg)`
  );

  const startInfiniteSpin = (startAngle) => {
    controls.start({
      rotateY: [startAngle, startAngle - 360],
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  // Animate the border gradient
  useEffect(() => {
    borderControls.start({
      backgroundPosition: ["0% 0%", "100% 100%"],
      transition: {
        duration: 3,
        ease: "linear",
        repeat: Infinity,
        repeatType: "reverse"
      }
    });
  }, [borderControls]);

  useEffect(() => {
    if (autoplay) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    } else {
      controls.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay]);

  const handleUpdate = (latest) => {
    if (typeof latest.rotateY === "number") {
      rotation.set(latest.rotateY);
    }
  };

  const handleDrag = (_, info) => {
    controls.stop();
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_, info) => {
    const finalAngle = rotation.get() + info.velocity.x * dragFactor;
    rotation.set(finalAngle);

    if (autoplay) {
      startInfiniteSpin(finalAngle);
    }
  };

  const handleMouseEnter = () => {
    if (autoplay && pauseOnHover) {
      controls.stop();
    }
  };
  const handleMouseLeave = () => {
    if (autoplay && pauseOnHover) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    }
  };

  return (
    <div className="relative h-[230px] w-full overflow-hidden">
      <div className="flex h-full items-center justify-center [perspective:1000px] [transform-style:preserve-3d]">
        <motion.div
          drag="x"
          dragElastic={0}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          animate={controls}
          onUpdate={handleUpdate}
          style={{
            transform: transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          className="flex min-h-[200px] cursor-grab items-center justify-center [transform-style:preserve-3d]"
        >
          {images.map((hero, i) => (
            <div
              key={i}
              className="group absolute flex h-fit items-center justify-center p-[8%] [backface-visibility:hidden] md:p-[6%]"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${(360 / faceCount) * i}deg) translateZ(${radius}px)`,
              }}
              onClick={() => onImageClick?.(hero)}
            >
              <motion.div
                animate={borderControls}
                className="relative flex items-center justify-center p-[3px] rounded-[16px]"
                // style={{
                //   background: "linear-gradient(45deg, #ff6b6b, #ffa500, #ffff00, #00ff00, #00ffff, #0000ff, #8a2be2, #ff00ff, #ff6b6b)",
                //   backgroundSize: "400% 400%",
                // }}
              >
                <div
                  className="relative flex items-center justify-center overflow-hidden 
                            rounded-[15px] 
                            w-[220px] h-[140px] md:w-[300px] md:h-[180px]"
                >
                  <img
                    src={hero.image}
                    alt="gallery"
                    loading="lazy"
                    decoding="async"
                    className="block max-w-full max-h-full object-contain 
                            transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RollingGallery;