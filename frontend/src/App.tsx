import React from "react";
import { ConfigProvider } from 'antd';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PublicRoute from "./components/PublicRoute";
import UserDashboard from "./pages/user/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import BookBus from "./pages/user/BookingBus";
import Bookings from "./pages/user/Bookings";
import Profile from "./pages/user/Profile";
import ManageBookings from "./pages/admin/ManageBookings";
import ManageBuses from "./pages/admin/ManageBuses";
import ManageUsers from "./pages/admin/ManageUsers";

const App: React.FC = () => {
  return (
    <>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1677ff',
          borderRadius: 6,
        },
      }}
    ></ConfigProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* public Routes */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Protected User Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/book-bus" element={<BookBus />} />
            <Route path="/user/bookings" element={<Bookings />} />
            <Route path="/user/profile" element={<Profile />} />
          </Route>

          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/buses" element={<ManageBuses />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/bookings" element={<ManageBookings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
