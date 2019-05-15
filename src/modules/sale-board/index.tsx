import React from 'react'
import classNames from 'classnames'
import { Table } from 'antd'
import { fetchInfo } from './api'
import _ from 'lodash'
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
    /** 今日动态 */
    conditionToday?: Array<{salespersonName?: string, createTime?: string, customerName?: string}>
    /** 今天通话排行 */
    callToday?: Array<{sortNumber?: string, salesperson?: string, value?: string}>
    /** 今天新签排行 */
    signedToday?: Array<{sortNumber?: string, salesperson?: string, value?: string}>
  }
  callTodayList?: Array<{sortNumber?: string, salesperson?: string, value?: string}>
  signedTodayList?: Array<{sortNumber?: string, salesperson?: string, value?: string}>
  conditionTodayList?: Array<{salespersonName?: string, createTime?: string, customerName?: string}>
}
class Main extends React.Component<{}, State> {
  public callColumns = [{
    title: '排名',
    width: '100px',
    dataIndex: 'sortNumber'
  }, {
    title: '头像',
    width: '100px',
    dataIndex: 'salesperson',
    render: (val: string) => {
      return (
        <span className={styles.naver}>{val.slice(0, 1)}</span>
      )
    }
  }, {
    title: '销售',
    width: '100px',
    dataIndex: 'salesperson'
  }, {
    title: '通话量',
    width: '100px',
    dataIndex: 'value'
  }]
  public YJcolumns = [{
    title: '排名',
    width: '100px',
    dataIndex: 'sortNumber'
  }, {
    title: '头像',
    width: '100px',
    dataIndex: 'salesperson',
    render: (val: string) => {
      return (
        <span className={styles.naver}>{val.slice(0, 1)}</span>
      )
    }
  }, {
    title: '销售',
    width: '100px',
    dataIndex: 'salesperson'
  }, {
    title: '新签客户',
    width: '100px',
    dataIndex: 'value'
  }]
  public state: State = {
    type: 'CALL',
    dataSource: {},
    callTodayList: [],
    signedTodayList: [],
    conditionTodayList: []
  }
  public componentWillMount () {
    fetchInfo().then((res) => {
      this.setState({
        dataSource: res.data,
        conditionTodayList: res.data.conditionToday,
        callTodayList: res.data.callToday,
        signedTodayList: res.data.signedToday
      })
    })
  }
  public render () {
    const { dataSource, conditionTodayList, callTodayList, signedTodayList } = this.state
    const curData: Array<{sortNumber?: string, salesperson?: string, value?: string}> = this.state.type === 'CALL' ? callTodayList : signedTodayList
    const data = _.cloneDeep(curData)
    data.splice(0, 3)
    return (
      <div className={classNames(styles.board)}>
        <div className={classNames(styles.top, 'clear')}>
          <div className={classNames('fl', 'bg', styles.card)}>
            <img src={require('@/assets/images/touxiang.png')}/>
            <div>
              <p className={styles.title}>{dataSource.kanbanWelcoming}</p>
              <p>
                <span>{APP.user.roleName}</span>
                <span> | </span>
                <span>{APP.user.organizationName}</span>
              </p>
            </div>
          </div>
          <ul className={classNames('fl')}>
            <li className={classNames('bg')}>
              <img src={require('@/assets/images/我的商机icon.png')}/>
              <div>
                <p>商机客户</p>
                <p className={styles.num}>{dataSource.businessCustomerNums}</p>
              </div>
            </li>
            <li className={classNames('bg')}>
              <img src={require('@/assets/images/本月完成新签.png')}/>
              <div>
                <p>意向客户</p>
                <p className={styles.num}>{dataSource.infoDegree}</p>
              </div>
            </li>
            <li className={classNames('bg')}>
              <img src={require('@/assets/images/本月跟进.png')}/>
              <div>
                <p>本月新签客户</p>
                <p className={styles.num}>{dataSource.signedNums}</p>
              </div>
            </li>
          </ul>
        </div>
        <ul className={classNames('mt10', styles.middle, 'clear')}>
          <li className={styles.first}>
            <p>待跟进</p>
            <p className={styles.num}>{dataSource.awaitTrackNums}</p>
          </li>
          <li className={styles.second}>
            <p>今日待回访</p>
            <p className={styles.num}>{dataSource.returnVisitNums}</p>
          </li>
          <li className={styles.third}>
            <p>信息待完善</p>
            <p className={styles.num}>{dataSource.intentionCustomerNums}</p>
          </li>
          <li className={styles.forth}>
            <p>下单进行中</p>
            <p className={styles.num}>{dataSource.signingNums}</p>
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
              {
                curData.length > 0 &&
                <ul className={classNames(styles['tab-con'], 'clear')}>
                  <li className={classNames(styles['no-first'], styles.third)}>
                    <div className={styles.box}>
                      <img src={require('@/assets/images/第三名.png')}/>
                      <p className={styles.circle}>{curData[2] && curData[2].salesperson ? curData[2].salesperson.slice(0, 1) : '未'}</p>
                    </div>
                    <p className={styles.name}>{curData[2] && curData[2].salesperson}</p>
                    <p className={styles.num}>{this.state.type === 'CALL' ? '通话量：' : '新签客户：'}{curData[2] && curData[2].value}</p>
                  </li>
                  <li className={styles.first}>
                    <div>
                      <img src={require('@/assets/images/第一名.png')}/>
                      <p className={styles.circle}>{curData[0] && curData[0].salesperson ? curData[0].salesperson.slice(0, 1) : '未'}</p>
                    </div>
                    <p className={styles.name}>{curData[0] && curData[0].salesperson}</p>
                    <p className={styles.num}>{this.state.type === 'CALL' ? '通话量：' : '新签客户：'}{curData[0] && curData[0].value}</p>
                  </li>
                  <li className={classNames(styles['no-first'], styles.second)}>
                    <div className={styles.box}>
                      <img src={require('@/assets/images/第二名.png')}/>
                      <p className={styles.circle}>
                        {curData[1] && curData[1].salesperson ? curData[1].salesperson.slice(0, 1) : '未'}
                      </p>
                    </div>
                    <p className={styles.name}>{curData[1] && curData[1].salesperson}</p>
                    <p className={styles.num}>{this.state.type === 'CALL' ? '通话量：' : '新签客户：'}{curData[1] && curData[1].value}</p>
                  </li>
                </ul>
              }
              <div className={classNames('mt10', styles['tab-table'])}>
                <Table
                  columns={this.state.type === 'CALL' ? this.callColumns : this.YJcolumns}
                  dataSource={data}
                  pagination={false}
                />
              </div>
            </div>
          </div>
          <div className={styles.dynamic}>
            <div className='clear'>
              <span className={classNames(styles.title, 'fl')}>客资动态</span>
              <span className={classNames(styles.more, 'fr')} onClick={() => APP.history.push('/business')}>查看更多></span>
            </div>
            <ul>
              {
                conditionTodayList.length > 0 && conditionTodayList.map((item, index) => {
                  return (
                    <li key={index}>
                      <p>
                        <span>{item.salespersonName} </span>
                        <span> 将客户</span>
                        <span
                          className={styles.company}
                          onClick={() => {APP.history.push('/business', {name: item.customerName})}}
                        >
                          {item.customerName}
                        </span>
                        <span>分给你</span>
                      </p>
                      <p>{item.createTime}</p>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Main
