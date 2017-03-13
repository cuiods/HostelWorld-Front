/**
 * member detail block
 */
import React, { PropTypes } from 'react'
import { Button , Rate, Tag, Modal} from 'antd'
import styles from './MemberDetail.less';
import CountUp from 'react-countup'
import  {color}  from '../../utils'
const confirm = Modal.confirm;
function MemberDetail({id,name,phone,avatar,gender,
  createdAt, updatedAt,state,level,score,description,remain,activeDate,
  onTransfer, onExchange, onStop, onEdit}) {
  const countUpProps = {
    start: 0,
    duration: 2.75,
    useEasing: true,
    useGrouping: true,
    separator: ','
  };
  let slevel = 5;
  let scoreLine = [1000,5000,10000,20000];
  for (let i = 0; i < scoreLine.length; i++) {
    if (scoreLine[i] > level) {
      slevel = i+1;
      break;
    }
  }
  const handleStop = function () {
    confirm({
      title: '您确定要停止会员吗?',
      onOk () {
        onStop();
      }
    })
  };
  const thisStatus = {
    "newly": {
      color: color.yellow,
      text: '等待激活'
    },
    "active": {
      color: color.green,
      text: '已激活'
    },
    "pause": {
      color: color.red,
      text: '已暂停'
    },
    "stop": {
      color: color.borderBase,
      text: '已停止'
    }
  };
  let formatId = id.toString();
  while (formatId.length<7) {
    formatId = "0"+formatId;
  }
  return (<div className={styles.user}>
    <div className={styles.header}>
      <div className={styles.headerinner}>
        <div className={styles.avatar} style={{backgroundImage: `url(${avatar})`}} />
        <h5 className={styles.name}>{name}</h5>
        <p>会员编号：{formatId}</p>
        <p>个性签名：{description}</p>
      </div>
    </div>
    <div className={styles.number}>
      <div className={styles.item}>
        <p>等级</p>
        <Rate value={slevel} disabled={false}/>
      </div>
      <div className={styles.item}>
        <p>余额</p>
        <p style={{color: color.green}}><CountUp
          end={remain}
          prefix='￥'
          {...countUpProps}
        /></p>
      </div>
      <div className={styles.item}>
        <p>积分</p>
        <p style={{color: color.blue}}><CountUp
          end={score}
          {...countUpProps}
        /></p>
      </div>
    </div>
    <div className={styles.number}>
      <div className={styles.item}>
        <p>状态</p>
        <Tag color={thisStatus[state].color}>{thisStatus[state].text}</Tag>
      </div>
      <div className={styles.item}>
        <p>激活日期</p>
        <p style={{color: color.green}}>
          {activeDate}
        </p>
      </div>
      <div className={styles.item}>
        <p>手机</p>
        <p style={{color: color.blue}}>
          {phone}
        </p>
      </div>
    </div>
    <div className={styles.footer}>
      <div className={styles['op-button']}>
        <Button type='ghost' size='large' onClick={onEdit}>编辑信息</Button>
      </div>
      <div className={styles['op-button']}>
        <Button type='ghost' size='large' onClick={onTransfer}>会员充值</Button>
      </div>
      <div className={styles['op-button']}>
        <Button type='ghost' size='large' onClick={onExchange}>积分兑换</Button>
      </div>
      <div className={styles['op-button']}>
        <Button type='ghost' size='large' onClick={handleStop}>停止会员</Button>
      </div>
    </div>
  </div>)
}

export default MemberDetail;
