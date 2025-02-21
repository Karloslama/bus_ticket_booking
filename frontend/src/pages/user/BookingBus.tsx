import React, { useState } from "react";
import { Form, DatePicker, Select, Button, Card, List, Badge } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Bus, Clock, DollarSign } from "lucide-react";
import { fetchBuses } from "../../redux/busSlice";
import type { AppDispatch, RootState } from "../../redux/store";

const { Option } = Select;

const cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
];

const BookingBus: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { buses, loading } = useSelector((state: RootState) => state.bus);
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    dispatch(
      fetchBuses({
        from: values.from,
        to: values.to,
        date: values.date.format("YYYY-MM-DD"),
      })
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Book a Bus</h1>

      <Card className="mb-6">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Form.Item
              name="from"
              label="From"
              rules={[
                { required: true, message: "Please select departure city!" },
              ]}
            >
              <Select placeholder="Select departure city">
                {cities.map((city) => (
                  <Option key={city} value={city}>
                    {city}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="to"
              label="To"
              rules={[
                { required: true, message: "Please select destination city!" },
              ]}
            >
              <Select placeholder="Select destination city">
                {cities.map((city) => (
                  <Option key={city} value={city}>
                    {city}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="date"
              label="Date"
              rules={[{ required: true, message: "Please select date!" }]}
            >
              <DatePicker className="w-full" />
            </Form.Item>
          </div>

          <Button type="primary" htmlType="submit" loading={loading}>
            Search Buses
          </Button>
        </Form>
      </Card>

      <List
        loading={loading}
        dataSource={buses}
        renderItem={(bus) => (
          <Card className="mb-4 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <Bus className="mr-2 text-blue-500" />
                  <h3 className="text-lg font-semibold">{bus.number}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">
                      <span className="font-medium">From:</span> {bus.from}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">To:</span> {bus.to}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">
                      <Clock className="inline-block mr-1" size={16} />
                      {bus.departureTime}
                    </p>
                    <p className="text-gray-600">
                      <DollarSign className="inline-block mr-1" size={16} />
                      {bus.fare}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 md:mt-0 md:ml-6">
                <Badge
                  count={`${bus.capacity - bus.seatsBooked.length} seats left`}
                />
                <Button type="primary" className="mt-2">
                  Book Now
                </Button>
              </div>
            </div>
          </Card>
        )}
      />
    </div>
  );
};

export default BookingBus;
