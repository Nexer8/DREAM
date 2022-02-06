import React, {useEffect} from 'react';
import {useParams} from 'react-router';
import {Col, Row} from 'antd';
import strings from '../../../values/strings';
import {requestRequests} from '../../../api/requests/requestRequests';
import RequestForumListItemDetailComment from '../generic/RequestForumListItemDetailComment';
import RequestForumListItemDetailDescription from '../generic/RequestForumListItemDetailDescription';
import ViewHeader from '../../other/ViewHeader';

const MyHelpRequestListItemDetail = () => {
  const {id} = useParams()
  const requestID: number | undefined = id ? +id : undefined
  const [requestData, load] = requestRequests.useGetFarmerRequestDetail()

  useEffect(() => {
    if (requestID) {
      load(requestID)
    }
  }, [requestID])

  return (
    <>
      <ViewHeader title={`Help request: ${requestData?.topic}`}/>
      <RequestForumListItemDetailDescription
        description={requestData?.description}
        createdBy={requestData?.createdBy}
        createdOn={requestData?.createdOn}
      />
      <Row style={{padding: "0 35px 0 35px"}}>
        <Col style={{width: "100%"}}>
          {
            !!requestData?.helpResponses?.length && (requestData.helpResponses.length > 0) &&
            <Row justify={'start'}>
                <Col style={{margin: "10px 0 0"}}>
                    <h1 className={"dashboard-h1"}>
                      {strings.ADVICE}
                    </h1>
                </Col>
            </Row>
          }
          <Row>
            <Col style={{margin: "10px 0 0", width: "100%"}}>
              {
                requestData?.helpResponses?.map((item, key) =>
                  <RequestForumListItemDetailComment
                    key={key}
                    createdDate={new Date(item.createdOn)}
                    author={item.createdByFarmer ? item.createdByFarmer :
                      item.createdByAgronomist ? item.createdByAgronomist : ""}
                    authorRole={item.createdByFarmer ? "Farmer" :
                      item.createdByAgronomist ? "Agronomist" : ""}
                    content={item.message}
                    deletable={false}
                  />
                )
              }
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default MyHelpRequestListItemDetail;