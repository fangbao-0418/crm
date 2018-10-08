import React from 'react'
import { Tabs } from 'antd'
import { fetchTrackRecords, fetchClueRecords } from './api'
const styles = require('./style')
interface States {
  trackRecords: Customer.TrackRecord[]
}
class Main extends React.Component {
  public state: States = {
    trackRecords: []
  }
  public componentWillMount () {
    const payload = {
      pageNum: 1,
      pageSize: 999
    }
    fetchTrackRecords(payload).then((res) => {
      this.setState({
        trackRecords: res.data
      })
    })
    fetchClueRecords(payload).then((res) => {
      console.log(res, 'res2')
    })
  }
  public callback () {
    console.log('11')
  }
  public render () {
    return (
      <div style={{ borderLeft: '1px solid #e5e5e5', height: 400 }}>
        <Tabs defaultActiveKey='1' onChange={this.callback}>
          <Tabs.TabPane tab='跟进记录' key='1'>
            <div style={{overflowY: 'auto', height: 500 }}>
            {
              this.state.trackRecords.length > 0 && this.state.trackRecords.map((item, index) => {
                return (
                  <div className={styles.record} key={index}>
                    <div className={styles['line-height']}>
                      <span>{item.salesperson}</span>
                      <span>{item.createTime}</span>
                    </div>
                    <div>{item.remark}</div>
                    <div>
                      <span className={styles.tag}>{item.tagIntention}</span>
                      <span className={styles.tag}>{item.tagCustomerStatus}</span>
                      <span className={styles.tag}>{item.tagFollowupStatus}</span>
                      <span className={styles.tag}>{item.tagTelephoneStatus}</span>
                      <span className={styles.tag} style={{ width: 89 }}>{item.appointTime}</span>
                    </div>
                  </div>
                )
              })
            }
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab='线索记录' key='2'>
            <div className={styles.record}>
              <div className={styles['line-height']}>
                <span>张磊</span>
                <span>2018-09-01 12:00:11</span>
              </div>
              <div>客户出差，明天再打</div>
              <div>
                <span className={styles.tag}>持续跟进</span>
                <span className={styles.tag} style={{ width: 89 }}>2018-09-10</span>
              </div>
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  }
}
export default Main
