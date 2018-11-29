import React from 'react'
import { Button, Input, DatePicker, Icon, Row, Col } from 'antd'
import _ from 'lodash'
import Tags from '@/components/tags'
import moment from 'moment'
import Record from '@/modules/customer/Record'
import { addRecord } from './api'
import { changeCustomerDetailAction } from '@/modules/customer/action'
interface Props {
  customerId: string
}
export default class extends React.Component<Props> {
  public state = {
    visible: true
  }
  public defaultTrackRecord = [
    {
      field: 'tagFollowUpClassification',
      title: '跟进分类',
      options: APP.keys.EnumFollowUpClassification
    }
  ]
  public trackRecord = _.cloneDeep(this.defaultTrackRecord)
  public records: {
    customerId?: string
    remark?: string
    appointTime?: string
    tagFollowUpClassification?: number
  } = {}
  public disabledDate (current: any) {
    return current && current < moment().subtract(1, 'days').endOf('day')
  }
  public save () {
    if (this.records.appointTime || this.records.remark || this.records.tagFollowUpClassification >= 0) {
      this.records.customerId = this.props.customerId
      addRecord(this.records).then(() => {
        APP.success('操作成功！')
        this.trackRecord = _.cloneDeep(this.defaultTrackRecord)
        this.setState({
          visible: false
        }, () => {
          this.setState({
            visible: true
          })
        })
        changeCustomerDetailAction(this.props.customerId)
      })
    } else {
      APP.error('请至少填写一项跟进记录')
    }
  }
  public render () {
    return (
      <div style={{fontSize: 12}}>
        {this.state.visible && <div>
          <Tags
            labelSpan={2}
            className='mb10'
            dataSource={this.trackRecord}
            parser={(value) => {
              return value[0] ? Number(value[0].value) : undefined
            }}
            onChange={(value) => {
              this.records.tagFollowUpClassification = value.tagFollowUpClassification
            }}
          />
          <Row>
            <Col span={2} className='text-right'>
              <label>备注：</label>
            </Col>
            <Col span={20} style={{paddingLeft: 5}}>
              <Input.TextArea
                placeholder='请输入备注'
                onChange={(e) => {
                  this.records.remark = e.target.value
                }}
              />
            </Col>
          </Row>
          <Row className='mt10'>
            <Col span={2} className='text-right' style={{height: '32px', lineHeight: '32px'}}>
              <label>下次跟进:</label>
            </Col>
            <Col span={20} style={{paddingLeft: 5}}>
              <DatePicker
                placeholder=''
                disabledDate={this.disabledDate}
                onChange={(date) => {
                  this.records.appointTime = date ? date.format('YYYY-MM-DD HH:mm:ss') : ''
                }}
              />
            </Col>
          </Row>
        </div>}
        <div>
          <Record
            type='signed'
            customerId={this.props.customerId}
            height={180}
          />
        </div>
        <div className='text-right'>
          <Button hidden={!APP.hasPermission('crm_sign_myself_detail_follow_up_save')} type='primary' className='mt10' onClick={this.save.bind(this)}>保存</Button>
        </div>
      </div>
    )
  }
}
