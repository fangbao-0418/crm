import React from 'react'
import { Row, Col } from 'antd'
import { connect } from 'react-redux'
import ContentBox from '@/modules/common/content'
import Pie from '@/modules/data-overview/views/pie'
import Line from '@/modules/data-overview/views/line'
import Total from './Total'
import Search from './Search'
const styles = require('./style')
// 列表
class Main extends React.Component<Statistics.Props> {
  public render () {
    const { overView } = this.props
    const { type, date, data } = overView
    console.log(data)
    return (
      <ContentBox title='数据总览' className={styles.container}>
        <Row className={styles.tab}>
          <Search />
        </Row>
        {/* <Total /> */}
        <Row className={styles.listLeft}>
          <Col span={11} className={styles.card} style={{marginRight: '42px', height: 350}}>
            <div className={styles['card-header']}>
              <p className='fl'>{date}任务总览</p>
              <p className='fr'>任务总数：{data.taskTotal}</p>
            </div>
            <div className={styles.pic}>
              <Pie />
            </div>
          </Col>
          <Col span={11} className={styles.card} style={{height: 350}}>
            <div className={styles['card-header']}>
              <p className='fl'>{date}绩效总览</p>
              <p className='fr'>绩效总额：￥{data.rewardTotal}</p>
            </div>
            <div className={styles.reward}>
              <ul className={styles['reward-task']}>
                {
                  (!!data.taskRewardList && data.taskRewardList.length > 0) ? (
                    data.taskRewardList.map((item, index) => {
                      const { name, reward } = item
                      return  <li key={index}>{name}：￥{reward}</li>
                    })
                  ) : <li>暂无任务数据</li>
                }
              </ul>
              <ul className={styles.region}>
                {
                  (data.areaRewardList.length > 0) ? (
                    data.areaRewardList.map((item, index) => {
                      const { name, reward } = item
                      return  <li key={index}>{name}：￥{reward}</li>
                    })
                  ) : <li>暂无区域数据</li>
                }
              </ul>
            </div>
          </Col>
        </Row>
        {
          type === 'year' && (
          <Row>
            <Col span={23}>
              <Line />
            </Col>
          </Row>
          )
        }
      </ContentBox>
    )
  }
}

export default connect((state: Reducer.State) => {
  return state.statistics
})(Main)
