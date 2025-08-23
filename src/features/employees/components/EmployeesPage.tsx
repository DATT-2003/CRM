import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Space, Popconfirm, Spin, Input, message } from "antd";
import employeesApi from "../employessApi";
import type { Employee, EmployeeFormValues } from "../employeesTypes";
import EmployeeForm from "./EmployeeForm";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

export default function EmployeesPage() {
  const [data, setData] = useState<Employee[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<Employee>();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await employeesApi.getList({ page, pageSize, search });
      setData(res.data);
      setTotal(res.total);
    } catch (error) {
      console.error(error);
      message.error("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [page, pageSize, search]);

  const handleSubmit = async (values: EmployeeFormValues) => {
    try {
      if (editing) {
        await employeesApi.update(editing.id, values);
        message.success("Employee updated successfully");
      } else {
        await employeesApi.create(values);
        message.success("Employee created successfully");
      }
      setOpenForm(false);
      setEditing(undefined);
      loadData();
    } catch (error) {
      console.error(error);
      message.error("Failed to save employee");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await employeesApi.remove(id);
      message.success("Employee deleted");
      loadData();
    } catch (error) {
      console.error(error);
      message.error("Failed to delete employee");
    }
  };

  if (loading) return <Spin style={{ display: "block", margin: "20px auto" }} />;

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Search employees"
          allowClear
          onSearch={(value) => {
            setSearch(value);
            setPage(1);
          }}
          style={{ width: 300 }}
        />
        <Button type="primary" onClick={() => setOpenForm(true)}>
          Add Employee
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
          {
            title: "Name",
            dataIndex: "name",
            render: (_, record) => (
              <a onClick={() => navigate(`/employees/${record.id}`)}>
                {record.name}
              </a>
            ),
          },
          { title: "Email", dataIndex: "email" },
          { title: "Phone", dataIndex: "phone" },
          { title: "Role", dataIndex: "role" },
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
        <EmployeeForm initialValues={editing} onSubmit={handleSubmit} />
      </Modal>
    </div>
  );
}
