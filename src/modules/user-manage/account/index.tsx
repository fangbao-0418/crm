import {
  Button , Divider, Form, Input, Table, Modal as M
} from 'antd'
import { Modal } from 'pilipa'
import React from 'react'
import Detail from './detail'
import { connect } from 'react-redux'
import { ColumnProps } from 'antd/lib/table'
import { fetchAccountListAction } from '../action'
import { updateAccount } from '../api'
const styles = require('../style')
const Formitem = Form.Item
interface States {
  selectedRowKeys: string[]
}
class Main extends React.Component<UserManage.Props> {
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
              onClick={() => {this.update('modify', record)}}
            >
              修改
            </span>
            <Divider type='vertical' />
            <span
              className='href'
              onClick={() => this.delete('single', record)}
            >
              删除
            </span>
          </div>
        )
      }
    }
  ]
  public componentWillMount () {
    this.fetchList()
  }
  public fetchList () {
    fetchAccountListAction()
  }
  public onSelectChange = (selectedRowKeys: any) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({ selectedRowKeys })
  }
  // 确认删除
  public delete = (type: 'batch' | 'single', record: UserManage.AccountItemProps) => {
    M.confirm({
      title: '删除账号',
      content: '确定删除账号吗？',
      onOk: () => {
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
  public update = (type: 'view' | 'modify' | 'add', item?: UserManage.AccountItemProps) => {
    console.log(item, 'item')
    const modal = new Modal({
      title: '添加账号',
      content: (
        <Detail
          item={item}
          disabled={type === 'view'}
          onOk={(values) => {
            console.log(values, 'values')
            if (type === 'modify') {
              updateAccount(values).then(() => {
                this.fetchList()
              })
            }
            // console.log(445, val)
          }}
          onCancel={() => {
            // this.setState({visible: false})
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
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    }
    return (
      <div>
        <div className={styles.formitem}>
          <Input
            placeholder='请输入公司名称'
            className={styles.searchcondition}
          />
          <Input
            placeholder='请输入姓名'
            className={styles.searchcondition}
          />
          <Input
            placeholder='请输入手机号'
            className={styles.searchcondition}
          />
          <Input
            placeholder='请输入部门名称'
            className={styles.searchcondition}
          />
        </div>
        <div>
          <Table
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
            onClick={this.delete.bind(this, 'batch')}
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
