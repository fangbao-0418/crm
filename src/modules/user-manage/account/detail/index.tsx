import { Form, Select, TreeSelect, Tree, Button, Input } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { TreeNode } from 'antd/lib/tree-select'
const TreeNode = Tree.TreeNode
import {
  fetchDepartment,
  fetchRole,
  fetchRolePermission,
  fetchSuperior,
  fetchIdentity,
  fetchOwnArea
} from '../../api'
import React from 'react'
const SHOW_PARENT = TreeSelect.SHOW_PARENT
const FormItem = Form.Item
const Option = Select.Option
const styles = require('./style')
interface Props extends FormComponentProps {
  companyCode: string
  type: UserManage.TypeProps
  item?: UserManage.AccountItemProps
  disabled?: boolean
  onOk?: (values?: UserManage.AccountItemProps) => void // 确认回调
  onCancel?: () => void // 取消回调
}

interface State {
  isSell: boolean // 是否是销售
  expandedKeys: string[]
  checkedKeys: string[]
  value: string[]
  departmentList?: TreeNode[]
  roleList?: UserManage.RoleItem[]
  permissionList?: UserManage.RolePermissionItemProps[]
  superiorList?: UserManage.SuperiorProps[]
  identityList?: UserManage.IdentityProps[]
  ownAraeList?: TreeNode[]
}

class Main extends React.Component<Props, State> {
  public state: State = {
    isSell: true,
    expandedKeys: [],
    checkedKeys: [],
    value: [''],
    departmentList: [],
    roleList: [],
    permissionList: [],
    superiorList: [],
    identityList: [],
    ownAraeList: []
  }
  public componentWillMount () {
    this.fetchData()
  }
  public fetchData () {
    fetchRole(this.props.type).then((res) => {
      this.setState({
        roleList: res
      })
    })
    fetchDepartment(this.props.companyCode, this.props.type).then((res) => {
      this.setState({
        departmentList: this.handleDepartmentData(res)
      })
    })
    fetchIdentity(this.props.type).then((res) => {
      this.setState({
        identityList: res
      })
    })
    fetchOwnArea(this.props.type).then((res) => {
      this.setState({
        ownAraeList: this.handleOwnAreaData(res)
      })
    })
  }
  public onDepartmentChange (value: any) {
    console.log(value, 'onDepartmentChange')
    fetchSuperior(value).then((res) => {
      this.setState({
        superiorList: res
      })
    })
  }
  public handleOwnAreaData (data: UserManage.OwnAreaProps[]): any[] {
    data.map((item) => {
      item.value = item.code
      item.title = item.name
      item.children = item.regionList
      if (item.children.length > 0) {
        this.handleOwnAreaData(item.children)
      }
    })
    return data
  }
  public handleDepartmentData (data: UserManage.DepartmentItemProps[]): any[] {
    data.map((item) => {
      item.value = item.id
      item.title = item.name
      item.children = item.organizationList
      if (item.children.length > 0) {
        this.handleDepartmentData(item.children)
      }
    })
    return data
  }
  // 点击确认按钮
  public onOk = () => {
    this.props.form.validateFields((err, vals: UserManage.AccountItemProps) => {
      console.log(vals, '账号提交结果')
      if (err) {return}
      vals = Object.assign({}, this.props.item, vals)
      if (this.props.onOk) {
        this.props.onOk(vals)
      }
    })
  }
  // 点击取消按钮
  public cancel = () => {
    this.props.onCancel()
  }
  // // 获取区域数据
  // public setRegionTree () {
  //   if (this.props.mode === 'add') {
  //     fetchRegionList().then((res) => {
  //       this.setState({regionTree: res})
  //     })
  //   } else {
  //     this.setState({regionTree: this.props.item.region})
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

  public onChange = (value: any) => {
    console.log('onChange ', value)
    this.setState({ value })
  }
  public changePermission (roleId?: any) {
    fetchRolePermission(roleId).then((res) => {
      this.setState({
        permissionList: res
      })
    })
  }
  public renderPermissionTreeNodes (data: UserManage.RolePermissionItemProps[]) {
    return data.map((item) => {
      if (item) {
        const key = item.id
        if (item.authorityResponseList.length === 0) {
        }
        if (item.authorityResponseList) {
          return (
            <TreeNode title={item.name} key={key} dataRef={item}>
              {this.renderPermissionTreeNodes(item.authorityResponseList)}
            </TreeNode>
          )
        }
        return (
          <TreeNode key={key} {...item} />
        )
      }
    })
  }
  public render () {
    const { disabled, form: { getFieldDecorator } } = this.props
    const item = this.props.item || {}
    const { roleList, superiorList, identityList, ownAraeList } = this.state
    // 过滤规则
    const validation = {
      companyName: {
        initialValue: item.companyName,
        validateTrigger: 'onBlur',
        rules:[
          {required: true, message: '请输入公司名称！'}
        ]
      },
      name: {
        initialValue: item.name,
        validateTrigger: 'onBlur',
        rules:[
          {required: true, message: '请输入姓名！'}
        ]
      },
      phone: {
        initialValue: item.phone,
        validateTrigger: 'onBlur',
        rules:[
          {required: true, message: '请输入手机号！'},
          {len: 11, message: '手机号格式不对！'}
        ]
      },
      email: {
        initialValue: item.email,
        validateTrigger: 'onBlur',
        rules:[
          {required: true, message: '请输入邮箱！'},
          {pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '邮箱格式不正确！'}
        ]
      },
      organizationId: {
        initialValue: item.organizationId,
        rules:[
          {required: true, message: '请选择部门！'}
        ]
      },
      roleId: {
        initialValue: item.roleId,
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
      <div>
        <div>
          <Form>
            <FormItem className={styles.item} colon wrapperCol={{span: 10}} labelCol={{span: 4}} label='公司名称'>
              <span>{item.companyName}</span>
            </FormItem>
            <FormItem className={styles.item} colon wrapperCol={{span: 10}} labelCol={{span: 4}} label='姓名'>
              {
                getFieldDecorator('name', validation.name)(
                  <Input disabled={disabled} size='small' placeholder='请输入姓名'/>
                )
              }
            </FormItem>

            <FormItem className={styles.item} colon wrapperCol={{span: 10}} labelCol={{span: 4}} label='手机号'>
              {
                getFieldDecorator('phone', validation.phone)(
                  <Input disabled={disabled} size='small' placeholder='请输入手机号'/>
                )
              }
            </FormItem>

            <FormItem className={styles.item} colon wrapperCol={{span: 10}} labelCol={{span: 4}} label='邮箱'>
              {
                getFieldDecorator('email', validation.email)(
                  <Input disabled={disabled} size='small' placeholder='请输入邮箱'/>
                )
              }
            </FormItem>

            <FormItem className={styles.item} colon wrapperCol={{span: 10}} labelCol={{span: 4}} label='部门'>
              {
                getFieldDecorator('organizationId', validation.organizationId)(
                  <TreeSelect
                    onChange={this.onDepartmentChange.bind(this)}
                    treeData={this.state.departmentList}
                    placeholder='请选择所属部门'
                    treeDefaultExpandAll
                  />
                )
              }
            </FormItem>
            <FormItem className={styles.item} colon wrapperCol={{span: 10}} labelCol={{span: 4}} label='身份' required>
              {
                getFieldDecorator(
                  'identity'
                )(
                  <Select>
                    {
                      identityList.map((val) => {
                        return (
                          <Option key={val.code}>{val.name}</Option>
                        )
                      })
                    }
                  </Select>
                )
              }
            </FormItem>
            <FormItem className={styles.item} colon wrapperCol={{span: 10}} labelCol={{span: 4}} label='角色'>
              {
                getFieldDecorator('roleId', validation.roleId)(
                  <Select
                    disabled={disabled}
                    size='small'
                    placeholder='请选择角色'
                    notFoundContent='暂无数据'
                    onSelect={
                      (value) => {
                        this.setState({isSell: value === '2'})
                        this.changePermission(value)
                      }
                    }
                  >
                    {
                      roleList.map((val) => {
                        return (
                          <Option key={val.id}>{val.name}</Option>
                        )
                      })
                    }
                  </Select>
                )
              }
            </FormItem>

            {
              this.state.isSell &&
              <FormItem className={styles.item} colon wrapperCol={{ span: 10 }} labelCol={{ span: 4 }} label='接受资源'>
              {
                getFieldDecorator('resource', validation.resource)(
                  <Select disabled={disabled} size='small' placeholder='请选择是否接受资源' notFoundContent='暂无数据'>
                    <Option key='1'>是</Option>
                    <Option key='0'>否</Option>
                  </Select>
                )
              }
              </FormItem>
            }

            {
              this.state.isSell &&
              <FormItem className={styles.item} colon wrapperCol={{ span: 10 }} labelCol={{ span: 4 }} label='负责区域'>
                <TreeSelect
                  treeData={ownAraeList}
                  multiple
                  // value: this.state.value,
                  // onChange: this.onChange,
                  treeCheckable={true}
                  // showCheckedStrategy: SHOW_PARENT,
                  placeholder='请选择负责区域'
                  size='small'
                />
              </FormItem>
            }

            <FormItem className={styles.item} colon wrapperCol={{span: 10}} labelCol={{span: 4}} label='上级直属'>
              {
                getFieldDecorator('center', validation.center)(
                  <Select disabled={disabled} size='small' placeholder='请选择上级直属' notFoundContent='暂无数据'>
                    {
                      superiorList.map((val) => {
                        return (
                          <Option key={val.id}>{val.name}</Option>
                        )
                      })
                    }
                  </Select>
                )
              }
            </FormItem>
          </Form>

          <div className={styles.permission}>
            <b>所属权限：</b>
            <Tree
              disabled={true}
              defaultExpandAll={true}
              autoExpandParent={true}
              checkable={false}
            >
              {this.renderPermissionTreeNodes(this.state.permissionList)}
            </Tree>
          </div>
        </div>
        <div className='text-right mt10'>
          <Button
            className='mr5'
            type='primary'
            onClick={this.onOk.bind(this)}
          >
            保存
          </Button>
          <Button
            onClick={() => {
              if (this.props.onCancel) {
                this.props.onCancel()
              }
            }}
          >
            取消
          </Button>
        </div>
      </div>
    )
  }
}

export default Form.create()(Main)
