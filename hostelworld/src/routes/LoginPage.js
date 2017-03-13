/**
 * login page router
 * @author cuihao
 */
import React, { PropTypes } from 'react';
import { connect } from 'dva';
import LoginForm from '../components/login/LoginForm';


function LoginPage({ location, dispatch, signInInfo ,app}) {

  const {userId, alertVisible, loginMsg} = signInInfo;

  const userLoginProps = {
    userId,
    alertVisible,
    loginMsg,

    onLogin(fieldsValue) {
      dispatch({
        type: 'signInInfo/verify',
        payload: { ...fieldsValue },
      });
    },

    onRegisterHotel() {
      dispatch({
        type: 'app/register',
        payload: {}
      })
    },

    closeAlert() {
      dispatch({
        type: 'signInInfo/closeAlert',
        payload: {}
      })
    },
  };

  return (
    <LoginForm {...userLoginProps}/>
  );
}

LoginPage.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  signInInfo: PropTypes.object,
  app: PropTypes.object
};

function mapStateToProps({ signInInfo,app }) {
  return { signInInfo,app };
}

export default connect(mapStateToProps)(LoginPage);
