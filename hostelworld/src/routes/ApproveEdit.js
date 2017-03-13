/**
 * approve edit hotel router
 */
import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import ApproveEditList from '../components/manager/ApproveEditList'
function ApproveEditPage({location, dispatch,managerInfo,app}) {
  const { loading, edit_list} = managerInfo;
  const managerId = app.user.id;

  const approveEditProps = {
    dataSource: edit_list,
    loading,
    onEditItem (id) {
      dispatch({
        type: 'managerInfo/approveEdit',
        payload: {
          approveId: id,
          managerId: managerId
        }
      })
    }
  };

  return (
    <div className='content-inner'>
      <ApproveEditList {...approveEditProps} />
    </div>
  )
}
ApproveEditPage.propTypes = {
  managerInfo: PropTypes.object,
  app: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect(({managerInfo,app}) => ({managerInfo,app}))(ApproveEditPage)


