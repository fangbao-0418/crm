import React from 'react'
import { Form, Input, Modal, Checkbox, Tag } from 'antd'

const styles = require('./style')
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group

interface State {
  title: string // 弹窗标题
  nameCheck: 'empty' | 'same' | 'normal' // 验证权限名字  权限为空 | 权限重复 | 正常
  codeCheck: 'empty' | 'same' | 'normal' // 验证code  code为空 | code重复 | 正常
  nameVal: string // 权限名称
  codeVal: string // code值
  optionVal: string[] // 权限选中项
}

class Main extends React.Component<any, State> {

  public state: State = {
    title: '',
    nameCheck: 'normal',
    codeCheck: 'normal',
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
    const {nameVal, codeVal, optionVal} = this.state
    if (nameVal === '') {
      this.setState({nameCheck: 'empty'})
      return
    } else {
      this.setState({nameCheck: 'normal'})
    }
    if (codeVal === '') {
      this.setState({codeCheck: 'empty'})
      return
    } else {
      this.setState({codeCheck: 'normal'})
    }
    this.props.onOk({nameVal, codeVal, optionVal})
  }

  // 设置错误信息
  public getErrorInfo: any = (verification: 'empty' | 'same' | 'normal', name: '权限名称' | 'code') => {
    let errorInfo
    if (verification === 'empty') {
      errorInfo = {help: `${name}不能为空`, validateStatus: 'error'}
    } else if (verification === 'same') {
      errorInfo = {help: `${name}重复`, validateStatus: 'error'}
    } else if (verification === 'normal') {
      errorInfo = {help: ''}
    }
    return errorInfo
  }

  public render () {
    const {mode} = this.props
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
            required
            label='页面权限名称'
            labelCol={{span: 4}}
            wrapperCol={{span: 10}}
            {...this.getErrorInfo(this.state.nameCheck, '权限名称')}
          >
            <Input
              size='small'
              placeholder='请输入权限名称'
              onChange={(e) => {
                this.setState({nameVal: e.target.value})
              }}
            />
          </FormItem>

          <FormItem
            className={styles.option}
            required
            label='页面权限code'
            labelCol={{span: 4}}
            wrapperCol={{span: 10}}
            {...this.getErrorInfo(this.state.codeCheck, 'code')}
          >
            <Input
              size='small'
              placeholder='请输入code'
              onChange={(e) => {
                this.setState({codeVal: e.target.value})
              }}
            />
          </FormItem>

          <FormItem
            className={styles.option}
            label='操作权限名称'
            labelCol={{span: 4}}
            wrapperCol={{span: 20}}
          >
            <CheckboxGroup
              options={[{label: 'a', value: 'a'}, {label: 'b', value: 'b'}]}
              onChange={(val: string[]) => {
                this.setState({optionVal: val})
              }}
            />
          </FormItem>

        </Form>
      </Modal>
    )
  }
}

export default Main
