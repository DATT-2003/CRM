import { Form, Input, Button, Select } from "antd";
import type { EmployeeFormValues } from "../employeesTypes";

interface Props {
  initialValues?: EmployeeFormValues;
  onSubmit: (values: EmployeeFormValues) => void;
}

export default function EmployeeForm({ initialValues, onSubmit }: Props) {
  const [form] = Form.useForm<EmployeeFormValues>();

  const handleFinish = (values: EmployeeFormValues) => {
    onSubmit(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleFinish}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Name is required" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Email is required" },
          { type: "email", message: "Invalid email format" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="phone" label="Phone">
        <Input />
      </Form.Item>

      <Form.Item
        name="role"
        label="Role"
        rules={[{ required: true, message: "Role is required" }]}
      >
        <Select>
          <Select.Option value="ADMIN">Admin</Select.Option>
          <Select.Option value="MANAGER">Manager</Select.Option>
          <Select.Option value="SALES">Sales</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="status"
        label="Status"
        rules={[{ required: true, message: "Status is required" }]}
      >
        <Select>
          <Select.Option value="ACTIVE">Active</Select.Option>
          <Select.Option value="INACTIVE">Inactive</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
}
