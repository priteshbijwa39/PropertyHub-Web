import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Dashboard from "../pages/dashboard/Dashboard";
import AddProperty from "../pages/dashboard/AddProperty";
import MyProperties from "../pages/dashboard/MyProperties";
import PropertyDetails from "../pages/dashboard/PropertyDetails";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/add-property" element={<AddProperty />} />
        <Route path="/my-properties" element={<MyProperties />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
