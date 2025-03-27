import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  BarChart,
  MessageSquare,
  TicketCheck,
  Bus,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const { user } = useSelector((state: RootState) => state.auth);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const adminMenuItems = [
    {
      path: "/admin/dashboard",
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
    },
    {
      path: "/admin/bookings",
      icon: <TicketCheck size={20} />,
      label: "Bookings",
    },
    { path: "/admin/buses", icon: <Bus size={20} />, label: "Buses" },
    { path: "/admin/users", icon: <Users size={20} />, label: "Customers" },
    { path: "/analytics", icon: <BarChart size={20} />, label: "Analytics" },
    { path: "/messages", icon: <MessageSquare size={20} />, label: "Messages" },
    { path: "/settings", icon: <Settings size={20} />, label: "Settings" },
  ];

  const userMenuItems = [
    {
      path: "/user/dashboard",
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
    },
    { path: "/user/book-bus", icon: <Bus size={20} />, label: "Book Bus" },
    {
      path: "/user/bookings",
      icon: <TicketCheck size={20} />,
      label: "My Bookings",
    },
  ];

  // Select menu items based on user role
  const menuItems = user?.role === "admin" ? adminMenuItems : userMenuItems;

  return (
    <div
      className={`bg-gray-900 text-white h-screen transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      } flex flex-col`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Bus className="text-blue-400" />
            <span className="font-bold text-xl">Booking</span>
          </div>
        )}
        {collapsed && <Bus className="text-blue-400 mx-auto" />}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-full hover:bg-gray-700 focus:outline-none"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-2">
          {menuItems.map((item, index) => (
            <li key={index}>
                
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }`
                }
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {!collapsed && <span className="ml-3">{item.label}</span>}
              </NavLink>
            </li>
            
          ))}
          
        </ul>
      </div>

      <div className="p-4 border-t border-gray-700">
        <button
          className={`flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700 w-full ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <LogOut size={20} />
          {!collapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
