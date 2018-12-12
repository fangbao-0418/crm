import React from 'react'
import { Tabs } from 'antd'
import moment from 'moment'
import { connect } from 'react-redux'
const styles = require('./style')
interface Props extends Customer.Props {
  customerId?: string
  height?: number
  type?: 'business' | 'open' | 'customer' | 'signed'
}
interface State {
  img: boolean
}
class Main extends React.Component<Props> {
  public state: State = {
    img: false
  }
  public render () {
    const { trackRecords, clueRecords, callRecords } = this.props
    const relatedCompany = (this.props.detail.relatedCompany || '').split(',')
    return (
      <div>
        <Tabs animated={false} defaultActiveKey='1'>
          <Tabs.TabPane tab='跟进记录' key='1'>
            <div style={{overflowY: 'auto', maxHeight: this.props.height }}>
            {
              trackRecords.length > 0 && trackRecords.map((item, index) => {
                return (
                  <div className={styles.record} key={index}>
                    <div className={styles['line-height']} style={{color: 'black'}}>
                      <span style={{marginRight: 10}}>{item.salesperson}</span>
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
                        item.tagFollowUpClassification > -1 &&
                        <span className={styles.tag}>
                          {APP.dictionary[`EnumFollowUpClassification-${item.tagFollowUpClassification}`]}
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
          <Tabs.TabPane tab='通话记录' key='2'>
            <div style={{overflowY: 'auto', maxHeight: this.props.height }}>
            {
              callRecords.length > 0 && callRecords.map((item, index) => {
                return (
                  <div className={styles.record} key={index}>
                    <div className={styles['line-height']} style={{color: 'black'}}>
                      <span style={{marginRight: 10}}>{item.salespersonName}</span>
                      <span>{moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                    </div>
                    <div>
                      <span>{item.telephone}</span>
                      <span>{item.phoneAddress}</span>
                      <span style={{paddingLeft: 20}}>
                        ({APP.fn.formatDuration(item.callDuration)})
                      </span>
                      <span
                        onClick={() => {
                          this.setState({
                            img: !this.state.img
                          })
                        }}
                      >
                        {item.mediaUrl && this.state.img ? <img className='mr5' src={require('@/assets/images/record1.png')}/> : <img className='mr5' src={require('@/assets/images/record2.png')}/>}
                      </span>
                    </div>
                  </div>
                )
              })
            }
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab='线索记录' key='3'>
            <div style={{overflowY: 'auto', height: this.props.height }}>
              {
                clueRecords.length > 0 && clueRecords.map((item, index) => {
                  return (
                    <div className={styles.record} key={index}>
                      <div className={styles['line-height']} style={{color: 'black'}}>
                        <span style={{marginRight: 10}}>{item.salesperson}</span>
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
                          item.tagFollowUpClassification > -1 &&
                          <span className={styles.tag}>
                            {APP.dictionary[`EnumFollowUpClassification-${item.tagFollowUpClassification}`]}
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
          {
            ['business', 'open', 'customer'].indexOf(this.props.type) > -1 &&
            <Tabs.TabPane tab='相关公司记录' key='4'>
              <div style={{overflowY: 'auto', maxHeight: this.props.height }} className={styles.record}>
                {
                  relatedCompany.map((item, index) => {
                    return (
                      <li key={index}>{item}</li>
                    )
                  })
                }
              </div>
            </Tabs.TabPane>
          }
        </Tabs>
      </div>
    )
  }
}
export default connect((state: Reducer.State) => {
  return state.customer
})(Main)
