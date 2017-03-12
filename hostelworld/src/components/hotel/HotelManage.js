/**
 * hotel info block
 */
import React, { PropTypes } from 'react'
import { Button , Rate, Tag, Modal} from 'antd'
import styles from './HotelDetailBlock.less';
import CountUp from 'react-countup'
import  {color}  from '../../utils'
function HotelDetail({id,avatar,state, fullname,location,locationX,locationY,
  createdAt, updatedAt,description,summary,star,roomVos, picture, onEdit}) {
  const countUpProps = {
    start: 0,
    duration: 3.75,
    useEasing: true,
    useGrouping: true,
    separator: ','
  };
  let value = 0;
  if (star == "one") value = 1;
  else if (star == "two") value = 2;
  else if (star == "three") value = 3;
  else if (star == "four") value = 4;
  else if (star == "five") value = 5;
  const thisStatus = {
    "newly": {
      color: color.yellow,
      text: '开店审批中'
    },
    "normal": {
      color: color.green,
      text: '正常'
    },
    "edit": {
      color: color.red,
      text: '编辑审批中'
    }
  };
  let formatId = id?id.toString():0;
  while (formatId.length<7) {
    formatId = "0"+formatId;
  }
  let create = new Date(Number(createdAt));
  let formatCreatedAt = create.format("yyyy-MM-dd");
  return (<div className={styles.user}>
    <div className={styles.header}>
      <div className={styles.headerinner}>
        <div className={styles.avatar} style={{backgroundImage: `url(${avatar})`}} />
        <h5 className={styles.name}>{fullname}</h5>
        <p>酒店编号：{formatId}</p>
        <p>酒店简介：{summary}</p>
        <p>酒店地址：{location}</p>
      </div>
    </div>
    <div className={styles.number}>
      <div className={styles.item}>
        <p>等级</p>
        <Rate value={value} disabled={false}/>
      </div>
      <div className={styles.item}>
        <p>房型数量</p>
        <p style={{color: color.green}}><CountUp
          end={roomVos?roomVos.length:0}
          {...countUpProps}
        /></p>
      </div>
    </div>
    <div className={styles.number}>
      <div className={styles.item}>
        <p>状态</p>
        <Tag color={state?thisStatus[state].color:color.red}>{state?thisStatus[state].text:""}</Tag>
      </div>
      <div className={styles.item}>
        <p>创建日期</p>
        <p style={{color: color.green}}>
          {formatCreatedAt}
        </p>
      </div>
    </div>
    <div className={styles.footer}>
      <div className={styles['op-button']}>
        <Button type='ghost' size='large' onClick={onEdit}>编辑信息</Button>
      </div>
    </div>
  </div>)
}

export default HotelDetail;

