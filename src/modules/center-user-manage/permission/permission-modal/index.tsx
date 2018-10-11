import React from 'react'
import { Form, Input, Modal, Checkbox, Tag } from 'antd'
import { FormComponentProps } from 'antd/lib/form'

const styles = require('./style')
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group

interface State {
  title: string // 弹窗标题
  nameVal: string // 权限名称
  codeVal: string // code值
  optionVal: string[] // 权限选中项
}

interface Props extends FormComponentProps {
  onOk?: (val: any) => void // 确认回调
  onCancel?: () => void // 取消回调
}

class Main extends React.Component<any, State> {

  public state: State = {
    title: '',
    nameVal: '',
    codeVal: '',
    optionVal: []
  }

  public componentWillMount () {
    const {mode} = this.props
    let title
    if (mode === 'view') {
      title = '查看权限'
    } else if (mode === 'add') {
      title = '添加权限'
    } else if (mode === 'modify') {
      title = '修改权限'
    }
    this.setState({title})
  }

  // 点击确认
  public onOk = () => {
    this.props.onOk()
  }

  public render () {
    const {mode, form:{getFieldDecorator}} = this.props
    // 过滤规则
    const validation = {
      name: {
        // initialValue: info.name,
        validateTrigger: 'onBlur',
        rules:[
          {required: true, message: '请输入权限名称！'}
        ]
      },
      url: {
        validateTrigger: 'onBlur',
        rules:[
          {required: true, message: '请输入URL！'}
        ]
      },
      code: {
        validateTrigger: 'onBlur',
        rules:[
          {required: true, message: '请输入code！'}
        ]
      },
      button: {}
    }
    return (
      <Modal
        className={styles.wrap}
        title={this.state.title}
        width={900}
        visible={true}
        onOk={this.onOk}
        onCancel={() => {this.props.onCancel()}}
      >
        <Form>

          <FormItem
            className={styles.option}
            label='页面权限名称'
            labelCol={{span: 4}}
            wrapperCol={{span: 10}}
          >
            {
              getFieldDecorator('name', validation.name)(
                <Input size='small' placeholder='请输入权限名称'/>
              )
            }
          </FormItem>

          <FormItem
            className={styles.option}
            label='URL'
            labelCol={{span: 4}}
            wrapperCol={{span: 10}}
          >
            {
              getFieldDecorator('url', validation.url)(
                <Input size='small' placeholder='请输入URL'/>
              )
            }
          </FormItem>

          <FormItem
            className={styles.option}
            label='页面权限code'
            labelCol={{span: 4}}
            wrapperCol={{span: 10}}
          >
            {
              getFieldDecorator('code', validation.code)(
                <Input size='small' placeholder='请输入code'/>
              )
            }
          </FormItem>

          <FormItem
            className={styles.option}
            label='操作权限名称'
            labelCol={{span: 4}}
            wrapperCol={{span: 20}}
          >
            {
              getFieldDecorator('button', validation.button)(
                <CheckboxGroup options={[{label: 'a', value: 'a'}, {label: 'b', value: 'b'}]}/>
              )
            }
          </FormItem>

        </Form>
      </Modal>
    )
  }
}

export default Form.create()(Main)
