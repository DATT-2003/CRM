import { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import authApi from "../../features/auth/authApi";
import type { LoginFormValues, LoginResponse } from "../../features/auth/authTypes";
import { AxiosError } from "axios";
import { setAuth } from "../../utils/auth"; // ✅ dùng utils để lưu token

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const redirectByRole = (role: LoginResponse["role"]) => {
    switch (role) {
      case "ADMIN":
      case "MANAGER":
        return "/dashboard";
      case "SALES":
        return "/customers";
      default:
        return "/";
    }
  };

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      const data = await authApi.login(values);
      setAuth(data);
      message.success("Đăng nhập thành công");
      navigate(redirectByRole(data.role), { replace: true }); // ✅ dùng navigate
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      if (err.response?.status === 401) {
        message.error(err.response.data?.message || "Sai email hoặc mật khẩu");
      } else {
        message.error("Lỗi hệ thống, vui lòng thử lại");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "grid", placeItems: "center", height: "100vh", padding: 16 }}>
      <Card style={{ maxWidth: 400, width: "100%" }}>
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          CRM Mini - Đăng nhập
        </h2>
        <Form<LoginFormValues> layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
