// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { TiPlus, TiMinus } from "react-icons/ti";
// import qLeft from "../assets/faqAssets/qLeft.svg";
// import qRight from "../assets/faqAssets/qRight.svg";
// import bg from "../assets/desktopViewImages/faqDesktpop/faqBGDesktop.svg";
// import heading from "../assets/desktopViewImages/faqDesktpop/heading.svg";
// import dropDown from "../assets/FormImages/dropDown.svg";

// const faqData = [
//   {
//     id: 1,
//     question: "Is This Program Free To Join?",
//     answer: "Yes! Joining the Superpower Squad is completely free.",
//   },
//   {
//     id: 2,
//     question: "What Age Group Is This Suitable For? ",
//     answer:
//       "The program is designed for kids aged 5–12 years; the perfect age to build super habits and have fun with heroes.",
//   },
//   {
//     id: 3,
//     question: "How Long Does The Campaign Last? ",
//     answer:
//       "The campaign runs for 1 month. Kids can join anytime and start completing daily missions to climb the leaderboard. ",
//   },
//   {
//     id: 4,
//     question: "Can I Track for More Than One Child? ",
//     answer:
//       "Yes, parents can track progress for multiple children but with different accounts. Each child gets their own hero journal and missions. ",
//   },
// ];

// function FaqDesktop() {
//   const [expandedId, setExpandedId] = useState(2);

//   const toggleExpanded = (id) => {
//     setExpandedId(expandedId === id ? null : id);
//   };

//   return (
//     <>
//       {/* ---------------- DESKTOP VIEW ---------------- */}
//       <div
//         className="relative overflow-hidden bg-cover bg-center z-0 h-[545px] hidden lg:block"
//         style={{
//           backgroundImage: `url(${bg})`,
//         }}
//       >
//         {/* Decorative assets */}
//         <img
//           src={qLeft}
//           alt=""
//           className="absolute bottom-24 left-40 xl:left-64 w-[60px] lg:w-[80px]"
//         />
//         <img
//           src={qRight}
//           alt=""
//           className="absolute top-3 xl:top-24 left-[200px] xl:left-[450px] w-[90px] lg:w-[120px]"
//         />

//         <div className="max-w-7xl mx-auto px-2 py-16 relative z-10">
//            <div className="flex justify-center relative">
//                     <motion.div
//                       className="relative flex items-center cursor-pointer"
//                       initial={{ opacity: 0, y: -40 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.8 }}
//                       onClick={() => setOpen((prev) => !prev)}
//                       style={{ display: "inline-block" }}
//                     >
//                       <img
//                         src={heading}
//                         alt="Parent's Zone"
//                         className="select-none pointer-events-none"
//                         style={{ display: "block" }}
//                       />
//                       {/* Dropdown icon absolutely positioned over the right side of heading image */}
//                       <img
//                         src={dropDown}
//                         alt="Dropdown"
//                         className={`w-8 h-8 transition-transform duration-300 absolute`}
//                         style={{
//                           right: "24px",
//                           top: "39%",
//                           transform: `translateY(-50%) ${open ? "rotate(180deg)" : "rotate(0deg)"}`,
//                           zIndex: 2,
//                           cursor: "pointer"
//                         }}
//                       />
//                     </motion.div>
//                   </div>
           
//           <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//             {/* LEFT COLUMN - Title */}
            

//             {/* RIGHT COLUMN - Accordion */}
//             <div className="absolute right-0 top-0 md:top-10 w-full md:w-[700px] z-20 px-2">
//               <div className="space-y-5">
//                 {faqData.map((faq, index) => (
//                   <motion.div
//                     key={faq.id}
//                     initial={{ opacity: 0, x: -50 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.5, delay: index * 0.1 }}
//                     className="overflow-hidden px-5"
//                   >
//                     <motion.button
//                       onClick={() => toggleExpanded(faq.id)}
//                       className="w-full bg-[#FFA24F] rounded-full px-6 py-3 flex items-center justify-between shadow-lg border-t-2 border-[#85460E] border-b border-b-white "
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       transition={{ type: "spring", stiffness: 300, damping: 20 }}
//                     >
//                       <span className="text-white text-[18px] font-black lg:text-[20px] text-left [-webkit-text-stroke:0.7px_black] tracking-tighter">
//                         {faq.question}
//                       </span>
//                       <motion.div
//                         animate={{ rotate: expandedId === faq.id ? 180 : 0 }}
//                         transition={{ duration: 0.3 }}
//                         className="flex-shrink-0 ml-4"
//                       >
//                         {expandedId === faq.id ? (
//                           <TiMinus className="w-6 h-6 text-white drop-shadow-lg" />
//                         ) : (
//                           <TiPlus className="w-6 h-6 text-white drop-shadow-lg" />
//                         )}
//                       </motion.div>
//                     </motion.button>

//                     <AnimatePresence>
//                       {expandedId === faq.id && (
//                         <motion.div
//                           initial={{ opacity: 0, height: 0, marginTop: 0 }}
//                           animate={{ opacity: 1, height: "auto", marginTop: 16 }}
//                           exit={{ opacity: 0, height: 0, marginTop: 0 }}
//                           transition={{
//                             duration: 0.4,
//                             ease: "easeInOut",
//                           }}
//                           className="overflow-hidden"
//                         >
//                           <div className="bg-[#FFC088] rounded-xl p-6 shadow-lg border-t-2 border-slate-700 border-b border-b-white">
//                             <p className="text-[#85460E] text-[16px] leading-relaxed font-medium">
//                               {faq.answer}
//                             </p>
//                           </div>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ---------------- TAB VIEW ---------------- */}
//       <div
//         className="relative overflow-hidden bg-cover bg-center z-0 block lg:hidden"
//         style={{
//           backgroundImage: `url(${bg})`,
//         }}
//       >
//         <div className="max-w-4xl mx-auto px-4 py-12 relative z-10 flex flex-col items-center space-y-10">
//           {/* Title with decorative images */}
//           <div className="relative flex flex-col items-center space-y-6">
//             <img src={qLeft} alt="" className="w-[60px]" />
//             {/* <motion.h1
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="text-[26px] md:text-[30px] font-black text-white leading-tight text-center font-goldman tracking-tighter [-webkit-text-stroke:1.1px_black]"
//             >
//               FREQUENTLY <br /> ASKED <br /> QUESTIONS
//             </motion.h1> */}
//             <motion.div
//                         className="relative flex items-center cursor-pointer"
//                         initial={{ opacity: 0, y: -40 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.8 }}
//                         onClick={() => setOpen((prev) => !prev)}
//                         style={{ display: "inline-block" }}
//                       >
//                         <img
//                           src={heading}
//                           alt="Parent's Zone"
//                           className="select-none pointer-events-none"
//                           style={{ display: "block" }}
//                         />
//                         {/* Dropdown icon absolutely positioned over the right side of heading image */}
//                         <img
//                           src={dropDown}
//                           alt="Dropdown"
//                           className={`w-8 h-8 transition-transform duration-300 absolute`}
//                           style={{
//                             right: "24px",
//                             top: "39%",
//                             transform: `translateY(-50%) ${open ? "rotate(180deg)" : "rotate(0deg)"}`,
//                             zIndex: 2,
//                             cursor: "pointer"
//                           }}
//                         />
//                       </motion.div>
//             <img src={qRight} alt="" className="w-[80px]" />
//           </div>

//           {/* Accordion below */}
//           <div className="w-full space-y-5">
//             {faqData.map((faq, index) => (
//               <motion.div
//                 key={faq.id}
//                 initial={{ opacity: 0, x: -50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 className="overflow-hidden"
//               >
//                 <motion.button
//                   onClick={() => toggleExpanded(faq.id)}
//                   className="w-full bg-[#FFA24F] rounded-full px-6 py-3 flex items-center justify-between shadow-lg border-t-2 border-[#85460E] border-b border-b-white "
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   transition={{ type: "spring", stiffness: 300, damping: 20 }}
//                 >
//                   <span className="text-white text-[18px] font-black md:text-[20px] text-left [-webkit-text-stroke:0.7px_black] tracking-tighter">
//                     {faq.question}
//                   </span>
//                   <motion.div
//                     animate={{ rotate: expandedId === faq.id ? 180 : 0 }}
//                     transition={{ duration: 0.3 }}
//                     className="flex-shrink-0 ml-4"
//                   >
//                     {expandedId === faq.id ? (
//                       <TiMinus className="w-6 h-6 text-white drop-shadow-lg" />
//                     ) : (
//                       <TiPlus className="w-6 h-6 text-white drop-shadow-lg" />
//                     )}
//                   </motion.div>
//                 </motion.button>

//                 <AnimatePresence>
//                   {expandedId === faq.id && (
//                     <motion.div
//                       initial={{ opacity: 0, height: 0, marginTop: 0 }}
//                       animate={{ opacity: 1, height: "auto", marginTop: 16 }}
//                       exit={{ opacity: 0, height: 0, marginTop: 0 }}
//                       transition={{
//                         duration: 0.4,
//                         ease: "easeInOut",
//                       }}
//                       className="overflow-hidden"
//                     >
//                       <div className="bg-[#FFC088] rounded-xl p-6 shadow-lg border-t-2 border-slate-700 border-b border-b-white">
//                         <p className="text-[#85460E] text-[16px] leading-relaxed font-medium">
//                           {faq.answer}
//                         </p>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default FaqDesktop;

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TiPlus, TiMinus } from "react-icons/ti";
import qLeft from "../assets/faqAssets/qLeft.svg";
import qRight from "../assets/faqAssets/qRight.svg";
import bg from "../assets/desktopViewImages/faqDesktpop/faqBGDesktop.svg";
import heading from "../assets/desktopViewImages/faqDesktpop/heading.svg";
import dropDown from "../assets/FormImages/dropDown.svg";

const faqData = [
  { id: 1, question: "Is This Program Free To Join?", answer: "Yes! Joining the Superpower Squad is completely free." },
  { id: 2, question: "What Age Group Is This Suitable For? ", answer: "The program is designed for kids aged 5–12 years; the perfect age to build super habits and have fun with heroes." },
  { id: 3, question: "How Long Does The Campaign Last? ", answer: "The campaign runs for 1 month. Kids can join anytime and start completing daily missions to climb the leaderboard." },
  { id: 4, question: "Can I Track for More Than One Child? ", answer: "Yes, parents can track progress for multiple children but with different accounts. Each child gets their own hero journal and missions." },
];

function FaqDesktop() {
  const [open, setOpen] = useState(false); // Toggle FAQ section
  const [expandedId, setExpandedId] = useState(null); // Toggle individual FAQ

  const toggleExpanded = (id) => setExpandedId(expandedId === id ? null : id);

  return (
    <div className="relative z-0">
      {/* ---------------- DESKTOP VIEW ---------------- */}
      <div
        className="relative overflow-hidden bg-cover bg-center z-0 hidden lg:block"
        style={{ backgroundImage: `url(${bg})` }}
      >
        {/* Decorative assets */}
        <img
          src={qLeft}
          alt=""
          className="absolute pt-4 bottom-46 left-20 xl:left-14 w-[60px] lg:w-[80px]"
        />
        <img
          src={qRight}
          alt=""
          className="absolute top-2 xl:top-20 left-[200px] xl:left-[1200px] w-[90px] lg:w-[120px]"
        />

        <div className="max-w-7xl mx-auto px-5 pb-16 relative z-10">
          {/* Heading with dropdown */}
          <div className="flex justify-center mb-8 relative">
            <motion.div
              className="relative flex items-center cursor-pointer"
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              onClick={() => setOpen((prev) => !prev)}
            >
              <img src={heading} alt="FAQ Heading" className="select-none pointer-events-none" />
              <motion.img
                src={dropDown}
                alt="Dropdown"
                className="w-8 h-8 absolute right-0 top-10 mr-8 -translate-y-1/2"
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>

          {/* FAQ Section Toggle */}
<AnimatePresence>
  {open && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="flex justify-center">
        {/* Centered container */}
        <div className="w-full md:w-[1200px] space-y-5 mx-auto">
          {faqData.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.button
                onClick={() => toggleExpanded(faq.id)}
                className="w-full bg-[#FFA24F] rounded-full px-6 py-3 flex items-center justify-between shadow-lg border-t-2 border-[#85460E] border-b border-b-white [-webkit-text-stroke:0.7px_black] tracking-tighter"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <span className="text-white text-[18px] font-black lg:text-[20px] tracking-tighter">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: expandedId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  {expandedId === faq.id ? (
                    <TiMinus className="w-6 h-6 text-white drop-shadow-lg" />
                  ) : (
                    <TiPlus className="w-6 h-6 text-white drop-shadow-lg" />
                  )}
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {expandedId === faq.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <div className="bg-[#FFC088] rounded-xl p-6 shadow-lg border-t-2 border-slate-700 border-b border-b-white">
                      <p className="text-[#85460E] text-[16px] leading-relaxed font-medium">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>

        </div>
      </div>
    </div>
  );
}

export default FaqDesktop;

