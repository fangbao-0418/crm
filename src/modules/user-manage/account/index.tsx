import {
  Button , Divider, Form, Input, Table, Modal as M, Select
} from 'antd'
import { Modal } from 'pilipa'
import React from 'react'
import Detail from './detail'
import { connect } from 'react-redux'
import { ColumnProps } from 'antd/lib/table'
import { fetchAccountListAction } from '../action'
import { updateAccount, deleteAccount } from '../api'
const styles = require('../style')
const Formitem = Form.Item
interface States {
  selectedRowKeys: string[]
}
interface Props extends UserManage.Props {
  type: UserManage.TypeProps
}
class Main extends React.Component<Props> {
  public searchPayload: UserManage.AccoutSearchPayload = {
    pageCurrent: 1,
    pageSize: 15,
    userType: this.props.type
  }
  public state: States = {
    selectedRowKeys: []
  }
  public columns: ColumnProps<UserManage.AccountItemProps>[] = [
    {
      title: '姓名',
      dataIndex: 'name'
    },
    {
      title: '手机号',
      dataIndex: 'phone'
    },
    {
      title: '代理商',
      dataIndex: 'companyName'
    },
    {
      title: '角色名称',
      dataIndex: 'roleName'
    },
    {
      title: '邮箱',
      dataIndex: 'email'
    },
    {
      title: '部门',
      dataIndex: 'organizationName'
    },
    {
      title: '操作',
      dataIndex: 'oprate',
      render: (text, record) => {
        return (
          <div>
            <span
              className='href'
              onClick={() => {this.update('view', record)}}
            >
              查看
            </span>
            <Divider type='vertical'/>
            <span
              className='href'
              onClick={() => {this.update('update', record)}}
            >
              修改
            </span>
            <Divider type='vertical' />
            <span
              className='href'
              onClick={() => this.delete([record.id])}
            >
              删除
            </span>
          </div>
        )
      }
    }
  ]
  public componentWillMount () {
    APP.dispatch<UserManage.Props>({
      type: 'change user manage data',
      payload: {
        account: {
          dataSource: []
        }
      }
    })
  }
  public fetchData () {
    APP.dispatch<UserManage.Props>({
      type: 'change user manage data',
      payload: {
        companyCode: this.searchPayload.companyId,
        companyName: this.searchPayload.companyName,
        account: {
          searchPayload: this.searchPayload
        }
      }
    })
    fetchAccountListAction(this.searchPayload)
  }
  public onSelectChange = (selectedRowKeys: any) => {
    this.setState({ selectedRowKeys })
  }
  // 确认删除
  public delete = (ids: any[] = this.state.selectedRowKeys) => {
    M.confirm({
      title: '删除账号',
      content: '确定删除账号吗？',
      onOk: () => {
        deleteAccount(ids).then(() => {
          this.fetchData()
        })
      }
    })
  }
  // 批量添加
  public assignment () {
  }
  // 设置错误信息
  public getErrorInfo: any = (verification: 'empty' | 'same' | 'normal') => {
    let errorInfo
    if (verification === 'empty') {
      errorInfo = {help: '部门名称不能为空', validateStatus: 'error'}
    } else if (verification === 'same') {
      errorInfo = {help: '部门名称重复', validateStatus: 'error'}
    } else if (verification === 'normal') {
      errorInfo = {help: ''}
    }
    return errorInfo
  }

  // 查看、修改、添加账号
  public update = (type: 'view' | 'update', item?: UserManage.AccountItemProps) => {
    item.companyName = this.props.companyName
    const modal = new Modal({
      title: '添加账号',
      content: (
        <Detail
          companyCode={this.props.companyCode}
          type={this.props.type}
          item={item}
          disabled={type === 'view'}
          onOk={(values) => {
            values.companyId = this.props.companyCode
            if (type === 'update') {
              updateAccount(values).then(() => {
                this.fetchData()
              })
            }
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
  public render () {
    const { dataSource } = this.props.account
    const { selectedRowKeys } = this.state
    const { companyList } = this.props
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    }
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
              this.searchPayload.companyId = value.key
              this.searchPayload.companyName = value.label
              this.fetchData()
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
          <Input.Search
            placeholder='请输入姓名'
            className={styles.searchcondition}
            onChange={(e) => {
              this.searchPayload.name = e.target.value
            }}
            onSearch={(value) => {
              this.searchPayload.name = value
              this.fetchData()
            }}
          />
          <Input.Search
            placeholder='请输入手机号'
            className={styles.searchcondition}
            onChange={(e) => {
              this.searchPayload.phone = e.target.value
            }}
            onSearch={(value) => {
              this.searchPayload.phone = value
              this.fetchData()
            }}
          />
          <Input.Search
            placeholder='请输入部门名称'
            className={styles.searchcondition}
            onChange={(e) => {
              this.searchPayload.organizationName = e.target.value
            }}
            onSearch={(value) => {
              this.searchPayload.organizationName = value
              this.fetchData()
            }}
          />
        </div>
        <div>
          <Table
            rowKey='id'
            bordered
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
            className={styles.assignBtn}
            onClick={() => this.assignment()}
          >
            批量分配
          </Button>
        }
        {
          dataSource.length === 0
          || <Button
            type='primary'
            disabled={!this.state.selectedRowKeys.length}
            className={styles.delBtn}
            onClick={this.delete.bind(this, undefined)}
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
