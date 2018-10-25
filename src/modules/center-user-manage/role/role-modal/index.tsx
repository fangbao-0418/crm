import React from 'react'
import { Modal, Input, Form, Select, Checkbox, Tree } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { fetchRoleInfo, fetchNewRoleInfo } from '../api'

const FormItem = Form.Item
const Option = Select.Option
const TreeNode = Tree.TreeNode
const styles = require('./style')
const CheckboxGroup = Checkbox.Group

interface Props extends FormComponentProps {
  mode: 'view' | 'add' | 'modify'
  tab: 'System' | 'Agent' | 'DirectCompany'
  currentRoleId: number
  onOk: (info: any) => void
  onCancel: () => any
}

interface State {
  title: string,
  info: any,
  expandedKeys: string[] // 展开节点key值
  checkedKeys: any[] // 选中节点key值
}

class Main extends React.Component<Props, State> {
  public endIds: string[] = [] // 最末级id集合
  public state: State = {
    title: '',
    info: {},
    expandedKeys: [],
    checkedKeys: []
  }

  public componentWillMount () {
    this.setTitle()
    this.fetchRoleInfo()
  }

  // 获取数据
  public fetchRoleInfo () {
    const {mode, tab, currentRoleId} = this.props
    if (mode === 'add') {
      fetchNewRoleInfo(tab).then((res) => {
        this.endIds = this.getChildIds(res)
        this.setState({info: {roleSystemAuthorityList: res}, checkedKeys: this.getCheckedIds(res)})
      })
    } else {
      fetchRoleInfo(tab, currentRoleId).then((res) => {
        this.endIds = this.getChildIds(res.roleSystemAuthorityList)
        this.setState({info: res, checkedKeys: this.getCheckedIds(res.roleSystemAuthorityList)})
      })
    }
  }

  // 设置标题
  public setTitle () {
    const {mode} = this.props
    let title
    if (mode === 'view') {
      title = '查看角色'
    } else if (mode === 'add') {
      title = '添加角色'
    } else if (mode === 'modify') {
      title = '修改角色'
    }
    this.setState({title})
  }

  // 点击确认
  public onOk = () => {
    this.props.form.validateFields((err: any, val: any) => {
      if (err) {return}
      const { checkedKeys } = this.state
      const checkIds = checkedKeys.filter((item: any) => {
        return this.endIds.some((i) => (item + '' === i))
      })
      const payload: any = {}
      payload.roleName = val.name
      payload.shareFlag = val.share
      payload.authorityIdList = checkIds
      payload.roleType = this.props.tab
      this.props.onOk(payload)
    })
  }

  // 点击取消
  public onCancel = () => {
    this.props.onCancel()
  }

  // 获取所有权限最末级id
  public getChildIds (data: any) {
    const endIds: string[] = []
    function getId (arr: any) {
      arr.forEach((item: any) => {
        if (/^\d+$/.test(item.id)) {
          endIds.push(item.id + '')
        }
        if (item.authorityResponseList.length) {
          getId(item.authorityResponseList)
        }
      })
    }
    getId(data)
    return endIds
  }

  // 获取已勾选id
  public getCheckedIds (data: any) {
    const checkedIds: any[] = []
    data = data || []
    function getId (arr: any) {
      arr.forEach((item: any) => {
        if (item.authorityResponseList && item.authorityResponseList.length !== 0) {
          getId(item.authorityResponseList)
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

  // 渲染权限树形结构
  public renderTreeNodes = (data: any[]) => {
    data = Array.isArray(data) ? data : []
    return data.map((item) => {
      if (item.authorityResponseList) {
        return (
          <TreeNode title={item.name} key={item.id}>
            {this.renderTreeNodes(item.authorityResponseList)}
          </TreeNode>
        )
      }
      return <TreeNode title={item.name} key={item.id} />
    })
  }

  // 区域勾选时触发
  public onCheck = (checkedKeys: string[], e: any) => {
    console.log(checkedKeys)
    this.setState({ checkedKeys })
  }

  // 区域展开时触发
  public onExpand = (expandedKeys: string[]) => {
    this.setState({expandedKeys})
  }

  public render () {
    const { mode, form:{getFieldDecorator} } = this.props
    const {info} = this.state
    // 过滤规则
    const validation = {
      name: {
        initialValue: info && info.roleName,
        validateTrigger: 'onBlur',
        rules:[
          {required: true, message: '请输入角色名称！'}
        ]
      },
      share: {
        initialValue: info && info.shareFlag,
        validateTrigger: 'onBlur',
        rules:[
          {required: true, message: '请选择是否数据共享！'}
        ]
      }
    }
    return (
      <Modal
        title={this.state.title}
        visible={true}
        className={styles.wrap}
        okButtonProps={{disabled: mode === 'view'}}
        cancelButtonProps={{disabled: mode === 'view'}}
        onOk={this.onOk}
        onCancel={this.onCancel}
      >
        {
          info
            ? <div>
                <Form layout='inline'>
                  <FormItem label='角色名称' required>
                    {
                      getFieldDecorator('name', validation.name)(
                        <Input disabled={mode === 'view'} size='small' defaultValue={info.roleName} />
                      )
                    }
                  </FormItem>
                  <FormItem label='数据共享' required>
                    {
                      getFieldDecorator('share', validation.share)(
                        <Select disabled={mode === 'view'} size='small' style={{width: '160px'}} placeholder='请选择是否数据共享' defaultValue={info.shareFlag}>
                          <Option value={0}>是</Option>
                          <Option value={1}>否</Option>
                        </Select>
                      )
                    }
                  </FormItem>
                </Form>
                <div className={styles.content}>
                  {
                    <Tree
                      disabled={mode === 'view'}
                      checkable
                      onExpand={this.onExpand}
                      expandedKeys={this.state.expandedKeys}
                      onCheck={this.onCheck}
                      checkedKeys={this.state.checkedKeys}
                      // defaultCheckedKeys={['1']}
                    >
                      {this.renderTreeNodes(this.state.info.roleSystemAuthorityList)}
                    </Tree>
                  }
                </div>
              </div>
            : <span></span>
        }
      </Modal>
    )
  }
}

export default Form.create()(Main)
