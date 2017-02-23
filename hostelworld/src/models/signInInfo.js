/**
 *
 * Sign in model
 */
import {login} from '../services/verifyService';
import {parse} from 'qs';
import {routerRedux} from 'dva/router';
import cookie from 'react-cookie';
import BasicAuth from '../utils/BasicAuth';


export default {
  namespace: 'signInInfo',

  state: {
    userId: cookie.load('userId'),
    alertVisible: false,
  },

  effects: {
    *verify({payload}, {call, put}) {

      const data = yield call(login, {
        username: payload.username,
        password: payload.password
      });

      if(data){

        let verifyFlag = data.ok;

        if(verifyFlag){

          BasicAuth.setAuth(payload.username, payload.password, data.avatar);

          yield put({
            type: 'loggedInUser/storeInfo',
            payload: data
          });

          if(data.type === 'student'){

            yield put(routerRedux.push(`/student/${payload.username}/courses`));

          }else if(data.type === 'teacher'){

            yield put(routerRedux.push(`/teacher/${payload.username}/courses`))

          }else if(data.type === 'admin'){

          }

        }else{
          BasicAuth.clearAuth();
          yield put({
            type: `showAlert`,
          });

        }
      }

    },

    *logout() {
    }
  },

  reducers: {
    updateLoginSucceed(state, action) {
      const userId = action.payload;
      return { ...state, userId, alertVisible: false };
    },

    showAlert(state) {
      return { ...state, alertVisible: true };
    },

    closeAlert(state){
      return {...state, alertVisible: false};
    }
  }
}
