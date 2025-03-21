import React from "react";
import { Form, Input, Button, Card, message, App } from "antd";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Bus } from "lucide-react";
import { login } from "../redux/authSlice";
import type { AppDispatch } from "../redux/store";

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    console.log("Submitting values:", values);

    try {
      const result = await dispatch(login(values)).unwrap();
      console.log("Dispatch Result:", result); // Debug API response

      if (result.token) {
        console.log("Token received:", result.token); // Debug token
        message.success("Login successful!");
        navigate(`/${result.user.role}/dashboard`); // Navigate dynamically based on role
      } else {
        console.log("No token received!");
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <App>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <div className="text-center mb-8">
            <Bus size={48} className="text-primary mx-auto" />
            <h1 className="text-2xl font-bold mt-4">Welcome Back!</h1>
            <p className="text-gray-600">Login to your account</p>
          </div>

          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
            requiredMark={false}
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input size="large" placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password size="large" placeholder="Enter your password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block>
                Login
              </Button>
            </Form.Item>

            <div className="text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary">
                  Register now
                </Link>
              </p>
            </div>
          </Form>
        </Card>
      </div>
    </App>
  );
};

export default Login;
