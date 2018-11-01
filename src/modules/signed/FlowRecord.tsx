import React from 'react'
import { Button, Input, DatePicker, Icon, Row, Col } from 'antd'
import _ from 'lodash'
import Tags from '@/components/tags'
import moment from 'moment'
import Record from '@/modules/customer/Record'
interface Props {
  customerId: string
}
export default class extends React.Component<Props> {
  public defaultTrackRecord = [
    {
      field: 'tagFollowUpClassification',
      title: '跟进分类',
      options: APP.keys.EnumFollowWay
    }
  ]
  public trackRecord = _.cloneDeep(this.defaultTrackRecord)
  public disabledDate (current: any) {
    return current && current < moment().subtract(1, 'days').endOf('day')
  }
  public handleChange (field: string, value: any) {
    console.log(field, value, '111111')
  }
  public save () {
    console.log('保存')
  }
  public render () {
    return (
      <div>
        <Tags
          labelSpan={2}
          className='mb10'
          dataSource={this.trackRecord}
          parser={(value) => {
            return value[0] ? Number(value[0].value) : undefined
          }}
          onChange={(value) => {
            this.handleChange('trackRecord', value)
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
                console.log(e.target.value, 'textarea change')
                this.handleChange('trackRecord.remark', e.target.value)
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
                this.handleChange('trackRecord.appointTime', date.format('YYYY-MM-DD HH:mm:ss'))
              }}
            />
          </Col>
        </Row>
        <div>
          <Record
            customerId={this.props.customerId}
            height={180}
          />
        </div>
        <div className='text-right'>
          <Button type='primary' onClick={this.save.bind(this)}>保存</Button>
        </div>
      </div>
    )
  }
}
