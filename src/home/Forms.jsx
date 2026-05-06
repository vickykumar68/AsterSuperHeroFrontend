import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Login from "./formchild/Login";
import Register from "./formchild/Register";
import ForgetPassword from "./formchild/ForgetPassword";
import headingImage from "../assets/FormImages/heading.svg";
import bottomDecorative from "../assets/FormImages/bottomDecorative.svg";
import AuthContext from "../context/AuthContext";

  function Forms() {
    const [activeForm, setActiveForm] = useState("login");

    // Listen for custom event to open register form
    useEffect(() => {
      const handler = () => setActiveForm("register");
      window.addEventListener('open-register-form', handler);
      return () => window.removeEventListener('open-register-form', handler);
    }, []);
  const [direction, setDirection] = useState(1); // 1 = forward (right), -1 = backward (left)

  // Handle form switching with direction
  const handleSwitch = (form) => {
    if (form === "register") setDirection(1);
    else if (form === "login") setDirection(-1);
    else setDirection(1);
    setActiveForm(form);
  };

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center bg-[#FFE779] overflow-hidden"
      id="login"
    >
      {/* Background Decorative */}
      <motion.img
        src={bottomDecorative}
        alt="Bottom Decorative"
        className="absolute -bottom-24 -right-28 w-full z-0"
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />

      {/* Heading */}
      <img
        src={headingImage}
        alt="Heading"
        className="relative w-full z-10"
      />

      {/* Form Container */}
      <div className="relative w-full flex justify-center z-0 mt-3">
        <AnimatePresence mode="wait" custom={direction}>
          {activeForm === "login" && (
            <motion.div
              key="login"
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={direction}
              transition={{ duration: 0.5 }}
              className="w-full flex justify-center"
            >
              <Login setActiveForm={handleSwitch} />
            </motion.div>
          )}

          {activeForm === "register" && (
            <motion.div
              key="register"
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={direction}
              transition={{ duration: 0.5 }}
              className="w-full flex justify-center"
            >
              <Register setActiveForm={handleSwitch} />
            </motion.div>
          )}

          {activeForm === "forget" && (
            <motion.div
              key="forget"
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={direction}
              transition={{ duration: 0.5 }}
              className="w-full flex justify-center"
            >
              <ForgetPassword setActiveForm={handleSwitch} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Forms;
