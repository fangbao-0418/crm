import Detail from './detail'
import {
  Button , Divider, Input, Table, Tabs, Modal as M
} from 'antd'
import { ColumnProps } from 'antd/lib/table'
import React from 'react'
import { Modal } from 'pilipa'
import { connect } from 'react-redux'
import { fetchRoleListAction } from '../action'
const styles = require('../style')
interface States {
  selectedRowKeys: string[]
}

class Main extends React.Component<UserManage.Props, any> {
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
      render: (val: any, record: any) => {
        return (
          <div>
            <span className='href' onClick={() => {this.setRole('view')}}>查看</span>
            <Divider type='vertical'/>
            <span className='href' onClick={() => {this.setRole('modify')}}>修改</span>
            <Divider type='vertical'/>
            <span className='href' onClick={() => {this.forbidConfirm()}}>禁用</span>
            <Divider type='vertical'/>
            <span className='href' onClick={() => {this.delConfirm()}}>删除</span>
          </div>
        )
      }
    }
  ]
  public componentWillMount () {
    this.fetchList()
  }
  public fetchList () {
    fetchRoleListAction()
  }
  // 确认删除
  public delConfirm = () => {
    M.confirm({
      title: '删除账号',
      content: '确定删除账号吗？',
      onOk: () => {},
      onCancel: () => {}
    })
  }

  // 确认禁用
  public forbidConfirm = () => {
    M.confirm({
      title: '禁用角色',
      content: '确定禁用角色吗？',
      onOk: () => {},
      onCancel: () => {}
    })
  }

  // 修改、添加、查看角色
  public setRole = (type: 'view' | 'modify' | 'add') => {
    const titles = {
      view: '查看角色',
      modify: '修改角色',
      add: '添加角色'
    }
    const modal = new Modal({
      title: titles[type],
      content: (
        <Detail
          disabled={type === 'view'}
        />
      ),
      footer: null
    })
    modal.show()
  }

  public onSelectChange = (selectedRowKeys: string[]) => {
    this.setState({ selectedRowKeys })
  }
  public render () {
    const { selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    }
    const { dataSource } = this.props.role
    return (
      <div>
        <div className={styles.formitem}>
          <Input
            placeholder='请输入公司名称'
            className={styles.searchcondition}
          />
        </div>
        <div>
          <Table
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
            onClick={this.delConfirm}
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
