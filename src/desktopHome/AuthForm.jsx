import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import Login from "./Login";
// import Register from "./Register";
// import ForgotPassword from "./ForgotPassword";
import headingImage from "../assets/desktopViewImages/authFrom/heading_mission.png";
import Login from "./authChildDesktop/Login";
import Register from "./authChildDesktop/Register";
import ForgotPassword from "./authChildDesktop/ForgetPassword";

const formVariants = {
        enter: (direction) => ({
          x: direction > 0 ? 300 : -300,
          opacity: 0,
        }),
        center: { x: 0, opacity: 1 },
        exit: (direction) => ({
          x: direction < 0 ? 300 : -300,
          opacity: 0,
        }),
      };
const AuthForm = () => {
  const [activeForm, setActiveForm] = useState("login"); // login | register | forgot
  const [direction, setDirection] = useState(1);
  
  
   const switchForm = (form) => {
    setDirection(form === "login" ? -1 : 1);
    setActiveForm(form);
  };
  return (
    <div className="bg-[#FFE779] flex flex-col items-center justify-center pb-16 px-5 ">
      {/* Heading Image */}
      <motion.img
        src={headingImage}
        alt="Start Your Mission"
        className="w-[851px] -mb-10 z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Form Container */}
      <div className="relative w-full max-w-7xl min-h-[600px]">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={activeForm}
            custom={direction}
            variants={formVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <div className="bg-gradient-to-b from-[#050313] via-[#18164C] to-[#25276B] rounded-2xl shadow-lg p-10">
              {activeForm === "login" && <Login switchForm={switchForm} />}
              {activeForm === "register" && <Register switchForm={switchForm} />}
              {activeForm === "forgot" && <ForgotPassword switchForm={switchForm} />}
            </div>
          </motion.div>
        </AnimatePresence>
     </div>
    </div>
  );
};

export default AuthForm;

