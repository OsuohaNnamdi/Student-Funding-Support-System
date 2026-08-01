import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { ConfirmProvider } from './context/ConfirmContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import { ROLES } from './constants/roles';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

import ScholarshipsPage from './pages/scholarships/ScholarshipsPage';
import MyApplicationsPage from './pages/student/MyApplicationsPage';
import PricingPage from './pages/pricing/PricingPage';
import AccessRequestPage from './pages/AccessRequestPage';

import ManageScholarshipsPage from './pages/admin/ManageScholarshipsPage';
import ManageFundsPage from './pages/admin/ManageFundsPage';
import ApplicationsReviewPage from './pages/admin/ApplicationsReviewPage';
import AccessRequestsReviewPage from './pages/admin/AccessRequestsReviewPage';

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <ConfirmProvider>
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route element={<Layout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/pricing" element={<PricingPage />} />
                  <Route path="/scholarships" element={<ScholarshipsPage />} />

                  <Route path="/applications/mine" element={<ProtectedRoute><MyApplicationsPage /></ProtectedRoute>} />
                  <Route path="/access-requests" element={<ProtectedRoute><AccessRequestPage /></ProtectedRoute>} />

                  <Route path="/admin/applications" element={<ProtectedRoute allow={[ROLES.ADMIN]}><ApplicationsReviewPage /></ProtectedRoute>} />
                  <Route path="/admin/scholarships" element={<ProtectedRoute allow={[ROLES.ADMIN]}><ManageScholarshipsPage /></ProtectedRoute>} />
                  <Route path="/admin/funds" element={<ProtectedRoute allow={[ROLES.ADMIN]}><ManageFundsPage /></ProtectedRoute>} />
                  <Route path="/admin/access-requests" element={<ProtectedRoute allow={[ROLES.ADMIN]}><AccessRequestsReviewPage /></ProtectedRoute>} />

                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </ConfirmProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
