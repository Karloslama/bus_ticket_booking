import React, { useEffect } from 'react';
import { Card, Table, Tag, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBookings, cancelBooking } from '../../redux/bookingSlice';
import type { AppDispatch, RootState } from '../../redux/store';

const Bookings: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { bookings, loading } = useSelector((state: RootState) => state.booking);

  useEffect(() => {
    dispatch(fetchUserBookings());
  }, [dispatch]);

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await dispatch(cancelBooking(bookingId)).unwrap();
      message.success('Booking cancelled successfully');
    } catch (error) {
      console.log(error)
      message.error('Failed to cancel booking');
    }
  };

  const columns = [
    {
      title: 'Booking ID',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => <span className="font-medium">{id.slice(0, 8)}</span>,
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors = {
          pending: 'gold',
          confirmed: 'green',
          cancelled: 'red',
        };
        return (
          <Tag color={colors[status as keyof typeof colors]}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount: number) => `$${amount}`,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Button 
          danger 
          disabled={record.status !== 'confirmed'} 
          onClick={() => handleCancelBooking(record.id)}
        >
          Cancel
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      <Card>
        <Table
          columns={columns}
          dataSource={bookings}
          loading={loading}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default Bookings;