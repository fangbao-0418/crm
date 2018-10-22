import React from 'react'
import { Form, Select, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { fetchAssignSuperior } from '../api'
const FormItem = Form.Item
interface Props extends FormComponentProps {
  organizationId?: number
  userIds?: number[]
  onOk?: (id?: number) => void
  onCancel?: () => void
}
interface State {
  list: UserManage.SuperiorProps[]
}
class Main extends React.Component<Props, State> {
  public state: State = {
    list: []
  }
  public componentWillMount () {
    fetchAssignSuperior({
      organizationId: this.props.organizationId,
      userIds: this.props.userIds
    }).then((res) => {
      this.setState({
        list: res
      })
    })
  }
  public render () {
    const { getFieldDecorator } = this.props.form
    const { list } = this.state
    return (
      <Form style={{margin: '0 10%'}}>
        <FormItem
          label='上级直属'
          required
          labelCol={{span: 5}}
          wrapperCol={{span: 18}}
        >
          {
            getFieldDecorator(
              'id',
              {
                rules: [{
                  required: true,
                  message: '请选择上级直属'
                }]
              }
            )(
              <Select>
                {
                  list.map((val) => {
                    return (
                      <Select.Option key={val.id}>
                        {val.name}
                      </Select.Option>
                    )
                  })
                }
              </Select>
            )
          }
        </FormItem>
        <div className='mt10 text-right'>
          <Button
            type='primary'
            className='mr5'
            onClick={() => {
              if (this.props.onOk) {
                this.props.form.validateFields((errs, vals) => {
                  if (errs === null) {
                    this.props.onOk(vals.id)
                  }
                })
              }
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
    )
  }
}
export default Form.create()(Main)
