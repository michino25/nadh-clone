import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

interface LoginData {
  user_name: string;
  password: string;
}

export default function Login() {
  // const queryClient = useQueryClient();

  const login = async (loginData: LoginData) => {
    try {
      const res = await axios.post(
        "https://lubrytics.com:8443/nadh-api-crm/login",
        loginData
      );

      // console.log(res.data);
      localStorage.setItem("userData", JSON.stringify(res.data));

      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Login failed", error);
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
      <span className="text-4xl font-semibold text-blue-500 mb-10">Login</span>
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
          <Button
            size="large"
            type="primary"
            ghost
            htmlType="submit"
            className="w-full"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
