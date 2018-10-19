import { Checkbox, Form, Input, Select, Button, Tree } from 'antd'
import React from 'react'
import { FormComponentProps } from 'antd/lib/form'
import { fetchRolePermissionList } from '../../api'
const FormItem = Form.Item
const Option = Select.Option
const TreeNode = Tree.TreeNode
const styles = require('./style')
const list = [
  {label: '增加', value: '111'},
  {label: '删除', value: '222'},
  {label: '修改', value: '333'},
  {label: '查看', value: '333'}
]
interface Props extends FormComponentProps {
  item?: UserManage.RoleItem
  type?: 'Agent' | 'DirectCompany'
  disabled?: boolean
  onOk?: (value?: UserManage.RoleItem) => void
  onCancel?: () => void
}
interface State {
  roleList: UserManage.RolePermissionItemProps[]
}
class Main extends React.Component<Props, State> {
  public lastIds: any[] = []
  public state: State = {
    roleList: []
  }
  public componentWillMount () {
    fetchRolePermissionList(this.props.type).then((res) => {
      this.setState({
        roleList: res
      })
    })
  }
  public onOk = () => {
    this.props.onOk()
  }
  public onCancel = () => {
    this.props.onCancel()
  }
  public renderTreeNodes = (data: UserManage.RolePermissionItemProps[]) => {
    return data.map((item) => {
      const key = item.id
      console.log(key, 'renderTreeNodes')
      if (item.authorityResponseList.length === 0) {
        this.lastIds.push(item.id)
      }
      if (item.authorityResponseList) {
        return (
          <TreeNode title={item.name} key={key} dataRef={item}>
            {this.renderTreeNodes(item.authorityResponseList)}
          </TreeNode>
        )
      }
      return (
        <TreeNode key={key} {...item} />
      )
    })
  }
  public getFinalIds (ids: any[] = []) {
    const res: any[] = []
    ids.map((id) => {
      if (this.lastIds.findIndex((val) => String(val) === String(id)) > -1) {
        if (/^\d+$/.test(id)) {
          id = Number(id)
        }
        res.push(id)
      }
    })
    return res
  }
  public render () {
    this.lastIds = []
    const { disabled } = this.props
    const { getFieldDecorator } = this.props.form
    const item = this.props.item || {}
    return (
      <div>
        <Form layout='inline'>
          <FormItem className={styles.input} label='角色名称' required>
            {
              getFieldDecorator(
                'roleName',
                {
                  initialValue: item.roleName
                }
              )(
                <Input disabled={disabled} size='small' />
              )
            }
          </FormItem>
          <FormItem className={styles.input} label='数据共享' required>
            {
              getFieldDecorator(
                'shareFlag',
                {
                  initialValue: item.shareFlag
                }
              )(
                <Select disabled={disabled} size='small' style={{width: '160px'}} placeholder='请选择是否数据共享'>
                  <Option value={0}>是</Option>
                  <Option value={1}>否</Option>
                </Select>
              )
            }
          </FormItem>
          <div className={styles.content}>
            <div className={styles.contentWrap}>
              <div className={styles.title}>中心运营系统权限：</div>
              <div className={styles.contentBox}>
                <FormItem>
                  {
                    getFieldDecorator(
                      'authorityIdList'
                    )(
                      <Tree
                        disabled={disabled}
                        checkable
                        // onExpand={this.onExpand}
                        // expandedKeys={this.state.expandedKeys}
                        // autoExpandParent={this.state.autoExpandParent}
                        onCheck={(checkedKeys) => {
                          console.log(checkedKeys)
                          this.props.form.setFieldsValue({
                            authorityIdList: checkedKeys
                          })
                        }}
                        // checkedKeys={this.state.checkedKeys}
                        // onSelect={this.onSelect}
                        // selectedKeys={this.state.selectedKeys}
                      >
                        {this.renderTreeNodes(this.state.roleList)}
                      </Tree>
                    )
                  }
                </FormItem>
              </div>
            </div>
          </div>
        </Form>
        <div className='mt10 text-right'>
          <Button
            type='primary'
            className='mr5'
            onClick={() => {
              if (this.props.onOk) {
                this.props.form.validateFields((errs, values) => {
                  values.authorityIdList = this.getFinalIds(values.authorityIdList)
                  if (errs === null) {
                    this.props.onOk(Object.assign({}, item, values))
                  }
                })
              }
            }}
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
