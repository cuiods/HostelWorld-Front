import {message} from "antd";
import pathToRegexp from 'path-to-regexp';
import {routerRedux} from 'dva/router';
import {getHotelStatistic, getAllStatistic} from "../services/statisticService";
export default {
  namespace: "statisticInfo",

  state: {
    reserve:0,
    check:0,
    money:0,
    weekMoney:0,
    lines:[]
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        const matchHotel = pathToRegexp('/:userId/statHotel').exec(location.pathname);
        if (matchHotel) {
          const hotelId = matchHotel[1];
          dispatch({
            type: 'queryHotel',payload:{
              hotelId: hotelId
            }
          })
        }
        const matchAll = pathToRegexp('/:userId/dashboard').exec(location.pathname);
        if (matchAll) {
          dispatch({
            type: 'queryAll',payload:{}
          })
        }
      })
    }
  },

  effects: {
    *queryHotel( {payload}, {call,put} ) {
      const data = yield call(getHotelStatistic, payload);
      if (data) {
        yield put({
          type: 'setData',
          payload: data
        })
      }
    },

    *queryAll( {payload}, {call,put} ) {
      const data = yield call(getAllStatistic, payload);
      if (data) {
        yield put({
          type: 'setData',
          payload: data
        })
      }
    }
  },

  reducers:{

    setData(state, action) {
      return {
        ...state,
        ...action.payload
      }
    }
  }

}
