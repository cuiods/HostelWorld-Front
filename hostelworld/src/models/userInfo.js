import {getMemberInfo, stopMember, editMember, transferToRemain, exchangeScore} from "../services/memberService";
import pathToRegexp from 'path-to-regexp';
import {message} from "antd";
import {routerRedux} from 'dva/router';
export default {
  namespace: 'userInfo',

  state: {
    id:"",
    name:"",
    password:"",
    phone:"",
    avatar:"",
    gender:"male",
    createdAt:"",
    updatedAt:"",
    state:"stop",
    level:0,
    score:0,
    description:"",
    remain:0,
    activeDate:"1970-01-01",
    transferVisible:false,
    exchangeVisible:false,
    editVisible:false
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        const match = pathToRegexp('/:userId/userInfo').exec(location.pathname);
        if (match) {
          let userId = match[1];
          dispatch({
            type: 'query',
            payload: {
              memberId: userId
            }
          })
        }
      })
    }
  },

  effects: {
    *query ({ payload }, { call, put }) {
      const data = yield call(getMemberInfo, payload);
      if (data) {
        yield put({
          type: 'setUserInfo',
          payload: data
        })
      }
    },
    *stopMember({payload}, {call,put}) {
      const data = yield call(stopMember,payload);
      if (data && data.code == 200) {
        message.success("会员已停止");
        yield put(routerRedux.push(`/${data.data.id}/userInfo`));
      } else {
        message.error(data? data.message: "操作失败");
      }
    },
    *editMember({payload},{call,put}) {
      const data = yield call(editMember,payload);
      if (data && data.code == 200) {
        message.success("修改成功");
        yield put(routerRedux.push(`/${data.data.id}/userInfo`));
      } else {
        message.error(data? data.message: "修改失败");
      }
    },
    *transferToUserRemain({payload},{call,put}) {
      const data = yield call(transferToRemain, payload);
      if (data && data.code == 200) {
        message.success("转账成功");
        yield put(routerRedux.push(`/${data.data.id}/userInfo`));
      } else {
        message.error(data? data.message: "修改失败");
      }
    },
    *exchangeMemberScore({payload},{call,put}) {
      const data = yield call(exchangeScore, payload);
      if (data && data.code == 200) {
        message.success("兑换成功");
        yield put(routerRedux.push(`/${data.data.id}/userInfo`));
      } else {
        message.error(data? data.message: "兑换失败");
      }
    }
  },

  reducers: {
    setUserInfo(state, action) {
      return {
        ...state,
        ...action.payload,
        transferVisible:false,
        exchangeVisible:false,
        editVisible: false
      }
    },
    showTransferModal(state) {
      return {
        ...state,
        transferVisible:true
      }
    },
    closeTransferModal(state) {
      return {
        ...state,
        transferVisible:false
      }
    },
    showExchangeModal(state) {
      return {
        ...state,
        exchangeVisible:true
      }
    },
    closeExchangeModal(state) {
      return {
        ...state,
        exchangeVisible:false
      }
    },
    showEditModal(state) {
      return {
        ...state,
        editVisible: true
      }
    },
    closeEditModal(state) {
      return {
        ...state,
        editVisible: false
      }
    }
  }
}
