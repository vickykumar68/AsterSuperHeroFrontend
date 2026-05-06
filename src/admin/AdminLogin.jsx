import React, { useContext, useState, useEffect } from "react";
import { AdminAuthContext } from "../context/AdminAuthContext";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AdminLogin = () => {
  const { login, role } = useContext(AdminAuthContext); // include role
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // Navigate automatically when role becomes 'admin'
  useEffect(() => {
    if (role === "admin") {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [role, navigate]);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setError("");
    try {
      await login(values.email, values.password); // role is updated in context
      // No need to navigate here; useEffect handles it
    } catch {
      setError("Login failed. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Left side image */}
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: "url('/src/assets/Hero-DataBase.png')" }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      {/* Right side login */}
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-4">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-sm border-4 border-gray-500">
              <h2 className="text-3xl font-bold mb-6 text-center text-yellow-500">
                ADMIN ACCESS
              </h2>

              {error && <div className="text-red-400 mb-4 text-center">{error}</div>}

              <div className="mb-4">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="w-full p-3 rounded-md bg-gray-700 text-white border-2 border-transparent 
                            focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
                />
                <ErrorMessage name="email" component="div" className="text-red-400 text-sm mt-1" />
              </div>

              <div className="mb-6">
                <Field
                  type="password"
                  name="password"
                  placeholder="Secret Passcode"
                  className="w-full p-3 rounded-md bg-gray-700 text-white border-2 border-transparent 
                            focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
                />
                <ErrorMessage name="password" component="div" className="text-red-400 text-sm mt-1" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-500 text-gray-900 font-bold py-3 rounded-md 
                           hover:bg-yellow-600 transition-colors duration-300 disabled:opacity-50"
              >
                {isSubmitting ? "Activating..." : "Activate Portal"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AdminLogin;

