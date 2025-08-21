import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Spin, Input, Space, Popconfirm, message } from "antd";
import customersApi from "../customersApi";
import type { Customer, CustomerFormValues } from "../customerTypes";
import CustomerForm from "./customerForm";

const { Search } = Input;

export default function CustomersPage() {
  const [data, setData] = useState<Customer[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<Customer>();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  // Load data từ API
  const loadData = async () => {
    setLoading(true);
    try {
      const res = await customersApi.getList({ page, pageSize, search });
      setData(res.data);
      setTotal(res.total);
    } catch  {
      message.error("Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [page, pageSize, search]);

  // Submit form thêm/sửa
  const handleSubmit = async (values: CustomerFormValues) => {
    try {
      if (editing) {
        await customersApi.update(editing.id, values);
        message.success("Customer updated successfully");
      } else {
        await customersApi.create(values);
        message.success("Customer created successfully");
      }
      setOpenForm(false);
      setEditing(undefined);
      loadData();
    } catch {
      message.error("Failed to save customer");
    }
  };

  // Xóa khách hàng
  const handleDelete = async (id: string) => {
    try {
      await customersApi.remove(id);
      message.success("Customer deleted");
      loadData();
    } catch {
      message.error("Failed to delete");
    }
  };

  if (loading) return <Spin style={{ display: "block", margin: "20px auto" }} />;

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Search by name/email/phone"
          allowClear
          onSearch={(value) => {
            setSearch(value);
            setPage(1);
          }}
          style={{ width: 300 }}
        />
        <Button type="primary" onClick={() => setOpenForm(true)}>
          Add Customer
        </Button>
      </Space>

      <Table
        rowKey="id"
        dataSource={data}
        pagination={{
          total,
          current: page,
          pageSize,
          showSizeChanger: true,
          onChange: (p, ps) => {
            setPage(p);
            setPageSize(ps);
          },
        }}
        columns={[
          { title: "Name", dataIndex: "name" },
          { title: "Email", dataIndex: "email" },
          { title: "Phone", dataIndex: "phone" },
          { title: "Type", dataIndex: "customerType" },
          { title: "Status", dataIndex: "status" },
          {
            title: "Actions",
            render: (_, record) => (
              <Space>
                <Button
                  type="link"
                  onClick={() => {
                    setEditing(record);
                    setOpenForm(true);
                  }}
                >
                  Edit
                </Button>
                <Popconfirm
                  title="Are you sure to delete?"
                  onConfirm={() => handleDelete(record.id)}
                >
                  <Button type="link" danger>
                    Delete
                  </Button>
                </Popconfirm>
              </Space>
            ),
          },
        ]}
      />

      <Modal
        open={openForm}
        onCancel={() => {
          setOpenForm(false);
          setEditing(undefined);
        }}
        footer={null}
        destroyOnClose
      >
        <CustomerForm
          initialValues={editing}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
}
