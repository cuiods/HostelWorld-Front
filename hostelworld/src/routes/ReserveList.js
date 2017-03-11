/**
 * reserve list router
 */
import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import ReserveList from '../components/reserve/ReserveList'
function Reservations({location, dispatch,reserveInfo}) {
  const { loading, reserve_list, pagination, currentItem, isMotion } = reserveInfo;

  const reserveListProps = {
    dataSource: reserve_list,
    loading,
    pagination: pagination,
    location,
    isMotion,
    onPageChange (page) {
      const { query, pathname } = location;
      dispatch(routerRedux.push({
        pathname: pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize
        }
      }))
    },
    onDeleteItem (id) {
      dispatch({
        type: 'reserveInfo/deleteReserve',
        payload: {
          reserveId: id
        }
      })
    }
  };

  return (
    <div className='content-inner'>
      <ReserveList {...reserveListProps} />
    </div>
  )
}
Reservations.propTypes = {
  reserveInfo: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect(({reserveInfo}) => ({reserveInfo}))(Reservations)
