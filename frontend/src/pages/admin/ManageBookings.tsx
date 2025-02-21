import React, { useEffect } from "react";
import { Table, Tag, Button, message, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";

const ManageBookings: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { bookings, loading } = useSelector(
    (state: RootState) => state.booking
  );

  useEffect(() => {
    // Fetch all bookings when component mounts
    // dispatch(fetchAllBookings());
  }, [dispatch]);

  const handleCancelBooking = (bookingId: string) => {
    Modal.confirm({
      title: "Cancel Booking",
      content: "Are you sure you want to cancel this booking?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          // await dispatch(cancelBooking(bookingId)).unwrap();
          message.success("Booking cancelled successfully");
        } catch (error) {
          console.log(error);
          message.error("Failed to cancel booking");
        }
      },
    });
  };

  const columns = [
    {
      title: "Booking ID",
      dataIndex: "id",
      key: "id",
      render: (id: string) => (
        <span className="font-medium">{id.slice(0, 8)}</span>
      ),
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (user: any) => (
        <div>
          <div className="font-medium">{user.name}</div>
          <div className="text-sm text-gray-500">{user.email}</div>
        </div>
      ),
    },
    {
      title: "Bus",
      dataIndex: "bus",
      key: "bus",
      render: (bus: any) => (
        <div>
          <div className="font-medium">{bus.number}</div>
          <div className="text-sm text-gray-500">
            {bus.from} to {bus.to}
          </div>
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const colors = {
          pending: "gold",
          confirmed: "green",
          cancelled: "red",
        };
        return (
          <Tag color={colors[status as keyof typeof colors]}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount: number) => `$${amount}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: any) => (
        <Button
          danger
          disabled={record.status === "cancelled"}
          onClick={() => handleCancelBooking(record.id)}
        >
          Cancel
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Bookings</h1>
      <Table
        columns={columns}
        dataSource={bookings}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default ManageBookings;
