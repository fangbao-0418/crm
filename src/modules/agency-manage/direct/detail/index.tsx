import React from 'react'
import { Form, Row, Col, Input } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { fetchRegion } from '@/modules/common/api'
const FormItem = Form.Item
interface Props extends FormComponentProps {
  item?: Organ.DirectItemProps
  disabled?: boolean
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
    const { disabled } = this.props
    const item = this.props.item || {}
    return (
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <Row>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label='直营'
            >
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: '请输入直营名称'
                }],
                initialValue: item.name
              })(
                <Input placeholder='请输入' disabled={disabled}/>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label='负责人'
            >
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: '请输入负责人!'
                }],
                initialValue: item.name
              })(
                <Input placeholder='请输入' disabled={disabled}/>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label='省份城市'
            >
              {getFieldDecorator('regionCityName', {
                rules: [{
                  required: true, message: '请选择省份城市!'
                }],
                initialValue: item.regionCityName
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
              label='地址'
            >
              {getFieldDecorator('address', {
                rules: [{
                  required: true, message: '请输入直营名称'
                }],
                initialValue: item.address
              })(
                <Input placeholder='请输入' disabled={disabled}/>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label='手机号'
            >
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: '请输入负责人!'
                }],
                initialValue: item.phone
              })(
                <Input placeholder='请输入' disabled={disabled}/>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label='邮箱'
            >
              {getFieldDecorator('email', {
                rules: [{
                  required: true, message: '请选择省份城市!'
                }],
                initialValue: item.email
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
              label='开户行'
            >
              {getFieldDecorator('address', {
                rules: [{
                  required: true, message: '请输入开户行'
                }],
                initialValue: item.address
              })(
                <Input disabled={disabled}/>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label='手机号'
            >
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: '请输入负责人!'
                }],
                initialValue: item.phone
              })(
                <Input placeholder='请输入' disabled={disabled}/>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label='邮箱'
            >
              {getFieldDecorator('email', {
                rules: [{
                  required: true, message: '请选择省份城市!'
                }],
                initialValue: item.email
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    )
  }
}
export default Form.create()(Main)
