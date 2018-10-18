import React from 'react'
import { Form, Input, Select, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { fetchDirecTypeList, fetchSystemList } from './api'
const Option = Select.Option
interface Props extends FormComponentProps {
  item?: Configure.ItemProps
  onOk?: (value?: Configure.ItemProps) => void
  onCancel?: () => void
}
interface State {
  typeList: Configure.TypeProps[]
  systemList: Configure.SystemProps[]
}
const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 19
  }
}
class Main extends React.Component<Props, State> {
  public state: State = {
    typeList: [],
    systemList: []
  }
  public componentWillMount () {
    fetchDirecTypeList().then((res) => {
      this.setState({
        typeList: res
      })
    })
    fetchSystemList().then((res) => {
      this.setState({
        systemList: res
      })
    })
  }
  public render () {
    const { getFieldDecorator } = this.props.form
    const item = this.props.item || {}
    const { systemList } = this.state
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
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='所属系统'
          >
            {getFieldDecorator('system', {
              initialValue: item.sysCode ? { key: item.sysCode } : undefined,
              rules: [{
                required: true, message: '所属系统不能为空'
              }]
            })(
              <Select
                labelInValue
              >
                {
                  systemList.map((val) => {
                    return (
                      <Option key={val.value}>{val.name}</Option>
                    )
                  })
                }
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
                      values.sysCode = values.system.key
                      values.sysName = values.system.label
                      delete values.system
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
