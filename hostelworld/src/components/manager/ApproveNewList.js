/**
 * show new hotel lists
 */
import React, {PropTypes} from 'react'
import {Table, Dropdown, Button, Menu, Tag, Modal} from 'antd'
import styles from './ApproveList.less'
import classnames from 'classnames'
import  {color}  from '../../utils/'

const confirm = Modal.confirm;
function ApproveNewList({ loading, dataSource, onApproveItem }) {
  const handleMenuClick = (record, e) => {
    confirm({
      title: '您确定要批准新的酒店吗?',
      onOk () {
        onApproveItem(record.id)
      }
    })
  };
  const status = {
    "one": {
      color: color.green,
      text: '一星级'
    },
    "two": {
      color: color.yellow,
      text: '二星级'
    },
    "three": {
      color: color.blue,
      text: '三星级'
    },
    "four": {
      color: color.red,
      text: '四星级'
    },
    "five": {
      color: color.peach,
      text: '五星级'
    }
  };
  const columns = [{
    title: '编号',
    dataIndex: 'id',
    key:'id'
  },{
    title: '联系方式',
    dataIndex: 'phone',
    key:'phone'
  },{
    title: '全称',
    dataIndex: 'fullname',
    key:'fullname'
  },{
    title: '星级',
    dataIndex: 'star',
    key:'star',
    render: text => <Tag color={status[text].color}>{status[text].text}</Tag>
  },{
    title: '简介',
    dataIndex: 'summary',
    key:'summary'
  }, {
    title: '地址',
    dataIndex: 'location',
    key:'location',
  },{
    title: '操作',
    key: 'op',
    render: (text,record) => (
      <Button type='primary' onClick={(e) => handleMenuClick(record, e)}>通过审批</Button>
    )
  }];

  return (
    <div>
      <Table
        className={classnames({[styles.table]: true})}
        bordered
        scroll={{ x: 800 }}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        simple
        rowKey={record => record.id}
      />
    </div>
  )
}

ApproveNewList.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  onApproveItem: PropTypes.func,
};

export default ApproveNewList;

