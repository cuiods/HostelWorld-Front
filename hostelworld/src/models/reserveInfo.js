/**
 * reserve info model
 */
import {createReserve, cancelReservation} from "../services/reserveService";
import {message} from "antd";
import {getMemberReserves} from "../services/memberService";
import pathToRegexp from 'path-to-regexp';
import {routerRedux} from 'dva/router';
import {getHotelReserves} from "../services/hotelService";
export default {
  namespace: 'reserveInfo',

  state:{
    reserve_list:[],
    loading: false,
    currentItem: {},
    isMotion: localStorage.getItem('antdAdminUserIsMotion') === 'true',
    isHotel: false,
    pagination: {
      showSizeChanger: true,
      showQuickJumper: false,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: 10
    }
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        const match = pathToRegexp('/:userId/reserveList').exec(location.pathname);
        if (match) {
          let userId = match[1];
          dispatch({
            type: 'query',
            payload: {
              memberId: userId
            }
          })
        }
        const matchHotel = pathToRegexp('/:userId/reserveRecord').exec(location.pathname);
        if (matchHotel) {
          let userId = matchHotel[1];
          dispatch({
            type: 'queryHotel',
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
      const data = yield call(getMemberReserves, payload);
      if (data) {
        yield put({
          type: 'setReservations',
          payload: data
        })
      } else {
        yield put({type: 'cancelLoading'});
      }
    },

    *queryHotel({payload},{call,put}) {
      yield put({ type: 'showLoading' });
      const data = yield call(getHotelReserves, payload);
      if (data) {
        yield put({
          type: 'setHotelReservations',
          payload: data
        })
      } else {
        yield put({type: 'cancelLoading'});
      }
    },

    *create({ payload }, { call, put }){
      yield put({ type: 'showLoading' });
      const data = yield call(createReserve, payload);
      if (data) {
        let code = data.code;
        let type = code == 200? 1:2;
        if (type == 1) {
          message.success("预约成功");
          yield put({
            type: 'hotelInfo/hideModal',
            payload: {}
          });
        } else {
          message.error(data.message);
        }
      }
    },

    *deleteReserve({payload}, {call,put}) {
      yield put({ type: 'showLoading' });
      const data = yield call(cancelReservation, payload);
      if (data && data.code == 200) {
        message.success("取消成功");
        yield put(routerRedux.push(`/${data.data}/reserveList`));
      } else {
        message.error(data? data.message: "删除失败");
        yield put({type: 'cancelLoading'});
      }
    }
  },

  reducers:{

    showLoading (state) {
      return { ...state, loading: true }
    },

    cancelLoading(state) {
      return {...state, loading: false}
    },

    setReservations(state, action) {
      return {
        ...state,
        loading:false,
        reserve_list: action.payload
      }
    },
    setHotelReservations(state, action) {
      return {
        ...state,
        loading:false,
        isHotel: true,
        reserve_list: action.payload
      }
    }
  }
}
