/**
 * reserve list router
 */
import React, { PropTypes } from 'react'
import { connect } from 'dva'
import ConsumeList from '../components/consumes/ConsumeList'
function Consumes({location, dispatch,consumeInfo}) {
  const { loading, consume_list, isMotion } = consumeInfo;

  const reserveListProps = {
    dataSource: consume_list,
    loading,
    isMotion
  };

  return (
    <div className='content-inner'>
      <ConsumeList {...reserveListProps} />
    </div>
  )
}
Consumes.propTypes = {
  checkInfo: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect(({consumeInfo}) => ({consumeInfo}))(Consumes)


