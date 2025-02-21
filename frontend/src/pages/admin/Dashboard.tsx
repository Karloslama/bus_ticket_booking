import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { Bus, Users, Calendar, DollarSign } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = {
    totalBookings: 156,
    totalUsers: 89,
    totalBuses: 12,
    totalRevenue: 15680,
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Bookings"
              value={stats.totalBookings}
              prefix={<Calendar className="mr-2" />}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Users"
              value={stats.totalUsers}
              prefix={<Users className="mr-2" />}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Buses"
              value={stats.totalBuses}
              prefix={<Bus className="mr-2" />}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={stats.totalRevenue}
              prefix={<DollarSign className="mr-2" />}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            />
          </Card>
        </Col>
      </Row>

      {/* Add charts and other dashboard components here */}
    </div>
  );
};

export default Dashboard;