/**
 * Created by echo on 16/12/18.
 */
import cookie from 'react-cookie';
import {routerRedux} from 'dva/router';

export default {
  namespace: 'loggedInUser',
  state:{
    name: 'member',
    phone: '12345674567',
    avatar: 'http://hostel-world.oss-cn-shanghai.aliyuncs.com/images/logo.png',
    gender: 'male',
    type: 'member',
    createdAt: '1487039370000',
    updateAt: '1487039370000',
    valid: 0
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname !== '/') {
          let userInfo = cookie.load("info");

          //假如没有登录,跳回登录页
          if(userInfo==null){
            dispatch(routerRedux.push('/'));
          }else{
            dispatch({
              type: 'storeInfo',
              payload: userInfo
            });
          }

        }
      });
    }
  },

  effects:{

  },

  reducers:{
    storeInfo(state, action){

      cookie.save("info", action.payload);

      return {
        ...state,
        ...action.payload,
        courses: []
      }
    }
  }

}
