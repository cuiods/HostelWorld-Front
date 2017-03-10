/**
 * Hotel Detail Page
 */
import React, { PropTypes } from 'react'
import { connect } from 'dva'
import HotelDetailBlock from '../components/hotel/HotelDetailBlock'

function HotelDetail({location, dispatch, hotelInfo, app}) {
  const current = hotelInfo.current_hotel;
  const {userId} = app;
  const {visible,current_room} = hotelInfo;
  const reserveModal = {
    memberId: userId,
    visible: visible,
    item: current_room,
  };
  return (
    <HotelDetailBlock {...current}/>)
}

HotelDetail.prototypes = {
  location:PropTypes.func,
  dispatch:PropTypes.func,
  hotelInfo: PropTypes.object
};

export default connect(({hotelInfo,app})=>({hotelInfo,app}))(HotelDetail);
