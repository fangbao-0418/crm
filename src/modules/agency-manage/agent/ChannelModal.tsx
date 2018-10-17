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
    const { item, disabled } = this.props
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
                initialValue: item.name
              })(
                <Input placeholder='请输入' disabled={disabled}/>
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
                initialValue: item.name
              })(
                <Input placeholder='请输入' disabled={disabled}/>
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
                initialValue: item.name
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
