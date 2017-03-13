/**
 * statistic page
 */
import  {color}  from '../utils'
import {Row, Col, Card} from 'antd'
import React, {PropTypes} from 'react'
import {connect} from 'dva'
import NumberCard from '../components/statistic/NumberCard'
import LineChart from '../components/statistic/LineChartInfo'
function StatisticPage({statisticInfo}) {
  const {reserve, check, money, weekMoney, lines} = statisticInfo;
  const reserveCardProps = {
    icon: "lock",
    color: color.green,
    title: "今日预约",
    number: reserve
  };
  const checkCardProps = {
    icon: "copy",
    color: color.blue,
    title: "今日入住",
    number: check
  };
  const moneyCardProps = {
    icon: "pay-circle",
    color: color.purple,
    title: "今日营业额",
    number: money
  };
  const weekCardProps = {
    icon: "pay-circle-o",
    color: color.red,
    title: "本周营业额",
    number: weekMoney
  };

  return (
    <Row gutter={24}>
      <Col lg={6} md={12}>
        <NumberCard {...reserveCardProps}/>
      </Col>
      <Col lg={6} md={12}>
        <NumberCard {...checkCardProps}/>
      </Col>
      <Col lg={6} md={12}>
        <NumberCard {...moneyCardProps}/>
      </Col>
      <Col lg={6} md={12}>
        <NumberCard {...weekCardProps}/>
      </Col>
      <Col lg={24} md={24}>
        <Card bordered={false} bodyStyle={{
          padding: '24px 36px 24px 0'
        }}>
          <LineChart data={lines} />
        </Card>
      </Col>
    </Row>
  )
}

StatisticPage.prototypes = {
  statisticInfo: PropTypes.object
};

export default connect(({statisticInfo}) => ({statisticInfo}))(StatisticPage)
