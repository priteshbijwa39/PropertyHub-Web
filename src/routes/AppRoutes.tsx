import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Dashboard from "../pages/dashboard/Dashboard";
import AddProperty from "../pages/dashboard/AddProperty";
import MyProperties from "../pages/dashboard/MyProperties";
import PropertyDetails from "../pages/dashboard/PropertyDetails";
import FavoriteProperties from "../pages/dashboard/FavoriteProperties";
import AllProperties from "../pages/dashboard/AllProperties";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import EditProperties from "../pages/dashboard/EditProperties";
import Profile from "../pages/dashboard/Profile";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Initial Route */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/reset-password" element={<ResetPassword />} />
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-property" element={<AddProperty />} />
          <Route path="/my-properties" element={<MyProperties />} />
          <Route path="/properties/:id" element={<PropertyDetails />} />
          <Route path="/edit-property/:id" element={<EditProperties />} />
          <Route path="/favorites" element={<FavoriteProperties />} />
          <Route path="/all-properties" element={<AllProperties />} />
           <Route path="/Profile" element={<Profile />} />
        </Route>

        {/* Unknown route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
