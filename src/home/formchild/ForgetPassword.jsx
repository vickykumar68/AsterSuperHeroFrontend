import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { motion } from "framer-motion";

// Validation Schemas
const emailSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
});

const otpSchema = Yup.object({
  otp: Yup.string()
    .matches(/^\d{6}$/, "Must be exactly 6 digits")
    .required("Required"),
});

const resetSchema = Yup.object({
  newPassword: Yup.string().min(6, "Min 6 chars").required("Required"),
});

const ForgetPassword = ({ setActiveForm = () => {} }) => {
  const [step, setStep] = React.useState(1);
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [timeRemaining, setTimeRemaining] = React.useState(0);
  const [timerActive, setTimerActive] = React.useState(false);
  const [verifiedOtp, setVerifiedOtp] = React.useState("");

  // Timer logic
  React.useEffect(() => {
    let interval;
    if (timerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeRemaining]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleResend = async () => {
    try {
      await axios.post("/api/v1/superhero/auth/forgot-password", { email });
      setMessage("OTP resent to your email");
      setTimeRemaining(300);
      setTimerActive(true);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Error resending OTP");
    }
  };

  return (
    <motion.div
      key={step}
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="relative z-10 bg-gradient-to-b from-[#050313] via-[#18164C] to-[#25276B] 
                 text-white rounded-xl shadow-lg w-[95%] sm:w-[90%] max-w-sm 
                 p-6 mb-14 -top-10 ml-[3px]"
    >
      {step === 1 && (
        <Formik
          initialValues={{ email: "" }}
          validationSchema={emailSchema}
          onSubmit={async (values) => {
            try {
              await axios.post("/api/v1/superhero/auth/forgot-password", values);
              setEmail(values.email);
              setMessage("OTP sent to your email");
              setStep(2);
              setTimeRemaining(300);
              setTimerActive(true);
              setError("");
            } catch (err) {
              setError(err.response?.data?.message || "Error sending OTP");
            }
          }}
        >
          <Form className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-center">Forgot Password</h2>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            {message && <p className="text-green-400 text-sm">{message}</p>}

            <div>
              <label className="block text-sm mb-1"></label>
              <Field
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 rounded-md text-black bg-[#B0CFCD] border-2 border-white placeholder-[#0B0923] font-gtwalsheim"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-400 text-xs mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-md bg-indigo-600 hover:bg-indigo-500"
            >
              Send OTP
            </button>

            <p
              className="text-xs text-center cursor-pointer text-indigo-300 mt-2"
              onClick={() => setActiveForm("login")}
            >
              Back to Login
            </p>
          </Form>
        </Formik>
      )}

      {step === 2 && (
        <Formik
          initialValues={{ otp: "" }}
          validationSchema={otpSchema}
          onSubmit={async (values) => {
            try {
              await axios.post("/api/v1/superhero/auth/verify-otp", {
                email,
                otp: values.otp,
              });
              setMessage("OTP verified successfully");
              setVerifiedOtp(values.otp); // Store OTP for reset step
              setStep(3);
              setTimerActive(false);
              setError("");
            } catch (err) {
              setError(err.response?.data?.message || "Invalid OTP");
            }
          }}
        >
          <Form className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-center">Enter OTP</h2>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            {message && <p className="text-green-400 text-sm">{message}</p>}

            <div>
              <label className="block text-sm mb-1"></label>
              <Field
                type="text"
                name="otp"
                placeholder="Enter OTP"
                maxLength={6}
                className="w-full px-3 py-2 rounded-md text-black bg-[#B0CFCD] border-2 border-white placeholder-[#0B0923] font-gtwalsheim"
              />
              <ErrorMessage
                name="otp"
                component="p"
                className="text-red-400 text-xs mt-1"
              />
            </div>

            {timeRemaining > 0 ? (
              <p className="text-xs text-gray-300">
                Expires in: {formatTime(timeRemaining)}
              </p>
            ) : (
              <p className="text-xs text-red-400">
                OTP expired. Please resend.
              </p>
            )}

            <button
              type="submit"
              className="w-full py-2 rounded-md bg-indigo-600 hover:bg-indigo-500"
            >
              Verify OTP
            </button>

            <button
              type="button"
              onClick={handleResend}
              disabled={timeRemaining > 0}
              className={`w-full py-2 rounded-md ${
                timeRemaining > 0
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-indigo-500 hover:bg-indigo-400"
              }`}
            >
              Resend OTP
            </button>
          </Form>
        </Formik>
      )}

      {step === 3 && (
        <Formik
          initialValues={{ newPassword: "" }}
          validationSchema={resetSchema}
          onSubmit={async (values) => {
            try {
              await axios.post("/api/v1/superhero/auth/reset-password", {
                email,
                newPassword: values.newPassword,
                otp: verifiedOtp,
              });
              setMessage("Password reset successfully");
              setError("");
              setActiveForm("login");
            } catch (err) {
              setError(err.response?.data?.message || "Reset failed");
            }
          }}
        >
          <Form className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-center">
              Reset Password
            </h2>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            {message && <p className="text-green-400 text-sm">{message}</p>}

            <div>
              <label className="block text-sm mb-1"></label>
              <Field
                type="password"
                name="newPassword"
                placeholder="Enter your New Password"
                className="w-full px-3 py-2 rounded-md text-black bg-[#B0CFCD] border-2 border-white placeholder-[#0B0923] font-gtwalsheim"
              />
              <ErrorMessage
                name="newPassword"
                component="p"
                className="text-red-400 text-xs mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-md bg-[#B0CFCD] border-2 border-white hover:bg-indigo-500 "
            >
              Reset Password
            </button>
          </Form>
        </Formik>
      )}
    </motion.div>
  );
};

export default ForgetPassword;