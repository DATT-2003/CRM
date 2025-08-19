import { Form, Input, Button, Card, message } from "antd";
import { login } from "./api";
import type { LoginFormValues } from "./types"
import { AxiosError } from "axios";

export default function LoginPage() {
  const onFinish = async (values: LoginFormValues) => {
    try {
      const data = await login(values);
      localStorage.setItem("token", data.token);
      message.success("Đăng nhập thành công");
      window.location.href = "/";
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 401) {
        message.error("Sai email hoặc mật khẩu");
      } else {
        message.error("Lỗi hệ thống, vui lòng thử lại");
      }
    }
  };

  return (
    <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <Card style={{ width: 380 }}>
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          CRM Mini - Đăng nhập
        </h2>
        <Form<LoginFormValues> layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
                { required: true, message: "Vui lòng nhập email" },
              { type: "email" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
