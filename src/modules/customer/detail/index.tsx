import React from 'react'
import Profile from '@/modules/common/company-detail/Profile'
import BaseInfo from '@/modules/customer/BaseInfo'
import Record from '@/modules/customer/Record'
import Card from '@/components/Card'
import Tags from '@/components/tags'
import _ from 'lodash'
import moment from 'moment'
import { Button, Input, DatePicker, Icon } from 'antd'
import { connect } from 'react-redux'
const styles = require('./style')
interface Props {
  customerId: string
  type?: 'business' | 'open' | 'customer' | 'signed'
  detail?: Customer.DetailProps
  footer?: React.ReactNode
  getWrappedInstance?: (ins?: React.ReactInstance) => void
  onClose?: () => void
}
class Main extends React.Component<Props> {
  public defaultTrackRecord = [
    {
      field: 'tagTelephoneStatus',
      title: '电话状态',
      options: APP.keys.EnumContactStatus
    },
    {
      field: 'tagCustomerStatus',
      title: '需求状态',
      options: APP.keys.EnumNeedStatus
    },
    {
      field: 'tagIntention',
      title: '意向度',
      options: APP.keys.EnumIntentionality
    },
    {
      field: 'tagFollowupStatus',
      title: '跟进方式',
      options: APP.keys.EnumFollowWay
    }
  ]
  public footer = (
    <div className='text-right mt10'>
      <Button
        type='primary'
        className='mr5'
        onClick={this.save.bind(this)}
      >
        保存
      </Button>
      <Button type='ghost'>
        删除
      </Button>
    </div>
  )
  public trackRecord = _.cloneDeep(this.defaultTrackRecord)
  public componentDidMount () {
    if (this.props.getWrappedInstance) {
      this.props.getWrappedInstance(this)
    }
  }
  public save () {
    const sourceBaseinfo: any = this.refs.baseinfo
    const baseinfo = sourceBaseinfo.getWrappedInstance()
    return baseinfo.refs.wrappedComponent.save()
  }
  public disabledDate (current: any) {
    return current && current < moment().subtract(1, 'days').endOf('day')
  }
  public handleChange (field: string, value: any) {
    const detail = this.props.detail
    if (field === 'trackRecord') {
      value = Object.assign({}, detail.trackRecord, value)
    }
    _.set(detail, field, value)
    APP.dispatch({
      type: 'change customer data',
      payload: {
        detail
      }
    })
  }
  public render () {
    const type = this.props.type || 'customer' || 'business'
    return (
      <div>
        <span
          className={styles['colse-icon']}
          onClick={() => this.props.onClose()}
        >
          <Icon type='close' theme='outlined' />
        </span>
        <div className={styles.container}>
          <div>
            <Profile
              type={type}
            />
          </div>
          <div className='clear'>
            <div className={styles.left}>
              <Card
                title='基本信息'
                showFold
              >
                <BaseInfo
                  ref='baseinfo'
                  customerId={this.props.customerId}
                  type={type}
                />
              </Card>
            </div>
            <div className={styles.right}>
              <Record
                type={type}
                customerId={this.props.customerId}
                height={260}
              />
            </div>
          </div>
        </div>
        <div>
          {this.props.footer || this.footer}
        </div>
      </div>
    )
  }
}
export default connect((state: Reducer.State) => {
  return state.customer
})(Main)
