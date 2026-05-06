import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    setLoading(true)
    try {
      const res = await axios.get('/api/v1/superhero/auth/check-auth', { withCredentials: true })
      setIsAuthenticated(true)
      setRole(res.data.user.role)
    } catch (err) {
      setIsAuthenticated(false)
      setRole(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
        const res = await axios.post('/api/v1/superhero/auth/login', { email, password }, { withCredentials: true })
        console.log(res)
        setIsAuthenticated(true)
        setRole(res.data.user.role)
        return res.data.user.role
    } catch (error) {
        console.error('Login error:', error)
    }
  }


  const handleRegisterSubmit = async (values, { setSubmitting, setFieldError, resetForm, setActiveForm, switchForm }) => {
  try {
    const response = await axios.post('/api/v1/superhero/auth/register', values, { withCredentials: true });
    console.log(response)
    setIsAuthenticated(true);
    toast.success("🎉 Registration successful! Please login.", {
      style: {
        background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        borderRadius: "12px",
        fontWeight: "bold",
      },
      onClose: () => {
        
        resetForm();
        //if (setActiveForm) setActiveForm("login");
        //if (switchForm) switchForm("login");
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
}

  const logout = async () => {
   try {
        await axios.post('/api/v1/superhero/auth/logout', {}, { withCredentials: true })
        setIsAuthenticated(false)
        setRole(null)
        return { success: true }
   } catch (error) {
        console.log("logout error", error)
   }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, loading, login, logout,handleRegisterSubmit }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext