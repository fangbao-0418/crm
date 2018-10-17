import React from 'react'
import { Form, Input, Select, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
const Option = Select.Option
interface Props extends FormComponentProps {
  item?: Configure.ItemProps
  onOk?: (value?: Configure.ItemProps) => void
  onCancel?: () => void
}
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
    const item = this.props.item || {}
    return (
      <div>
        <Form
          // onSubmit={this.handleSubmit}
        >
          <FormItem
            {...formItemLayout}
            label='Key值'
          >
            {getFieldDecorator('value', {
              rules: [{
                required: true, message: 'key值不能为空'
              }],
              initialValue: item.value
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='类型'
          >
            {getFieldDecorator('typeCode', {
              initialValue: item.typeCode,
              rules: [{
                required: true, message: '类型不能为空'
              }]
            })(
              <Select>
                <Option key={'1'}>1</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='所属系统'
          >
            {getFieldDecorator('sysCode', {
              initialValue: item.sysCode,
              rules: [{
                required: true, message: '所属系统不能为空'
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
            {getFieldDecorator('name', {
              initialValue: item.name,
              rules: [{
                required: true, message: '键值不能为空'
              }]
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='描述'
          >
            {getFieldDecorator('typeName', {
              initialValue: item.typeName
            })(
              <Input.TextArea />
            )}
          </FormItem>
          <div className='text-right mt10'>
            <Button
              type='primary'
              className='mr5'
              onClick={() => {
                if (this.props.onOk) {
                  this.props.form.validateFields((errs, values) => {
                    if (errs === null) {
                      this.props.onOk(Object.assign({}, item, values))
                    }
                  })
                }
              }}
            >
              保存
            </Button>
            <Button
              type='primary'
              onClick={() => {
                if (this.props.onCancel) {
                  this.props.onCancel()
                }
              }}
            >
              取消
            </Button>
          </div>
        </Form>
      </div>
    )
  }
}
export default Form.create()(Main)
