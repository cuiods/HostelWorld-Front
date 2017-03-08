/**
 * login page router
 * @author cuihao
 */
import React, { PropTypes } from 'react';
import { connect } from 'dva';
import LoginForm from '../components/login/LoginForm';


function LoginPage({ location, dispatch, signInInfo }) {

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

    closeAlert() {
      dispatch({
        type: 'signInInfo/closeAlert',
        payload: {}
      })
    }
  };

  return (
    <LoginForm {...userLoginProps}/>
  );
}

LoginPage.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  signInInfo: PropTypes.object,
};

function mapStateToProps({ signInInfo }) {
  return { signInInfo };
}

export default connect(mapStateToProps)(LoginPage);
