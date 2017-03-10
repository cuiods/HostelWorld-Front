/**
 * hotel block including hotel summary info
 */
import React from 'react'
import { Row, Col ,Rate,Icon} from 'antd';
import { Button } from 'antd';
import styles from './HotelBlock.less';
import { routerRedux } from 'dva/router';

function HotelBlock({dispatch, id, createdAt, updatedAt, fullname, state, location, locationX, locationY, description, summary, star, picture}) {
  let value = 0;
  if (star == "one") value = 1;
  else if (star == "two") value = 2;
  else if (star == "three") value = 3;
  else if (star == "four") value = 4;
  else if (star == "five") value = 5;
  const buttonParams = {
    type:"primary",
    icon:"search",
    onClick() {
      dispatch(routerRedux.push(`/hotelDetail/${id}`));
    }
  };
  return (
    <div key={id}>
      <Row>
        <Col span={4}>
          <img src="http://hostel-world.oss-cn-shanghai.aliyuncs.com/images/logo.png" alt="hotel picture"/>
        </Col>
        <Col span={19}>
          <Row>
            <Col className={styles['hotel_title']} span={6}>{fullname}</Col>
            <Col span={1}><Icon type="paper-clip" /></Col>
            <Col span={17}>{summary}</Col>
          </Row>
          <Row>
            <Col span={6}><Rate value={value} disabled={false}/></Col>
            <Col span={1}><Icon type="environment" /></Col>
            <Col span={15}>{location}</Col>
          </Row>
        </Col>
        <Col className={styles['icon_detail']} span={1}><Button {...buttonParams} /></Col>
      </Row>
    </div>
  );
}
export default HotelBlock;
