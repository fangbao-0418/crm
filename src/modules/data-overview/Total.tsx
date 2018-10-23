import React from 'react'
import { Row, Col, Icon } from 'antd'
import { connect } from 'react-redux'
const styles = require('./style')
class Main extends React.Component<Statistics.Props> {
  public render () {
    const { total } = this.props.overView
    return (
      <Row>
        <Col span={12}>
        <div className={styles.customer} style={{borderRight: '1px solid #dcdcdc'}}>
          <Col span={8}>
          <p><b>{total.customerTotal}</b> 个</p>
          <h4>任务总数</h4>
          </Col>
          <Col span={8}>
          <p><b>{total.customerTodayTotal}</b> 个</p>
          <h4>日任务总数</h4>
          </Col>
          <Col span={8} className={styles.scale}>
          <h4>周同比
            <span style={{color: 'red', marginLeft:'14px'}}>
            {total.customerTotalWeekIncrease}%
            <Icon type='caret-up' theme='filled' />
            </span>
          </h4>
          <h4>日同比
            <span style={{color: '#7ed321', marginLeft:'14px'}}>
            -{total.customerTotalDayIncrease}%
            <Icon type='caret-down' theme='filled' />
            </span>
          </h4>
          </Col>
        </div>
        </Col>
        <Col span={12}>
        <div className={styles.customer}>
          <Col span={8}>
          <p><b>{total.rewardTotal}</b> 元</p>
          <h4>绩效总额</h4>
          </Col>
          <Col span={8}>
          <p><b>{total.todayRewardTotal}</b> 元</p>
          <h4>日绩效</h4>
          </Col>
          <Col span={8} className={styles.scale}>
          <h4>
            周同比
            <span style={{color: 'red', marginLeft:'14px'}}>
            {total.rewardWeekIncrease}%
            <Icon type='caret-up' theme='filled' />
            </span>
          </h4>
          <h4>
            日同比
            <span style={{color: '#7ed321', marginLeft:'14px'}}>
            -{total.rewardDayIncrease}%
            <Icon type='caret-down' theme='filled' />
            </span>
          </h4>
          </Col>
        </div>
        </Col>
      </Row>
    )
  }
}
export default connect((state: Reducer.State) => {
  return state.statistics
})(Main)
