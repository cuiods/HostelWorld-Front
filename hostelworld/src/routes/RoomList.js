/**
 * roomList router
 */
import React, { PropTypes } from 'react'
import { connect } from 'dva'
import RoomList from '../components/room/RoomList'
import RoomAddButton from '../components/room/RoomAddButton'
import RoomAddModal from '../components/room/RoomModal'
function HotelRooms({location, dispatch,roomInfo,app}) {
  const { loading, room_list, isMotion } = roomInfo;

  const roomListProps = {
    dataSource: room_list,
    loading,
    isMotion
  };
  const roomAddProps = {
    onAdd () {
      dispatch({type: 'roomInfo/showModal',})
    }
  };
  const addRoomProps = {
    visible: roomInfo.visible,
    hotelId: app.user.id,
    onOk(data) {
      dispatch({
        type: "roomInfo/create",
        payload: data
      })
    },
    onCancel() {
      dispatch({
        type: "roomInfo/hideModal"
      })
    },
  };

  const RoomAddModalGen = () =>
    <RoomAddModal {...addRoomProps} />;

  return (
    <div className='content-inner'>
      <RoomAddButton {...roomAddProps} />
      <RoomList {...roomListProps}  />
      <RoomAddModalGen />
    </div>
  )
}
HotelRooms.propTypes = {
  roomInfo: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect(({roomInfo,app}) => ({roomInfo,app}))(HotelRooms)
