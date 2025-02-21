import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate, Outlet } from "react-router-dom";
import Layout from "./Layout";

interface ProtectedRouteProps {
  role: "user" | "admin";
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role }) => {
  const { user, token } = useSelector((state: RootState) => state.auth);
  if (!token) {
    return <Navigate to="/login" />;
  }
  if (user?.role !== role) {
    return <Navigate to={`/${user?.role}/dashboard`} />;
  }
  return;
  <Layout>
    <Outlet />
  </Layout>;
};

export default ProtectedRoute;
