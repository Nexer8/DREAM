import React from 'react';
import {Col, Divider, Row} from 'antd';
import NavigateBack from './NavigateBack';
import "../../stylesheets/common.less"

const ViewHeader = (props: { title: string, hideArrow?: boolean, custom?: React.ReactNode }) => {
  return (
    <>
      <Row style={{padding: "15px 15px 0 15px"}}>
        <Col style={{width: "100%"}}>
          <Row justify={"space-between"}>
            <Col>
              <Row>
                <Col className={"flex-center"} style={{marginRight: "7px"}}>
                  {
                    !props?.hideArrow && <NavigateBack/>
                  }
                </Col>
                <Col>
                  <h1 className={"dashboard-h1"}>
                    {props.title}
                  </h1>
                </Col>
              </Row>
            </Col>
            <Col style={{marginRight: "20px"}}>
              {props.custom}
            </Col>
          </Row>
        </Col>
      </Row>
      <Divider style={{margin: "10px 0"}}/>
    </>
  );
};

export default ViewHeader;