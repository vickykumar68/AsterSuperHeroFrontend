import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminProtectedRoute from './admin/AdminProtectedRoute';
import { AdminAuthProvider } from './context/AdminAuthContext';
import GetUser from './admin/GetUser';
import AsterHeros from './admin/AsterHeros';

const RootRoutes = () => (
  <BrowserRouter>
    <AdminAuthProvider>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        } />
         <Route path="/admin/dashboard/users" element={
          <AdminProtectedRoute>
            <GetUser />
          </AdminProtectedRoute>
        } />
        <Route path="/*" element={<App />} />

        <Route path="/admin/dashboard/asterheros" element={
          <AdminProtectedRoute>
            <AsterHeros />
          </AdminProtectedRoute>
        } />
        <Route path="/*" element={<App />} />
      </Routes>
    </AdminAuthProvider>
  </BrowserRouter>
);

export default RootRoutes;
