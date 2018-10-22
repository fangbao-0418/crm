import React from 'react'
import { Form, Select, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { fetchAssignSuperior } from '../api'
const FormItem = Form.Item
interface Props extends FormComponentProps {
  organizationId?: number
  userIds?: number[]
  onOk?: () => void
}
class Main extends React.Component<Props> {
  public componentWillMount () {
    fetchAssignSuperior({
      organizationId: this.props.organizationId,
      userIds: this.props.userIds
    })
  }
  public render () {
    const { getFieldDecorator } = this.props.form
    return (
      <Form>
        <FormItem
          label='上级直属'
          required
          labelCol={{span: 4}}
          wrapperCol={{span: 20}}
        >
          {
            getFieldDecorator(
              'a'
            )(
              <Select>
                {/* {
                  xx
                } */}
              </Select>
            )
          }
        </FormItem>
        <div className='mt10 text-right'>
          <Button
            type='primary'
            onClick={() => {}}
          >
            保存
          </Button>
          <Button
            onClick={() => {}}
          >
            取消
          </Button>
        </div>
      </Form>
    )
  }
}
export default Form.create()(Main)
