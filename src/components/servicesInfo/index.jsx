<<<<<<< HEAD
import { Card, Typography, Tabs } from "antd";
import React from "react";
import PriceManagement from "../priceManagement";
const { Title, Text } = Typography;
const { TabPane } = Tabs;
export default function ServicesInfo() {
=======
import React from 'react'

const services = [
    {
        
    }
]

export default function ServicesInfo({ infoTraveler, setInfoTraveler }) {
  console.log("🚀 ~ ServicesInfo ~ infoTraveler:", infoTraveler)
>>>>>>> 20351de89ff533e4d3d15a0b855f0e035493d36e
  return (
    <>
      <Card style={{ width: "100%", maxWidth: 800, margin: "0 auto" }}>
        <Title level={3} style={{ marginBottom: 24 }}>
          Services
        </Title>

        <Tabs defaultActiveKey="1">
          <TabPane tab="Standard" key="1">
            <PriceManagement />
          </TabPane>

          <TabPane tab="Services Other" key="2">
            tab 2
          </TabPane>
        </Tabs>
      </Card>
    </>
  );
}
