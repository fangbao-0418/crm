import React from 'react'
import classNames from 'classnames'
import { Table } from 'antd'
import { fetchInfo } from './api'
const styles = require('./style')
interface State {
  type?: 'CALL' | 'ACHIEVEMENT'
  dataSource?: {
    /** 欢迎词 */
    kanbanWelcoming?: string
    /** 商机客户 */
    businessCustomerNums?: string
    /** 意向客户 */
    intentionCustomerNums?: string
    /** 本月新签客户 */
    signedNums?: string
    /** 待跟进 */
    awaitTrackNums?: string
    /** 今日待回访 */
    returnVisitNums?: string
    /** 信息待完善 */
    infoDegree?: string
    /** 下单进行中 */
    signingNums?: string  
  }
  data?: Array<{rank?: string, naver?: string, sale?: string, num?: string}>
}
class Main extends React.Component<{}, State> {
  public columns = [{
    title: '排名',
    dataIndex: 'rank'
  }, {
    title: '头像',
    dataIndex: 'naver',
    render: (val: string) => {
      return (
        <span className={styles.naver}>{val}</span>
      )
    }
  }, {
    title: '销售',
    dataIndex: 'sale'
  }, {
    title: '通话量',
    dataIndex: 'num'
  }]
  public state: State = {
    type: 'CALL',
    dataSource: {},
    data: [{
      rank: '4',
      naver: '李',
      sale: '张大大',
      num: '50000'
    }]
  }
  public componentWillMount () {
    fetchInfo().then((res) => {
      this.setState({
        dataSource: res.data
      })
    })
  }
  public render () {
    return (
      <div className={classNames(styles.board)}>
        <div className={classNames(styles.top, 'clear')}>
          <div className={classNames('fl', 'bg', styles.card)}>
            <img src={require('@/assets/images/touxiang.png')}/>
            <div>
              <p className={styles.title}>Hellow，王大大，祝你每一天都有新收获哦！加油～</p>
              <p>
                <span>销售顾问</span>
                <span> | </span>
                <span>北京直营-销售部-雷霆队</span>
              </p>
            </div>
          </div>
          <ul className={classNames('fl')}>
            <li className={classNames('bg')}>
              <img src={require('@/assets/images/我的商机icon.png')}/>
              <div>
                <p>商机客户</p>
                <p className={styles.num}>19，988</p>
              </div>
            </li>
            <li className={classNames('bg')}>
              <img src={require('@/assets/images/本月完成新签.png')}/>
              <div>
                <p>意向客户</p>
                <p className={styles.num}>20</p>
              </div>
            </li>
            <li className={classNames('bg')}>
              <img src={require('@/assets/images/本月跟进.png')}/>
              <div>
                <p>本月新签客户</p>
                <p className={styles.num}>5，000</p>
              </div>
            </li>
          </ul>
        </div>
        <ul className={classNames('mt10', styles.middle, 'clear')}>
          <li className={styles.first}>
            <p>待跟进</p>
            <p className={styles.num}>20</p>
          </li>
          <li className={styles.second}>
            <p>今日待回访</p>
            <p className={styles.num}>20</p>
          </li>
          <li className={styles.third}>
            <p>信息待完善</p>
            <p className={styles.num}>20</p>
          </li>
          <li className={styles.forth}>
            <p>下单进行中</p>
            <p className={styles.num}>20</p>
          </li>
        </ul>
        <div className={classNames('mt10', styles.bottom, 'clear')}>
          <div className={styles.rank}>
            <div className={styles.title}>排行榜</div>
            <div>
              <div className={classNames(styles.tab, 'clear')}>
                <span
                  style={{color: this.state.type === 'CALL' ? '#1890FF' : '#2A2A2A'}}
                  onClick={() => {
                    this.setState({
                      type: 'CALL'
                    })
                  }}
                >
                  今日通话榜
                </span>
                <span> ／ </span>
                <span
                  style={{color: this.state.type === 'ACHIEVEMENT' ? '#1890FF' : '#2A2A2A'}}
                  onClick={() => {
                    this.setState({
                      type: 'ACHIEVEMENT'
                    })
                  }}
                >
                  今日业绩榜
                </span>
              </div>
              <ul className={classNames(styles['tab-con'], 'clear')}>
                <li className={classNames(styles['no-first'], styles.third)}>
                  <div className={styles.box}>
                    <img src={require('@/assets/images/第三名.png')}/>
                    <p className={styles.circle}>高</p>
                  </div>
                  <p className={styles.name}>高圆圆</p>
                  <p className={styles.num}>通话量：300</p>
                </li>
                <li className={styles.first}>
                  <div>
                    <img src={require('@/assets/images/第一名.png')}/>
                    <p className={styles.circle}>陈</p>
                  </div>
                  <p className={styles.name}>陈大大</p>
                  <p className={styles.num}>通话量：50000</p>
                </li>
                <li className={classNames(styles['no-first'], styles.second)}>
                  <div className={styles.box}>
                    <img src={require('@/assets/images/第二名.png')}/>
                    <p className={styles.circle}>
                      凯
                    </p>
                  </div>
                  <p className={styles.name}>凯丽</p>
                  <p className={styles.num}>通话量：400</p>
                </li>
              </ul>
              <div className={classNames('mt20', styles['tab-table'])}>
                <Table
                  columns={this.columns}
                  dataSource={this.state.data}
                  pagination={false}
                />
              </div>
            </div>
          </div>
          <div className={styles.dynamic}>
            <div className='clear'>
              <span className={classNames(styles.title, 'fl')}>客资动态</span>
              <span className={classNames(styles.more, 'fr')} onClick={() => APP.history.push('/crm/business')}>查看更多></span>
            </div>
            <ul>
              <li>
                <p>
                  <span>张磊 </span>
                  <span> 将客户</span>
                  <span className={styles.company}>北京爱康定科技有限公司</span>
                  <span>分给你</span>
                </p>
                <p>12:09</p>
              </li>
              <li>
                <p>
                  <span>张磊 </span>
                  <span> 将客户</span>
                  <span className={styles.company}>北京爱康定科技有限公司</span>
                  <span>分给你</span>
                </p>
                <p>12:09</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Main
