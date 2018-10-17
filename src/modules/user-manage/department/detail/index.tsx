import React from 'react'
import { Form, Input, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
interface Props extends FormComponentProps {
  value?: string
  onOk?: (value?: {name: string}) => void
  onCancel?: () => void
}
const FormItem = Form.Item
class Main extends React.Component<Props> {
  public render () {
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <Form
          style={{
            width: '80%',
            margin: '0 auto'
          }}
        >
          <FormItem
            label='部门名称'
            required
            labelCol={{span: 6}}
            wrapperCol={{span: 18}}
          >
            {
              getFieldDecorator(
                'name',
                {
                  initialValue: this.props.value,
                  rules: [
                    {
                      required: true,
                      message: '部门名称不能为空'
                    }
                  ]
                }
              )(
                <Input
                />
              )
            }
          </FormItem>
          <div className='text-right'>
            <Button
              className='mr5'
              type='primary'
              onClick={() => {
                this.props.form.validateFields((errs, values) => {
                  if (errs === null) {
                    if (this.props.onOk) {
                      this.props.onOk(values)
                    }
                  }
                })
              }}
            >
              保存
            </Button>
            <Button
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
