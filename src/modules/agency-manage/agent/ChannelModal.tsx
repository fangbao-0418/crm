import React from 'react'
import { Form, Row, Col, Input } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { fetchRegion } from '@/modules/common/api'
const FormItem = Form.Item
interface Props extends FormComponentProps {
  detail?: {
    channelname?: string
    person?: string
    pcode?: string
    address?: string
    mobile?: string
    email?: string
  }
  readOnly?: boolean
}
class Main extends React.Component<Props> {
  public componentWillMount () {
    fetchRegion().then((res) => {})
  }
  public handleSubmit () {}
  public render () {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    }
    return (
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <Row>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label='代理商：'
            >
              {getFieldDecorator('channelname', {
                rules: [{
                  required: true, message: '请输入代理商!'
                }],
                initialValue: this.props.detail.channelname
              })(
                <Input placeholder='请输入' disabled={this.props.readOnly}/>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label='负责人：'
            >
              {getFieldDecorator('person', {
                rules: [{
                  required: true, message: '请输入负责人!'
                }],
                initialValue: this.props.detail.person
              })(
                <Input placeholder='请输入' disabled={this.props.readOnly}/>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label='省份城市：'
            >
              {getFieldDecorator('pcode', {
                rules: [{
                  required: true, message: '请选择省份城市!'
                }],
                initialValue: this.props.detail.pcode
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label='地址：'
            >
              {getFieldDecorator('address', {
                rules: [{
                  required: true, message: '请输入地址!'
                }],
                initialValue: this.props.detail.address
              })(
                <Input placeholder='请输入' disabled={this.props.readOnly}/>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label='手机：'
            >
              {getFieldDecorator('mobile', {
                rules: [{
                  required: true, message: '请输入手机号!'
                }],
                initialValue: this.props.detail.mobile
              })(
                <Input placeholder='请输入' disabled={this.props.readOnly}/>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label='邮箱：'
            >
              {getFieldDecorator('email', {
                rules: [{
                  required: true, message: '请输入邮箱!'
                }],
                initialValue: this.props.detail.email
              })(
                <Input placeholder='请输入' disabled={this.props.readOnly}/>
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    )
  }
}
export default Form.create()(Main)
