/**
 * complete checks
 */
import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import CompleteCheckList from '../components/manager/CompleteCheckList'
function CompleteCheckPage({location, dispatch,managerInfo,app}) {
  const { loading, check_list} = managerInfo;
  const managerId = app.user.id;

  const completeCheckProps = {
    dataSource: check_list,
    loading,
    onCompleteItem (id) {
      dispatch({
        type: 'managerInfo/approveCheck',
        payload: {
          approveId: id,
          managerId: managerId
        }
      })
    }
  };

  return (
    <div className='content-inner'>
      <CompleteCheckList {...completeCheckProps} />
    </div>
  )
}
CompleteCheckPage.propTypes = {
  managerInfo: PropTypes.object,
  app: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect(({managerInfo,app}) => ({managerInfo,app}))(CompleteCheckPage)

