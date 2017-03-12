import React, { PropTypes } from 'react'
import { connect } from 'dva'
import HotelManageBlock from '../components/hotel/HotelManage'

function HotelManage({location, dispatch, hotelInfo}) {
  const current = hotelInfo.current_hotel;
  const detailConfig = {
    ...current,
    onEdit(item) {
      dispatch({
        type: `hotelInfo/showEditModal`,
        payload: {
          item: item
        }
      })
    }
  };
  return (
    <div>
      <HotelManageBlock {...detailConfig}/>
    </div>
  )
}

HotelManage.prototypes = {
  location:PropTypes.func,
  dispatch:PropTypes.func,
  hotelInfo: PropTypes.object
};

export default connect(({hotelInfo})=>({hotelInfo}))(HotelManage);

