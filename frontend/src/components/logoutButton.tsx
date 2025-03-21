import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {

      await dispatch(logout()).unwrap(); // Unwrap the result to check for errors
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout error:", error);
      // Optionally, you can display an error message here
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
