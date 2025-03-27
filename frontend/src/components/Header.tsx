import React, { useState } from "react";
import { Bell, Search, User, Settings, HelpCircle, Link, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { RootState } from "../redux/store";

const Header: React.FC = () => {
  const [notifications, setNotifications] = useState(3);
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };
  const userDropdownItems = {
    items: [
      {
        key: "profile",
        label: <Link to={`/${user?.role}/profile`}>Profile</Link>,
      },
      {
        key: "logout",
        label: (
          <LogOut type="text" onClick={handleLogout} size={10} className="color-red-500">
            Logout
          </LogOut>
        ),
      },
    ],
  };

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <div className="flex-1">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100 relative">
          <Bell size={20} />
          {notifications > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {notifications}
            </span>
          )}
        </button>

        <button className="p-2 rounded-full hover:bg-gray-100">
          <HelpCircle size={20} />
        </button>

        <button className="p-2 rounded-full hover:bg-gray-100">
          <Settings size={20} />
        </button>

        <div className="flex items-center space-x-3 ml-2">
          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
            <User size={20} />
          </div>
          <div className="hidden md:block">
            <p className="font-medium text-sm">John Doe</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
