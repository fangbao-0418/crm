import { Button, Checkbox, Form, Input, Modal, Select, Tree } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import React from 'react'

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

interface State {
  title: string // 弹窗标题
  isSell: boolean // 是否是销售
  expandedKeys: string[]
  checkedKeys: string[]
}

class Main extends React.Component<Props, State> {

  public state: State = {
    title: '',
    isSell: false,
    expandedKeys: [],
    checkedKeys: []
  }

  public componentWillMount () {
    const {mode} = this.props
    this.setTitle()
    if (mode === 'view' || mode === 'modify') {
      // this.setState({checkedKeys: this.getCheckedKeys(this.props.info.region)})
    }
  }

  // 点击确认按钮
  public confirm = () => {
    this.props.form.validateFields((err: any, val: any) => {
      if (err) {return}
      // 只把最末级的公司id传给后端
      // const childIds = this.getChildIds(this.state.regionTree)
      // console.log(444, childIds, this.state.checkedKeys)
      // val.region = childIds.filter((item) => {
      //   return this.state.checkedKeys.some((i: string) => {
      //     item = item + ''
      //     return i === item
      //   })
      // })
      console.log('val:', val)
      this.props.onOk(val)
    })
  }

  // 点击取消按钮
  public cancel = () => {
    this.props.onCancel()
  }

  // 设置弹窗title
  public setTitle () {
    const {mode} = this.props
    let title
    if (mode === 'view') {
      title = '查看账号'
    } else if (mode === 'add') {
      title = '添加账号'
    } else if (mode === 'modify') {
      title = '修改账号'
    }
    this.setState({title})
  }

  // // 获取区域数据
  // public setRegionTree () {
  //   if (this.props.mode === 'add') {
  //     fetchRegionList().then((res) => {
  //       this.setState({regionTree: res})
  //     })
  //   } else {
  //     this.setState({regionTree: this.props.info.region})
  //   }
  // }

  // 获取所有区域最末级公司的id
  // public getChildIds (data: any) {
  //   const endIds: string[] = []
  //   function getId (arr: any) {
  //     arr.forEach((item: any) => {
  //       if (item.region) {
  //         getId(item.region)
  //       } else {
  //         if (!item.regionFlag) {
  //           endIds.push(item.id)
  //         }
  //       }
  //     })
  //   }
  //   getId(data)
  //   return endIds
  // }

  // // 获取已勾选区域id
  // public getCheckedKeys (data: any) {
  //   const checkedIds: any[] = []
  //   function getId (arr: any) {
  //     arr.forEach((item: any) => {
  //       if (item.region) {
  //         getId(item.region)
  //       } else {
  //         if (item.enableFlag) {
  //           checkedIds.push(item.id)
  //         }
  //       }
  //     })
  //   }
  //   getId(data)
  //   return checkedIds
  // }

  // 渲染区域树
  // public renderTreeNodes = (data: any) => {
  //   if (!data.length) {return}
  //   return data.map((item: any) => {
  //     if (item.region) {
  //       return (
  //         <TreeNode title={item.name} key={item.id} dataRef={item}>
  //           {this.renderTreeNodes(item.region)}
  //         </TreeNode>
  //       )
  //     }
  //     return <TreeNode key={item.id} title={item.name} {...item} />
  //   })
  // }

  // // 区域勾选时触发
  // public onCheck = (checkedKeys: string[]) => {
  //   this.setState({ checkedKeys })
  // }

  // // 区域展开时触发
  // public onExpand = (expandedKeys: string[]) => {
  //   this.setState({expandedKeys})
  // }

  public render () {
    const {mode, info = {}, form:{getFieldDecorator}} = this.props
    // 过滤规则
    const validation = {
      firm: {
        initialValue: info.agency,
        validateTrigger: 'onBlur',
        rules:[
          {required: true, message: '请输入公司名称！'}
        ]
      },
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
          <FormItem className={styles.item} colon wrapperCol={{span: 10}} labelCol={{span: 4}} label='公司名称'>
            {
              getFieldDecorator('firm', validation.firm)(
                <Input disabled={mode === 'view'} size='small' placeholder='请输入公司名称'/>
              )
            }
          </FormItem>
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

          {
            this.state.isSell &&
            <FormItem className={styles.item} colon wrapperCol={{ span: 10 }} labelCol={{ span: 4 }} label='接受资源'>
            {
              getFieldDecorator('resource', validation.resource)(
                <Select disabled={mode === 'view'} size='small' placeholder='请选择是否接受资源' notFoundContent='暂无数据'>
                  <Option key='1'>是</Option>
                  <Option key='0'>否</Option>
                </Select>
              )
            }
            </FormItem>
          }

          <FormItem className={styles.item} colon wrapperCol={{span: 10}} labelCol={{span: 4}} label='上级直属'>
            {
              getFieldDecorator('center', validation.center)(
                <Select disabled={mode === 'view'} size='small' placeholder='请选择上级直属' notFoundContent='暂无数据'>
                  <Option key='1'>是</Option>
                  <Option key='0'>否</Option>
                </Select>
              )
            }
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
