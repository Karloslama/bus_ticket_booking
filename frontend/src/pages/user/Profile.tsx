import React from 'react';
import { Card, Form, Input, Button, message } from 'antd';
import { useSelector } from 'react-redux';
import { UserCircle, Mail, Lock } from 'lucide-react';
import type { RootState } from '../../redux/store';

const Profile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [form] = Form.useForm();

  const handleUpdateProfile = () => {
    message.success('Profile updated successfully');
  };

  const handleChangePassword = () => {
    message.success('Password changed successfully');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Profile Information">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleUpdateProfile}
            initialValues={{
              name: user?.name,
              email: user?.email,
            }}
          >
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input 
                prefix={<UserCircle className="mr-2" size={16} />} 
                placeholder="Enter your full name" 
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
            >
              <Input 
                prefix={<Mail className="mr-2" size={16} />} 
                placeholder="Enter your email"
                disabled 
              />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Update Profile
            </Button>
          </Form>
        </Card>

        <Card title="Change Password">
          <Form
            layout="vertical"
            onFinish={handleChangePassword}
          >
            <Form.Item
              name="currentPassword"
              label="Current Password"
              rules={[{ required: true, message: 'Please input your current password!' }]}
            >
              <Input.Password 
                prefix={<Lock className="mr-2" size={16} />}
                placeholder="Enter current password" 
              />
            </Form.Item>

            <Form.Item
              name="newPassword"
              label="New Password"
              rules={[
                { required: true, message: 'Please input your new password!' },
                { min: 6, message: 'Password must be at least 6 characters!' },
              ]}
            >
              <Input.Password 
                prefix={<Lock className="mr-2" size={16} />}
                placeholder="Enter new password" 
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm New Password"
              dependencies={['newPassword']}
              rules={[
                { required: true, message: 'Please confirm your new password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password 
                prefix={<Lock className="mr-2" size={16} />}
                placeholder="Confirm new password" 
              />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Change Password
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Profile;