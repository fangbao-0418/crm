import React from 'react'
import { Select, Input, Button } from 'antd'
import Tags from '@/components/tags'
import _ from 'lodash'
import { changeCustomerDetailAction } from '@/modules/customer/action'
const styles = require('./style')
interface Props {
  customerId: string
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
      field: 'tagTelephoneStatus',
      title: '电话状态',
      options: APP.keys.EnumVisitTelStatus
    }
  ]
  public trackRecord = _.cloneDeep(this.defaultTrackRecord)
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
      // value = Object.assign({}, detail.trackRecord, value)
    }
  }
  public render () {
    return (
      <div className={styles['visit-record']}>
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
        <div className='text-right mt10'>
          <Button
            type='primary'
            onClick={() => {
              this.props.onOk({visitType: '1'})
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
