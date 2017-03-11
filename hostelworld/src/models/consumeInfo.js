/**
 * reserve info model
 */
import {getMemberConsumeRecords} from "../services/memberService";
import pathToRegexp from 'path-to-regexp';
export default {
  namespace: 'consumeInfo',

  state:{
    consume_list:[],
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
        const match = pathToRegexp('/:userId/consumeList').exec(location.pathname);
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
      const data = yield call(getMemberConsumeRecords, payload);
      if (data) {
        yield put({
          type: 'setConsumes',
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

    setConsumes(state, action) {
      return {
        ...state,
        loading:false,
        consume_list: action.payload
      }
    }
  }
}


