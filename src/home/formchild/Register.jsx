import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import dropDown from "../../assets/FormImages/dropDown.svg";
import { Check } from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
// Import hero icons
import flashFloss from "../../assets/hero-icons/flashingfloss.png";
import germZapper from "../../assets/hero-icons/germzapper.png";
import greenGobbler from "../../assets/hero-icons/greengobbler.png";
import hydroHero from "../../assets/hero-icons/hydrohero.png";
import mightyMan from "../../assets/hero-icons/mightyman.png";
import missBrainy from "../../assets/hero-icons/missbrainy.png";
import "react-toastify/dist/ReactToastify.css";
//import { handleRegisterSubmit } from "../../utils/RegisterFormSubmition"
import AuthContext from "../../context/AuthContext";
// Validation schema
const RegisterSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Parent email is required"),
  age_group: Yup.string().required("Please select your age group"),
  persona: Yup.string().required("Please select your superhero persona"),
  parent_name: Yup.string().required("Parent/Guardian name is required"),
  contact_number: Yup.string()
    .matches(/^[0-9]{8,9}$/, "Enter a valid UAE number (e.g., 501234567)")
    .required("Contact number is required"),
  password : Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  consent: Yup.boolean().oneOf([true], "Consent is required"),
   // These two fields are now optional
  reference_name: Yup.string().nullable(),
  clinic_name: Yup.string().nullable(),
});

// Temporary hero icon placeholders (initials + color). Replace with real icons later.
const heroStyles = {
  'Captain Courage': { initials: 'CC', color: '#FF6B6B' },
  'Flash Floss': { initials: 'FF', color: '#4ECDC4' },
  'Germ Zapper': { initials: 'GZ', color: '#45B7AF' },
  'Green Gobbler': { initials: 'GG', color: '#96CEB4' },
  'Hydro Hero': { initials: 'HH', color: '#FFEEAD' },
  'Mighty Man': { initials: 'MM', color: '#D4A5A5' },
  'Miss Brainy': { initials: 'MB', color: '#FF9B9B' }
};

function Register({ setActiveForm }) {
  const { handleRegisterSubmit } = React.useContext(AuthContext)
  const [open, setOpen] = useState(false);
  const [personaOpen, setPersonaOpen] = useState(false);
  const [selected, setSelected] = useState("Your Age Group");
  const [selectedPersona, setSelectedPersona] = useState("Choose your persona");

  const options = ['5-7', '8-10', '11-12', '13-14'];
  
  const personas = [
    { name: 'Flash Floss', icon: flashFloss, color: '#4ECDC4', description: 'Quick and agile floss master' },
    { name: 'Germ Zapper', icon: germZapper, color: '#45B7AF', description: 'Defender against germs' },
    { name: 'Green Gobbler', icon: greenGobbler, color: '#96CEB4', description: 'Master of healthy eating' },
    { name: 'Hydro Hero', icon: hydroHero, color: '#FFEEAD', description: 'Champion of hydration' },
    { name: 'Mighty Man', icon: mightyMan, color: '#D4A5A5', description: 'Strong and powerful protector' },
    { name: 'Miss Brainy', icon: missBrainy, color: '#FF9B9B', description: 'Smart and wise leader' }
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
    <div className="relative z-10 bg-gradient-to-b from-[#050313] via-[#18164C] to-[#25276B] 
                    text-white rounded-xl shadow-lg w-[95%] sm:w-[90%] max-w-sm p-6 mb-14 
                    -top-10 ml-[3px]">
      <h2 className="text-xl font-semibold mb-6 text-center"></h2>

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
        validationSchema={RegisterSchema}
      onSubmit={async (values, formikHelpers) => {
  const formattedValues = {
    ...values,
    contact_number: `+971${values.contact_number}`,
  };

  await handleRegisterSubmit(formattedValues, {
    ...formikHelpers,
    setActiveForm,
  });
}}

      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className="flex flex-col gap-4 relative">
            {/* Child Name */}
            <div>
              <label className="block text-sm mb-1"></label>
              <Field
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full px-3 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-[#B0CFCD] border-2 border-white placeholder-[#0B0923] font-gtwalsheim"
              />
              <ErrorMessage name="name" component="div" className="text-red-400 text-xs mt-1" />
            </div>

            {/* Parent Email */}
            <div>
              <label className="block text-sm mb-1"></label>
              <Field
                type="email"
                name="email"
                placeholder="Enter parent email"
                className="w-full px-3 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-[#B0CFCD] border-2 border-white placeholder-[#0B0923] font-gtwalsheim"
              />
              <ErrorMessage name="email" component="div" className="text-red-400 text-xs mt-1" />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm mb-1"></label>
              <Field
                type="password"
                name="password"
                placeholder="Enter password"
                className="w-full px-3 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-[#B0CFCD] border-2 border-white placeholder-[#0B0923] font-gtwalsheim"
              />
              <ErrorMessage name="password" component="div" className="text-red-400 text-xs mt-1" />
            </div>

            {/* Age Group Dropdown */}
             <div className="relative">
                <label className="block text-sm mb-1"></label>
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
                <label className="block text-sm mb-1"></label>
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

            {/* Parent Name */}
            <div>
              <label className="block text-sm mb-1"></label>
              <Field
                type="text"
                name="parent_name"
                placeholder="Enter parent name"
                className="w-full px-3 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-[#B0CFCD] border-2 border-white placeholder-[#0B0923] font-gtwalsheim"
              />
              <ErrorMessage name="parent_name" component="div" className="text-red-400 text-xs mt-1" />
            </div>

            {/* Contact Number */}
            {/* <div>
              <label className="block text-sm mb-1"></label>
              <Field
                type="text"
                name="contact_number"
                placeholder="Enter contact number"
                className="w-full px-3 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-[#B0CFCD] border-2 border-white placeholder-[#0B0923] font-gtwalsheim"
              />
              <ErrorMessage name="contact_number" component="div" className="text-red-400 text-xs mt-1" />
            </div> */}

          <div>
  <label className="block text-sm mb-1"></label>
  <div className="flex items-center bg-[#B0CFCD] border-2 border-white rounded-lg overflow-hidden">
    <span className="px-3 py-2 bg-[#a6c8c5] text-black font-bold select-none">+971</span>
    <Field
      type="text"
      name="contact_number"
      placeholder="Enter contact number (e.g., 501234567)"
      className="w-full px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-[#B0CFCD] placeholder-[#0B0923] font-gtwalsheim"
      maxLength={9} // only 8-9 digits after +971
      onChange={(e) => {
        // Allow only digits and remove extra characters
        const value = e.target.value.replace(/[^0-9]/g, "");
        setFieldValue("contact_number", value);
      }}
    />
  </div>
  <ErrorMessage
    name="contact_number"
    component="div"
    className="text-red-400 text-xs mt-1"
  />
</div>


            

            <div>
              <label className="block text-sm mb-1"></label>
              <Field
                type="text"
                name="clinic_name"
                placeholder="Clinic Name"
                className="w-full px-3 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-[#B0CFCD] border-2 border-white placeholder-[#0B0923] font-gtwalsheim"
              />
              <ErrorMessage name="clinic_name" component="div" className="text-red-400 text-xs mt-1" />
            </div>

            <div>
              <label className="block text-sm mb-1"></label>
              <Field
                type="text"
                name="reference_name"
                placeholder="Reference Name"
                className="w-full px-3 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-[#B0CFCD] border-2 border-white placeholder-[#0B0923] font-gtwalsheim"
              />
              <ErrorMessage name="reference_name" component="div" className="text-red-400 text-xs mt-1" />
            </div>

            {/* Consent Checkbox */}
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
                <span className="font-gtwalsheim">
                  Confirm that your parent or guardian has provided consent. Read our{" "}
                  <a href="#" className="underline text-blue-400 font-gtwalsheim">Privacy Policy</a>.
                </span>
              </label>
              <ErrorMessage name="consent" component="div" className="text-red-400 text-xs mt-1" />
            </div>


              <motion.button
  whileTap={{ scale: 0.95 }}
  whileHover={{ scale: 1.02 }}
  type="submit"
  disabled={isSubmitting}
  className="mt-4 w-full py-3 rounded-lg uppercase text-center border-2 border-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed [-webkit-text-stroke:0.8px_black] tracking-tighter"
  style={{
    background: "linear-gradient(180deg, #26B3F7 26.5%, #23AAF8 39.5%, #1C95F9 64%, #1983FA 97%)",
    fontWeight: 900,
    fontSize: "18px",
    lineHeight: "100%",
    letterSpacing: "-0.02em",          // -2%
    verticalAlign: "middle",
    fontVariantNumeric: "lining-nums proportional-nums",
  }}
>
  {isSubmitting ? (
    <span className="flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
      />
      Creating Account...
    </span>
  ) : (
    "Register"
  )}
</motion.button>


            {/* Switch to Login */}
            <p className="text-xs text-center mt-4 font-gtwalsheim">
              Already have an account?{" "}
              <span
                className="text-indigo-300 hover:text-indigo-200 cursor-pointer font-gtwalsheim"
                onClick={() => setActiveForm("login")}
              >
                Login
              </span>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  </>
  );
}

export default Register;

