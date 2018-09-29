import React from 'react'
import { Modal, Form, Input, Checkbox, Button, Select, Tree } from 'antd'
import { FormComponentProps } from 'antd/lib/form'

const styles = require('./index.styl')
const Option = Select.Option
const FormItem = Form.Item
const TreeNode = Tree.TreeNode

interface Props extends FormComponentProps {
  mode: string // 模式
  info: any // 账户信息
  onOk?: (val: any) => void // 确认回调
  onCancel?: () => void // 取消回调
}

class Main extends React.Component<Props, any> {

  public state = {
    title: '',
    isSell: false,
    expandedKeys: [''],
    checkedKeys: [''],
    treeData: [
      {
        title: '0-0',
        key: '0-0',
        children: [
          {
            title: '0-0-0',
            key: '0-0-0',
            children: [
              { title: '0-0-0-0', key: '0-0-0-0' },
              { title: '0-0-0-1', key: '0-0-0-1' },
              { title: '0-0-0-2', key: '0-0-0-2' },
              { title: '0-0-0-3', key: '0-0-0-3' },
              { title: '0-0-0-4', key: '0-0-0-4' },
              { title: '0-0-0-5', key: '0-0-0-5' }
            ]
          },
          {
            title: '0-0-1',
            key: '0-0-1'
          }
        ]
      },
      {
        title: '0-1',
        key: '0-1',
        children: [
          { title: '0-1-0-0', key: '0-1-0-0' },
          { title: '0-1-0-1', key: '0-1-0-1' },
          { title: '0-1-0-2', key: '0-1-0-2' }
        ]
      },
      {
        title: '0-2',
        key: '0-2'
      }
    ]
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

  // 点击确认按钮
  public confirm = () => {
    this.props.form.validateFields((err: any, val: any) => {
      if (err) {return}
      val.region = this.state.checkedKeys
      console.log('val:', val)
      this.props.onOk(val)
    })
  }

  // 点击取消按钮
  public cancel = () => {
    this.props.onCancel()
  }

  // 渲染区域树
  public renderTreeNodes = (data: any) => {
    return data.map((item: any) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode key={item.key} {...item} />
    })
  }

  // 区域勾选时触发
  public onCheck = (checkedKeys: any) => {
    this.setState({ checkedKeys })
  }

  // 区域展开时触发
  public onExpand = (expandedKeys: any) => {
    this.setState({expandedKeys})
  }

  public render () {
    const {mode, info = {}, form:{getFieldDecorator, setFieldsValue, getFieldsValue}} = this.props
    // 过滤规则
    const validation = {
      name: {
        initialValue: info.name,
        validateTrigger: 'onBlur',
        rules:[
          {required: true, message: '请输入姓名！'}
        ]
      },
      phone: {
        initialValue: info.phone,
        validateTrigger: 'onBlur',
        rules:[
          {required: true, message: '请输入手机号！'},
          {len: 11, message: '手机号格式不对！'}
        ]
      },
      email: {
        initialValue: info.email,
        validateTrigger: 'onBlur',
        rules:[
          {required: true, message: '请输入邮箱！'},
          {pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '邮箱格式不正确！'}
        ]
      },
      department: {
        initialValue: info.organizationName,
        rules:[
          {required: true, message: '请选择部门！'}
        ]
      },
      role: {
        initialValue: info.roleName,
        rules:[
          {required: true, message: '请选择角色！'}
        ]
      },
      resource: {
        rules:[
          {required: true, message: '请选择是否接收资源！'}
        ]
      },
      center: {
        rules: [{}]
      },
      region: {
        rules: [{}]
      }
    }
    return (
      <Modal
        className={styles.modal}
        title={this.state.title}
        visible={true}
        okButtonProps={{disabled: mode === 'view'}}
        cancelButtonProps={{disabled: mode === 'view'}}
        onOk={this.confirm}
        onCancel={this.cancel}
      >

        <Form>
          <FormItem className={styles.item} colon wrapperCol={{span: 10}} labelCol={{span: 4}} label='姓名'>
            {
              getFieldDecorator('name', validation.name)(
                <Input disabled={mode === 'view'} size='small' placeholder='请输入姓名'/>
              )
            }
          </FormItem>

          <FormItem className={styles.item} colon wrapperCol={{span: 10}} labelCol={{span: 4}} label='手机号'>
            {
              getFieldDecorator('phone', validation.phone)(
                <Input disabled={mode === 'view'} size='small' placeholder='请输入手机号'/>
              )
            }
          </FormItem>

          <FormItem className={styles.item} colon wrapperCol={{span: 10}} labelCol={{span: 4}} label='邮箱'>
            {
              getFieldDecorator('email', validation.email)(
                <Input disabled={mode === 'view'} size='small' placeholder='请输入邮箱'/>
              )
            }
          </FormItem>

          <FormItem className={styles.item} colon wrapperCol={{span: 10}} labelCol={{span: 4}} label='部门'>
            {
              getFieldDecorator('department', validation.department)(
                <Select disabled={mode === 'view'} size='small' placeholder='请选择部门' notFoundContent='暂无数据'>
                  <Option value='1'>11</Option>
                  <Option value='2'>22</Option>
                  <Option value='3'>33</Option>
                </Select>
              )
            }
          </FormItem>

          <FormItem className={styles.item} colon wrapperCol={{span: 10}} labelCol={{span: 4}} label='角色'>
            {
              getFieldDecorator('role', validation.role)(
                <Select
                  disabled={mode === 'view'}
                  size='small'
                  placeholder='请选择角色'
                  notFoundContent='暂无数据'
                  onSelect={
                    (value, option) => {
                      this.setState({isSell: value === '2'})
                    }
                  }
                >
                  <Option key='1'>11</Option>
                  <Option key='2'>22</Option>
                  <Option key='3'>33</Option>
                </Select>
              )
            }
          </FormItem>

          {this.state.isSell && <FormItem className={styles.item} colon wrapperCol={{span: 10}} labelCol={{span: 4}} label='接受资源'>
            {
              getFieldDecorator('resource', validation.resource)(
                <Select disabled={mode === 'view'} size='small' placeholder='请选择是否接受资源' notFoundContent='暂无数据'>
                  <Option key='1'>是</Option>
                  <Option key='0'>否</Option>
                </Select>
              )
            }
          </FormItem>}

          <FormItem className={styles.item} colon wrapperCol={{span: 10}} labelCol={{span: 4}} label='核算中心'>
            {
              getFieldDecorator('center', validation.center)(
                <Select disabled={mode === 'view'} size='small' placeholder='请选择核算中心' notFoundContent='暂无数据'>
                  <Option key='1'>是</Option>
                  <Option key='0'>否</Option>
                </Select>
              )
            }
          </FormItem>

          <FormItem className={styles.item} colon wrapperCol={{span: 13}} labelCol={{span: 4}} label='负责区域' >
            <div className={styles.treeWrap}>
              {
                getFieldDecorator('region', validation.region)(
                  <Tree
                    disabled={mode === 'view'}
                    checkable
                    onExpand={this.onExpand}
                    expandedKeys={this.state.expandedKeys}
                    onCheck={this.onCheck}
                    checkedKeys={this.state.checkedKeys}
                  >
                    {this.renderTreeNodes(this.state.treeData)}
                  </Tree>
                )
              }
            </div>
          </FormItem>

        </Form>

        <div className={styles.permission}>
          <b>所属权限：</b>
          <Checkbox disabled>渠道用户</Checkbox><br/>
          <Checkbox disabled>直营用户</Checkbox><br/>
          <Checkbox disabled>直营用户</Checkbox><br/>
          <Checkbox disabled>直营用户</Checkbox><br/>
        </div>

      </Modal>
    )
  }
}

export default Form.create()(Main)
