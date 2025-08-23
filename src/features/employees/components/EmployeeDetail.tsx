import React, { useEffect, useState } from "react";
import { Descriptions, Spin, message } from "antd";
import { useParams } from "react-router-dom";
import employeesApi from "../employessApi";
import type { Employee } from "../employeesTypes";

export default function EmployeeDetail() {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<Employee>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetail = async () => {
      try {
        if (id) {
          const res = await employeesApi.getDetail(id);
          setEmployee(res);
        }
      } catch (error) {
        console.error(error);
        message.error("Failed to load employee detail");
      } finally {
        setLoading(false);
      }
    };
    loadDetail();
  }, [id]);

  if (loading) return <Spin style={{ display: "block", margin: "20px auto" }} />;

  if (!employee) return <div style={{ padding: 20 }}>❌ Employee not found</div>;

  return (
    <Descriptions title="Employee Detail" bordered column={1} style={{ padding: 20 }}>
      <Descriptions.Item label="Name">{employee.name}</Descriptions.Item>
      <Descriptions.Item label="Email">{employee.email}</Descriptions.Item>
      <Descriptions.Item label="Phone">{employee.phone}</Descriptions.Item>
      <Descriptions.Item label="Role">{employee.role}</Descriptions.Item>
      <Descriptions.Item label="Status">{employee.status}</Descriptions.Item>
      <Descriptions.Item label="Created At">
        {new Date(employee.createdAt).toLocaleString()}
      </Descriptions.Item>
      <Descriptions.Item label="Updated At">
        {new Date(employee.updatedAt).toLocaleString()}
      </Descriptions.Item>
      {employee.deletedAt && (
        <Descriptions.Item label="Deleted At">
          {new Date(employee.deletedAt).toLocaleString()}
        </Descriptions.Item>
      )}
    </Descriptions>
  );
}
