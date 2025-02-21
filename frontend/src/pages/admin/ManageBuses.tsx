import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  TimePicker,
  DatePicker,
  InputNumber,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchBuses } from "../../redux/busSlice";
import type { AppDispatch, RootState } from "../../redux/store";

const ManageBuses: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { buses, loading } = useSelector((state: RootState) => state.bus);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchBuses({}));
  }, [dispatch]);

  const columns = [
    {
      title: "Bus Number",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
    },
    {
      title: "To",
      dataIndex: "to",
      key: "to",
    },
    {
      title: "Departure Date",
      dataIndex: "departureDate",
      key: "departureDate",
    },
    {
      title: "Departure Time",
      dataIndex: "departureTime",
      key: "departureTime",
    },
    {
      title: "Fare",
      dataIndex: "fare",
      key: "fare",
      render: (fare: number) => `$${fare}`,
    },
    {
      title: "Available Seats",
      key: "availableSeats",
      render: (record: any) => record.capacity - record.seatsBooked.length,
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Button type="link" danger>
          Delete
        </Button>
      ),
    },
  ];

  const handleAddBus = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form.submit();
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const onFinish = (values: any) => {
    console.log("Form values:", values);
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Buses</h1>
        <Button type="primary" onClick={handleAddBus}>
          Add New Bus
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={buses}
        loading={loading}
        rowKey="id"
      />

      <Modal
        title="Add New Bus"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="number"
            label="Bus Number"
            rules={[{ required: true, message: "Please input bus number!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="from"
            label="From"
            rules={[
              { required: true, message: "Please input departure city!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="to"
            label="To"
            rules={[
              { required: true, message: "Please input destination city!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="departureDate"
            label="Departure Date"
            rules={[
              { required: true, message: "Please select departure date!" },
            ]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item
            name="departureTime"
            label="Departure Time"
            rules={[
              { required: true, message: "Please select departure time!" },
            ]}
          >
            <TimePicker className="w-full" />
          </Form.Item>

          <Form.Item
            name="fare"
            label="Fare"
            rules={[{ required: true, message: "Please input fare!" }]}
          >
            <InputNumber
              className="w-full"
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>

          <Form.Item
            name="capacity"
            label="Capacity"
            rules={[{ required: true, message: "Please input capacity!" }]}
          >
            <InputNumber className="w-full" min={1} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageBuses;
