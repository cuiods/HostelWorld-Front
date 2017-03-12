/**
 * check record table
 */
import React, {PropTypes} from 'react'
import {Table, Button, Tag, Modal} from 'antd'
import styles from './CheckList.less'
import classnames from 'classnames'
import  {color}  from '../../utils/'

const confirm = Modal.confirm;
function UnfinishedCheckList({ loading, dataSource, isMotion ,onCheckOut}) {
  const handleMenuClick = (record, e) => {
    confirm({
      title: '确定要退房吗?',
      onOk () {
        onCheckOut(record);
      }
    })
  };
  const status = {
    "checkIn": {
      color: color.green,
      text: '已入住'
    },
    "checkOut": {
      color: color.yellow,
      text: '已退房'
    },
    "complete": {
      color: color.blue,
      text: '已完成'
    }
  };
  const hasPay = {
    0:{
      color: color.yellow,
      text: '未付款'
    },
    1: {
      color: color.green,
      text: '已付款'
    }
  };
  const payWay = {
    "cash":"现金",
    "member":"会员卡"
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
    title: '付款方式',
    dataIndex: 'payway',
    key:'payway',
    render: text => payWay[text]
  }, {
    title: '状态',
    dataIndex: 'state',
    key:'state',
    render: text => <Tag color={status[text].color}>{status[text].text}</Tag>
  }, {
    title: '付款状态',
    dataIndex: 'pay',
    key:'pay',
    render: text => <Tag color={hasPay[text].color}>{hasPay[text].text}</Tag>
  },{
    title: '操作',
    key: 'op',
    render: (text,record) => (
      <Button type='primary' onClick={(e) => handleMenuClick(record, e)}>退房</Button>
    )
  }];

  return (
    <div>
      <Table
        className={classnames({[styles.table]: true, [styles.motion]: isMotion})}
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

UnfinishedCheckList.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  isMotion: PropTypes.bool,
  onCheckOut: PropTypes.func,
};

export default UnfinishedCheckList;


