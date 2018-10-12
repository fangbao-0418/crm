import React from 'react'
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker } from 'antd'
import moment from 'moment'
const FormItem = Form.Item
const { TextArea } = Input
const formItemLayout = {
  labelCol: { span:2 },
  wrapperCol: { span:8 }
}
const Option = Select.Option
const { MonthPicker, RangePicker } = DatePicker

const dateFormat = 'YYYY/MM/DD'
const monthFormat = 'YYYY/MM'
class Main extends React.Component<any, any> {
  public state = {
    expand: false
  }

  public handleChange (value: any) {
    console.log(`selected ${value}`)
  }
  public handleSearch = (e: any) => {
    e.preventDefault()
    this.props.form.validateFields((err: any, values: any) => {
      console.log('Received values of form: ', values)
    })
  }

  public handleReset = () => {
    this.props.form.resetFields()
  }

  public toggle = () => {
    const { expand } = this.state
    this.setState({ expand: !expand })
  }
  public render () {
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <Form
          onSubmit={this.handleSearch}
        >
        <Row>
          <Col>
            <FormItem {...formItemLayout} label='关联订单'>
              {getFieldDecorator('关联订单', {
                rules: [{
                  required: true,
                  message: '请输入订单编号'
                }]
              })(
                <Input placeholder='请输入订单编号' />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <FormItem {...formItemLayout} label='公司名称'>
            {getFieldDecorator('公司名称', {
            })(
              <Input disabled />
            )}
          </FormItem>
        </Row>
        <Row>
          <FormItem {...formItemLayout} label='区域'>
            {getFieldDecorator('区域', {
            })(
              <Input disabled />
            )}
          </FormItem>
        </Row>
        <Row>
          <FormItem {...formItemLayout} label='选择外勤'>
            {getFieldDecorator('选择外勤', {
              rules: [{
                required: true,
                message: '请选择外勤'
              }]
            })(
              <Select onChange={this.handleChange} placeholder='请选择外勤人员'>
                <Option value='王小伟'>王小伟</Option>
                <Option value='王小伟'>王小伟</Option>
                <Option value='王小伟'>王小伟</Option>
                <Option value='王小伟'>王小伟</Option>
              </Select>
            )}
          </FormItem>
        </Row>
        <Row>
          <FormItem {...formItemLayout} label='开始时间'>
            {getFieldDecorator('开始时间', {
              rules: [{
                required: true,
                message: '请选择开始时间'
              }]
            })(
              <DatePicker style={{width:'100%'}} format={dateFormat} />
            )}
          </FormItem>
        </Row>
        <Row>
          <FormItem {...formItemLayout} label='备注'>
            {getFieldDecorator('备注', {
            })(
              <TextArea rows={8}  />
            )}
          </FormItem>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'left', margin:'0 0 60px 80px' }}>
            <Button type='primary' htmlType='submit'>提交</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              重置
            </Button>
          </Col>
        </Row>
        </Form>
      </div>
    )
  }
}

export default Form.create()(Main)
