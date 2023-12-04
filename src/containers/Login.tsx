import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Typography, Card, Button, Form, Input, Space, Spin } from "antd";
import { useMutation } from "@tanstack/react-query";
import { notification } from "antd";
import { useState } from "react";
import { userApi } from "apis/index";

interface LoginData {
  user_name: string;
  password: string;
}

export default function Login() {
  const [loading, setLoading] = useState(false);
  const login = async (loginData: LoginData) => {
    try {
      setLoading(true);
      const res = await userApi.login(loginData);
      notification.success({
        message: "Login Success",
        description: "You have successfully logged in.",
      });
      localStorage.setItem("userData", JSON.stringify(res.data));

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } catch (error: any) {
      console.error(error);
      notification.error({
        message: "Login Failed",
        description: `Login failed. ${
          error.response.data[0].message || "Please try again."
        }`,
      });
    } finally {
      setLoading(false);
    }
  };

  const loginMutation = useMutation({
    mutationFn: (formData: LoginData) => login(formData),
  });

  const onFinish = (values: any) => {
    loginMutation.mutate(values);

    // console.log("Received values of form: ", values); // {username: 'a', password: 'a'}
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Card style={{ padding: 20 }}>
        <Space direction="vertical" style={{ marginBottom: 20 }}>
          <Typography.Title style={{ marginBottom: 0 }} level={2}>
            Login
          </Typography.Title>
          <Typography.Text>Sign in to your account</Typography.Text>
        </Space>

        <Form className="w-[400px]" onFinish={onFinish}>
          <Form.Item
            name="user_name"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button size="large" type="primary" htmlType="submit">
              Log in
            </Button>
            <Spin className="ml-5" spinning={loading}></Spin>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}