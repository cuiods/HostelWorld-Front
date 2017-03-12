/**
 * reserve list router
 */
import React, { PropTypes } from 'react'
import { connect } from 'dva'
import CheckList from '../components/checks/UnfinishedCheckList'
import CheckOutModal from '../components/checks/CheckOutModal'
import CheckInBar from '../components/checks/CheckInBar'
import CheckInModal from '../components/checks/CheckInModal'
function CheckRecords({location, dispatch,checkInfo,app}) {
  const { loading, check_list, isMotion } = checkInfo;
  const checkListProps = {
    dataSource: check_list,
    loading,
    isMotion,
    onCheckOut(item){
      dispatch({
        type: "checkInfo/showOutModal",
        payload: item
      })
    }
  };
  const checkInProps = {
    visible: checkInfo.inVisible,
    userId: app.user.id,
    roomId: 0,
    onOk(data) {
      dispatch({
        type: "checkInfo/checkIn",
        payload: data
      })
    },
    onCancel() {
      dispatch({
        type: "checkInfo/hideInModal"
      })
    }
  };
  const checkOutProps = {
    visible: checkInfo.outVisible,
    item: checkInfo.currentItem,
    onOk(data) {
      dispatch({
        type: "checkInfo/checkOut",
        payload: data
      })
    },
    onCancel() {
      dispatch({
        type: "checkInfo/hideOutModal"
      })
    },
  };
  const searchProps = {
    field:"roomId",
    keyword:"",
    onSearch(value) {
      dispatch({
        type:"checkInfo/queryRoomUnfinished",
        payload:{
          roomId: value.keyword
        }
      })
    },
    onAdd(){
      dispatch({
        type: "checkInfo/showInModal"
      })
    },
  };

  const CheckOutModalGen = () =>
    <CheckOutModal {...checkOutProps} />;
  const CheckInModalGen = () =>
    <CheckInModal {...checkInProps} />;

  return (
    <div className='content-inner'>
      <CheckInBar {...searchProps}/>
      <CheckList {...checkListProps} />
      <CheckOutModalGen/>
      <CheckInModalGen/>
    </div>
  )
}
CheckRecords.propTypes = {
  checkInfo: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect(({checkInfo,app}) => ({checkInfo,app}))(CheckRecords)


