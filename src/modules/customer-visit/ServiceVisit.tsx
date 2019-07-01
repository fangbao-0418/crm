import React from 'react'
import { Select, Input, Button, Rate } from 'antd'
import Tags from '@/components/tags'
import _ from 'lodash'
import { changeCustomerDetailAction } from '@/modules/customer/action'
const styles = require('./style')
interface Props {
  onOk?: (params: CustomerVisit.Search) => void
}
interface State {
  visible?: boolean
  infomation?: {
    isOtherTrack: boolean
    message: string
  }
}
class Main extends React.Component<Props, State> {
  public defaultTrackRecord = [
    {
      field: 'telephoneStatus',
      title: '电话状态',
      options: APP.keys.EnumVisitTelStatus
    }
  ]
  public trackRecord = _.cloneDeep(this.defaultTrackRecord)
  public values: CustomerVisit.Search = {visitType: '2'}
  public state: State = {
    visible: true,
    infomation: {
      isOtherTrack: false,
      message: ''
    }
  }
  public handleChange (field: string, value: any) {
    console.log(field, value, '111111')
    if (field === 'trackRecord') {
      const f = 'telephoneStatus'
      const val = value.telephoneStatus
      this.values[f] = val
    } else {
      this.values[field] = value
    }
  }
  public render () {
    return (
      <div className={styles['visit-record']}>
        {
          this.state.visible &&
          <div>
            <Tags
              track={this.state.infomation.isOtherTrack}
              labelSpan={3}
              className='mb10'
              dataSource={this.trackRecord}
              parser={(value) => {
                return value[0] ? Number(value[0].value) : undefined
              }}
              onChange={(value) => {
                this.handleChange('trackRecord', value)
              }}
            />
            <div>
              <span className='mr10'>确认税额</span>
              <Select
                allowClear
                style={{width: 150}}
                onChange={(value?: string) => {
                  this.handleChange('confirmTax', value)
                }}
              >
                {
                  APP.keys.EnumVisitTax.map((item) => {
                    return (
                      <Select.Option key={item.value}>{item.label}</Select.Option>
                    )
                  })
                }
              </Select>
            </div>
            <div className='mt10'>
              <span className='mr10'>反馈问题</span>
              <Select
                allowClear
                style={{width: 150}}
                onChange={(value?: string) => {
                  this.handleChange('faq', value)
                }}
              >
                {
                  APP.keys.EnumVisitFAQ.map((item) => {
                    return (
                      <Select.Option key={item.value}>{item.label}</Select.Option>
                    )
                  })
                }
              </Select>
            </div>
            <div>
              <span className='mr10'>会计专业能力</span>
              <Rate
                onChange={(value) => {
                  console.log(value, 'value')
                  this.handleChange('profession', value)
                }}
              />
            </div>
            <div>
              <span className='mr10'>会计服务态度</span>
              <Rate
                onChange={(value) => {
                  console.log(value, 'value')
                  this.handleChange('manner', value)
                }}
              />
            </div>
            <div>
              <span className='mr10'>会计回复及时性</span>
              <Rate
                onChange={(value) => {
                  console.log(value, 'value')
                  this.handleChange('replyTimely', value)
                }}
              />
            </div>
            <div>
              <span className='mr10'>整体满意度</span>
              <Rate
                onChange={(value) => {
                  console.log(value, 'value')
                  this.handleChange('satisfaction', value)
                }}
              />
            </div>
            <div>
              <span style={{lineHeight: '48px'}} className='mr10'>备注</span>
              <Input.TextArea
                className='mt10'
                style={{width: 300}}
                onChange={(e) => {
                  console.log(e.target.value, 'textarea change')
                  this.handleChange('remark', e.target.value)
                }}
              />
            </div>
          </div>
        }
        <div className='text-right mt10'>
          <Button
            type='primary'
            onClick={() => {
              console.log(this.values, 'values')
              this.trackRecord = _.cloneDeep(this.defaultTrackRecord)
              this.setState({
                visible: false
              }, () => {
                this.setState({
                  visible: true
                })
              })
              this.props.onOk(this.values)
            }}
          >
            保存
          </Button>
        </div>
      </div>
    )
  }
}
export default Main
