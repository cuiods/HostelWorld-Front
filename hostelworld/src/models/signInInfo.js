/**
 *
 * Sign in model
 */
import {login} from '../services/verifyService';
import {routerRedux} from 'dva/router';
import cookie from 'react-cookie';
import BasicAuth from '../utils/BasicAuth';


export default {
  namespace: 'signInInfo',

  state: {
    userId: cookie.load('userId'),
    alertVisible: false,
    loginMsg: ""
  },

  effects: {
    *verify({payload}, {call, put}) {

      const data = yield call(login, {
        username: payload.username,
        password: payload.password
      });

      if(data){

        let verifyFlag = data.code;

        if(verifyFlag == 200){

          let userVo = data.data;

          BasicAuth.setAuth(payload.username, payload.password, userVo.avatar);

          yield put({
            type: 'app/storeInfo',
            payload: userVo
          });

          if(userVo.type === 'member'){

            yield put(routerRedux.push(`/hotel/list`));

          }else if(userVo.type === 'hotel'){

            yield put(routerRedux.push(`/hotel/console`))

          }else if(userVo.type === 'manager'){

          }

        }else{
          BasicAuth.clearAuth();
          yield put({
            type: `showAlert`,
            payload: data.message,
          });

        }
      }

    },

    *logout() {
    }
  },

  reducers: {

    showAlert(state,action) {
      return { ...state, alertVisible: true ,loginMsg: action.payload};
    },

    closeAlert(state){
      return {...state, alertVisible: false};
    }
  }
}
