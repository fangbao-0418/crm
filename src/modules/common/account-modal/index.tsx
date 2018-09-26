import React from 'react'
import { Modal, Form, Input, Checkbox, Button, Select, Tree } from 'antd'

const styles = require('./index.styl')
const Option = Select.Option
const FormItem = Form.Item
const TreeNode = Tree.TreeNode

interface Props {
  info: {
    title?: '添加账号' | '查看账号' | '修改账号' // 标题
    visible?: boolean // 是否显示弹窗
  }
  onOk?: () => void // 确认回调
  onCancle?: () => void // 取消回调
  form?: any
}

// 过滤规则
const validation = {
  name: {
    validateTrigger: 'onBlur',
    rules:[
      {required: true, message: '请输入姓名！'}
    ]
  },
  phone: {
    validateTrigger: 'onBlur',
    rules:[
      {required: true, message: '请输入手机号！'},
      {len: 11, message: '手机号格式不对！'}
    ]
  },
  email: {
    validateTrigger: 'onBlur',
    rules:[
      {required: true, message: '请输入邮箱！'},
      {pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '邮箱格式不正确！'}
    ]
  },
  department: {
    rules:[
      {required: true, message: '请选择部门！'}
    ]
  },
  role: {
    rules:[{}]
  },
  center: {
    rules: [{}]
  }
}

class Main extends React.Component<any, any> {

  public state = {
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

  // 点击确认按钮
  public confirm = () => {
    this.props.form.validateFields((err: any, val: any) => {
      if (err) {return}
      console.log(val)
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

  // 区域节点展开触发
  public onExpand = (expandedKeys: any) => {
    console.log('onExpand', expandedKeys)
    this.setState({
      expandedKeys,
      autoExpandParent: false
    })
  }

  // 区域勾选时触发
  public onCheck = (checkedKeys: any) => {
    console.log('onCheck', checkedKeys)
    this.setState({ checkedKeys })
  }

  public render () {
    const {info, form:{getFieldDecorator}} = this.props
    return (
      <Modal
        className={styles.modal}
        title={info.title}
        visible={info.visible}
        destroyOnClose={true}
        cancelText='取消'
        okText='确定'
        onOk={this.confirm}
        onCancel={this.cancel}
      >

        <Form>

          <FormItem className={styles.item} colon wrapperCol={{span: 10}} labelCol={{span: 4}} label='姓名'>
            {
              getFieldDecorator('name', validation.name)(
                <Input size='small' placeholder='请输入姓名'/>
              )
            }
          </FormItem>

          <FormItem className={styles.item} colon wrapperCol={{span: 10}} labelCol={{span: 4}} label='手机号'>
            {
              getFieldDecorator('phone', validation.phone)(
                <Input size='small' placeholder='请输入手机号'/>
              )
            }
          </FormItem>

          <FormItem className={styles.item} colon wrapperCol={{span: 10}} labelCol={{span: 4}} label='邮箱'>
            {
              getFieldDecorator('email', validation.email)(
                <Input size='small' placeholder='请输入邮箱'/>
              )
            }
          </FormItem>

          <FormItem className={styles.item} colon wrapperCol={{span: 10}} labelCol={{span: 4}} label='部门'>
            {
              getFieldDecorator('department', validation.department)(
                <Select size='small' placeholder='请选择部门' notFoundContent='暂无数据' defaultValue='1'>
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
                <Select size='small' placeholder='请选择角色' notFoundContent='暂无数据'>
                  <Option key='1'>11</Option>
                  <Option key='2'>22</Option>
                  <Option key='3'>33</Option>
                </Select>
              )
            }
          </FormItem>

          <FormItem className={styles.item} colon wrapperCol={{span: 10}} labelCol={{span: 4}} label='核算中心'>
            {
              getFieldDecorator('center', validation.center)(
                <Select size='small' placeholder='请选择核算中心' notFoundContent='暂无数据'>
                  <Option key='1'>11</Option>
                  <Option key='2'>22</Option>
                  <Option key='3'>33</Option>
                </Select>
              )
            }
          </FormItem>

          <FormItem className={styles.item} colon wrapperCol={{span: 13}} labelCol={{span: 4}} label='负责区域' >
            <div className={styles.treeWrap}>
              <Tree
                checkable
                onExpand={this.onExpand}
                expandedKeys={this.state.expandedKeys}
                onCheck={this.onCheck}
                checkedKeys={this.state.checkedKeys}
              >
                {this.renderTreeNodes(this.state.treeData)}
              </Tree>
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
