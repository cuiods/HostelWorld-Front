/**
 * hotel list router
 */
import React, { PropTypes } from 'react'
import { connect } from 'dva'
import Header from '../components/layout/header'
import Bread from '../components/layout/bread'
import Footer from '../components/layout/footer'
import Sider from '../components/layout/sider'
import LoginForm from '../components/login/LoginForm';
import { BackTop , message} from 'antd';
import styles from '../components/layout/main.less'
import '../components/layout/common.less'
import { classnames } from '../utils'
function Console({children, location, dispatch, app}) {
  const {user,isLogin, loading, loginButtonLoading, menuPopoverVisible,
    siderFold, darkTheme,isNavbar, navOpenKeys,userId, alertVisible, loginMsg, appMsg, msgType} = app;
  const userLoginProps = {
    userId,
    alertVisible,
    loginMsg,

    onLogin(fieldsValue) {
      dispatch({
        type: 'app/verify',
        payload: { ...fieldsValue },
      });
    },

    closeAlert() {
      dispatch({
        type: 'app/closeAlert',
        payload: {}
      })
    }
  };
  const headerProps = {
    user,
    siderFold,
    location,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,
    switchMenuPopover () {
      dispatch({type: 'app/switchMenuPopver'})
    },
    logout () {
      dispatch({type: 'app/logout'})
    },
    switchSider () {
      dispatch({type: 'app/switchSider'})
    },
    changeOpenKeys (openKeys) {
      localStorage.setItem('navOpenKeys', JSON.stringify(openKeys));
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    }
  };
  let id = user.id;
  const siderProps = {
    siderFold,
    darkTheme,
    location,
    navOpenKeys,
    changeTheme () {
      dispatch({type: 'app/changeTheme'})
    },
    changeOpenKeys (openKeys) {
      localStorage.setItem('navOpenKeys', JSON.stringify(openKeys));
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    },
    userId: id,
    userType: user.type,
  };

  return (
    <div>
      {isLogin?
        <div className={classnames(styles.layout, {[styles.fold]: isNavbar ? false : siderFold}, {[styles.withnavbar]: isNavbar})}>
          {!isNavbar ? <aside className={classnames(styles.sider, {[styles.light]: !darkTheme})}>
              <Sider {...siderProps} />
            </aside> : ''}
          <div className={styles.main}>
            <Header {...headerProps} />
            <Bread location={location} />
            <div className={styles.container}>
              <div className={styles.content}>
                {children}
              </div>
            </div>
            <Footer />
            <BackTop />
          </div>
        </div>:<LoginForm {...userLoginProps}/>}
    </div>
  )
}

Console.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object
};

export default connect(({app}) => ({app}))(Console);
