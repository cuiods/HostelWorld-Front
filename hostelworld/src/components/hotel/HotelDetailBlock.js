/**
 * show hotel detail
 */
import React, { PropTypes } from 'react'
import { Button , Rate, Table, Modal} from 'antd'
import styles from './HotelDetailBlock.less';
import CountUp from 'react-countup'
import  {color}  from '../../utils'
function HotelDetailBlock({avatar,fullname,location,locationX,locationY,
                          createdAt, updatedAt,description,summary,star,picture,roomVos,onReserve}) {
  const countUpProps = {
    start: 0,
    duration: 2.75,
    useEasing: true,
    useGrouping: true,
    separator: ','
  };
  const handleClick = (record, e) => {
      onReserve(record);
  };
  let value = 0;
  if (star == "one") value = 1;
  else if (star == "two") value = 2;
  else if (star == "three") value = 3;
  else if (star == "four") value = 4;
  else if (star == "five") value = 5;
  const columns = [{
    title: '编号',
    dataIndex: 'id',
    key:'id'
  },{
    title: '房型',
    dataIndex: 'roomType',
    key:'roomType'
  },{
    title: '限住人数',
    dataIndex: 'people',
    key:'people'
  },{
    title: '面积',
    dataIndex: 'size',
    key:'size'
  },{
    title: '剩余',
    dataIndex: 'leftRoom',
    key:'leftRoom'
  },{
    title: '原价',
    dataIndex: 'price',
    key:'price'
  },{
    title: '现价',
    dataIndex: 'special',
    key:'special',
    render: text => Number(text)>0? text: "无折扣"
  },{
    title: '操作',
    key: 'op',
    render: (text,record) => (
      <Button type='primary' onClick={(e) => handleClick(record, e)}>预约</Button>
    )
  }];
  return (<div className={styles.user}>
    <div className={styles.header}>
      <div className={styles.headerinner}>
        <div className={styles.avatar} style={{backgroundImage: `url(${avatar})`}} />
        <h5 className={styles.name}>{fullname}</h5>
        <p>{summary}</p>
      </div>
    </div>
    <div className={styles.number}>
      <div className={styles.item}>
        <p>酒店星级</p>
        <Rate value={value} disabled={false}/>
      </div>
      <div className={styles.item}>
        <p>房型总数</p>
        <p style={{color: color.blue}}><CountUp
          end={roomVos?roomVos.length:0}
          {...countUpProps}
        /></p>
      </div>
    </div>
    <div>
      <Table columns={columns} dataSource={roomVos} />
    </div>
  </div>)
}

export default HotelDetailBlock;
