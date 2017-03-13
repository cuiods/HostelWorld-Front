/**
 * approve new hotel
 */
import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import ApproveNewList from '../components/manager/ApproveNewList'
function ApproveNewPage({location, dispatch,managerInfo,app}) {
  const { loading, new_list} = managerInfo;
  const managerId = app.user.id;

  const approveNewProps = {
    dataSource: new_list,
    loading,
    onApproveItem (id) {
      dispatch({
        type: 'managerInfo/approveNew',
        payload: {
          approveId: id,
          managerId: managerId
        }
      })
    }
  };

  return (
    <div className='content-inner'>
      <ApproveNewList {...approveNewProps} />
    </div>
  )
}
ApproveNewPage.propTypes = {
  managerInfo: PropTypes.object,
  app: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect(({managerInfo,app}) => ({managerInfo,app}))(ApproveNewPage)

