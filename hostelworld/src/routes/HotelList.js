/**
 * Hotel List Routes
 */
import React, {PropTypes} from 'react'
import {connect} from 'dva'
import { Row, Card, Pagination} from 'antd';
import HotelBlock from '../components/hotel/HotelBlock'
import styles from './HotelList.less'
function HotelList({dispatch,hotelInfo}) {
  const  {hotel_list, current_hotel, totalElements, totalPages, hotel_last, hotel_first} = hotelInfo;
  const paginationInfo = {
    defaultCurrent:1,
    total:totalElements,
    defaultPageSize:4,
    showQuickJumper:true,
    onChange(page, pageSize){
      dispatch({
        type:'hotelInfo/query',
        payload: {
          page: page-1,
          pageSize: pageSize
        }
      });
    }
  };
  return (
    <div className={styles['hotelList_block']}>
    <Row gutter={24}>
      {hotel_list.map((item,key)=>{
        const itemMore = {
          ...item,
          dispatch: dispatch
        };
        return (
        <Card className={styles['hotel_card']} key={key} bordered={false} bodyStyle={{
          padding: '24px 36px 24px 0'
        }}>
          <HotelBlock {...itemMore} />
        </Card>
      )})}
    </Row>
      <div className={styles['pagination']}>
        <Pagination {...paginationInfo} />
      </div>
    </div>
  );
}

HotelList.prototypes = {
  dispatch:PropTypes.func,
  hotelInfo: PropTypes.object
};

export default connect(({hotelInfo})=>({hotelInfo}))(HotelList);
