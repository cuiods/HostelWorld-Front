/**
 * registerHotel page
 */
import React, { PropTypes } from 'react';
import { connect } from 'dva';
import RegisterHotel from '../components/register/RegisterHotel'

function RegisterHotelPage({ location, dispatch}) {

  const registerProps = {

    onRegister(fieldsValue) {
      dispatch({
        type: 'hotelInfo/create',
        payload: { ...fieldsValue },
      });
    }
  };

  return (
    <RegisterHotel {...registerProps}/>
  );
}

RegisterHotelPage.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({}) {
  return {};
}

export default connect(mapStateToProps)(RegisterHotelPage);

