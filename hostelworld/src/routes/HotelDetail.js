/**
 * Hotel Detail Page
 */
import React, { PropTypes } from 'react'
import { connect } from 'dva'
import HotelDetailBlock from '../components/hotel/HotelDetailBlock'
import ReserveModal from '../components/reserve/ReserveModal';

function HotelDetail({location, dispatch, hotelInfo, app}) {
  const current = hotelInfo.current_hotel;
  const {user} = app;
  const {visible,current_room} = hotelInfo;
  const reserveModal = {
    memberId: user.id,
    visible: visible,
    item: current_room,
    onOk (data) {
      dispatch({
        type: `reserveInfo/create`,
        payload: data
      })
    },
    onCancel () {
      dispatch({
        type: 'hotelInfo/hideModal'
      })
    }
  };
  const detailConfig = {
    ...current,
    onReserve(item) {
      dispatch({
        type: `hotelInfo/showModal`,
        payload: {
          item: item
        }
      })
    }
  };
  const ReserveModalGen = () =>
    <ReserveModal {...reserveModal} />;
  return (
    <div>
      <HotelDetailBlock {...detailConfig}/>
      <ReserveModalGen />
    </div>
  )
}

HotelDetail.prototypes = {
  location:PropTypes.func,
  dispatch:PropTypes.func,
  hotelInfo: PropTypes.object
};

export default connect(({hotelInfo,app})=>({hotelInfo,app}))(HotelDetail);
