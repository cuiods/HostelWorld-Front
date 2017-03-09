/**
 * hotel info model
 */
import pathToRegexp from 'path-to-regexp';
import {getHotelList} from "../services/hotelService";

export default {
  namespace: 'hotelModel',

  state: {
    hotel_list: [],
    current_hotel: {},
    totalElements: 0,
    totalPages: 1,
    hotel_last: true,
    hotel_first: true,
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        const match = pathToRegexp('/hotelList').exec(location.pathname);
        if (match) {
          dispatch({
            type: 'query',
            payload: {
              page: 0,
              pageSize: 10
            }
          })
        }
      })
    }
  },

  effects: {
    *query ({ payload }, { call, put }) {

      const data = yield call(getHotelList, payload);
      if (data) {
        yield put({
          type: 'setHotelList',
          payload: data
        })
      }
    },
  },

  reducers: {
    setHotelList(state, action) {
      return {
        ...state,
        hotel_list:action.payload.content,
        totalElements: action.payload.totalElements,
        totalPages: action.payload.totalPages,
        hotel_last: action.payload.last,
        hotel_first: action.payload.first,
      }
    }
  }
}
