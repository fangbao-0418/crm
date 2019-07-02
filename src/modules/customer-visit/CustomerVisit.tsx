import React from 'react'
import { Select, Input, Button } from 'antd'
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
  public values: {visitType?: '0' | '1' | '2' | '3' | '4', telephoneStatus?: string, reason?: string, remark?: string, [field: string]: any} = {visitType: '1'}
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
              <span>未成单原因：</span>
              <Select
                allowClear
                style={{width: 200}}
                onChange={(value?: string) => {
                  this.handleChange('reason', value)
                }}
              >
                {
                  APP.keys.EnumVisitTelReason.map((item) => {
                    return (
                      <Select.Option key={item.value}>{item.label}</Select.Option>
                    )
                  })
                }
              </Select>
            </div>
            <div>
              <span style={{lineHeight: '48px'}}>备注：</span>
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
