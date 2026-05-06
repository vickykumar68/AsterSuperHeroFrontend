// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { TiPlus, TiMinus } from "react-icons/ti";
// import qLeft from "../assets/faqAssets/qLeft.svg";
// import qRight from "../assets/faqAssets/qRight.svg";
// import decorate from "../assets/faqAssets/decorate.svg";
// import heading from "../assets/desktopViewImages/faqDesktpop/heading.svg";
// import dropDown from "../assets/FormImages/dropDown.svg";

// const faqData = [
//   {
//     id: 1,
//     question: "Is This Program Free To Join? ",
//     answer: "Yes! Joining the Superpower Squad is completely free."
//   },
//   {
//     id: 2,
//     question: "What Age Group Is This Suitable For? ",
//     answer: "The program is designed for kids aged 5–12 years; the perfect age to build super habits and have fun with heroes."
//   },
//   {
//     id: 3,
//     question: "How Long Does The Campaign Last? ",
//     answer: "The campaign runs for 1 month. Kids can join anytime and start completing daily missions to climb the leaderboard."
//   },
//   {
//     id: 4,
//     question: "Can I Track for More Than One Child? ",
//     answer: "Yes, parents can track progress for multiple children but with different accounts. Each child gets their own hero journal and missions."
//   }
// ];

// function Faq() {
//   const [expandedId, setExpandedId] = useState(2);

//   const toggleExpanded = (id) => {
//     setExpandedId(expandedId === id ? null : id);
//   };

//   return (
//     <div className="bg-[#F1D864] relative overflow-hidden">
//       <img
//         src={qLeft}
//         alt=""
//         className="absolute top-2 left-2 w-[52px] h-[94px]"
//       />
//       <img
//         src={qRight}
//         alt=""
//         className="absolute -top-3 right-2 w-[76px] h-[98px]"
//       />
//       <img
//         src={decorate}
//         alt=""
//         className="absolute -bottom-4 -right-5  z-0"
//       />
//       <div className="container mx-auto px-5 pt-8 pb-14 max-w-md relative z-10">
//         <motion.h1
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center text-[18px] font-black text-white mb-8 [-webkit-text-stroke:0.3px_black] tracking-tighter"
//         >
//           FREQUENTLY ASKED QUESTIONS
//         </motion.h1>

//         {/* FAQ Items */}
//         <div className="space-y-4 ">
//           {faqData.map((faq, index) => (
//             <motion.div
//               key={faq.id}
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               className="overflow-hidden"
//             >
//               <motion.button
//                 onClick={() => toggleExpanded(faq.id)}
//                 className="w-full bg-[#FFA24F] rounded-full px-6 py-2 flex items-center justify-between shadow-lg border-t-2 border-[#85460E] border-b border-b-white"
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 transition={{ type: "spring", stiffness: 300, damping: 20 }}
//               >
//                 <span
//                   className="text-white font-black text-[14px] text-left [-webkit-text-stroke:0.2px_black]"
//                 >
//                   {faq.question}
//                 </span>
//                 <motion.div
//                   animate={{ rotate: expandedId === faq.id ? 180 : 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="flex-shrink-0 ml-4"
//                 >
//                   {expandedId === faq.id ? (
//                     <TiMinus className="w-6 h-6 text-white drop-shadow-lg" />
//                   ) : (
//                     <TiPlus className="w-6 h-6 text-white drop-shadow-lg" />
//                   )}
//                 </motion.div>
//               </motion.button>

//               <AnimatePresence>
//                 {expandedId === faq.id && (
//                   <motion.div
//                     initial={{ opacity: 0, height: 0, marginTop: 0 }}
//                     animate={{ opacity: 1, height: "auto", marginTop: 16 }}
//                     exit={{ opacity: 0, height: 0, marginTop: 0 }}
//                     transition={{
//                       duration: 0.4,
//                       ease: "easeInOut"
//                     }}
//                     className="overflow-hidden"
//                   >
//                     <div className="bg-[#FFC088] rounded-xl p-6 shadow-lg border-t-2 border-slate-700 border-b border-b-white">
//                       <p
//                         className="text-[#85460E] text-[14px] leading-relaxed font-normal [-webkit-text-stroke:0.3px_black] tracking-tighter"
                        
//                       >
//                         {faq.answer}
//                       </p>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Faq;


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TiPlus, TiMinus } from "react-icons/ti";
import qLeft from "../assets/faqAssets/qLeft.svg";
import qRight from "../assets/faqAssets/qRight.svg";
import decorate from "../assets/faqAssets/decorate.svg";
import heading from "../assets/desktopViewImages/faqDesktpop/heading.svg";
import dropDown from "../assets/FormImages/dropDown.svg";

const faqData = [
  { id: 1, question: "Is This Program Free To Join? ", answer: "Yes! Joining the Superpower Squad is completely free." },
  { id: 2, question: "What Age Group Is This Suitable For? ", answer: "The program is designed for kids aged 5–12 years; the perfect age to build super habits and have fun with heroes." },
  { id: 3, question: "How Long Does The Campaign Last? ", answer: "The campaign runs for 1 month. Kids can join anytime and start completing daily missions to climb the leaderboard." },
  { id: 4, question: "Can I Track for More Than One Child? ", answer: "Yes, parents can track progress for multiple children but with different accounts. Each child gets their own hero journal and missions." }
];

function Faq() {
  const [expandedId, setExpandedId] = useState(null); // Individual FAQ toggle
  const [open, setOpen] = useState(false); // Heading toggle

  const toggleExpanded = (id) => setExpandedId(expandedId === id ? null : id);

  return (
    <div className="bg-[#F1D864] relative overflow-hidden">
      {/* Decorative Images */}
      {/* <img src={qLeft} alt="" className="absolute top-2 left-2 w-[52px] h-[94px]" /> */}
      <img src={qRight} alt="" className="absolute [top:18rem] -right-5 w-[86px] h-[98px] z-10" />
      <img src={decorate} alt="" className="absolute -bottom-4 -right-5 z-0" />

      <div className="container mx-auto px-0 pt-0 pb-14 max-w-md relative z-10 ">

        {/* ---------------- Heading with Dropdown ---------------- */}
        <div className="flex justify-center mb-6 relative">
          <motion.div
            className="relative flex items-center cursor-pointer "
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => setOpen((prev) => !prev)}
          >
            <img src={heading} alt="FAQ Heading" className="select-none pointer-events-none" />
            <motion.img
              src={dropDown}
              alt="Dropdown"
              className="w-5 h-5 absolute right-6 top-4 -translate-y-1/2 mr-2"
               style={{
            right: "9%",
            top: "22%",
          }}
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>

        {/* ---------------- FAQ Items ---------------- */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="space-y-4 px-4">
                {faqData.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="overflow-hidden"
                  >
                    <motion.button
                      onClick={() => toggleExpanded(faq.id)}
                      className="w-full bg-[#FFA24F] rounded-full px-6 py-2 flex items-center justify-between shadow-lg border-t-2 border-[#85460E] border-b border-b-white [-webkit-text-stroke:0.7px_black] tracking-tighter"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <span className="text-white font-black text-[14px] text-left [-webkit-text-stroke:0.2px_black]">
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
                            <p className="text-[#85460E] text-[14px] leading-relaxed font-normal [-webkit-text-stroke:0.3px_black] tracking-tighter">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

export default Faq;

