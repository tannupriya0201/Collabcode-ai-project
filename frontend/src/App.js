import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./auth/Login";
import Register from "./auth/Register";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import ResetSuccess from "./auth/ResetSuccess";
import EmailVerified from "./auth/EmailVerified";
import EmailNotVerified from "./auth/EmailNotVerified";
import ProtectedRoute from "./auth/ProtectedRoute";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AuditLogs from "./pages/admin/AuditLogs";
import MentorDashboard from "./pages/mentor/MentorDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentAnalytics from "./pages/student/StudentAnalytics";

import CreateSession from "./features/collaboration/CreateSession";
import Editor from "./features/collaboration/Editor";
import EditTest from "./pages/mentor/EditTest";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* DEFAULT */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* EMAIL */}
        <Route path="/verify-email/:token" element={<EmailVerified />} />
        <Route path="/email-verified/:token" element={<EmailVerified />} />
        <Route path="/email-not-verified" element={<EmailNotVerified />} />
 <Route path="*" element={<Navigate to="/login" replace />} />
        {/* PASSWORD */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/reset-success" element={<ResetSuccess />} />

        {/* COLLABORATION */}
        <Route path="/collab" element={<CreateSession />} />
        <Route path="/collab/:roomId" element={<Editor />} />

        {/* 🔁 ALIAS (SAFE) */}
        <Route path="/collaboration/:roomId" element={<Editor />} />

        {/* ADMIN */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/audit-logs"
          element={
            <ProtectedRoute role="admin">
              <AuditLogs />
            </ProtectedRoute>
          }
        />

        {/* MENTOR */}
        <Route
          path="/mentor"
          element={
            <ProtectedRoute role="mentor">
              <MentorDashboard />
            </ProtectedRoute>
          }
        />
<Route
  path="/mentor/edit-test/:id"
  element={
    <ProtectedRoute role="mentor">
      <EditTest />
    </ProtectedRoute>
  }
/>

        {/* STUDENT */}
        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* 📊 STUDENT ANALYTICS */}
        <Route
          path="/student/analytics"
          element={
            <ProtectedRoute role="student">
              <StudentAnalytics />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
