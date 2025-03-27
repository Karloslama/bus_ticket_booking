import React from "react";
import Sidebar from "./Sidebar";
import AppHeader from "./Header";
import { Outlet } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <AppHeader />
        <div className="flex-1 px-[40px] py-[28px] overflow-auto bg-[#EEEEEE] w-full h-full dark:bg-slate-900">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;

// import React from "react";
// import { Layout as AntLayout, Menu, Button, Avatar, Dropdown } from "antd";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { Bus, UserCircle, Calendar, Users, Home } from "lucide-react";
// import { logout } from "../redux/authSlice";
// import type { RootState } from "../redux/store";

// const { Header, Sider, Content } = AntLayout;

// interface LayoutProps {
//   children: React.ReactNode;
// }

// const Layout: React.FC<LayoutProps> = ({ children }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { user } = useSelector((state: RootState) => state.auth);

//   const isAdmin = user?.role === "admin";

//   const userMenuItems = [
//     {
//       key: "/user/dashboard",
//       icon: <Home size={20} />,
//       label: "Dashboard",
//     },
//     {
//       key: "/user/book-bus",
//       icon: <Bus size={20} />,
//       label: "Book Bus",
//     },
//     {
//       key: "/user/bookings",
//       icon: <Calendar size={20} />,
//       label: "My Bookings",
//     },
//   ];

//   const adminMenuItems = [
//     {
//       key: "/admin/dashboard",
//       icon: <Home size={20} />,
//       label: "Dashboard",
//     },
//     {
//       key: "/admin/buses",
//       icon: <Bus size={20} />,
//       label: "Manage Buses",
//     },
//     {
//       key: "/admin/users",
//       icon: <Users size={20} />,
//       label: "Manage Users",
//     },
//     {
//       key: "/admin/bookings",
//       icon: <Calendar size={20} />,
//       label: "Manage Bookings",
//     },
//   ];

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   const userDropdownItems = {
//     items: [
//       {
//         key: "profile",
//         label: <Link to={`/${user?.role}/profile`}>Profile</Link>,
//       },
//       {
//         key: "logout",
//         label: (
//           <Button type="text" onClick={handleLogout} danger>
//             Logout
//           </Button>
//         ),
//       },
//     ],
//   };

//   return (
//     <AntLayout className="min-h-screen">
//       <Sider theme="light" className="shadow-md" width={250}>
//         <div className="p-4 flex items-center space-x-2">
//           <Bus size={32} className="text-primary" />
//           <span className="text-xl font-semibold">BusBooking</span>
//         </div>
//         <Menu
//           mode="inline"
//           selectedKeys={[location.pathname]}
//           items={isAdmin ? adminMenuItems : userMenuItems}
//           onClick={({ key }) => navigate(key)}
//         />
//       </Sider>
//       <AntLayout>
//         <Header className="bg-white px-4 flex justify-end items-center">
//           <Dropdown menu={userDropdownItems} placement="bottomRight">
//             <div className="flex items-center space-x-2 cursor-pointer">
//               <Avatar icon={<UserCircle />} />
//               <span>{user?.name}</span>
//             </div>
//           </Dropdown>
//         </Header>
//         <Content className="m-6 p-6 bg-white rounded-lg min-h-[280px]">
//           {children}
//         </Content>
//       </AntLayout>
//     </AntLayout>
//   );
// };

// export default Layout;
