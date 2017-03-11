/**
 * reserve list router
 */
import React, { PropTypes } from 'react'
import { connect } from 'dva'
import CheckList from '../components/checks/CheckList'
function CheckRecords({location, dispatch,checkInfo}) {
  const { loading, reserve_list, isMotion } = checkInfo;

  const reserveListProps = {
    dataSource: reserve_list,
    loading,
    isMotion
  };

  return (
    <div className='content-inner'>
      <CheckList {...reserveListProps} />
    </div>
  )
}
CheckRecords.propTypes = {
  checkInfo: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect(({checkInfo}) => ({checkInfo}))(CheckRecords)

