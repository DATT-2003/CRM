import React, { useEffect, useState } from "react";
import { Descriptions, Spin, message } from "antd";
import { useParams } from "react-router-dom";
import opportunitiesApi from "../opportunitiesApi";
import type { Opportunity } from "../opportunityTypes";

export default function OpportunityDetail() {
  const { id } = useParams<{ id: string }>();
  const [opportunity, setOpportunity] = useState<Opportunity>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetail = async () => {
      try {
        if (id) {
          const res = await opportunitiesApi.getDetail(id);
          setOpportunity(res);
        }
      } catch (error) {
        console.error(error);
        message.error("Failed to load opportunity detail");
      } finally {
        setLoading(false);
      }
    };
    loadDetail();
  }, [id]);

  if (loading) return <Spin style={{ display: "block", margin: "20px auto" }} />;

  if (!opportunity) return <div style={{ padding: 20 }}>❌ Opportunity not found</div>;

  return (
    <Descriptions title="Opportunity Detail" bordered column={1} style={{ padding: 20 }}>
      <Descriptions.Item label="Title">{opportunity.title}</Descriptions.Item>
      <Descriptions.Item label="Stage">{opportunity.stage}</Descriptions.Item>
      <Descriptions.Item label="Value">{opportunity.value}</Descriptions.Item>
      <Descriptions.Item label="Customer">{opportunity.customerId}</Descriptions.Item>
      <Descriptions.Item label="Owner">{opportunity.ownerId}</Descriptions.Item>
      <Descriptions.Item label="Notes">{opportunity.notes}</Descriptions.Item>
      <Descriptions.Item label="Created At">
        {new Date(opportunity.createdAt).toLocaleString()}
      </Descriptions.Item>
      <Descriptions.Item label="Updated At">
        {new Date(opportunity.updatedAt).toLocaleString()}
      </Descriptions.Item>
      {opportunity.deletedAt && (
        <Descriptions.Item label="Deleted At">
          {new Date(opportunity.deletedAt).toLocaleString()}
        </Descriptions.Item>
      )}
    </Descriptions>
  );
}
