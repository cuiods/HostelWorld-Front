import cookie from 'react-cookie';
import {routerRedux} from 'dva/router';
import {login, logout} from "../services/verifyService";
import BasicAuth from "../utils/BasicAuth";
import {createMember} from "../services/memberService";
import {message} from "antd";

export default {
  namespace: 'app',
  state:{
    user: {
      id: 0,
      name: '',
      phone: '12345674567',
      avatar: 'http://hostel-world.oss-cn-shanghai.aliyuncs.com/images/logo.png',
      gender: 'male',
      type: 'register',
      createdAt: '1487039370000',
      updateAt: '1487039370000',
      valid: 0,
    },
    userId: cookie.load('userId'),
    alertVisible: false,
    loginMsg: "",
    isLogin: false,
    isRegister: false,
    loading: false,
    loginButtonLoading: false,
    menuPopoverVisible: false,
    siderFold: localStorage.getItem('antdAdminSiderFold') === 'true',
    darkTheme: localStorage.getItem('antdAdminDarkTheme') !== 'false',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: JSON.parse(localStorage.getItem('navOpenKeys') || '[]'),
    appMsg: '1111',
    msgType:1,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname !== '/') {
          let userInfo = cookie.load("info");
          //假如没有登录,跳回登录页

          if(userInfo==null){
            // dispatch(routerRedux.push('/'));
          }else{
            dispatch({
              type: 'storeInfo',
              payload: userInfo
            });
          }

        }
      });
      window.onresize = function () {
        dispatch({type: 'changeNavbar'})
      }
    }
  },

  effects:{
    *verify({payload}, {call, put}) {
      const data = yield call(login, {
        username: payload.username,
        password: payload.password
      });
      if(data){
        let verifyFlag = data.code;
        if(verifyFlag == 200){
          let userVo = data.data;
          cookie.save("info",userVo);
          BasicAuth.setAuth(payload.username, payload.password, userVo.avatar);
          yield put({
            type: 'storeInfo',
            payload: userVo
          });
          if(userVo.type === 'member'){
            yield put(routerRedux.push(`/${userVo.id}/hotelList`));
          }else if(userVo.type === 'hotel'){
            yield put(routerRedux.push(`/${userVo.id}/statHotel`));
          }else if(userVo.type === 'manager'){
            yield put(routerRedux.push(`/${userVo.id}/dashboard`));
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
    *switchSider ({
      payload
    }, {put}) {
      yield put({
        type: 'handleSwitchSider'
      })
    },
    *changeTheme ({
      payload
    }, {put}) {
      yield put({
        type: 'handleChangeTheme'
      })
    },
    *changeNavbar ({
      payload
    }, {put}) {
      if (document.body.clientWidth < 769) {
        yield put({type: 'showNavbar'})
      } else {
        yield put({type: 'hideNavbar'})
      }
    },
    *switchMenuPopver ({
      payload
    }, {put}) {
      yield put({
        type: 'handleSwitchMenuPopver'
      })
    },
    *logout ({
      payload
    }, {call, put}) {
      const data = yield call(logout, payload);
      BasicAuth.clearAuth();
      cookie.remove("info");
        yield put({
          type: 'logoutSuccess'
        })
    },
    *register({payload}, {call,put}) {
      yield put({type: 'setRegister'});
      yield put(routerRedux.push(`/register/registerMember`));
    },
    *createMember({payload}, {call,put}) {
      const data = yield call(createMember, payload);
      if (data && data.code == 200) {
        message.success("注册成功，请登陆",5000);
        yield put({type: 'finishRegister'});
        yield put(routerRedux.push(`/`));
      } else {
        message.error(data? data.message: "注册失败");
      }
    }
  },

  reducers:{
    showAlert(state,action) {
      return { ...state, alertVisible: true ,loginMsg: action.payload};
    },

    closeAlert(state){
      return {...state, alertVisible: false};
    },
    storeInfo(state, action){
      return {
        ...state,
        user: action.payload,
        isLogin: true
      }
    },
    showLoading (state) {
      return {
        ...state,
        loading: true
      }
    },
    hideLoading (state) {
      return {
        ...state,
        loading: false
      }
    },
    handleSwitchSider (state) {
      localStorage.setItem('antdAdminSiderFold', !state.siderFold);
      return {
        ...state,
        siderFold: !state.siderFold
      }
    },
    handleChangeTheme (state) {
      localStorage.setItem('antdAdminDarkTheme', !state.darkTheme);
      return {
        ...state,
        darkTheme: !state.darkTheme
      }
    },
    showNavbar (state) {
      return {
        ...state,
        isNavbar: true
      }
    },
    hideNavbar (state) {
      return {
        ...state,
        isNavbar: false
      }
    },
    handleSwitchMenuPopver (state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible
      }
    },
    handleNavOpenKeys (state, action) {
      return {
        ...state,
        ...action.payload
      }
    },
    logoutSuccess (state) {
      return {
        ...state,
        isLogin: false,
        isRegister: false,
        user: {
          type: "register"
        }
      }
    },
    addMessage (state,action) {
      return {
        ...state,
        ...action.payload
      }
    },
    removeMessage (state) {
      return {
        ...state,
        appMsg: '',
        msgType: 0
      }
    },
    setRegister(state) {
      return {
        ...state,
        isRegister: true
      }
    },
    finishRegister(state) {
      return {
        ...state,
        isRegister: false
      }
    }
  }

}
