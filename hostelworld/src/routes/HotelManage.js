import React, { PropTypes } from 'react'
import { connect } from 'dva'
import HotelManageBlock from '../components/hotel/HotelManage'
import EditHotelModal from '../components/hotel/EditHotelModal'

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
  const editModalProp = {
    visible: hotelInfo.editVisible,
    item: {
      ...hotelInfo.current_hotel
    },
    onOk(data) {
      dispatch({
        type: "hotelInfo/editHotel",
        payload: data
      })
    },
    onCancel() {
      dispatch({
        type: "hotelInfo/hideEditModal"
      })
    },
  };
  const EditModalGen = () =>
    <EditHotelModal {...editModalProp} />;
  return (
    <div>
      <HotelManageBlock {...detailConfig}/>
      <EditModalGen/>
    </div>
  )
}

HotelManage.prototypes = {
  location:PropTypes.func,
  dispatch:PropTypes.func,
  hotelInfo: PropTypes.object
};

export default connect(({hotelInfo})=>({hotelInfo}))(HotelManage);

