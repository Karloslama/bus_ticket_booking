import React, { useEffect, useState } from 'react';
import { Button, Card, Modal, Row, Col, Tag, Divider, Spin } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Bus, Clock, MapPin, Calendar, DollarSign, Users } from 'lucide-react';
import { fetchBuses } from '../redux/busSlice';
import type { AppDispatch, RootState } from '../redux/store';

interface BusDetails {
  id: string;
  number: string;
  from: string;
  to: string;
  departureDate: string;
  departureTime: string;
  fare: number;
  capacity: number;
  seatsBooked: string[];
}

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { buses = [], loading } = useSelector((state: RootState) => state.bus);
  const { user } = useSelector((state: RootState) => state.auth);
  const [selectedBus, setSelectedBus] = useState<BusDetails | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchBuses({}));
  }, [dispatch]);

  const handleBookNow = (bus: BusDetails) => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/user/book-bus');
    }
  };

  const showBusDetails = (bus: BusDetails) => {
    setSelectedBus(bus);
    setIsModalVisible(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4">
        <nav className="py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Bus size={32} className="text-primary" />
            <span className="text-xl font-semibold">BusBooking</span>
          </div>
          <div className="space-x-4">
            <Link to="/login">
              <Button type="link">Login</Button>
            </Link>
            <Link to="/register">
              <Button type="primary">Register</Button>
            </Link>
          </div>
        </nav>

        <div className="py-20">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Book Your Bus Tickets with Ease
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Travel anywhere in the country with our extensive network of bus routes.
              Book your tickets online and enjoy a comfortable journey.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Spin size="large" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.isArray(buses) && buses.map((bus) => (
                <Card 
                  key={bus.id}
                  hoverable 
                  className="transition-shadow duration-300 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Bus {bus.number}</h3>
                    <Tag color="blue">{bus.capacity - bus.seatsBooked.length} seats left</Tag>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin size={18} className="mr-2" />
                      <span>{bus.from} → {bus.to}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar size={18} className="mr-2" />
                      <span>{new Date(bus.departureDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock size={18} className="mr-2" />
                      <span>{bus.departureTime}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <DollarSign size={18} className="mr-2" />
                      <span>${bus.fare}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button type="default" block onClick={() => showBusDetails(bus)}>
                      View Details
                    </Button>
                    <Button type="primary" block onClick={() => handleBookNow(bus)}>
                      Book Now
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="py-16 bg-white rounded-lg mt-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="text-blue-500" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-600">
                  Our customer support team is available round the clock to assist you.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="text-green-500" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Wide Network</h3>
                <p className="text-gray-600">
                  Extensive network covering all major cities and towns.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="text-purple-500" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
                <p className="text-gray-600">
                  Competitive prices with regular discounts and offers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Bus Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
          <Button 
            key="book" 
            type="primary" 
            onClick={() => handleBookNow(selectedBus!)}
          >
            Book Now
          </Button>
        ]}
        width={600}
      >
        {selectedBus && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Bus {selectedBus.number}</h3>
              <Tag color="blue">
                {selectedBus.capacity - selectedBus.seatsBooked.length} seats available
              </Tag>
            </div>

            <Divider />

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <MapPin size={18} className="mr-2" />
                    <div>
                      <div className="font-medium">From</div>
                      <div>{selectedBus.from}</div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <MapPin size={18} className="mr-2" />
                    <div>
                      <div className="font-medium">To</div>
                      <div>{selectedBus.to}</div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            <Divider />

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Calendar size={18} className="mr-2" />
                    <div>
                      <div className="font-medium">Departure Date</div>
                      <div>{new Date(selectedBus.departureDate).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Clock size={18} className="mr-2" />
                    <div>
                      <div className="font-medium">Departure Time</div>
                      <div>{selectedBus.departureTime}</div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            <Divider />

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <DollarSign size={18} className="mr-2" />
                    <div>
                      <div className="font-medium">Fare</div>
                      <div>${selectedBus.fare}</div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Users size={18} className="mr-2" />
                    <div>
                      <div className="font-medium">Total Capacity</div>
                      <div>{selectedBus.capacity} seats</div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            <Divider />

            <div>
              <h4 className="font-medium mb-2">Amenities</h4>
              <div className="flex flex-wrap gap-2">
                <Tag>Air Conditioned</Tag>
                <Tag>Comfortable Seats</Tag>
                <Tag>Water Bottle</Tag>
                <Tag>Emergency Exit</Tag>
                <Tag>First Aid Kit</Tag>
                <Tag>GPS Tracking</Tag>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Home;