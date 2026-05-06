// utils/formSubmit.js
import axios from 'axios';
import { toast } from 'react-toastify';

export const handleRegisterSubmit = async (values, { setSubmitting, setFieldError, resetForm, setActiveForm, switchForm }) => {
  try {
    const response = await axios.post('/api/v1/superhero/auth/register', values, { withCredentials: true });
    console.log(response)
    
    toast.success("🎉 Registration successful! Please login.", {
      style: {
        background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        borderRadius: "12px",
        fontWeight: "bold",
      },
      onClose: () => {
        resetForm();
        if (setActiveForm) setActiveForm("login");
        if (switchForm) switchForm("login");
      }
    });
    
  } catch (err) {
    const errorMessage = err.response?.data?.message || 'Registration failed';
    
    toast.error(`❌ ${errorMessage}`, {
      style: {
        background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)",
        borderRadius: "12px",
        fontWeight: "bold",
      },
    });
    
    setFieldError('general', errorMessage);
  }
  setSubmitting(false);
};