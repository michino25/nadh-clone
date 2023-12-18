import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Typography, Card, Button, Form, Input, Space, Checkbox } from "antd";
import { useMutation } from "@tanstack/react-query";
import { notification } from "antd";
import { useEffect, useState } from "react";
import { userApi } from "apis/index";
import { getUser } from "utils/getUser";
import { useNavigate } from "react-router-dom";
import {
  candidateTable,
  clientTable,
  jobTable,
  userTable,
} from "_constants/index";
import { initFilter } from "utils/filter";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  let defaultAccount;
  if (localStorage.getItem("rememberLogin")) {
    defaultAccount = JSON.parse(
      localStorage.getItem("rememberLogin") as string
    );
  }

  console.log(defaultAccount);

  const login = async (loginData: any) => {
    try {
      setLoading(true);
      const res = await userApi.login(loginData);
      notification.success({
        message: "Login Success",
        description: "You have successfully logged in.",
      });
      localStorage.setItem("userData", JSON.stringify(res.data));

      loginData.remember &&
        localStorage.setItem("rememberLogin", JSON.stringify(loginData));

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
    mutationFn: (formData: any) => login(formData),
  });

  const onFinish = (values: any) => {
    loginMutation.mutate(values);

    // console.log("Received values of form: ", values); // {username: 'a', password: 'a'}
  };

  useEffect(() => {
    const loggedInUser = getUser();
    if (loggedInUser?.token) {
      navigate("/");
    }

    // init filter
    initFilter(userTable);
    initFilter(clientTable);
    initFilter(candidateTable);
    initFilter(jobTable);
  }, []);

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
            initialValue={defaultAccount?.user_name}
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
              disabled={loading}
            />
          </Form.Item>
          <Form.Item
            name="password"
            initialValue={defaultAccount?.password}
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
              disabled={loading}
            />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            initialValue={defaultAccount?.remember}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
