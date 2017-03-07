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

        let verifyFlag = data.code;

        console.log(data);

        if(verifyFlag == 200){

          let userVo = data.data;

          BasicAuth.setAuth(payload.username, payload.password, userVo.avatar);

          yield put({
            type: 'loggedInUser/storeInfo',
            payload: userVo
          });

          console.log(userVo);

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

    showAlert(state) {
      return { ...state, alertVisible: true };
    },

    closeAlert(state){
      return {...state, alertVisible: false};
    }
  }
}
