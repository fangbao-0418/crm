import React from 'react'
import { Form, Input, Select } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
const Option = Select.Option
type Props = FormComponentProps
const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 20
  }
}
class Main extends React.Component<Props> {
  public render () {
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <Form
          // onSubmit={this.handleSubmit}
        >
          <FormItem
            {...formItemLayout}
            label='Key值'
          >
            {getFieldDecorator('email', {
              rules: [{
                required: true, message: ''
              }]
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='类型'
          >
            {getFieldDecorator('email', {
              rules: [{
                required: true, message: ''
              }]
            })(
              <Select>
                <Option key={'1'}>1</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='键值'
          >
            {getFieldDecorator('email', {
              rules: [{
                required: true, message: ''
              }]
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='描述'
          >
            {getFieldDecorator('email', {
              rules: [{
                required: true, message: ''
              }]
            })(
              <Input.TextArea />
            )}
          </FormItem>
        </Form>
      </div>
    )
  }
}
export default Form.create()(Main)
