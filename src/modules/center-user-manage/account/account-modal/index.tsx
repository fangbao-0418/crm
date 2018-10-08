import React from 'react'
import { Modal, Form, Input, Checkbox, Cascader, Select, Tree } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { fetchRegionList, fetchDepartmentList, fetchRoleList, fetchRoleOfPermission } from '../api'

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
  expandedKeys: string[] // 展开节点key值
  checkedKeys: string[] // 选中节点key值
  regionTree: any[] // 区域树形结构数据
  departmentTree: any[] // 部门树形结构数据
  roleList: any[] // 角色列表
  permissionList: any[] // 角色权限列表
}

class Main extends React.Component<Props, State> {

  public state: State = {
    title: '',
    isSell: false,
    expandedKeys: [],
    checkedKeys: [],
    regionTree: [],
    departmentTree: [],
    roleList: [],
    permissionList: []
  }

  public componentWillMount () {
    const {mode, info} = this.props
    console.log(this.props)
    this.setTitle()
    this.setRegionTree()
    this.getDepartmentList()
    this.getRoleList()
    if (mode === 'view' || mode === 'modify') {
      this.getRoleOfPermission(info.roleId)
      this.setState({checkedKeys: this.getCheckedKeys(info.region)})
    }
  }

  // 点击确认按钮
  public confirm = () => {
    this.props.form.validateFields((err: any, val: any) => {
      if (err) {return}
      // 只把最末级的公司id传给后端
      const childIds = this.getChildIds(this.state.regionTree)
      val.region = childIds.filter((item) => {
        return this.state.checkedKeys.some((i: string) => {
          item = item + ''
          return i === item
        })
      })
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
      title = '查看权限'
    } else if (mode === 'add') {
      title = '添加权限'
    } else if (mode === 'modify') {
      title = '修改权限'
    }
    this.setState({title})
  }

  // 获取部门列表
  public getDepartmentList () {
    fetchDepartmentList().then((res) => {
      this.setState({departmentTree: res})
    })
  }

  // 获取角色数据
  public getRoleList () {
    fetchRoleList().then((res) => {
      this.setState({roleList: res})
    })
  }

  // 获取角色的权限
  public getRoleOfPermission (roleId: number) {
    fetchRoleOfPermission(roleId).then((res) => {
      this.setState({permissionList: res})
    })
  }

  // 获取区域数据
  public setRegionTree () {
    fetchRegionList().then((res) => {
      this.setState({regionTree: res})
    })
  }

  // 获取所有区域最末级公司的id
  public getChildIds (data: any) {
    const endIds: string[] = []
    function getId (arr: any) {
      arr.forEach((item: any) => {
        if (item.region) {
          getId(item.region)
        } else {
          if (!item.regionFlag) {
            endIds.push(item.id)
          }
        }
      })
    }
    getId(data)
    return endIds
  }

  // 获取已勾选区域id
  public getCheckedKeys (data: any) {
    const checkedIds: any[] = []
    data = data || []
    function getId (arr: any) {
      arr.forEach((item: any) => {
        if (item.region) {
          getId(item.region)
        } else {
          if (item.enableFlag) {
            checkedIds.push(item.id)
          }
        }
      })
    }
    getId(data)
    return checkedIds
  }

  // 渲染区域树
  public renderTreeNodes = (data: any) => {
    if (!data.length) {return}
    return data.map((item: any) => {
      if (item.region) {
        return (
          <TreeNode title={item.name} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.region)}
          </TreeNode>
        )
      }
      return <TreeNode key={item.id} title={item.name} {...item} />
    })
  }

  // 区域勾选时触发
  public onCheck = (checkedKeys: string[]) => {
    this.setState({ checkedKeys })
  }

  // 区域展开时触发
  public onExpand = (expandedKeys: string[]) => {
    this.setState({expandedKeys})
  }

  public render () {
    const {mode, info = {}, form:{getFieldDecorator}} = this.props
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
                this.state.departmentTree.length
                ? <Cascader
                  size='small'
                  disabled={mode === 'view'}
                  options={this.state.departmentTree}
                  placeholder='请选择部门'
                  fieldNames={{ label: 'name', value: 'id', children: 'organizationList' }}
                />
                : <span></span>
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
                  onSelect={(value: any, option) => {
                    console.log(value, option)
                    this.setState({isSell: option.props.children === '销售'}) // 当角色为销售时有接受资源选项
                    this.getRoleOfPermission(value)
                  }}
                >
                  {
                    this.state.roleList.map((item) => {
                      return <Option key={item.id}>{item.name}</Option>
                    })
                  }
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
                    {this.renderTreeNodes(this.state.regionTree)}
                  </Tree>
                )
              }
            </div>
          </FormItem>

        </Form>

        <div className={styles.permission}>
          <b>所属权限：</b>
          {
            this.state.permissionList.map((item) => {
              return <Checkbox disabled checked key={item.id}>{item.name}</Checkbox>
            })
          }
        </div>

      </Modal>
    )
  }
}

export default Form.create()(Main)
