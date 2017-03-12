/**
 * show reserve lists
 */
import React, {PropTypes} from 'react'
import {Table, Dropdown, Button, Menu, Tag, Modal} from 'antd'
import styles from './ReserveList.less'
import classnames from 'classnames'
import TableBodyWrapper from '../common/TableBodyWrapper'
import  {color}  from '../../utils/'

const confirm = Modal.confirm;
function ReserveList({ loading, dataSource, pagination, onPageChange, onDeleteItem, isMotion, location, isHotel }) {
  const handleMenuClick = (record, e) => {
    confirm({
      title: '您确定要取消预约吗?',
      onOk () {
        onDeleteItem(record.id)
      }
    })
  };
  const status = {
    "checkIn": {
      color: color.green,
      text: '已入住'
    },
    "reserve": {
      color: color.yellow,
      text: '已预约'
    }
  };
  const columns = [{
    title: '编号',
    dataIndex: 'id',
    key:'id'
  },{
    title: '开始时间',
    dataIndex: 'start',
    key:'start'
  },{
    title: '结束时间',
    dataIndex: 'end',
    key:'end'
  },{
    title: '预约人姓名',
    dataIndex: 'name',
    key:'name'
  },{
    title: '联系方式',
    dataIndex: 'contact',
    key:'contact'
  }, {
    title: '状态',
    dataIndex: 'state',
    key:'state',
    render: text => <Tag color={status[text].color}>{status[text].text}</Tag>
  },{
    title: '操作',
    key: 'op',
    render: (text,record) => (
      <Button type='primary' onClick={(e) => handleMenuClick(record, e)}>取消</Button>
    )
  }];

  const getBodyWrapperProps = {
    page: location.query.page,
    current: pagination.current
  };

  const getBodyWrapper = body => isMotion ? <TableBodyWrapper {...getBodyWrapperProps} body={body} /> : body;

  return (
    <div>
      <Table
        className={classnames({[styles.table]: true, [styles.motion]: isMotion})}
        bordered
        scroll={{ y: 460 }}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        onChange={onPageChange}
        pagination={pagination}
        simple
        rowKey={record => record.id}
        getBodyWrapper={getBodyWrapper}
      />
    </div>
  )
}

ReserveList.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  pagination: PropTypes.object,
  onPageChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object
};

export default ReserveList;
