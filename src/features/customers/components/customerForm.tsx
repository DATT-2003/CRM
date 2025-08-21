import { Form, Input, Select, Button } from "antd";
import type { CustomerFormValues } from "../customerTypes";

interface Props {
  initialValues?: CustomerFormValues;
  onSubmit: (values: CustomerFormValues) => void;
  loading?: boolean;
}

export default function CustomerForm({ initialValues, onSubmit, loading }: Props) {
  const [form] = Form.useForm<CustomerFormValues>();

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onSubmit}
    >
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true }, { type: "email", message: "Invalid email format" }]}
      >
        <Input />
      </Form.Item>  

      <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="address" label="Address">
        <Input />
      </Form.Item>

      <Form.Item name="type" label="Type" rules={[{ required: true }]}>
        <Select
          options={[
            { value: "LEAD", label: "Lead" },
            { value: "PROSPECT", label: "Prospect" },
            { value: "CLIENT", label: "Client" },
          ]}
        />
      </Form.Item>

      <Form.Item name="status" label="Status" rules={[{ required: true }]}>
        <Select
          options={[
            { value: "ACTIVE", label: "Active" },
            { value: "INACTIVE", label: "Inactive" },
          ]}
        />
      </Form.Item>

      <Form.Item name="notes" label="Notes">
        <Input.TextArea rows={3} />
      </Form.Item>

      <Button type="primary" htmlType="submit" loading={loading}>
        Save
      </Button>
    </Form>
  );
}
