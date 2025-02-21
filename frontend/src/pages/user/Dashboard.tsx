import React from 'react';
import { Row, Col, Card, Button } from 'antd';
import { Link } from 'react-router-dom';
import { Bus, Calendar, MapPin } from 'lucide-react';

const UserDashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Welcome Back!</h1>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card
            hoverable
            className="text-center"
            cover={
              <div className="p-6 bg-blue-50">
                <Bus size={48} className="mx-auto text-blue-500" />
              </div>
            }
          >
            <h3 className="text-lg font-semibold mb-4">Book a Bus</h3>
            <Button type="primary" block>
              <Link to="/user/book-bus">Book Now</Link>
            </Button>
          </Card>
        </Col>
        
        <Col xs={24} md={8}>
          <Card
            hoverable
            className="text-center"
            cover={
              <div className="p-6 bg-green-50">
                <Calendar size={48} className="mx-auto text-green-500" />
              </div>
            }
          >
            <h3 className="text-lg font-semibold mb-4">My Bookings</h3>
            <Button type="primary" block>
              <Link to="/user/bookings">View Bookings</Link>
            </Button>
          </Card>
        </Col>
        
        <Col xs={24} md={8}>
          <Card
            hoverable
            className="text-center"
            cover={
              <div className="p-6 bg-purple-50">
                <MapPin size={48} className="mx-auto text-purple-500" />
              </div>
            }
          >
            <h3 className="text-lg font-semibold mb-4">Popular Routes</h3>
            <Button type="primary" block>
              Explore Routes
            </Button>
          </Card>
        </Col>
      </Row>

      <Card className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Quick Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>Book your tickets in advance for better seat selection</li>
          <li>Check your booking details before making payment</li>
          <li>Download your e-ticket for hassle-free travel</li>
          <li>Arrive at least 30 minutes before departure</li>
        </ul>
      </Card>
    </div>
  );
};

export default UserDashboard;