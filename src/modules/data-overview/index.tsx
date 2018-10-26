import React from 'react'
import { Row, Col } from 'antd'
import { connect } from 'react-redux'
import ContentBox from '@/modules/common/content'
import PieList from '@/modules/data-overview/views/pie'
import Line from '@/modules/data-overview/views/line'
import Total from './Total'
import Search from './Search'
const styles = require('./style')
interface States {
  cities: any,
  secondCity: any
  isabled: boolean
}

// 列表
class Main extends React.Component<Statistics.Props, any> {
  public constructor (props: any) {
    super(props)
    this.state = {
      numberList:[1, 2, 3],
      isabled: false
    }
  }
  public render () {
    const { overView } = this.props
    const { numberList } = this.state
    const { type, date, data } = overView
    return (
    <div className={styles.container}>
      <ContentBox title='数据总览'>
      <Row className={styles.tab}>
        <Search />
      </Row>
      <Total />
      <Row className={styles.listLeft}>
        <Col span={11} className={styles.allPic} style={{marginRight:'42px'}}>
          <p className={styles.clientLeft}>{date}任务总览</p>
          <p className={styles.clientRight}>任务总数：{data.customerTotal}</p>
          <div className={styles.pic}>
            <PieList />
          </div>
        </Col>
        <Col span={11} className={styles.allPic}>
          <p className={styles.clientLeft}>{date}绩效总览</p>
          <p className={styles.clientRight}>绩效总额：￥{data.rewardTotal}</p>
          <div style={{clear:'both'}}>
            <ul className={styles.listPerform}>
              {(data.taskSumRewardList.length > 0) ? <div>
                <li key={numberList.index}>
                  {data.taskSumRewardList.map((item, index) => {
                    const { taskName, reward } = item
                    return  <dd key={index}>{taskName}：￥{reward}</dd>
                  })}
                </li>
              </div> : <ul className={styles.listPerform}>暂无名称数据</ul>}
            </ul>
          </div>
          <ul className={styles.region}>
            {(data.areaSumRewardList.length > 0) ? <div>
              <li key={numberList.index}>
                {data.areaSumRewardList.map((item, index) => {
                  const { areaName, reward } = item
                  return  <dd key={index}>{areaName}：￥{reward}</dd>
                })}
              </li>
            </div> : <li key={numberList.index}>暂无区域数据</li>}
          </ul>
        </Col>
      </Row>
      {
          type === 'YEAR' ? (
          <Row>
            <Col span={23} style={{borderRadius: '5px', border: '1px solid #dcdcdc'}}>
              <Line />
            </Col>
          </Row>
          ) : ''}
      </ContentBox>}
    </div>
    )
  }
}

export default connect((state: Reducer.State) => {
  return state.statistics
})(Main)
