/**
 * check record table
 */
import React, {PropTypes} from 'react'
import {Table, Tag} from 'antd'
import styles from './ConsumeList.less'
import classnames from 'classnames'
import  {color}  from '../../utils/'

function ConsumeList({ loading, dataSource, isMotion }) {
  const columns = [{
    title: '编号',
    dataIndex: 'id',
    key:'id'
  },{
    title: '时间',
    dataIndex: 'createdAt',
    key:'createdAt',
    render: text => new Date(Number(text)).format("yyyy-MM-dd HH:mm:SS")
  },{
    title: '金额',
    dataIndex: 'number',
    key:'number',
    render: text => <Tag color={Number(text)>0?color.green:color.red}>{text}</Tag>
  },{
    title: '描述',
    dataIndex: 'description',
    key:'description'
  }];

  return (
    <div>
      <Table
        className={classnames({[styles.table]: true, [styles.motion]: isMotion})}
        bordered
        scroll={{ y: 460 }}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        simple
        rowKey={record => record.id}
      />
    </div>
  )
}

ConsumeList.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  isMotion: PropTypes.bool,
};

export default ConsumeList;


