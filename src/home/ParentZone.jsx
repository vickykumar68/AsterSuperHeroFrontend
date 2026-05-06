// import React from 'react';
// import bgDecorateLeft from "../assets/parentzone/bgDecorateLeft.svg";
// import bgDecorateRight from "../assets/parentzone/bgDecorateRight.svg";
// import buttonHabbitTrack from "../assets/parentzone/buttonHabbitTrack.svg";
// import buttonSafety from "../assets/parentzone/buttonSafety.svg";
// import heading from "../assets/parentzone/heading.svg";
// import one from "../assets/parentzone/one.svg";
// import two from "../assets/parentzone/two.svg";
// import three from "../assets/parentzone/three.svg";
// import bgParentZone from "../assets/parentzone/bg_parentZone.svg";

// const Bullet = ({ icon, children }) => (
//   <div className="flex items-center gap-2">
//     <img src={icon} alt="" className=" shrink-0 mt-0.5" />
//     <p className="text-white/95 text-[13px] font-bold leading-5">{children}</p>
//   </div>
// );

// function ParentZone() {
//   return (
//     <div
//       className="relative w-full pb-10 overflow-hidden bg-[#D7FFCC] bg-center bg-cover"
//       style={{
//         backgroundImage: `url(${bgParentZone})`
//       }}
//     >
//       {/* Background decorations */}
//       <img
//         src={bgDecorateLeft}
//         alt=""
//         className="absolute left-0 bottom-0  z-0"
//       />
//       <img
//         src={bgDecorateRight}
//         alt=""
//         className="absolute right-0 top-6 z-0"
//       />
//       <img src={heading} alt="Parent's Zone" className="w-full relative z-10" />
//       {/* Main panel */}
//       <div className="relative z-20 mx-4 mt-8 rounded-2xl border-[3px] border-[#5D49A8] bg-[#3C2A86] px-4 pb-5 pt-6 shadow-[0_10px_0_0_#2B1E69]">
//         <img
//           src={buttonHabbitTrack}
//           alt="How are habits tracked?"
//           className="absolute -top-5 left-1/2 w-[308px] -translate-x-1/2"
//         />
//         {/* Card 1: How are habits tracked */}
//         <div className="relative">
//           <div className="mt-5 rounded-xl  p-4">
//             <p className="text-white/90 text-[13px] leading-5 font-gtwalsheim">
//               Everyday missions turn into superpowers when kids track them in their journal.
//             </p>
//             <p className="mt-3 text-white/90 text-[13px] leading-5 font-gtwalsheim">
//               Each completed task = points, progress, and power-ups! 
//             </p>

//             <div className="mt-4 space-y-3 font-gtwalsheim">
//               <Bullet icon={one}>
//                 Kids log their daily missions
//               </Bullet>
//               <Bullet icon={two}>
//                  Parents get updates to see how their little hero is doing
//               </Bullet>
//               <Bullet icon={three}>
//                 Consistency is rewarded with prizes worth 5,000 Dirhams
//               </Bullet>
//             </div>
//           </div>
//         </div>

//         {/* Card 2: Safety & Privacy */}
//         <div className="relative mt-5">
//           <img
//             src={buttonSafety}
//             alt="Safety & Privacy First"
//             className="mx-auto w-[324px]"
//           />
//           <div className="w-fit max-w-xs mx-auto">
//             <p className="text-white text-[13px] bg-[#5249B4] leading-5 px-4 py-3 text-center rounded-b-lg font-gtwalsheim">
//               Your child’s safety is our top priority. <br /> Here’s how we keep
//               things safe:
//             </p>
//           </div>
//           <div className="mt-3 rounded-xl p-4">
//             <ul className="mt-3 list-disc pl-4 space-y-3">
//               <li className="text-white/95 text-[13px] leading-5 font-gtwalsheim">
//                 <span className='font-bold'>No personal data</span> is shared with third parties.
//               </li>
//               <li className="text-white/95 text-[13px] leading-5 font-gtwalsheim">
//                 Parent email consent is <span className='font-bold'>required</span> to participate.
//               </li>
//               <li className="text-white/95 text-[13px] leading-5 font-gtwalsheim">
//                 All content is <span className='font-bold'> child-friendly and secure.</span>
//               </li>
//               <li className="text-white/95 text-[13px] leading-5 font-gtwalsheim">
//                 Data is stored with <span className='font-bold'>industry-standard encryption.</span>
//               </li>
//               <li className="text-white/95 text-[13px] leading-5 font-gtwalsheim">
//                 You can <span className='font-bold'>request deletion</span> of data anytime.
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//       <div className="h-6" />
//     </div>
//   );
// }

// export default ParentZone;


import React, { useState } from 'react';
import bgDecorateLeft from "../assets/parentzone/bgDecorateLeft.svg";
import bgDecorateRight from "../assets/parentzone/bgDecorateRight.svg";
import buttonHabbitTrack from "../assets/parentzone/buttonHabbitTrack.svg";
import buttonSafety from "../assets/parentzone/buttonSafety.svg";
import heading from "../assets/parentzone/heading.svg";
import dropDown from "../assets/FormImages/dropDown.svg";
import one from "../assets/parentzone/one.svg";
import two from "../assets/parentzone/two.svg";
import three from "../assets/parentzone/three.svg";
import bgParentZone from "../assets/parentzone/bg_parentZone.svg";
import currencyImg from "../assets/currency-image.png"; 
import { motion, AnimatePresence } from "framer-motion";
 
const Bullet = ({ icon, children }) => (
  <div className="flex items-center gap-2">
    <img src={icon} alt="" className=" shrink-0 mt-0.5" />
    <p className="text-white/95 text-[13px] font-bold leading-5">{children}</p>
  </div>
);
 
function ParentZone() {
  const [open, setOpen] = useState(false);
 
  return (
    <div
      className="relative w-full pb-10 overflow-hidden bg-[#D7FFCC] bg-center bg-cover"
      style={{
        backgroundImage: `url(${bgParentZone})`
      }}
    >
      {/* Background decorations */}
      <img
        src={bgDecorateLeft}
        alt=""
        className="absolute left-0 bottom-0  z-0"
      />
      <img
        src={bgDecorateRight}
        alt=""
        className="absolute right-0 top-6 z-0"
      />
 
      {/* Heading with dropdown icon over it */}
      <div className="relative flex justify-center items-center cursor-pointer mt-0 mb-2"
        onClick={() => setOpen((prev) => !prev)}
      >
        <img src={heading} alt="Parent's Zone" className="w-full relative z-10" />
        <img
          src={dropDown}
          alt="Dropdown"
          className={`w-5 h-5 transition-transform duration-300 absolute`}
          style={{
            right: "10%",
            top: "36%",
            transform: `translateY(-50%) ${open ? "rotate(180deg)" : "rotate(0deg)"}`,
            zIndex: 20,
            cursor: "pointer"
          }}
        />
      </div>
 
      {/* Smooth dropdown content */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {/* Main panel */}
            <div className="relative z-20 mx-4 mt-5 rounded-2xl border-[3px] border-[#5D49A8] bg-[#3C2A86] px-4 pb-5 pt-6 shadow-[0_10px_0_0_#2B1E69]">
              <img
                src={buttonHabbitTrack}
                alt="How are habits tracked?"
                className="absolute -top-5 left-1/2 w-[308px] -translate-x-1/2"
              />
              {/* Card 1: How are habits tracked */}
              {/* <div className="relative">
                <div className="mt-5 rounded-xl  p-4">
                  <p className="text-white/90 text-[13px] leading-5 font-gtwalsheim">
                    Everyday missions turn into superpowers when kids track them in their journal.
                  </p>
                  <p className="mt-3 text-white/90 text-[13px] leading-5 font-gtwalsheim">
                    Each completed task = points, progress, and power-ups!
                  </p>
 
                  <div className="mt-4 space-y-3 font-gtwalsheim">
                    <Bullet icon={one}>
                      Kids log their daily missions
                    </Bullet>
                    <Bullet icon={two}>
                      Parents get updates to see how their little hero is doing
                    </Bullet>
                    <Bullet icon={three}>
                      Consistency is rewarded with prizes worth a total of 
                     <img
                                                            src={currencyImg}
                                                            alt="Currency"
                                                            className="inline-block w-[12px] h-[12px] mx-1"
                                                          />  5,000.
                    </Bullet>
                  </div>
                  
                </div>
              </div> */}

              <div className="relative">
  <div className="mt-5 rounded-xl p-4">
    <p className="text-white/90 text-[13px] leading-5 font-gtwalsheim">
      Everyday missions turn into superpowers when kids track them in their journal.
    </p>
    <p className="mt-3 text-white/90 text-[13px] leading-5 font-gtwalsheim">
      Each completed task = points, progress, and power-ups!
    </p>

    <div className="mt-4 space-y-3 font-gtwalsheim">
      <Bullet icon={one}>
        Kids log their daily missions
      </Bullet>
      <Bullet icon={two}>
        Parents get updates to see how their little hero is doing
      </Bullet>
      <Bullet icon={three}>
        Consistency is rewarded with prizes worth a total of
        <img
          src={currencyImg}
          alt="Currency"
          className="inline-block w-[12px] h-[12px] mx-1"
        />
        5,000.
      </Bullet>
    </div>

    {/* --- Rewards List --- */}
    <div className="mt-6 font-gtwalsheim">
      <h3 className="text-white text-[16px] text-center font-semibold uppercase tracking-wide mb-3">
        Exciting Rewards Await!
      </h3>

      <div className="space-y-2 text-white text-[15px] leading-[20px]">
        <p className="flex items-center gap-2">
          <span role="img" aria-label="gold-medal" className="text-[22px]">🥇</span>
          <span>iPad for the <strong>Top Winner</strong></span>
        </p>
        <p className="flex items-center gap-2">
          <span role="img" aria-label="silver-medal" className="text-[22px]">🥈</span>
          <span>Smartwatch for the <strong>2nd Winner</strong></span>
        </p>
        <p className="flex items-center gap-2">
          <span role="img" aria-label="bronze-medal" className="text-[22px]">🥉</span>
          <span>Surprise Gifts for <strong>5 Lucky Stars!</strong></span>
        </p>
      </div>
    </div>
  </div>
</div>

 
              {/* Card 2: Safety & Privacy */}
              <div className="relative mt-5">
                <img
                  src={buttonSafety}
                  alt="Safety & Privacy First"
                  className="mx-auto w-[324px]"
                />
                <div className="w-fit max-w-xs mx-auto">
                  <p className="text-white text-[13px] bg-[#5249B4] leading-5 px-4 py-3 text-center rounded-b-lg font-gtwalsheim">
                    Your child’s safety is our top priority. <br /> Here’s how we keep
                    things safe:
                  </p>
                </div>
                <div className="mt-3 rounded-xl p-4">
                  <ul className="mt-3 list-disc pl-4 space-y-3">
                    <li className="text-white/95 text-[13px] leading-5 font-gtwalsheim">
                      <span className='font-bold'>No personal data</span> is shared with third parties.
                    </li>
                    <li className="text-white/95 text-[13px] leading-5 font-gtwalsheim">
                      Parent email consent is <span className='font-bold'>required</span> to participate.
                    </li>
                    <li className="text-white/95 text-[13px] leading-5 font-gtwalsheim">
                      All content is <span className='font-bold'> child-friendly and secure.</span>
                    </li>
                    <li className="text-white/95 text-[13px] leading-5 font-gtwalsheim">
                      Data is stored with <span className='font-bold'>industry-standard encryption.</span>
                    </li>
                    <li className="text-white/95 text-[13px] leading-5 font-gtwalsheim">
                      You can <span className='font-bold'>request deletion</span> of data anytime.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="h-6" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
 
export default ParentZone;