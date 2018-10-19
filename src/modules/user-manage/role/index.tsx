import Detail from './detail'
import {
  Button , Divider, Table, Modal as M, Select
} from 'antd'
import { ColumnProps } from 'antd/lib/table'
import React from 'react'
import { Modal } from 'pilipa'
import { connect } from 'react-redux'
import { fetchRoleListAction } from '../action'
import { deleteRole, changeRoleStatus, fetchRoleDetail, editRole } from '../api'
const styles = require('../style')
interface States {
  selectedRowKeys: string[]
}
interface Props extends UserManage.Props {
  type: UserManage.TypeProps
}
class Main extends React.Component<Props, any> {
  public payload: UserManage.RoleSearchPayload = {
    pageCurrent: 1,
    pageSize: 15,
    roleType: this.props.type,
    companyId: undefined
  }
  public state: States = {
    selectedRowKeys: []
  }
  public columns: ColumnProps<UserManage.RoleItem>[] = [
    {
      title: '角色名称',
      dataIndex: 'name'
    },
    {
      title: '操作',
      width: 300,
      render: (text, record) => {
        return (
          <div>
            <span className='href' onClick={() => {this.update('view', record)}}>查看</span>
            <Divider type='vertical'/>
            <span className='href' onClick={() => {this.update('modify', record)}}>修改</span>
            <Divider type='vertical'/>
            <span
              className='href'
              onClick={() => {
                this.forbidConfirm(record.id, record.status === 0 ? 1 : 0)
              }}
            >
              {record.status === 0 ? '禁用' : '启用'}
            </span>
            <Divider type='vertical'/>
            <span className='href' onClick={() => {this.delConfirm([record.id])}}>删除</span>
          </div>
        )
      }
    }
  ]
  public componentWillMount () {
    APP.dispatch<UserManage.Props>({
      type: 'change user manage data',
      payload: {
        role: {
          dataSource: []
        }
      }
    })
  }
  public fetchList () {
    fetchRoleListAction(this.payload)
  }

  // 确认禁用
  public forbidConfirm = (id: number, status: 0 | 1) => {
    console.log(status)
    M.confirm({
      title: '禁用角色',
      content: '确定禁用角色吗？',
      onOk: () => {
        changeRoleStatus(id, status).then(() => {
          this.fetchList()
        })
      }
    })
  }

  // 修改、添加、查看角色
  public update = (type: 'view' | 'modify' | 'add', record: UserManage.RoleItem) => {
    const titles = {
      view: '查看角色',
      modify: '修改角色',
      add: '添加角色'
    }
    const disabled = type === 'view'
    let modal: any
    if (type !== 'add') {
      fetchRoleDetail(record.id, this.props.type).then((item) => {
        modal = new Modal({
          title: titles[type],
          content: (
            <Detail
              item={item}
              type={this.props.type}
              disabled={disabled}
              onOk={(value) => {
                editRole(value).then(() => {
                  this.fetchList()
                })
                modal.hide()
              }}
              onCancel={() => {
                modal.hide()
              }}
            />
          ),
          footer: null
        })
        modal.show()
      })
    } else {
      modal = new Modal({
        title: titles[type],
        content: (
          <Detail
            type={this.props.type}
            disabled={disabled}
            onOk={(value) => {
              editRole(value).then(() => {
                this.fetchList()
              })
              modal.hide()
            }}
            onCancel={() => {
              modal.hide()
            }}
          />
        ),
        footer: null
      })
      modal.show()
    }
  }
  // 确认删除
  public delConfirm = (ids: any[] = this.state.selectedRowKeys) => {
    M.confirm({
      title: '删除角色',
      content: '确定删除角色吗？',
      onOk: () => {
        deleteRole(ids).then(() => {
          this.fetchList()
        })
      }
    })
  }
  public onSelectChange = (selectedRowKeys: string[]) => {
    console.log(selectedRowKeys, 'selectedRowKeys')
    this.setState({ selectedRowKeys })
  }
  public render () {
    const { selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    }
    const { dataSource } = this.props.role
    const { companyList } = this.props
    return (
      <div>
        <div className={styles.formitem}>
          <Select
            showSearch
            placeholder='请输入公司名称'
            className={styles.searchcondition}
            showArrow={false}
            labelInValue
            onSelect={(value: {key: string, label: any}) => {
              console.log(value, 'company change')
              APP.dispatch<UserManage.Props>({
                type: 'change user manage data',
                payload: {
                  companyCode: value.key,
                  companyName: value.label
                }
              })
              this.payload.companyId = value.key
              this.fetchList()
            }}
          >
            {
              companyList.map((item) => {
                return (
                  <Select.Option key={item.id}>{item.name}</Select.Option>
                )
              })
            }
          </Select>
        </div>
        <div>
          <Table
            rowKey='id'
            columns={this.columns}
            dataSource={dataSource}
            rowSelection={rowSelection}
            pagination={{
              showQuickJumper: true
            }}
          />
        </div>
        {
          dataSource.length === 0
          || <Button
            type='primary'
            disabled={!this.state.selectedRowKeys.length}
            className={styles.delBtn}
            onClick={this.delConfirm.bind(this, undefined)}
          >
            批量删除
          </Button>
        }
      </div>
    )
  }
}

export default connect((state: Reducer.State) => {
  return state.userManage
})(Main)
