import React from 'react'
import { Form, Input, Modal, Checkbox, Tag, Select } from 'antd'
import { FormComponentProps } from 'antd/lib/form'

const styles = require('./style')
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
const Option = Select.Option

interface State {
  title: string // 弹窗标题
}

interface Props extends FormComponentProps {
  mode: 'view' | 'modify' | 'add' // 弹窗类型
  id: number // 权限id
  systemCode: string // 系统code
  onOk: (val: any) => void // 确认回调
  onCancel: () => void // 取消回调
  info: any // 权限信息
}

class Main extends React.Component<Props, State> {

  public state: State = {
    title: ''
  }

  public componentWillMount () {
    console.log(999, this.props)
    this.setTitle()
  }

  // 设置弹窗标题
  public setTitle () {
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
    this.props.form.validateFields((err: any, val: any) => {
      if (err) {return}
      this.props.onOk(val)
    })
  }

  public render () {
    const {mode, form:{getFieldDecorator}, info} = this.props
    // 过滤规则
    const validation = {
      name: {
        initialValue: info.name,
        validateTrigger: 'onBlur',
        rules:[
          {required: true, message: '请输入权限名称！'}
        ]
      },
      url: {
        initialValue: info.url,
        validateTrigger: 'onBlur',
        rules:[
          {required: true, message: '请输入URL！'}
        ]
      },
      code: {
        initialValue: info.code,
        validateTrigger: 'onBlur',
        rules:[
          {required: true, message: '请输入code！'}
        ]
      },
      protocol: {
        initialValue: info.protocol,
        validateTrigger: 'onBlur',
        rules:[
          {required: true, message: '请选择请求类型！'}
        ]
      }
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
            label='权限名称'
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
            label='权限编码'
            labelCol={{span: 4}}
            wrapperCol={{span: 10}}
          >
            {
              getFieldDecorator('code', validation.code)(
                <Input size='small' placeholder='请输入权限编码'/>
              )
            }
          </FormItem>

          <FormItem
            className={styles.option}
            label='请求类型'
            labelCol={{span: 4}}
            wrapperCol={{span: 10}}
          >
            {
              getFieldDecorator('protocol', validation.protocol)(
                <Select size='small' placeholder='请选择请求类型'>
                  <Option value='get'>get</Option>
                  <Option value='put'>put</Option>
                  <Option value='post'>post</Option>
                  <Option value='delete'>delete</Option>
                </Select>
              )
            }
          </FormItem>

        </Form>
      </Modal>
    )
  }
}

export default Form.create()(Main)
