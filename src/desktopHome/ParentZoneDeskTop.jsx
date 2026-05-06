// import React, { useEffect } from 'react'
// import bgParentZone from "../assets/desktopViewImages/parentZoneDesktop/bgParentZoneD.svg"
// import heading from "../assets/desktopViewImages/parentZoneDesktop/heading.svg"
// import safetyButton from "../assets/desktopViewImages/parentZoneDesktop/safetyButton.svg"
// import trackHabiitButton from "../assets/desktopViewImages/parentZoneDesktop/trackHabitButton.svg";
// import one from "../assets/desktopViewImages/parentZoneDesktop/one.png";
// import two from "../assets/desktopViewImages/parentZoneDesktop/two.png";
// import three from "../assets/desktopViewImages/parentZoneDesktop/three.png";
// import { motion } from "framer-motion"
// import AOS from "aos"
// import "aos/dist/aos.css"

// export default function ParentZoneDeskTop() {
//   useEffect(() => {
//     AOS.init({ duration: 1000, once: true });
//   }, []);

//   return (
//     <section
//       aria-labelledby="parents-zone-heading"
//       className="bg-no-repeat bg-center bg-cover px-5 font-gtwalsheim"
//       style={{ backgroundImage: `url(${bgParentZone})` }}
//     >
//       <div className="max-w-7xl mx-auto pb-16">
//         {/* Heading ribbon */}
//         <div className="flex justify-center">
//           <motion.img
//             src={heading}
//             alt="Parent's Zone"
//             className="select-none pointer-events-none"
//             initial={{ opacity: 0, y: -40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           />
//         </div>

//         {/* Two-column cards */}
//         <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 mt-10 items-stretch">
//           {/* LEFT CARD: How are habits tracked? */}
//           <motion.div
//             className="relative h-full"
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//             data-aos="fade-right"
//           >
//             <div className="absolute -top-9 left-1/2 -translate-x-1/2">
//               <motion.img
//                 src={trackHabiitButton}
//                 alt="How are habits tracked?"
//                 className="w-[500px] max-w-none h-auto select-none"
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 whileInView={{ scale: 1, opacity: 1 }}
//                 transition={{ type: "spring", stiffness: 120, damping: 12 }}
//                 viewport={{ once: true }}
//               />
//             </div>

//             <div className="rounded-xl border-[5px] border-[#6c5dd3] bg-[#3f2d82] p-8 md:p-12 flex flex-col gap-8 shadow-2xl h-full">
//               <div>
//                 <p className="text-white text-lg lg:text-[24px] leading-normal">
//                   Everyday missions turn into superpowers when kids track them in their journal.
//                 </p>
//                 <p className="text-white text-lg lg:text-[24px] leading-normal mt-6">
//                   Each completed task = points, progress, and power-ups!
//                 </p>
//               </div>

//               <div className="flex flex-col gap-6 text-lg lg:text-[24px] font-bold">
//                 {/* Step 1 */}
//                 <div className="flex items-center gap-4">
//                   <div className="w-10 h-10 rounded-full bg-[#5D54C3] flex items-center justify-center shrink-0">
//                     <img src={one} alt="Step 1" className="w-6 h-6 object-contain" />
//                   </div>
//                   <p className="text-white font-semibold"> Kids log their daily missions. </p>
//                 </div>

//                 {/* Step 2 */}
//                 <div className="flex items-center gap-4">
//                   <div className="w-10 h-10 rounded-full bg-[#5D54C3] flex items-center justify-center shrink-0">
//                     <img src={two} alt="Step 2" className="w-6 h-6 object-contain" />
//                   </div>
//                   <p className="text-white font-semibold">Parents get updates to see how their little hero is doing.
//                   </p>
//                 </div>

//                 {/* Step 3 */}
//                 <div className="flex items-center gap-4">
//                   <div className="w-10 h-10 rounded-full bg-[#5D54C3] flex items-center justify-center shrink-0">
//                     <img src={three} alt="Step 3" className="w-6 h-6 object-contain" />
//                   </div>
//                   <p className="text-white font-semibold">Consistency is rewarded with prizes worth 5,000 Dirhams.</p>
//                 </div>
//               </div>
//             </div>

//           </motion.div>

//           {/* RIGHT CARD: Safety & Privacy First */}
//           <motion.div
//             className="relative h-full"
//             initial={{ opacity: 0, x: 50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             viewport={{ once: true }}
//             data-aos="fade-left"
//           >
//             <div className="absolute -top-9 left-1/2 -translate-x-1/2">
//               <motion.img
//                 src={safetyButton}
//                 alt="Safety & Privacy"
//                 className="w-[500px] max-w-none h-auto select-none"
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 whileInView={{ scale: 1, opacity: 1 }}
//                 transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.3 }}
//                 viewport={{ once: true }}
//               />
//             </div>

//             <div className="rounded-xl border-[5px] border-[#6c5dd3] bg-[#3f2d82] px-12 pt-8 pb-12 flex flex-col gap-8 shadow-2xl h-full">
//               <div className="bg-[#5a46a5] rounded-md p-5 text-white w-[450px] mx-auto text-[23px] ">
//                 <p>Your child’s safety is our top priority. Here’s how we keep things safe:</p>
//               </div>

//               <ul className="mt-6 space-y-6 text-white list-disc pl-6 text-[18px] lg:text-[24px]">
//                 <li><span className="font-semibold">No personal data</span> is shared with third parties.</li>
//                 <li><span className="font-semibold">Parent email consent</span> is required to participate.</li>
//                 <li>All content is <span className="font-semibold">child-friendly and secure</span>.</li>
//                 <li>Data is stored with <span className="font-semibold">industry-standard encryption</span>.</li>
//                 <li>You can <span className="font-semibold">request deletion</span> of data anytime.</li>
//               </ul>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   )
// }



import React, { useEffect, useState } from 'react'
import bgParentZone from "../assets/desktopViewImages/parentZoneDesktop/bgParentZoneD.svg"
import heading from "../assets/desktopViewImages/parentZoneDesktop/heading.svg"
import dropDown from "../assets/FormImages/dropDown.svg";
import safetyButton from "../assets/desktopViewImages/parentZoneDesktop/safetyButton.svg"
import trackHabiitButton from "../assets/desktopViewImages/parentZoneDesktop/trackHabitButton.svg";
import one from "../assets/desktopViewImages/parentZoneDesktop/one.png";
import two from "../assets/desktopViewImages/parentZoneDesktop/two.png";
import three from "../assets/desktopViewImages/parentZoneDesktop/three.png";
import currencyImg from "../assets/currency-image.png"; 
import { motion, AnimatePresence } from "framer-motion"
import AOS from "aos"
import "aos/dist/aos.css"
 
export default function ParentZoneDeskTop() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
 
  const [open, setOpen] = useState(false);
 
  return (
    <section
      aria-labelledby="parents-zone-heading"
      className="bg-no-repeat bg-center bg-cover px-5 font-gtwalsheim"
      style={{ backgroundImage: `url(${bgParentZone})` }}
    >
      <div className="max-w-7xl mx-auto pb-16 ">
        {/* Heading ribbon with dropdown icon over the image */}
        <div className="flex justify-center relative">
          <motion.div
            className="relative flex items-center cursor-pointer"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            onClick={() => setOpen((prev) => !prev)}
            style={{ display: "inline-block" }}
          >
            <img
              src={heading}
              alt="Parent's Zone"
              className="select-none pointer-events-none"
              style={{ display: "block" }}
            />
            {/* Dropdown icon absolutely positioned over the right side of heading image */}
            <img
              src={dropDown}
              alt="Dropdown"
              className={`w-8 h-8 transition-transform duration-300 absolute`}
              style={{
                right: "24px",
                top: "39%",
                transform: `translateY(-50%) ${open ? "rotate(180deg)" : "rotate(0deg)"}`,
                zIndex: 2,
                cursor: "pointer"
              }}
            />
          </motion.div>
        </div>
 
        {/* Smooth dropdown content */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden mt-10"
            >
              {/* Two-column cards */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-stretch pt-20">
                {/* LEFT CARD: How are habits tracked? */}
                <motion.div
                  className="relative h-full"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  
                >
                  <div className="absolute -top-9 left-1/2 -translate-x-1/2">
                    <motion.img
                      src={trackHabiitButton}
                      alt="How are habits tracked?"
                      className="w-[500px] max-w-none h-auto select-none"
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 120, damping: 12 }}
                      viewport={{ once: true }}
                    />
                  </div>
 
                  <div className="rounded-xl border-[5px] border-[#6c5dd3] bg-[#3f2d82] p-8 md:p-12 flex flex-col gap-8 shadow-2xl h-full">
                    <div>
                      <p className="text-white text-lg lg:text-[24px] leading-normal">
                        Everyday missions turn into superpowers when kids track them in their journal.
                      </p>
                      <p className="text-white text-lg lg:text-[24px] leading-normal mt-6">
                        Each completed task = points, progress, and power-ups!
                      </p>
                    </div>
 
                    <div className="flex flex-col gap-6 text-lg lg:text-[24px] font-bold">
                      {/* Step 1 */}
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#5D54C3] flex items-center justify-center shrink-0">
                          <img src={one} alt="Step 1" className="w-6 h-6 object-contain" />
                        </div>
                        <p className="text-white font-semibold"> Kids log their daily missions. </p>
                      </div>
 
                      {/* Step 2 */}
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#5D54C3] flex items-center justify-center shrink-0">
                          <img src={two} alt="Step 2" className="w-6 h-6 object-contain" />
                        </div>
                        <p className="text-white font-semibold">Parents get updates to see how their little hero is doing.
                        </p>
                      </div>
 
                      {/* Step 3 */}
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#5D54C3] flex items-center justify-center shrink-0">
                          <img src={three} alt="Step 3" className="w-6 h-6 object-contain" />
                        </div>
                        <p className="text-white font-semibold">Consistency is rewarded with prizes worth a total of <img
                                      src={currencyImg}
                                      alt="Currency"
                                      className="inline-block w-[14px] h-[14px] mx-1 mb-1"
                                    />
                                    5,000. </p>
                      </div>
                       <div className="hidden md:block mt-4 text-white font-semibold">
    <h3 className="text-white text-center text-[20px] lg:text-[24px] font-bold uppercase tracking-wide mb-4">
      Exciting Rewards Await!
    </h3>

    <div className="space-y-3 text-[18px] lg:text-[20px] leading-snug">
      <p className="flex items-center gap-3">
  <span role="img" className="text-[22px] lg:text-[24px]">🥇</span>
  <span>iPad for the <strong>Top Winner</strong></span>
</p>
      <p className="flex items-center gap-3">
        <span role="img" aria-label="silver-medal" className="text-[22px] lg:text-[24px]">🥈</span>
        <span>Smartwatch for the <strong>2nd Winner</strong></span>
      </p>
      <p className="flex items-center gap-3">
        <span role="img" aria-label="bronze-medal" className="text-[22px] lg:text-[24px]">🥉</span>
        <span>Surprise Gifts for <strong>5 Lucky Stars!</strong></span>
      </p>
    </div>
  </div>
                    </div>
                  </div>
                </motion.div>
 
                {/* RIGHT CARD: Safety & Privacy First */}
                <motion.div
                  className="relative h-full"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  
                >
                  <div className="absolute -top-9 left-1/2 -translate-x-1/2">
                    <motion.img
                      src={safetyButton}
                      alt="Safety & Privacy"
                      className="w-[500px] max-w-none h-auto select-none"
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.3 }}
                      viewport={{ once: true }}
                    />
                  </div>
 
                  <div className="rounded-xl border-[5px] border-[#6c5dd3] bg-[#3f2d82] px-12 pt-8 pb-12 flex flex-col gap-8 shadow-2xl h-full">
                    <div className="bg-[#5a46a5] rounded-md p-5 text-white w-[450px] mx-auto text-[23px] ">
                      <p>Your child’s safety is our top priority. Here’s how we keep things safe:</p>
                    </div>
 
                    <ul className="mt-6 space-y-6 text-white list-disc pl-6 text-[18px] lg:text-[24px]">
                      <li><span className="font-semibold">No personal data</span> is shared with third parties.</li>
                      <li><span className="font-semibold">Parent email consent</span> is required to participate.</li>
                      <li>All content is <span className="font-semibold">child-friendly and secure</span>.</li>
                      <li>Data is stored with <span className="font-semibold">industry-standard encryption</span>.</li>
                      <li>You can <span className="font-semibold">request deletion</span> of data anytime.</li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}