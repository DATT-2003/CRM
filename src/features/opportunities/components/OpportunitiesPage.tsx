import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Spin, Input, Space, Popconfirm, message } from "antd";
import { useNavigate } from "react-router-dom";
import opportunitiesApi from "../opportunitiesApi";
import type { Opportunity, OpportunityFormValues } from "../opportunityTypes";
import OpportunityForm from "./OpportunityForm";

const { Search } = Input;

export default function OpportunitiesPage() {
  const [data, setData] = useState<Opportunity[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<Opportunity>();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await opportunitiesApi.getList({ page, pageSize, search });
      setData(res.data);
      setTotal(res.total);
    } catch (error) {
      console.error(error);
      message.error("Failed to load opportunities");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [page, pageSize, search]);

  const handleSubmit = async (values: OpportunityFormValues) => {
    try {
      if (editing) {
        await opportunitiesApi.update(editing.id, values);
        message.success("Opportunity updated successfully");
      } else {
        await opportunitiesApi.create(values);
        message.success("Opportunity created successfully");
      }
      setOpenForm(false);
      setEditing(undefined);
      loadData();
    } catch (error) {
      console.error(error);
      message.error("Failed to save opportunity");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await opportunitiesApi.remove(id);
      message.success("Opportunity deleted");
      loadData();
    } catch (error) {
      console.error(error);
      message.error("Failed to delete opportunity");
    }
  };

  if (loading) return <Spin style={{ display: "block", margin: "20px auto" }} />;

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Search opportunities"
          allowClear
          onSearch={(value) => {
            setSearch(value);
            setPage(1);
          }}
          style={{ width: 300 }}
        />
        <Button type="primary" onClick={() => setOpenForm(true)}>
          Add Opportunity
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
            title: "Title",
            dataIndex: "title",
            render: (_, record) => (
              <a onClick={() => navigate(`/opportunities/${record.id}`)}>
                {record.title}
              </a>
            ),
          },
          { title: "Stage", dataIndex: "stage" },
          { title: "Value", dataIndex: "value" },
          { title: "Owner", dataIndex: "ownerId" },
          { title: "Customer", dataIndex: "customerId" },
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
        <OpportunityForm initialValues={editing} onSubmit={handleSubmit} />
      </Modal>
    </div>
  );
}
