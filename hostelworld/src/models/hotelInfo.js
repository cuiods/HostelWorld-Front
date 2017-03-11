/**
 * hotel info model
 */
import pathToRegexp from 'path-to-regexp';
import {getHotelList, getHotelDetail} from "../services/hotelService";

export default {
  namespace: 'hotelInfo',

  state: {
    visible: false,
    hotel_list: [],
    current_hotel: {},
    current_room: {},
    totalElements: 0,
    totalPages: 1,
    hotel_last: true,
    hotel_first: true,
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        const match = pathToRegexp('/:userId/hotelList').exec(location.pathname);
        if (match) {
          dispatch({
            type: 'query',
            payload: {
              page: 0,
              pageSize: 4
            }
          })
        }
        const matchDetail = pathToRegexp('/hotelDetail/:hotelId').exec(location.pathname);
        if (matchDetail) {
          let hotelId = matchDetail[1];
          dispatch({
            type: 'queryDetail',
            payload: {
              hotelId: hotelId
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

    *queryDetail({payload},{call,put}) {
      const data = yield call(getHotelDetail,payload);
      if (data) {
        yield put({
          type: 'setHotelDetail',
          payload: data
        })
      }
    }
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
    },
    setHotelDetail(state, action) {
      return {
        ...state,
        current_hotel: action.payload
      }
    },
    hideModal(state) {
      return {
        ...state,
        visible: false
      }
    },
    showModal(state,action) {
      return {
        ...state,
        visible: true,
        current_room: action.payload.item
      }
    }
  }
}
