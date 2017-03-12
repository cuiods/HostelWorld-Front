/**
 * hotel room list
 */
import {message} from "antd";
import pathToRegexp from 'path-to-regexp';
import {routerRedux} from 'dva/router';
import {getHotelRooms} from "../services/hotelService";
import {createRoom} from "../services/roomService";

export default {
  namespace: "roomInfo",

  state: {
    room_list:[],
    loading: false,
    currentItem: {},
    visible: false,
    isMotion: localStorage.getItem('antdAdminUserIsMotion') === 'true',
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
        const match = pathToRegexp('/:userId/hotelRoomList').exec(location.pathname);
        if (match) {
          let userId = match[1];
          dispatch({
            type: 'query',
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
      const data = yield call(getHotelRooms, payload);
      if (data) {
        yield put({
          type: 'setRooms',
          payload: data
        })
      } else {
        yield put({type: 'cancelLoading'});
      }
    },

    *create({ payload }, { call, put }){
      yield put({ type: 'showLoading' });
      const data = yield call(createRoom, payload);
      if (data) {
        let code = data.code;
        let type = code == 200? 1:2;
        if (type == 1) {
          message.success("计划发布成功");
          yield put({
            type: 'hideModal',
            payload: {}
          });
        } else {
          message.error(data.message);
        }
      }
      yield put({ type: 'cancelLoading' });
    },

  },

  reducers:{

    showModal (state) {
      return {...state, visible: true}
    },

    hideModal (state) {
      return {...state, visible: false}
    },

    showLoading (state) {
      return { ...state, loading: true }
    },

    cancelLoading(state) {
      return {...state, loading: false}
    },

    setRooms(state, action) {
      return {
        ...state,
        loading:false,
        room_list: action.payload
      }
    },
  }
}
