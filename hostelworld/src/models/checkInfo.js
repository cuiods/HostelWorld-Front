/**
 * reserve info model
 */
import {createReserve, cancelReservation} from "../services/reserveService";
import {message} from "antd";
import {getMemberChecks, getMemberReserves} from "../services/memberService";
import pathToRegexp from 'path-to-regexp';
import {routerRedux} from 'dva/router';
import {getUnfinishedChecks} from "../services/roomService";
import {getHotelUnfinishedChecks, getHotelChecks} from "../services/hotelService";
import {checkout, addTenant, checkIn} from "../services/checkService";
export default {
  namespace: 'checkInfo',

  state:{
    check_list:[],
    tenants:[],
    loading: false,
    currentItem: {},
    isMotion: localStorage.getItem('antdAdminUserIsMotion') === 'true',
    outVisible: false,
    inVisible: false,
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
        const matchHotel = pathToRegexp('/:userId/hotelUnfinished').exec(location.pathname);
        if (matchHotel) {
          let userId = matchHotel[1];
          dispatch({
            type: 'queryUnfinished',
            payload: {
              hotelId: userId
            }
          })
        }
        const matchRecord = pathToRegexp('/:userId/checkRecord').exec(location.pathname);
        if (matchRecord) {
          let userId = matchRecord[1];
          dispatch({
            type: 'queryHotelAll',
            payload: {
              hotelId: userId
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
    *queryUnfinished({payload},{call,put}) {
      yield put({ type: 'showLoading' });
      const data = yield call(getHotelUnfinishedChecks, payload);
      if (data) {
        yield put({
          type: 'setChecks',
          payload: data
        })
      } else {
        yield put({type: 'cancelLoading'});
      }
    },
    *queryHotelAll({payload},{call,put}) {
      yield put({ type: 'showLoading' });
      const data = yield call(getHotelChecks, payload);
      if (data) {
        yield put({
          type: 'setChecks',
          payload: data
        })
      } else {
        yield put({type: 'cancelLoading'});
      }
    },
    *checkOut ({payload},{call,put}) {
      yield put({ type: 'showLoading' });
      const data = yield call(checkout, payload);
      if (data && data.code == 200) {
        yield put({
          type: 'hideOutModal',
        });
        message.success("退房成功");
      } else {
        message.error(data?data.message:"退房失败");
        yield put({type: 'cancelLoading'});
      }
    },
    *queryRoomUnfinished({payload},{call,put}) {
      yield put({ type: 'showLoading' });
      const data = yield call(getUnfinishedChecks, payload);
      if (data) {
        yield put({
          type: 'setChecks',
          payload: data
        })
      } else {
        yield put({type: 'cancelLoading'});
      }
    },
    *checkIn({payload},{call,put}) {
      yield put({ type: 'showLoading' });
      let keys = payload.keys;
      let ids = [];
      for (let i = 0; i < keys.length; i++) {
        let tenantName = payload[`tenantName${keys[i]}`];
        let tenantCard = payload[`tenantCard${keys[i]}`];
        let tenantData = yield call(addTenant, {name:tenantName, idCard:tenantCard});
        if (tenantData ) {
          ids.push(tenantData.data.id);
        }
      }
      const data = yield call(checkIn, {...payload,tenants:ids});
      if (data && data.code==200) {
        yield put({type: 'hideInModal'});
        yield put(routerRedux.push(`/${payload.userId}/hotelUnfinished`));
        message.success("入住成功");
      } else {
        message.error(data?data.message:"入住失败");
      }
      yield put({type: 'cancelLoading'});
    }
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
        check_list: action.payload
      }
    },

    showOutModal(state,action) {
      return {
        ...state,
        outVisible: true,
        currentItem: action.payload,
      }
    },

    hideOutModal(state) {
      return {
        ...state,
        outVisible: false,
        loading: false
      }
    },
    showInModal(state,action) {
      return {
        ...state,
        inVisible: true,
      }
    },

    hideInModal(state) {
      return {
        ...state,
        inVisible: false,
        loading: false,
        tenants: []
      }
    },

    addTenant(state, action) {
      return {
        ...state,
        tenants: state.tenants.concat(action.payload)
      }
    }

  }
}

