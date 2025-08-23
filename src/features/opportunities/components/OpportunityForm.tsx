import React from "react";
import { Form, Input, Select, InputNumber, Button } from "antd";
import type { OpportunityFormValues } from "../opportunityTypes";

const STAGES = ["Lead", "Negotiation", "Closed Won", "Closed Lost"];

interface Props {
  initialValues?: OpportunityFormValues;
  onSubmit: (values: OpportunityFormValues) => void;
}

export default function OpportunityForm({ initialValues, onSubmit }: Props) {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      initialValues={initialValues}
      layout="vertical"
      onFinish={onSubmit}
    >
      <Form.Item name="title" label="Title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="customerId" label="Customer" rules={[{ required: true }]}>
        <Select placeholder="Select customer">
          {/* TODO: fetch customers từ API */}
        </Select>
      </Form.Item>

      <Form.Item name="stage" label="Stage" rules={[{ required: true }]}>
        <Select>
          {STAGES.map((s) => (
            <Select.Option key={s} value={s}>
              {s}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="value" label="Value" rules={[{ required: true }]}>
        <InputNumber min={0} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="notes" label="Notes">
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
}
