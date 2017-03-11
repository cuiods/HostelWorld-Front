/**
 * check record table
 */
import React, {PropTypes} from 'react'
import {Table, Button, Tag, Modal} from 'antd'
import styles from './CheckList.less'
import classnames from 'classnames'
import TableBodyWrapper from '../common/TableBodyWrapper'
import  {color}  from '../../utils/'

function CheckList({ loading, dataSource, isMotion }) {
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

CheckList.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  isMotion: PropTypes.bool,
};

export default CheckList;

