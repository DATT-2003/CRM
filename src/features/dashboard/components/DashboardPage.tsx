import { useEffect, useState } from "react";
import { Row, Col, Card, Typography, Spin, List, Tag, Tabs } from "antd";
import { Column } from "@ant-design/charts"; // 👈 đổi Bar -> Column
import dashboardApi from "../dashboardApi";
import type { DashboardData } from "../dashboardTypes";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    dashboardApi
      .getOverview()
      .then((res) => setData(res))
      .catch(() => {
        console.warn("Lỗi khi tải dữ liệu, đang dùng dữ liệu ảo");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return (
      <div style={{ display: "grid", placeItems: "center", height: "60vh" }}>
        <Spin size="large" />
      </div>
    );
  }

  // 👉 Cấu hình biểu đồ cột đứng (Column)
 const columnConfig = {
  data: data.sales,
  xField: "month", 
  yField: "revenue",
  height: 320,
  autoFit: true,
  color: "#1890ff",
  columnStyle: { radius: [4, 4, 0, 0] },
  xAxis: {
    label: { style: { fill: "#595959", fontSize: 12 } },
  },
  yAxis: {
    label: { style: { fill: "#595959", fontSize: 12 } },
  },
  tooltip: {
    formatter: (datum: { month: string; revenue: number }) => {
      return {
        name: "Revenue",
        value: `${datum.revenue.toLocaleString()}`
      };
    },
  },
};


  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Dashboard</Title>
      <Text type="secondary">Welcome back! Here's your CRM overview.</Text>

      {/* Top stats */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} sm={12}>
          <Card title="Khách hàng theo loại">
            {data.customers.map((item) => (
              <div key={item.type} style={{ marginBottom: 8 }}>
                <Text>{item.type}</Text>
                <Title level={4}>{item.count}</Title>
              </div>
            ))}
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card title="Đơn hàng theo trạng thái">
            {data.opportunities.map((item) => (
              <div key={item.stage} style={{ marginBottom: 8 }}>
                <Text>{item.stage}</Text>
                <Title level={4}>{item.count}</Title>
              </div>
            ))}
          </Card>
        </Col>
      </Row>

      {/* Sales chart */}
      <Card title="📊 Doanh số theo tháng" style={{ marginTop: 24 }}>
        <Tabs defaultActiveKey="revenue">
          <TabPane tab="Revenue" key="revenue">
            <Column {...columnConfig} />
          </TabPane>
          <TabPane tab="Deals" key="deals">
            <Text>Coming soon...</Text>
          </TabPane>
        </Tabs>
      </Card>

      {/* Task list & activity */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} md={12}>
          <Card title="📝 Task List">
            <List
              dataSource={data.tasks}
              renderItem={(item) => (
                <List.Item>
                  <Text>{item.title}</Text>
                  <Tag color={item.status === "Completed" ? "green" : "orange"}>
                    {item.status}
                  </Tag>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="🔔 Recent Activity">
            <List
              dataSource={data.activities}
              renderItem={(item) => (
                <List.Item>
                  <Text>{item.description}</Text>
                  <Text type="secondary" style={{ marginLeft: 8 }}>
                    ({item.time})
                  </Text>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
