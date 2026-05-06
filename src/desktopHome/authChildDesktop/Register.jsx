import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import dropDown from "../../assets/FormImages/dropDown.svg";
import { Check } from "lucide-react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
// Import hero icons
import flashFloss from "../../assets/hero-icons/flashingfloss.png";
import germZapper from "../../assets/hero-icons/germzapper.png";
import greenGobbler from "../../assets/hero-icons/greengobbler.png";
import hydroHero from "../../assets/hero-icons/hydrohero.png";
import mightyMan from "../../assets/hero-icons/mightyman.png";
import missBrainy from "../../assets/hero-icons/missbrainy.png";
import "react-toastify/dist/ReactToastify.css";
//import { handleRegisterSubmit } from "../../context/AuthContext";
import AuthContext from "../../context/AuthContext";

// Hero icon colors and initials for temporary use
const heroStyles = {
  'Captain Courage': { initials: 'CC', color: '#FF6B6B' },
  'Flash Floss': { initials: 'FF', color: '#4ECDC4' },
  'Germ Zapper': { initials: 'GZ', color: '#45B7AF' },
  'Green Gobbler': { initials: 'GG', color: '#96CEB4' },
  'Hydro Hero': { initials: 'HH', color: '#FFEEAD' },
  'Mighty Man': { initials: 'MM', color: '#D4A5A5' },
  'Miss Brainy': { initials: 'MB', color: '#FF9B9B' }
};
// Validation schema
const schema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Parent email is required"),
  age_group: Yup.string().required("Please select your age group"),
  persona: Yup.string().required("Please select your superhero persona"),
  parent_name: Yup.string().required("Parent/Guardian name is required"),
    contact_number: Yup.string()
    .matches(/^5[0-9]{8}$/, "Must be a valid UAE mobile number (e.g., 50xxxxxxx)")
    .required("Contact number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  consent: Yup.boolean().oneOf([true], "Consent is required"),
    // These two fields are now optional
  reference_name: Yup.string().nullable(),
  clinic_name: Yup.string().nullable(),

});

const Register = ({ switchForm }) => {
   const { handleRegisterSubmit } = React.useContext(AuthContext)
  const [open, setOpen] = useState(false);
  const [personaOpen, setPersonaOpen] = useState(false);
  const [selected, setSelected] = useState("Your Age Group");
  const [selectedPersona, setSelectedPersona] = useState("Choose your persona");
  const options = ['5-7', '8-10', '11-12', '13-14'];

  const personas = [
    { name: 'Flash Floss', icon: flashFloss, description: 'Quick and agile floss master' },
    { name: 'Germ Zapper', icon: germZapper, description: 'Defender against germs' },
    { name: 'Green Gobbler', icon: greenGobbler, description: 'Master of healthy eating' },
    { name: 'Hydro Hero', icon: hydroHero, description: 'Champion of hydration' },
    { name: 'Mighty Man', icon: mightyMan, description: 'Strong and powerful protector' },
    { name: 'Miss Brainy', icon: missBrainy, description: 'Smart and wise leader' }
  ];
  
  return (
    <>
     <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "12px",
          fontWeight: "bold",
        }}
      />
      <h2
              className="text-white text-3xl font-goldman font-black text-center"
              style={{
                textShadow:
                  "2px 2px 0px rgba(0,0,0,0.4), 1px 1px 0px rgba(0,0,0,0.6)",
                WebkitTextStroke: "1px rgba(0,0,0,0.5)",
              }}
            >
              CREATE YOUR ACCOUNT
            </h2>
    <Formik
      initialValues={{
            name: "",
            email: "",
            age_group: "",
            persona: "",
            parent_name: "",
            contact_number: "",
            password: "",
            consent: false,
            reference_name: "",
            clinic_name: "",
      }}
      validationSchema={schema}
      onSubmit={async (values, formikHelpers) => {
  const formattedValues = {
    ...values,
    contact_number: `+971${values.contact_number}`,
  };

  await handleRegisterSubmit(formattedValues, {
    ...formikHelpers,
    switchForm,
  });
}}

    >
      {({ setFieldValue, isSubmitting, values }) => (
        <Form className="space-y-6 font-gtwalsheim px-10">
          
          {/* 2-column layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 pt-10">
            <div>
              <Field
                name="name"
                placeholder="Your Name"
                className="w-full p-4 rounded-md bg-[#B0CFCD] border-2 border-white text-black placeholder-[#0B0923]"
              />
              <ErrorMessage name="name" component="p" className="text-red-400 text-sm" />
            </div>

            <div>
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className="w-full p-4 rounded-md bg-[#B0CFCD] border-2 border-white text-black placeholder-[#0B0923]"
              />
              <ErrorMessage name="email" component="p" className="text-red-400 text-sm" />
            </div>

            <div className="relative">
                 <div
                  onClick={() => setOpen(!open)}
                  className="flex justify-between items-center px-3 py-3 rounded-md bg-[#BCE0E8] text-black border cursor-pointer"
                >
                  <span>{values.age_group || selected}</span>
                  <motion.img src={dropDown} className="w-4 h-4" animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} />
                </div>
                <Field type="hidden" name="age_group" value={values.age_group} />

                <AnimatePresence>
                  {open && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="absolute mt-1 w-full rounded-md bg-[#BCE0E8] border shadow-lg z-20"
                    >
                      {options.map((option) => (
                        <li
                          key={option}
                          onClick={() => {
                            setSelected(option);
                            setFieldValue("age_group", option);
                            setOpen(false);
                          }}
                          className="px-3 py-2 hover:bg-[#a6d7e2] cursor-pointer text-black"
                        >
                          {option}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
                <ErrorMessage name="age_group" component="div" className="text-red-400 text-xs mt-1" />
              </div>

              {/* Persona Dropdown */}
              <div className="relative">
                <div
                  onClick={() => setPersonaOpen(!personaOpen)}
                  className="flex justify-between items-center px-3 py-3 rounded-md bg-[#BCE0E8] text-black border cursor-pointer"
                >
                  <div className="flex items-center space-x-2">
                    {values.persona && (
                      <div className="flex items-center space-x-2">
                        <img 
                          src={personas.find(p => p.name === values.persona)?.icon} 
                          alt={values.persona}
                          className="w-6 h-6 object-contain"
                        />
                        <span>{values.persona}</span>
                      </div>
                    )}
                    {!values.persona && <span>{selectedPersona}</span>}
                  </div>
                  <motion.img src={dropDown} className="w-4 h-4" animate={{ rotate: personaOpen ? 180 : 0 }} transition={{ duration: 0.3 }} />
                </div>
                <Field type="hidden" name="persona" value={values.persona} />

                <AnimatePresence>
                  {personaOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="absolute mt-1 w-full rounded-md bg-[#BCE0E8] border shadow-lg z-20"
                    >
                      {personas.map((persona) => (
                        <li
                          key={persona.name}
                          onClick={() => {
                            setSelectedPersona(persona.name);
                            setFieldValue("persona", persona.name);
                            setPersonaOpen(false);
                          }}
                          className="px-3 py-2 hover:bg-[#a6d7e2] cursor-pointer text-black"
                        >
                          <div className="flex items-center space-x-2">
                            <img 
                              src={persona.icon} 
                              alt={persona.name}
                              className="w-8 h-8 object-contain"
                            />
                            <div>
                              <div className="font-semibold">{persona.name}</div>
                              <div className="text-xs text-gray-600">{persona.description}</div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
                <ErrorMessage name="persona" component="div" className="text-red-400 text-xs mt-1" />
              </div>

            {/* <div>
              <Field
                name="contact_number"
                placeholder="Contact Number"
                className="w-full p-4 rounded-md bg-[#B0CFCD] border-2 border-white text-black placeholder-[#0B0923]"
              />
              <ErrorMessage name="contact_number" component="p" className="text-red-400 text-sm" />
            </div> */}

             {/* ✅ Updated Dubai Contact Number Field */}
              <div className="relative flex items-center">
                <span className="absolute left-3 text-black font-bold">+971</span>
                <Field
                  name="contact_number"
                  placeholder="5XXXXXXXX"
                  className="w-full pl-14 p-4 rounded-md bg-[#B0CFCD] border-2 border-white text-black placeholder-[#0B0923]"
                />
                <ErrorMessage
                  name="contact_number"
                  component="p"
                  className="text-red-400 text-sm absolute -bottom-5 left-0"
                />
              </div>

            <div>
              <Field
                name="parent_name"
                placeholder="Parent Name"
                className="w-full p-4 rounded-md bg-[#B0CFCD] border-2 border-white text-black placeholder-[#0B0923]"
              />
              <ErrorMessage name="parent_name" component="p" className="text-red-400 text-sm" />
            </div>

            <div>
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="w-full p-4 rounded-md bg-[#B0CFCD] border-2 border-white text-black placeholder-[#0B0923]"
              />
              <ErrorMessage name="password" component="p" className="text-red-400 text-sm" />
            </div>
             {/* <div>
              <Field
                name="clinic_name"
                type="text"
                placeholder="Clinic Name"
                className="w-full p-4 rounded-md bg-[#B0CFCD] border-2 border-white text-black placeholder-[#0B0923]"
              />
              <ErrorMessage name="clinic_name" component="p" className="text-red-400 text-sm" />
            </div>

             <div>
              <Field
                name="reference_name"
                type="text"
                placeholder="Reference name"
                className="w-full p-4 rounded-md bg-[#B0CFCD] border-2 border-white text-black placeholder-[#0B0923]"
              />
              <ErrorMessage name="reference_name" component="p" className="text-red-400 text-sm" />
            </div> */}
          </div>
            
           <div>
                 <label className="flex items-start gap-3 text-sm text-white">
                   <div className="pt-1">
                    <Field name="consent">
                       {({ field, form }) => (
                        <div
                          className="w-6 h-6 flex items-center justify-center cursor-pointer rounded-md border bg-white"
                          onClick={() => form.setFieldValue("consent", !field.value)}
                        >
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={field.value ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-green-500"
                          >
                            <Check size={20} strokeWidth={3} />
                          </motion.div>
                        </div>
                      )}
                    </Field>
                  </div>
                  <span>
                    Confirm that your parent or guardian has provided consent. Read our{" "}
                    <a href="#" className="underline text-blue-400">Privacy Policy</a>.
                  </span>
                </label>
                <ErrorMessage name="consent" component="div" className="text-red-400 text-xs mt-1" />
              </div>

          {/* Submit button */}
          <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 text-xl rounded-md font-bold text-white border-2 border-black mt-4 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 [-webkit-text-stroke:0.6px_black]"
              style={{
                background: "linear-gradient(180deg, #26B3F7 26.5%, #23AAF8 39.5%, #1C95F9 64%, #1983FA 97%)",
                fontWeight: 900,
                verticalAlign: "middle",
                fontVariantNumeric: "lining-nums proportional-nums",
              }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2 "
                  />
                  SUBMITTING...
                </span>
              ) : (
                "SUBMIT"
              )}
            </motion.button>

          {/* Switch to Login */}
          <div className="text-white text-sm flex justify-center mt-4">
            Already have an account?
            <button type="button" onClick={() => switchForm("login")} className="underline ml-1">
              Login
            </button>
          </div>
        </Form>
      )}
    </Formik>
  </>  
  );
};

export default Register;