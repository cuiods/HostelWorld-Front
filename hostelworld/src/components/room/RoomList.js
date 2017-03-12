/**
 * show hotel room lists
 */
import React, {PropTypes} from 'react'
import {Table, Button, Tag, Modal} from 'antd'
import styles from './RoomList.less'
import classnames from 'classnames'
import  {color}  from '../../utils/'

function RoomList({ loading, dataSource, isMotion }) {
  const status = {
    'big':{
      color:color.green,
      text: "大床"
    },
    'two':{
      color:color.blue,
      text: "双人"
    },
    'bigAndTwo':{
      color:color.purple,
      text: "双人大床"
    },
    'normal':{
      color:color.red,
      text:"标准"
    },
    'normalAndTwo':{
      color:color.yellow,
      text:"双人标准"
    }
  };
  const columns = [{
    title: '编号',
    dataIndex: 'id',
    key:'id'
  },{
    title: '房间类型',
    dataIndex: 'roomType',
    key:'roomType'
  },{
    title: '面积',
    dataIndex: 'size',
    key:'size'
  },{
    title: '入住人数',
    dataIndex: 'people',
    key:'people'
  },{
    title: '床型',
    dataIndex: 'bedType',
    key:'bedType',
    render: text => <Tag color={status[text].color}>{status[text].text}</Tag>
  }, {
    title: '数量',
    dataIndex: 'number',
    key:'number',
  },{
    title: '当前剩余',
    dataIndex: 'leftRoom',
    key:'leftRoom',
  }, {
    title: '描述',
    dataIndex: 'description',
    key:'description',
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

RoomList.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  isMotion: PropTypes.bool,
};

export default RoomList;

