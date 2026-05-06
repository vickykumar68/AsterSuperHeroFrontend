
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../../context/AuthContext";

const Login = ({ switchForm }) => {

  const { login } = React.useContext(AuthContext)
  const loginSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Min 6 characters").required("Required"),
  });


  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
          try {
            const userRole = await login(values.email, values.password);
            if (userRole !== "user") {
              toast.error("Not a user account", {
                position: "top-center",
                autoClose: 2000,
                theme: "dark",
              });
              setErrors({ form: "Not a user account" });
            } else {
              toast.success("🎉 Login successful! Redirecting...", {
                position: "top-center",
                autoClose: 2000,
                theme: "dark",
              });

              setTimeout(() => {
                resetForm();
                const target = document.getElementById("multistepFrom");
                if (target) {
                  target.scrollIntoView({ behavior: "smooth" });
                }
              }, 2100);
              const formDiv = document.getElementById("userLoginRegForm");
              if (formDiv) {
                formDiv.style.display = "none";
              }
              toast.dismiss();
            }
          } catch (err) {
            let errorMessage = err.response?.data?.message || "Login failed";
            if (errorMessage.toLowerCase().includes("invalid")) {
              errorMessage = "Invalid email or password";
            }
            toast.error(`❌ ${errorMessage}`, {
              position: "top-center",
              autoClose: 3000,
              theme: "dark",
            });
            setErrors({ form: errorMessage });
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form className="space-y-6 px-10" id="loginForm">
            <h2
              className="text-white text-3xl font-goldman font-black mb-6 text-center"
              style={{
                textShadow:
                  "2px 2px 0px rgba(0,0,0,0.4), 1px 1px 0px rgba(0,0,0,0.6)",
                WebkitTextStroke: "1px rgba(0,0,0,0.5)",
              }}
            >
              Login
            </h2>

            {errors.form && (
              <div className="text-red-500 text-sm text-center font-semibold mb-2">
                {errors.form}
              </div>
            )}

            <div>
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className="w-full p-4 rounded-md bg-[#B0CFCD] border-2 border-white text-black"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-400 text-sm mt-1"
              />
            </div>

            <div>
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="w-full p-4 rounded-md bg-[#B0CFCD] border-2 border-white text-black"
              />
              <ErrorMessage
                name="password"
                component="p"
                className="text-red-400 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 text-xl rounded-md font-goldman font-black text-white border-2 border-black uppercase disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 [-webkit-text-stroke:0.6px_black]"
              style={{
                  background: "linear-gradient(180deg, #26B3F7 26.5%, #23AAF8 39.5%, #1C95F9 64%, #1983FA 97%)",
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                  verticalAlign: "middle",
                  fontVariantNumeric: "lining-nums proportional-nums",
                }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  LOGGING IN...
                </span>
              ) : (
                "LOGIN"
              )}
            </button>

            {/* <div className="text-white text-sm flex justify-between mt-4 font-gtwalsheim">
              <button
                type="button"
                onClick={() => switchForm("register")}
                className="underline"
              >
                Create your account
              </button>
              <button
                type="button"
                onClick={() => switchForm("forgot")}
                className="underline"
              >
                Forgot Password?
              </button>
            </div> */}
             {/* New Buttons Section */}
            <div className="flex space-x-10 mt-6">
  <button
    type="button"
   onClick={() => switchForm("register")}
    className="w-full py-3 text-xl rounded-md font-goldman font-black text-white border-2 border-black uppercase transition-all duration-200 hover:scale-105 [-webkit-text-stroke:0.6px_black]"
    style={{
      background: "linear-gradient(180deg, #FEE20E 26.5%, #FCD113 36%, #FCD113 64%, #F6BA06 97%)",
      fontWeight: 900,
      letterSpacing: "-0.02em",
    }}
  >
    SIGN UP
  </button>

  <button
    type="button"
    onClick={() => switchForm("forgot")}
    className="w-full py-3 text-xl rounded-md font-goldman font-black text-white border-2 border-black uppercase transition-all duration-200 hover:scale-105 [-webkit-text-stroke:0.6px_black]"
    style={{
      background: "linear-gradient(180deg, #FEE20E 26.5%, #FCD113 36%, #FCD113 64%, #F6BA06 97%)",
      fontWeight: 900,
      letterSpacing: "-0.02em",
    }}
  >
    FORGOT PASSWORD
  </button>
</div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default Login;
