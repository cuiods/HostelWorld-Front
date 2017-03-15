/**
 * hotel info model
 */
import pathToRegexp from 'path-to-regexp';
import {getHotelList, getHotelDetail, editHotel, createHotel} from "../services/hotelService";
import {message} from "antd";
import {routerRedux} from 'dva/router';

export default {
  namespace: 'hotelInfo',

  state: {
    visible: false,
    editVisible: false,
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
        const matchManage = pathToRegexp('/:hotelId/hotelManage').exec(location.pathname);
        if (matchDetail || matchManage) {
          let hotelId = matchDetail?matchDetail[1]:matchManage[1];
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
    },

    *editHotel({payload},{call,put}) {
      const data = yield call(editHotel, payload);
      if (data && data.code == 200) {
        message.success("修改成功");
        yield put({type:"hideEditModal"});
        yield put(routerRedux.push(`/${data.data.id}/hotelManage`));
      } else {
        message.error(data? data.message: "修改失败");
      }
    },

    *create({payload}, {call,put}) {
      const data = yield call(createHotel, payload);
      console.log(data);
      if (data && data.code == 200) {
        message.success("注册成功，请登陆",5000);
        yield put({type: 'app/finishRegister'});
        yield put(routerRedux.push(`/`));
      } else {
        message.error(data? data.message: "注册失败");
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
    },
    showEditModal(state) {
      return {
        ...state,
        editVisible: true
      }
    },
    hideEditModal(state) {
      return {
        ...state,
        editVisible: false
      }
    }
  }
}
