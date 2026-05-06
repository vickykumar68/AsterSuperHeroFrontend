import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../../context/AuthContext";

// Validation schema
const LoginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function Login({ setActiveForm = () => {} }) {
  const { login } = React.useContext(AuthContext)
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
    <motion.div
      id="login"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="relative z-10 bg-gradient-to-b from-[#050313] via-[#18164C] to-[#25276B]
                 text-white rounded-xl shadow-lg w-[95%] sm:w-[90%] max-w-sm p-6 mb-14
                 -top-10 ml-[3px]"
    >
      {/* Title */}
      <motion.h2
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl font-semibold mb-6 text-center"
      >
        
      </motion.h2>

      {/* Formik Form */}
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting, setError, setErrors, resetForm }) => {
            try {
              const userRole = await login(values.email, values.password);
                if (userRole !== 'user') {
                  // toast.error("🚫 Not a user account. Please use a user account to login.");
                  setErrors({ form: 'Not a user account' });
                } else {
                  // toast.success("🎉 Login successful! Welcome back!", {
                  //   icon: "✨",
                  //   style: {
                  //     background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                  //     borderRadius: "12px",
                  //     fontWeight: "bold",
                  //   },
                  // });
                  resetForm();
                }
            } catch (err) {
              let errorMessage = err.response?.data?.message || 'Login failed';
              if (errorMessage.toLowerCase().includes('invalid')) {
                errorMessage = 'Invalid email or password';
              }
              // toast.error(`❌ ${errorMessage}`, {
              //   style: {
              //     background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)",
              //     borderRadius: "12px",
              //     fontWeight: "bold",
              //   },
              // });
              setErrors({ form: errorMessage });
            }
            setSubmitting(false);
          }}
      >
        {({ isSubmitting, errors }) => (
          <Form className="flex flex-col gap-4">
            {/* Error line above fields */}
            {errors.form && (
              <div className="text-red-500 text-sm text-center font-semibold mb-2">
                {errors.form}
              </div>
            )}
            {/* Email Field */}
            {/* <div>
              <label className="block text-sm mb-1"></label>
              <Field
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 rounded-lg text-black bg-[#B0CFCD] border-2 border-white
                           focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-400 text-xs mt-1"
              />
            </div> */}

            {/* Password Field */}
            {/* <div>
              <label className="block text-sm mb-1"></label>
              <Field
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 rounded-lg text-black bg-[#B0CFCD] border-2 border-white
                           focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-400 text-xs mt-1"
              />
            </div> */}

            <div>
  <label className="block text-sm mb-1"></label>
  <Field
    type="email"
    name="email"
    placeholder="Enter your email"
    className="w-full px-3 py-2 rounded-lg text-black bg-[#B0CFCD] border-2 border-white
               focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-[#0B0923] font-gtwalsheim"
  />
  <ErrorMessage
    name="email"
    component="div"
    className="text-red-400 text-xs mt-1"
  />
</div>

{/* Password Field */}
<div>
  <label className="block text-sm mb-1"></label>
  <Field
    type="password"
    name="password"
    placeholder="Enter your password"
    className="w-full px-3 py-2 rounded-lg text-black bg-[#B0CFCD] border-2 border-white
               focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-[#0B0923] font-gtwalsheim"
  />
  <ErrorMessage
    name="password"
    component="div"
    className="text-red-400 text-xs mt-1"
  />
</div>


            {/* Forgot Password */}
            {/* <div className="flex justify-end">
              <button
                type="button"
                className="text-xs text-indigo-300 hover:text-indigo-200 font-gtwalsheim"
                onClick={() => setActiveForm("forget")}
              >
                Forgot Password?
              </button>
            </div> */}

            {/* Login Button */}
            {/* <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isSubmitting}
              className="mt-4 w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 
                         transition-all duration-200 disabled:opacity-50"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </motion.button> */}

            <motion.button
  whileTap={{ scale: 0.95 }}
  type="submit"
  disabled={isSubmitting}
  className="mt-4 w-full py-2 rounded-lg border-2 border-black uppercase text-center [-webkit-text-stroke:0.8px_black] tracking-tighter"
  style={{
    background: "linear-gradient(180deg, #26B3F7 26.5%, #23AAF8 39.5%, #1C95F9 64%, #1983FA 97%)",
    fontWeight: 800,             // equivalent to Tailwind font-black
    fontSize: "18px",
    lineHeight: "100%",
    letterSpacing: "-0.02em",    // -2%
    verticalAlign: "middle",
    fontVariantNumeric: "lining-nums proportional-nums",
  }}
>
  {isSubmitting ? "Logging in..." : "Login"}
</motion.button>

          </Form>
        )}
      </Formik>

      {/* Signup Option */}
      {/* <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-xs text-center mt-6 font-gtwalsheim"
      >
        Don’t have an account?{" "}
        <span
        onClick={() => setActiveForm("register")}
        className="text-indigo-300 hover:text-indigo-200 cursor-pointer font-gtwalsheim">
          Create one
        </span>
      </motion.p> */}
      <div className="flex flex-col space-y-4 mt-6">
  <button
    type="button"
    onClick={() => setActiveForm("register")}
    className="w-full py-2 text-xl rounded-md font-goldman font-black text-white border-2 border-black uppercase transition-all duration-200 hover:scale-105 [-webkit-text-stroke:0.8px_black] tracking-tighter"
    style={{
      background: "linear-gradient(180deg, #FEE20E 26.5%, #FCD113 36%, #FCD113 64%, #F6BA06 97%)",
      fontWeight: 800,
      fontSize: "18px",
    lineHeight: "100%",
      letterSpacing: "-0.02em",
    }}
  >
    SIGN UP
  </button>

  <button
    type="button"
     onClick={() => setActiveForm("forget")}
    className="w-full py-2 text-xl rounded-md font-goldman font-black text-white border-2 border-black uppercase transition-all duration-200 hover:scale-105 [-webkit-text-stroke:0.8px_black] tracking-tighter"
    style={{
      background: "linear-gradient(180deg, #FEE20E 26.5%, #FCD113 36%, #FCD113 64%, #F6BA06 97%)",
      fontWeight: 800,
      fontSize: "18px",
    lineHeight: "100%",
      letterSpacing: "-0.02em",
    }}
  >
    FORGOT PASSWORD
  </button>
</div> 

    </motion.div>
   </> 
  );
}

export default Login;
