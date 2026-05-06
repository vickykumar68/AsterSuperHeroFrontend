
import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const ForgotPassword = ({ switchForm }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [timer, setTimer] = useState(300);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (step === 2 && timer > 0) {
      const countdown = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [step, timer]);

  const formatTime = (sec) => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;

  // Send OTP
  const handleSendOtp = async (values) => {
    setError("");
    setMessage("");
    try {
      await axios.post("/api/v1/superhero/auth/forgot-password", { email: values.email });
      setEmail(values.email);
      setStep(2);
      setTimer(300);
      setMessage("OTP sent to your email");
    } catch (err) {
      setError(err.response?.data?.message || "Error sending OTP");
    }
  };

  // Verify OTP
  const handleVerifyOtp = async (values) => {
    setError("");
    setMessage("");
    try {
      await axios.post("/api/v1/superhero/auth/verify-otp", { email, otp: values.otp });
      setOtp(values.otp);
      setStep(3);
      setMessage("OTP verified. Set your new password.");
      setTimer(0);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    }
  };

  // Reset Password
  const handleResetPassword = async (values) => {
    setError("");
    setMessage("");
    try {
      await axios.post("/api/v1/superhero/auth/reset-password", { email, newPassword: values.password, otp });
      setMessage("Password reset successful!");
      setTimeout(() => switchForm("login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <>
      {step === 1 && (
        <Formik
          initialValues={{ email: "" }}
          validationSchema={Yup.object({ email: Yup.string().email("Invalid").required("Required") })}
          onSubmit={handleSendOtp}
        >
          <Form className="space-y-6 px-10">
            <h2
              className="text-white text-3xl font-goldman font-black mb-6 text-center"
              style={{
                textShadow:
                  "2px 2px 0px rgba(0,0,0,0.4), 1px 1px 0px rgba(0,0,0,0.6)",
                WebkitTextStroke: "1px rgba(0,0,0,0.5)",
              }}
            >
              FORGOT PASSWORD
            </h2>
            {/* <h2 className="text-white text-3xl font-black font-goldman text-center">Reset Password</h2> */}
            {error && <p className="text-red-400 text-sm font-gtwalsheim">{error}</p>}
            {message && <p className="text-green-400 text-sm font-gtwalsheim">{message}</p>}
            <Field name="email" type="email" placeholder="Enter Email" className="w-full p-4 font-gtwalsheim rounded-md bg-[#B0CFCD] border-2 border-white" />
            <ErrorMessage name="email" component="p" className="text-red-400 text-sm font-gtwalsheim" />
            <button
             style={{
                  background: "linear-gradient(180deg, #26B3F7 26.5%, #23AAF8 39.5%, #1C95F9 64%, #1983FA 97%)",
                  fontWeight: 900,
                  verticalAlign: "middle",
                  fontVariantNumeric: "lining-nums proportional-nums",
                }}
             type="submit" 
             className="w-full py-3 bg-blue-500 text-white rounded-md font-gtwalsheim">Send OTP</button>
            <button type="button" className="underline text-white w-full font-gtwalsheim" onClick={() => switchForm("login")}>Back to Login</button>
          </Form>
        </Formik>
      )}

      {step === 2 && (
        <Formik
          initialValues={{ otp: "" }}
          validationSchema={Yup.object({ otp: Yup.string().length(6, "6 digits").required("Required") })}
          onSubmit={handleVerifyOtp}
        >
          <Form className="space-y-6 px-10">
            <h2
              className="text-white text-3xl font-goldman font-black mb-6 text-center"
              style={{
                textShadow:
                  "2px 2px 0px rgba(0,0,0,0.4), 1px 1px 0px rgba(0,0,0,0.6)",
                WebkitTextStroke: "1px rgba(0,0,0,0.5)",
              }}
            >
              FORGOT PASSWORD
            </h2>
            <h2 className="text-white text-3xl font-black font-goldman text-center">Verify OTP</h2>
            {error && <p className="text-red-400 text-sm font-gtwalsheim">{error}</p>}
            {message && <p className="text-green-400 text-sm font-gtwalsheim">{message}</p>}
            <Field name="otp" placeholder="Enter 6-digit OTP" className="w-full font-gtwalsheim p-4 rounded-md bg-[#B0CFCD] border-2 border-white" />
            <ErrorMessage name="otp" component="p" className="text-red-400 text-sm" />
            <p className="text-white font-gtwalsheim text-center">{timer > 0 ? `Expires in ${formatTime(timer)}` : "OTP expired"}</p>
            <button 
              style={{
                  background: "linear-gradient(180deg, #26B3F7 26.5%, #23AAF8 39.5%, #1C95F9 64%, #1983FA 97%)",
                  fontWeight: 900,
                  verticalAlign: "middle",
                  fontVariantNumeric: "lining-nums proportional-nums",
                }}
              type="submit" 
              className="w-full font-gtwalsheim py-3 bg-blue-500 text-white rounded-md">Verify</button>
            <button type="button" className="underline font-gtwalsheim text-white w-full" onClick={() => { setTimer(300); handleSendOtp({ email }); }}>Resend OTP</button>
          </Form>
        </Formik>
      )}

      {step === 3 && (
        <Formik
          initialValues={{ password: "" }}
          validationSchema={Yup.object({ password: Yup.string().min(6).required("Required") })}
          onSubmit={handleResetPassword}
        >
          <Form className="space-y-6 px-10">
            <h2
              className="text-white text-3xl font-goldman font-black mb-6 text-center"
              style={{
                textShadow:
                  "2px 2px 0px rgba(0,0,0,0.4), 1px 1px 0px rgba(0,0,0,0.6)",
                WebkitTextStroke: "1px rgba(0,0,0,0.5)",
              }}
            >
              FORGOT PASSWORD
            </h2>
            <h2 className="text-white text-3xl font-bold text-center">Set New Password</h2>
            {error && <p className="text-red-400 text-sm font-gtwalsheim">{error}</p>}
            {message && <p className="text-green-400 text-sm font-gtwalsheim">{message}</p>}
            <Field name="password" type="password" placeholder="New Password" className="w-full font-gtwalsheim p-4 rounded-md bg-[#B0CFCD] border-2 border-white" />
            <ErrorMessage name="password" component="p" className="text-red-400 text-sm font-gtwalsheim" />
            <button type="submit" className="w-full py-3 bg-blue-500 text-white font-gtwalsheim rounded-md">Reset Password</button>
          </Form>
        </Formik>
      )}
    </>
  );
};

export default ForgotPassword;
