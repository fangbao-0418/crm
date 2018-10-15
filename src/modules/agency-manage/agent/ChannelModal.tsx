import React from 'react'
import { Form, Row, Col, Input } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { fetchRegion } from '@/modules/common/api'
const FormItem = Form.Item
interface Props extends FormComponentProps {
  detail?: {
    channelname: string
    person: string
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
                }]
                // initialValue: this.props.detail.channelname
              })(
                <Input placeholder='请输入' disabled={this.props.readOnly}/>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label="负责人："
            >
              {getFieldDecorator('person', {
                rules: [{
                  required: true, message: '请输入负责人!'
                }],
                initialValue: this.props.detail.person
              })(
                <Input placeholder="请输入" disabled={this.props.readOnly}/>
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    )
  }
}
export default Form.create()(Main)
