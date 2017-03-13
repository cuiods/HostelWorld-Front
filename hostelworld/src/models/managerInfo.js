/**
 * manager model
 */
import {getHotelsToApprove, getHotelsEdited, getUncompletedChecks, approveHotel, approveEdit, approveCheck} from "../services/managerService";
import {message} from "antd";
import pathToRegexp from 'path-to-regexp';
import {routerRedux} from 'dva/router';
export default {
  namespace: "managerInfo",

  state: {
    new_list:[],
    edit_list:[],
    check_list:[],
    loading: false,
    current: {},
    currents: []
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        const matchNew = pathToRegexp('/:userId/approveNew').exec(location.pathname);
        if (matchNew) {
          dispatch({
            type: 'queryNew',payload:{}
          })
        }
        const matchEdit = pathToRegexp('/:userId/approveEdit').exec(location.pathname);
        if (matchEdit) {
          dispatch({
            type: 'queryEdit',payload:{}
          })
        }
        const matchCheck = pathToRegexp('/:userId/completeChecks').exec(location.pathname);
        if (matchCheck) {
          dispatch({
            type: 'queryCheck',payload:{}
          })
        }
      })
    }
  },

  effects:{
    *queryNew({payload},{call,put}) {
      yield put({ type: 'showLoading' });
      const data = yield call(getHotelsToApprove, payload);
      if (data) {
        yield put({
          type: 'setNew',
          payload: data
        })
      } else {
        yield put({type: 'cancelLoading'});
      }
    },

    *queryEdit({payload},{call,put}) {
      yield put({ type: 'showLoading' });
      const data = yield call(getHotelsEdited, payload);
      if (data) {
        yield put({
          type: 'setEdit',
          payload: data
        })
      } else {
        yield put({type: 'cancelLoading'});
      }
    },

    *queryCheck({payload},{call,put}) {
      yield put({ type: 'showLoading' });
      const data = yield call(getUncompletedChecks, payload);
      if (data) {
        yield put({
          type: 'setCheck',
          payload: data
        })
      } else {
        yield put({type: 'cancelLoading'});
      }
    },


    *approveNew({payload}, {call,put}) {
      yield put({ type: 'showLoading' });
      const data = yield call(approveHotel, payload);
      if (data && data.code == 200) {
        message.success("已批准");
        yield put(routerRedux.push(`/${payload.managerId}/approveNew`));
      } else {
        message.error(data? data.message: "批准失败");
        yield put({type: 'cancelLoading'});
      }
    },

    *approveEdit({payload}, {call,put}) {
      yield put({ type: 'showLoading' });
      const data = yield call(approveEdit, payload);
      if (data && data.code == 200) {
        message.success("已批准");
        yield put(routerRedux.push(`/${payload.managerId}/approveEdit`));
      } else {
        message.error(data? data.message: "批准失败");
        yield put({type: 'cancelLoading'});
      }
    },

    *approveCheck({payload}, {call,put}) {
      yield put({ type: 'showLoading' });
      const data = yield call(approveCheck, payload);
      if (data && data.code == 200) {
        message.success("已支付");
        yield put(routerRedux.push(`/${payload.managerId}/completeChecks`));
      } else {
        message.error(data? data.message: "支付失败");
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

    setNew(state, action) {
      return {
        ...state,
        loading:false,
        new_list: action.payload
      }
    },
    setEdit(state, action) {
      return {
        ...state,
        loading:false,
        edit_list: action.payload
      }
    },
    setCheck(state, action) {
      return {
        ...state,
        loading:false,
        check_list: action.payload
      }
    }
  }
}
