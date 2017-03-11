/**
 * reserve info model
 */
import {createReserve, cancelReservation} from "../services/reserveService";
import {message} from "antd";
import {getMemberChecks, getMemberReserves} from "../services/memberService";
import pathToRegexp from 'path-to-regexp';
import {routerRedux} from 'dva/router';
export default {
  namespace: 'checkInfo',

  state:{
    check_list:[],
    loading: false,
    currentItem: {},
    isMotion: localStorage.getItem('antdAdminUserIsMotion') === 'true',
    pagination: {
      showSizeChanger: false,
      showQuickJumper: false,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: 10
    }
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        const match = pathToRegexp('/:userId/checkList').exec(location.pathname);
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

  effects:{
    *query({payload},{call,put}) {
      yield put({ type: 'showLoading' });
      const data = yield call(getMemberChecks, payload);
        if (data) {
          yield put({
            type: 'setChecks',
            payload: data
          })
        } else {
          yield put({type: 'cancelLoading'});
        }
    },
  },

  reducers:{

    showLoading (state) {
      return { ...state, loading: true }
    },

    cancelLoading(state) {
      return {...state, loading: false}
    },

    setChecks(state, action) {
      return {
        ...state,
        loading:false,
        reserve_list: action.payload
      }
    }
  }
}

