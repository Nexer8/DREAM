import React from "react";
import {Col, Divider, Row} from "antd";
import {ClockCircleOutlined, ShoppingOutlined} from "@ant-design/icons";
import {purple} from "@ant-design/colors";
import {GetFarmProductionDataSingle} from '../../model/api/GetProductionData';

const RecentProductionDataItem = (props: { item: GetFarmProductionDataSingle }) => {
  const item = props.item

  return (
    <>
      <Row className={"list-item"}>
        <Col style={{width: "100%"}}>
          <Row justify={'space-between'}>
            <div style={{fontWeight: "normal"}} className={"dashboard-list-item-title "}>
              {item.productionType}
            </div>
            <span style={{marginRight: "10px"}}>
              <ShoppingOutlined style={{color: purple.primary, marginRight: "3px"}}/>
              <span className={"dashboard-item-attribute"} style={{marginRight: "10px"}}>{item.amount} kg</span>

              <ClockCircleOutlined style={{color: purple.primary, marginRight: "3px"}}/>
              <span className={"dashboard-item-attribute"}>{new Date(item.date).toLocaleDateString()}</span>
            </span>
          </Row>
        </Col>
      </Row>
      <Divider style={{margin: "10px 0"}}/>
    </>
  );
}

export default RecentProductionDataItem;