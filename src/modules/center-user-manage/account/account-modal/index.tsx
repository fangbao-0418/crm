import React from 'react'
import { Modal, Form, Input, Checkbox, Cascader, Select, Tree, TreeSelect } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { fetchRegionList, fetchDepartmentList, fetchRoleList, fetchRoleOfPermission, fetchAccountInfo, fetchIdentityList } from '../api'

const styles = require('./index.styl')
const Option = Select.Option
const FormItem = Form.Item
const TreeNode = Tree.TreeNode
const TreeSelectNode = TreeSelect.TreeNode

interface Props extends FormComponentProps {
  mode: string // 模式
  info: any // 账户信息
  onOk?: (val: any) => void // 确认回调
  onCancel?: () => void // 取消回调
}

interface State {
  title: string // 弹窗标题
  identityType: 'showArea' | 'none' // 显示区域选项 | 都不显示
  expandedKeys: string[] // 展开节点key值
  checkedKeys: string[] // 选中节点key值
  regionTree: any[] // 区域树形结构数据
  departmentTree: any[] // 部门树形结构数据
  roleList: any[] // 角色列表
  permissionList: any[] // 角色权限列表
  accountList: any[] // 核算中心列表
  identityList: any[] // 身份列表
  expandedPermissionKeys: string[] // 权限展开节点
}

class Main extends React.Component<Props, State> {

  public selectAreaInfoList: any[] = [] // 选中区域信息列表

  public state: State = {
    title: '',
    identityType: 'none',
    expandedKeys: [],
    checkedKeys: [],
    regionTree: [],
    departmentTree: [],
    roleList: [],
    permissionList: [],
    accountList: [],
    identityList: [],
    expandedPermissionKeys: []
  }

  public componentWillMount () {
    const {mode, info} = this.props
    this.setTitle()
    this.setRegionTree()
    this.getDepartmentList()
    this.getRoleList()
    this.getAccountList()
    this.getIdentityList()
    this.showOption(info.identity)
    if (mode === 'view' || mode === 'modify') {
      this.getRoleOfPermission(info.roleId)
    }
  }

  // 点击确认按钮
  public confirm = () => {
    this.props.form.validateFields((err: any, val: any) => {
      if (err) {return}
      val.region = this.selectAreaInfoList
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

  // 获取身份列表
  public getIdentityList () {
    fetchIdentityList('System').then((res) => {
      this.setState({identityList: res})
    })
  }

  // 获取核算中心列表
  public getAccountList () {
    fetchAccountInfo().then((res) => {
      this.setState({accountList: res})
    })
  }

  // 获取部门信息
  public getDepartmentList () {
    fetchDepartmentList().then((res) => {
      this.setState({departmentTree: res})
    })
  }

  // 渲染部门节点
  public renderDepartmentNode (data: any) {
    if (!data.length) {return}
    return data.map((item: any) => {
      if (item.organizationList) {
        return (
          <TreeSelectNode title={item.name} key={item.id} value={item.id} dataRef={item}>
            {this.renderDepartmentNode(item.organizationList)}
          </TreeSelectNode>
        )
      }
      return <TreeSelectNode key={item.id} title={item.name} value={item.id} {...item} />
    })
  }

  // 获取角色信息
  public getRoleList () {
    fetchRoleList().then((res) => {
      this.setState({roleList: res})
    })
  }

  // 是否显示接受资源和负责地区选项
  public showOption (val: string) {
    console.log(val, 'val')
    const arr = ['districtManager', 'channelAccounting', 'channelManager', 'channelDirector', 'channelOperationsManager']
    let identityType: 'showArea' | 'none' = 'none'
    if (arr.includes(val)) {
      identityType = 'showArea'
    }
    this.setState({identityType})
  }

  // 获取角色权限信息
  public getRoleOfPermission (roleId: number) {
    fetchRoleOfPermission(roleId).then((res) => {
      this.setState({permissionList: res})
    })
  }

  // 获取区域信息
  public setRegionTree () {
    const id = this.props.info.id || ''
    fetchRegionList(id).then((res) => {
      this.setState({regionTree: res, checkedKeys: this.getCheckedKeys(res)})
    })
  }

  // 获取已勾选区域code
  public getCheckedKeys (data: any) {
    const checkedIds: any[] = []
    data = data || []
    function getId (arr: any) {
      arr.forEach((item: any) => {
        if (item.regionList && item.regionList.length !== 0) {
          getId(item.regionList)
        } else {
          if (item.enableFlag) {
            checkedIds.push(item.code)
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
      if (item.regionList) {
        return (
          <TreeNode title={item.name} key={item.code} dataRef={item}>
            {this.renderTreeNodes(item.regionList)}
          </TreeNode>
        )
      }
      return <TreeNode key={item.code} title={item.name} {...item} />
    })
  }

  // 渲染权限树
  public renderPermissionTreeNodes = (data: any) => {
    data = Array.isArray(data) ? data : []
    return data.map((item: any) => {
      if (item) {
        if (item.authorityResponseList) {
          return (
            <TreeNode title={item.name} key={item.id}>
              {this.renderPermissionTreeNodes(item.authorityResponseList)}
            </TreeNode>
          )
        }
        return <TreeNode title={item.name} key={item.id} />
      }
    })
  }

  // 区域勾选时触发
  public onCheck = (checkedKeys: string[], e: any) => {
    console.log(checkedKeys, 'checkedKeys')
    this.setState({ checkedKeys })
    this.selectAreaInfoList = []
    const regionTree = this.state.regionTree
    const Positions = e.checkedNodesPositions
    console.log(regionTree, 'regionTree')
    console.log(Positions, 'Positions')
    Positions.forEach((item: any) => {
      const indexList = item.pos.split('-')
      console.log(indexList, 'indexList')
      const areaInfo: any = {}
      if (indexList.length !== 5) {return} // 不为6代表没有选中最末级公司
      const area1 = regionTree[indexList[1]]
      console.log(area1, 'area1')
      const area2 = area1.regionList[indexList[2]]
      const area3 = area2.regionList[indexList[3]]
      // const area4 = area3.regionList[indexList[4]]
      const area4 = area3.regionList[indexList[4]]
      areaInfo.regionRootArea = area1.code
      areaInfo.regionRootAreaName = area1.name
      areaInfo.regionProvince = area2.code
      areaInfo.regionProvinceName = area2.name
      areaInfo.regionCity = area3.code
      areaInfo.regionCityName = area3.name
      // areaInfo.regionArea = area4.code
      // areaInfo.regionAreaName = area4.name
      areaInfo.companyId = area4.id
      this.selectAreaInfoList.push(areaInfo)
    })
  }
  public onCheck1 = (checkedKeys: string[], e: any) => {
    console.log(checkedKeys, 'checkedKeys')
    this.setState({ checkedKeys })
    this.selectAreaInfoList = []
    const regionTree = this.state.regionTree
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
          {pattern: /^1[3|4|5|7|8|9][0-9]\d{8}$/, message: '手机号格式不对！'}
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
        initialValue: info.organizationId,
        rules:[
          {required: true, message: '请选择部门！'}
        ]
      },
      identity: {
        initialValue: info.identity,
        rules:[
          {required: true, message: '请选择身份！'}
        ]
      },
      role: {
        initialValue: info.roleId,
        rules:[
          {required: true, message: '请选择角色！'}
        ]
      },
      resource: {
        initialValue: info.acceptType,
        rules:[
          {required: true, message: '请选择是否接收资源！'}
        ]
      },
      center: {
        initialValue: info.adjustAccountId
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
        width={620}
        okButtonProps={{disabled: mode === 'view'}}
        cancelButtonProps={{disabled: mode === 'view'}}
        onOk={this.confirm}
        onCancel={this.cancel}
      >
        <div style={{display: 'flex'}}>
          <Form style={{width: 300}}>
            <FormItem className={styles.item} colon wrapperCol={{span: 18}} labelCol={{span: 6}} label='姓名'>
              {
                getFieldDecorator('name', validation.name)(
                  <Input disabled={mode === 'view'} size='small' placeholder='请输入姓名'/>
                )
              }
            </FormItem>

            <FormItem className={styles.item} colon wrapperCol={{span: 18}} labelCol={{span: 6}} label='手机号'>
              {
                getFieldDecorator('phone', validation.phone)(
                  <Input disabled={mode === 'view'} size='small' placeholder='请输入手机号' maxLength={11} />
                )
              }
            </FormItem>

            <FormItem className={styles.item} colon wrapperCol={{span: 18}} labelCol={{span: 6}} label='邮箱'>
              {
                getFieldDecorator('email', validation.email)(
                  <Input disabled={mode === 'view'} size='small' placeholder='请输入邮箱'/>
                )
              }
            </FormItem>

            <FormItem className={styles.item} colon wrapperCol={{span: 18}} labelCol={{span: 6}} label='部门'>
              {
                getFieldDecorator('department', validation.department)(
                  this.state.departmentTree.length
                    ? <TreeSelect
                      size='small'
                      disabled={mode === 'view'}
                      placeholder='请选择部门'
                      treeDefaultExpandedKeys={[info.organizationId]}
                    >
                      {this.renderDepartmentNode(this.state.departmentTree)}
                    </TreeSelect>
                    : <span></span>
                )
              }
            </FormItem>

            <FormItem className={styles.item} colon wrapperCol={{span: 18}} labelCol={{span: 6}} label='身份'>
              {
                getFieldDecorator('identity', validation.identity)(
                  <Select
                    disabled={mode === 'view'}
                    size='small'
                    placeholder='请选择身份'
                    notFoundContent='暂无数据'
                    onSelect={(value: any, option) => {
                      this.showOption(value)
                    }}
                  >
                    {this.state.identityList.map((item: any) => {
                      return <Option key={item.code} value={item.code}>{item.name}</Option>
                    })}
                  </Select>
                )
              }
            </FormItem>

            <FormItem className={styles.item} colon wrapperCol={{span: 18}} labelCol={{span: 6}} label='角色'>
              {
                getFieldDecorator('role', validation.role)(
                  <Select
                    disabled={mode === 'view'}
                    size='small'
                    placeholder='请选择角色'
                    notFoundContent='暂无数据'
                    onSelect={(value: any, option) => {
                      this.getRoleOfPermission(value)
                    }}
                  >
                    {
                      this.state.roleList.map((item) => {
                        return <Option key={item.id} value={item.id}>{item.name}</Option>
                      })
                    }
                  </Select>
                )
              }
            </FormItem>

            <FormItem className={styles.item} colon wrapperCol={{span: 18}} labelCol={{span: 6}} label='核算中心'>
              {
                getFieldDecorator('center', validation.center)(
                  <Select disabled={mode === 'view'} size='small' placeholder='请选择核算中心' notFoundContent='暂无数据'>
                    {this.state.accountList.map((item: any) => {
                      return <Option key={item.id} value={item.id}>{item.name}</Option>
                    })}
                  </Select>
                )
              }
            </FormItem>

            {this.state.identityType === 'showArea'
            && <FormItem className={styles.item} colon wrapperCol={{span: 18}} labelCol={{span: 6}} label='负责区域' >
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
            </FormItem>}

          </Form>
          <div className={styles.permission}>
            <b>所属权限：</b>
            {
              <Tree
                disabled={mode === 'view'}
                onExpand={(keys) => {
                  this.setState({expandedPermissionKeys: keys})
                }}
                expandedKeys={this.state.expandedPermissionKeys}
              >
                {this.renderPermissionTreeNodes(this.state.permissionList)}
              </Tree>
            }
          </div>
        </div>
      </Modal>
    )
  }
}

export default Form.create()(Main)
