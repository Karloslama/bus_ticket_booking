import React from "react";
import StatCard from "../../components/StatCard";
import RecentOrders from "../../components/RecentOrders";
import SalesChart from "../../components/SalesChart";
import RecentActivity from "../../components/RecentActivity";
import { DollarSign, ShoppingCart, Users, Package } from "lucide-react";

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Welcome back, John Doe</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Revenue"
          value="$24,780"
          change="12.5%"
          isPositive={true}
          icon={<DollarSign className="text-white" size={24} />}
          color="bg-blue-500"
        />
        <StatCard
          title="Orders"
          value="1,243"
          change="8.3%"
          isPositive={true}
          icon={<ShoppingCart className="text-white" size={24} />}
          color="bg-green-500"
        />
        <StatCard
          title="Customers"
          value="845"
          change="5.7%"
          isPositive={true}
          icon={<Users className="text-white" size={24} />}
          color="bg-purple-500"
        />
        <StatCard
          title="Products"
          value="128"
          change="2.1%"
          isPositive={false}
          icon={<Package className="text-white" size={24} />}
          color="bg-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>

      <div className="mb-6">
        <RecentOrders />
      </div>
    </div>
  );
};

export default Dashboard;

// import React from 'react';
// import { Card, Row, Col, Statistic } from 'antd';
// import { Bus, Users, Calendar, DollarSign } from 'lucide-react';

// const Dashboard: React.FC = () => {
//   const stats = {
//     totalBookings: 156,
//     totalUsers: 89,
//     totalBuses: 12,
//     totalRevenue: 15680,
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

//       <Row gutter={[16, 16]}>
//         <Col xs={24} sm={12} lg={6}>
//           <Card>
//             <Statistic
//               title="Total Bookings"
//               value={stats.totalBookings}
//               prefix={<Calendar className="mr-2" />}
//             />
//           </Card>
//         </Col>

//         <Col xs={24} sm={12} lg={6}>
//           <Card>
//             <Statistic
//               title="Total Users"
//               value={stats.totalUsers}
//               prefix={<Users className="mr-2" />}
//             />
//           </Card>
//         </Col>

//         <Col xs={24} sm={12} lg={6}>
//           <Card>
//             <Statistic
//               title="Total Buses"
//               value={stats.totalBuses}
//               prefix={<Bus className="mr-2" />}
//             />
//           </Card>
//         </Col>

//         <Col xs={24} sm={12} lg={6}>
//           <Card>
//             <Statistic
//               title="Total Revenue"
//               value={stats.totalRevenue}
//               prefix={<DollarSign className="mr-2" />}
//               formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
//             />
//           </Card>
//         </Col>
//       </Row>

//       {/* Add charts and other dashboard components here */}
//     </div>
//   );
// };

// export default Dashboard;
