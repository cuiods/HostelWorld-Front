/**
 * register member
 */
import React, { PropTypes } from 'react';
import { connect } from 'dva';
import RegisterMember from '../components/register/RegisterMember'

function RegisterMemberPage({ location, dispatch}) {

  const registerProps = {

    onRegister(fieldsValue) {
      dispatch({
        type: 'app/createMember',
        payload: { ...fieldsValue },
      });
    }
  };

  return (
    <RegisterMember {...registerProps}/>
  );
}

RegisterMemberPage.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({}) {
  return {};
}

export default connect(mapStateToProps)(RegisterMemberPage);


