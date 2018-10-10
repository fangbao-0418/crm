import React from 'react'
import Profile from '@/modules/common/company-detail/Profile'
import BaseInfo from '@/modules/customer/BaseInfo'
import Record from '@/modules/customer/Record'
import Card from '@/components/Card'
import Tags from '@/components/tags'
import _ from 'lodash'
import { Button, Input, DatePicker } from 'antd'
import { connect } from 'react-redux'
const styles = require('./style')
interface Props {
  customerId: string
  type?: 'business' | 'open' | 'customer'
  detail?: Customer.DetailProps
  footer?: React.ReactNode
  getWrappedInstance?: (ins?: React.ReactInstance) => void
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
    console.log('detail did mouiunt')
    if (this.props.getWrappedInstance) {
      console.log('detail did mouiunt')
      this.props.getWrappedInstance(this)
    }
  }
  public save () {
    const sourceBaseinfo: any = this.refs.baseinfo
    const baseinfo = sourceBaseinfo.getWrappedInstance()
    return baseinfo.refs.wrappedComponent.save()
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
    const type = this.props.type || 'customer'
    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <Profile type={type}/>
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
          {
            type === 'business' &&
            <Card title='跟进记录'>
              <Tags
                className='mb10'
                dataSource={this.trackRecord}
                parser={(value) => {
                  return value[0] ? Number(value[0].value) : undefined
                }}
                onChange={(value) => {
                  this.handleChange('trackRecord', value)
                }}
              />
              <Input.TextArea
                className='mt10'
                placeholder='请输入备注'
                onChange={(e) => {
                  console.log(e.target.value, 'textarea change')
                  this.handleChange('trackRecord.remark', e.target.value)
                }}
              />
              <div className='mt10' >
                预约下次拜访日期&nbsp;&nbsp;
                <DatePicker
                  onChange={(moment) => {
                    console.log(moment)
                  }}
                />
              </div>
            </Card>
          }
          <div>
            {this.props.footer || this.footer}
          </div>
        </div>
        <div className={styles.right}>
          <Record
            customerId={this.props.customerId}
          />
        </div>
      </div>
    )
  }
}
export default connect((state: Reducer.State) => {
  return state.customer
})(Main)
