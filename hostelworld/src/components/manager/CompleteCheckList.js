/**
 * complete checks
 */
import React, {PropTypes} from 'react'
import {Table, Dropdown, Button, Menu, Tag, Modal} from 'antd'
import styles from './ApproveList.less'
import classnames from 'classnames'
import  {color}  from '../../utils/'

const confirm = Modal.confirm;
function CompleteCheckList({ loading, dataSource, onCompleteItem }) {
  const handleMenuClick = (record, e) => {
    confirm({
      title: '您确定要结算吗?',
      onOk () {
        onCompleteItem(record.id)
      }
    })
  };
  const patWay = {
    "member": {
      color: color.green,
      text: '会员支付'
    },
    "cash": {
      color: color.yellow,
      text: '现金结算'
    }
  };
  const status = {
    "checkOut": {
      color: color.yellow,
      text: '待结算'
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
    key:'end',
  },{
    title: '付款方式',
    dataIndex: 'payway',
    key:'payway',
    render: text => <Tag color={patWay[text].color}>{patWay[text].text}</Tag>
  }, {
    title: '创建时间',
    dataIndex: 'createdAt',
    key:'createdAt',
    render: text => new Date(Number(text)).format("yyyy-MM-dd")
  }, {
    title: '状态',
    dataIndex: 'state',
    key:'state',
    render: text => <Tag color={status[text].color}>{status[text].text}</Tag>
  },{
    title: '操作',
    key: 'op',
    render: (text,record) => (
      <Button type='primary' onClick={(e) => handleMenuClick(record, e)}>订单结算</Button>
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

CompleteCheckList.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  onCompleteItem: PropTypes.func,
};

export default CompleteCheckList;


