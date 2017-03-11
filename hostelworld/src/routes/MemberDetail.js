/**
 * member detail router
 */
import React, { PropTypes } from 'react'
import { connect } from 'dva'
import MemberDetailBlock from '../components/user/MemberDetail'
import EditMemberModal from '../components/user/EditMemberModal'
import TransferModal from '../components/user/TransferModal'
import ExchangeModal from '../components/user/ExchangeModal'

function MemberDetail({location, dispatch, userInfo}) {
  const userDetailInfo = {
    ...userInfo,
    onTransfer(){
      dispatch({
        type:"userInfo/showTransferModal"
      })
    },
    onExchange(){
      dispatch({
        type:"userInfo/showExchangeModal"
      })
    },
    onStop(){
      dispatch({
        type:"userInfo/stopMember",
        payload: {
          memberId:userInfo.id
        }
      })
    },
    onEdit(){
      dispatch({
        type:"userInfo/showEditModal",
      })
    }
  };
  const editModalProp = {
    visible: userInfo.editVisible,
    item: {
      ...userInfo
    },
    onOk(data) {
      dispatch({
        type: "userInfo/editMember",
        payload: data
      })
    },
    onCancel() {
      dispatch({
        type: "userInfo/closeEditModal"
      })
    },
  };
  const transferProp = {
    visible: userInfo.transferVisible,
    item:{id:userInfo.id},
    onOk(data) {
      dispatch({
        type: "userInfo/transferToUserRemain",
        payload: data
      })
    },
    onCancel() {
      dispatch({
        type: "userInfo/closeTransferModal"
      })
    }
  };
  const exchangeProp = {
    visible: userInfo.exchangeVisible,
    item:{id:userInfo.id},
    onOk(data) {
      dispatch({
        type: "userInfo/exchangeMemberScore",
        payload: data
      })
    },
    onCancel() {
      dispatch({
        type: "userInfo/closeExchangeModal"
      })
    }
  };
  const EditModalGen = () =>
    <EditMemberModal {...editModalProp} />;
  const TransferModalGen = () =>
    <TransferModal {...transferProp} />;
  const ExchangeModalGen = () =>
    <ExchangeModal {...exchangeProp} />;
  return (
    <div>
      <MemberDetailBlock {...userDetailInfo}/>
      <EditModalGen />
      <TransferModalGen />
      <ExchangeModalGen/>
    </div>
  )
}
MemberDetail.prototypes = {
  location:PropTypes.func,
  dispatch:PropTypes.func,
  userInfo: PropTypes.object
};

export default connect(({userInfo})=>({userInfo}))(MemberDetail);
