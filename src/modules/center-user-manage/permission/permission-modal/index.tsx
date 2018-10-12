import React from 'react'
import { Form, Input, Modal, Checkbox, Tag } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { fetchNewPermissionInfo, fetchPermissonInfo } from '../api'

const styles = require('./style')
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group

interface State {
  title: string // 弹窗标题
  info: any // 权限信息
}

interface Props extends FormComponentProps {
  mode: 'view' | 'modify' | 'add' // 弹窗类型
  id: number // 权限id
  systemCode: string // 系统code
  onOk: (val: any) => void // 确认回调
  onCancel: () => void // 取消回调
}

class Main extends React.Component<Props, State> {

  public state: State = {
    title: '',
    info: {}
  }

  public componentWillMount () {
    this.setTitle()
    this.getPermissionInfo()
  }

  // 获取权限信息
  public getPermissionInfo () {
    const {mode, id, systemCode} = this.props
    if (mode === 'add') {
      fetchNewPermissionInfo(systemCode).then((res) => {
        res.forEach((item: any) => {
          item.label = item.name
          item.value = item.id
        })
        this.setState({info: {authorityButtonResponseList: res}})
      })
    } else {
      fetchPermissonInfo(id, systemCode).then((res) => {
        res.authorityButtonResponseList.forEach((item: any) => {
          item.label = item.name
          item.value = item.id
        })
        this.setState({info: res})
      })
    }
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

  // 过滤出选中的权限按钮id
  public filterSelectedButtonId (arr: any[]) {
    const newArr: any[] = []
    arr = Array.isArray(arr) ? arr : []
    arr.forEach((item) => {
      if (item.selectFlag) {
        newArr.push(item.id)
      }
    })
    return newArr
  }

  public render () {
    const {mode, form:{getFieldDecorator}} = this.props
    const {info} = this.state
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
      button: {
        initialValue: this.filterSelectedButtonId(info.authorityButtonResponseList)
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
                <CheckboxGroup options={info.authorityButtonResponseList}/>
              )
            }
          </FormItem>

        </Form>
      </Modal>
    )
  }
}

export default Form.create()(Main)
