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
  isShowOwnArea: boolean // 是否是销售
  departmentList?: TreeNode[]
  roleList?: UserManage.RoleItem[]
  permissionList?: UserManage.RolePermissionItemProps[]
  superiorList?: UserManage.SuperiorProps[]
  identityList?: UserManage.IdentityProps[]
  ownAraeList?: TreeNode[]
}

class Main extends React.Component<Props, State> {
  public state: State = {
    isShowOwnArea: false,
    departmentList: [],
    roleList: [],
    permissionList: [],
    superiorList: [],
    identityList: [],
    ownAraeList: []
  }
  public componentWillMount () {
    this.fetchData()
    if (this.props.item && this.props.item.id) {
      this.changePermission(this.props.item.roleId)
    }
  }
  public fetchData () {
    const item = this.props.item || {}
    this.setState({
      isShowOwnArea: item.identity === 'outWorker'
    })
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
    fetchOwnArea(this.props.companyCode).then((res) => {
      this.setState({
        ownAraeList: this.handleOwnAreaData(res)
      })
    })
    if (item.organizationId !== undefined) {
      this.onDepartmentChange(item.organizationId)
    }
  }
  public onDepartmentChange (value: any) {
    fetchSuperior(value).then((res) => {
      this.setState({
        superiorList: res
      })
    })
  }
  public handleOwnAreaData (data: UserManage.OwnAreaProps[]): any[] {
    data.map((item) => {
      item.key = item.code
      item.value = item.code
      item.title = item.name
      item.children = item.regionList
      if (item.children instanceof Array && item.children.length > 0) {
        this.handleOwnAreaData(item.children)
      }
    })
    return data
  }
  public handleOwnAreaValue (codes: any[]): any[] {
    if (codes instanceof Array === false) {
      return undefined
    }
    const res: Array<{key: string, value: string}> = []
    codes.map((code) => {
      res.push({
        value: code,
        key: code
      })
    })
    return res
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
      if (err) {return}
      vals.regionList = vals.regionList || []
      vals.regionList.map((item: {
        regionArea?: string,
        regionAreaName?: string,
        value?: string,
        label?: string
      }) => {
        item.regionArea = item.value
        item.regionAreaName = item.label
        delete item.value
        delete item.label
      })
      vals = Object.assign({}, this.props.item, vals)
      if (this.props.onOk) {
        this.props.onOk(vals)
      }
    })
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
    console.log(this.props.type, 'type')
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
          {pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: '手机号格式不对！'}
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
        initialValue: item.roleId ? String(item.roleId) : undefined,
        rules:[
          {required: true, message: '请选择角色！'}
        ]
      },
      parentId: {
        initialValue: item.parentId !== undefined ? String(item.parentId) : undefined
      }
    }
    console.log(item, '账号item')
    return (
      <div>
        <div style={{display: 'flex'}}>
          <Form style={{width: 300}}>
            <FormItem className={styles.item} colon wrapperCol={{span: 18}} labelCol={{span: 6}} label='公司名称'>
              <span>{item.companyName}</span>
            </FormItem>
            <FormItem className={styles.item} colon wrapperCol={{span: 18}} labelCol={{span: 6}} label='姓名'>
              {
                getFieldDecorator('name', validation.name)(
                  <Input disabled={disabled} size='small' placeholder='请输入姓名'/>
                )
              }
            </FormItem>

            <FormItem className={styles.item} colon wrapperCol={{span: 18}} labelCol={{span: 6}} label='手机号'>
              {
                getFieldDecorator('phone', validation.phone)(
                  <Input disabled={disabled} size='small' placeholder='请输入手机号' maxLength={11}/>
                )
              }
            </FormItem>

            <FormItem className={styles.item} colon wrapperCol={{span: 18}} labelCol={{span: 6}} label='邮箱'>
              {
                getFieldDecorator('email', validation.email)(
                  <Input disabled={disabled} size='small' placeholder='请输入邮箱'/>
                )
              }
            </FormItem>

            <FormItem className={styles.item} colon wrapperCol={{span: 18}} labelCol={{span: 6}} label='部门'>
              {
                getFieldDecorator('organizationId', validation.organizationId)(
                  <TreeSelect
                    disabled={disabled}
                    onChange={this.onDepartmentChange.bind(this)}
                    treeData={this.state.departmentList}
                    placeholder='请选择所属部门'
                    treeDefaultExpandAll
                  />
                )
              }
            </FormItem>
            <FormItem className={styles.item} colon wrapperCol={{span: 18}} labelCol={{span: 6}} label='身份' required>
              {
                getFieldDecorator(
                  'identity',
                  {
                    initialValue: item.identity
                  }
                )(
                  <Select
                    disabled={disabled}
                    onChange={(value) => {
                      console.log(value, 'value')
                      this.setState({isShowOwnArea: value === 'outWorker'})
                    }}
                  >
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
            <FormItem className={styles.item} colon wrapperCol={{span: 18}} labelCol={{span: 6}} label='角色'>
              {
                getFieldDecorator('roleId', validation.roleId)(
                  <Select
                    disabled={disabled}
                    size='small'
                    placeholder='请选择角色'
                    notFoundContent='暂无数据'
                    onSelect={
                      (value) => {
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
              (this.state.isShowOwnArea) &&
              <FormItem className={styles.item} colon wrapperCol={{ span: 18 }} labelCol={{ span: 6 }} label='负责区域'>
                {
                  getFieldDecorator(
                    'regionList',
                    {
                      initialValue: this.handleOwnAreaValue(item.regionList)
                    }
                  )(
                    <TreeSelect
                      disabled={disabled}
                      treeData={ownAraeList}
                      showCheckedStrategy={TreeSelect.SHOW_PARENT}
                      multiple
                      labelInValue
                      treeCheckable={true}
                      placeholder='请选择负责区域'
                      size='small'
                    />
                  )
                }
              </FormItem>
            }

            <FormItem className={styles.item} colon wrapperCol={{span: 18}} labelCol={{span: 6}} label='上级直属'>
              {
                getFieldDecorator(
                  'parentId',
                  validation.parentId
                )(
                  <Select
                    disabled={disabled}
                    size='small'
                    placeholder='请选择上级直属'
                    notFoundContent='暂无数据'
                  >
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
        {
          (this.props.disabled) ?
          <div className='text-right mt10'>
            <Button
              onClick={() => {
                if (this.props.onCancel) {
                  this.props.onCancel()
                }
              }}
            >
              关闭
            </Button>
          </div> :
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
        }
      </div>
    )
  }
}

export default Form.create()(Main)
