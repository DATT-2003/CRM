import React, { useEffect, useState } from "react";
import { Descriptions, Spin, message } from "antd";
import { useParams } from "react-router-dom";
import customersApi from "../customersApi";
import type { Customer } from "../customerTypes";

export default function CustomerDetail() {
  const { id } = useParams<{ id: string }>(); // lấy id từ URL
  const [customer, setCustomer] = useState<Customer>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetail = async () => {
      try {
        if (id) {
          const res = await customersApi.getDetail(id);
          setCustomer(res);
        }
      } catch (error) {
        console.error(error);
        message.error("Failed to load customer detail");
      } finally {
        setLoading(false);
      }
    };
    loadDetail();
  }, [id]);

  if (loading) return <Spin style={{ display: "block", margin: "20px auto" }} />;

  if (!customer) return <div style={{ padding: 20 }}>❌ Customer not found</div>;

  return (
    <Descriptions
      title="Customer Detail"
      bordered
      column={1}
      style={{ padding: 20 }}
    >
      <Descriptions.Item label="Name">{customer.name}</Descriptions.Item>
      <Descriptions.Item label="Email">{customer.email}</Descriptions.Item>
      <Descriptions.Item label="Phone">{customer.phone}</Descriptions.Item>
      <Descriptions.Item label="Address">{customer.address}</Descriptions.Item>
      <Descriptions.Item label="Customer Type">{customer.customerType}</Descriptions.Item>
      <Descriptions.Item label="Status">{customer.status}</Descriptions.Item>
      <Descriptions.Item label="Assigned To">{customer.assignedTo || "N/A"}</Descriptions.Item>
      <Descriptions.Item label="Created At">
        {new Date(customer.createdAt).toLocaleString()}
      </Descriptions.Item>
      <Descriptions.Item label="Updated At">
        {new Date(customer.updatedAt).toLocaleString()}
      </Descriptions.Item>
      {customer.deletedAt && (
        <Descriptions.Item label="Deleted At">
          {new Date(customer.deletedAt).toLocaleString()}
        </Descriptions.Item>
      )}
    </Descriptions>
  );
}
