import React from 'react'
import { Tabs } from 'antd'
import moment from 'moment'
import { fetchTrackRecords, fetchClueRecords } from './api'
const styles = require('./style')
interface States {
  trackRecords: Customer.TrackRecord[]
  clueRecords: Customer.TrackRecord[]
}
interface Props {
  customerId?: string
}
class Main extends React.Component<Props> {
  public state: States = {
    trackRecords: [],
    clueRecords: []
  }
  public componentWillMount () {
    const payload = {
      pageNum: 1,
      pageSize: 999
    }
    fetchTrackRecords(this.props.customerId, payload).then((res) => {
      this.setState({
        trackRecords: res.data
      })
    })
    fetchClueRecords(this.props.customerId, payload).then((res) => {
      this.setState({
        clueRecords: res.data
      })
    })
  }
  public callback () {
    console.log('11')
  }
  public render () {
    return (
      <div style={{ borderLeft: '1px solid #e5e5e5', height: 400 }}>
        <Tabs animated={false} defaultActiveKey='1' onChange={this.callback}>
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
                      {
                        item.tagIntention > -1 &&
                        <span className={styles.tag}>
                          {APP.dictionary[`EnumIntentionality-${item.tagIntention}`]}
                        </span>
                      }
                      {
                        item.tagCustomerStatus > -1 &&
                        <span className={styles.tag}>
                          {APP.dictionary[`EnumCustomerStatus-${item.tagCustomerStatus}`]}
                        </span>
                      }
                      {
                        item.tagFollowupStatus > -1 &&
                        <span className={styles.tag}>
                          {APP.dictionary[`EnumFollowWay-${item.tagFollowupStatus}`]}
                        </span>
                      }
                      {
                        item.tagTelephoneStatus > -1 &&
                        <span className={styles.tag}>
                          {APP.dictionary[`EnumContactStatus-${item.tagTelephoneStatus}`]}
                        </span>
                      }
                      {
                        item.appointTime &&
                        <span className={styles.tag}>
                          {moment(item.appointTime).format('YYYY-MM-DD')}
                        </span>
                      }
                    </div>
                  </div>
                )
              })
            }
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab='线索记录' key='2'>
            <div style={{overflowY: 'auto', height: 500 }}>
              {
                this.state.clueRecords.length > 0 && this.state.clueRecords.map((item, index) => {
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
        </Tabs>
      </div>
    )
  }
}
export default Main
