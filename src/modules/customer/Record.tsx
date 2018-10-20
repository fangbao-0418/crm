import React from 'react'
import { Tabs } from 'antd'
import moment from 'moment'
import { connect } from 'react-redux'
const styles = require('./style')
interface Props extends Customer.Props {
  customerId?: string
  height?: number
}
class Main extends React.Component<Props> {
  public render () {
    console.log(this.props, 'this.props')
    const { trackRecords, clueRecords } = this.props
    return (
      <div style={{ borderLeft: '1px solid #e5e5e5' }}>
        <Tabs animated={false} defaultActiveKey='1'>
          <Tabs.TabPane tab='跟进记录' key='1'>
            <div style={{overflowY: 'auto', height: this.props.height }}>
            {
              trackRecords.length > 0 && trackRecords.map((item, index) => {
                return (
                  <div className={styles.record} key={index}>
                    <div className={styles['line-height']}>
                      <span>{item.salesperson}</span>
                      <span>{moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}</span>
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
                          {APP.dictionary[`EnumNeedStatus-${item.tagCustomerStatus}`]}
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
                          {moment(item.appointTime).format('YYYY-MM-DD HH:mm:ss')}
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
            <div style={{overflowY: 'auto', height: this.props.height }}>
              {
                clueRecords.length > 0 && clueRecords.map((item, index) => {
                  return (
                    <div className={styles.record} key={index}>
                      <div className={styles['line-height']}>
                        <span>{item.salesperson}</span>
                        <span>{moment(item.createTime).format('YYYY-MM-DD')}</span>
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
                            {APP.dictionary[`EnumNeedStatus-${item.tagCustomerStatus}`]}
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
        </Tabs>
      </div>
    )
  }
}
export default connect((state: Reducer.State) => {
  return state.customer
})(Main)
