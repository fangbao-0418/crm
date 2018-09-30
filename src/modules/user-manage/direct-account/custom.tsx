import ContentBox from '@/modules/common/content'
import AddButton from '@/modules/common/content/AddButton'
import RoleModal from '@/modules/user-manage/direct-account/role-modal'
import {
  Button , Divider, Input, Modal, Table, Tabs
} from 'antd'
import React from 'react'

const stylus = require('./index.styl')

interface States {
  selectedRowKeys: any[],
  dataSource: any[]
  mode: 'view' | 'modify' | 'add'
  visible: boolean
}

class CustomRole extends React.Component<any, any> {
  public state: States = {
    selectedRowKeys: [],
    dataSource: [
      {
        key: 1,
        roleName: '中心管理员'
      },
      {
        key: 2,
        roleName: '各种总监'
      },
      {
        key: 3,
        roleName: '总经理'
      }
    ],
    mode: 'add',
    visible: false
  }

  // 确认删除
  public delConfirm = () => {
    Modal.confirm({
      title: '删除账号',
      content: '确定删除账号吗？',
      onOk: () => {},
      onCancel: () => {}
    })
  }

  // 确认禁用
  public forbidConfirm = () => {
    Modal.confirm({
      title: '禁用角色',
      content: '确定禁用角色吗？',
      onOk: () => {},
      onCancel: () => {}
    })
  }

  // 修改、添加、查看角色
  public setRole = (mode: 'view' | 'modify' | 'add') => {
    this.setState({
      visible: true,
      mode
    })
  }

  public onSelectChange = (selectedRowKeys: any) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({ selectedRowKeys })
  }
  public render () {
    const { selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    }
    const columns: any[] = [
      {
        title: '角色名称',
        dataIndex: 'roleName'
      },
      {
        title: '操作',
        dataIndex: 'oprate',
        width: 300,
        render: (val: any, record: any) => {
          return (
            <div>
              <a onClick={() => {this.setRole('view')}}>查看</a>
              <Divider type='vertical'/>
              <a onClick={() => {this.setRole('modify')}}>修改</a>
              <Divider type='vertical'/>
              <a onClick={() => {this.forbidConfirm()}}>禁用</a>
              <Divider type='vertical'/>
              <a onClick={() => {this.delConfirm()}}>删除</a>
            </div>
          )
        }
      }
    ]
    return (
      <div>
        <div className={stylus.formitem}>
          <Input
            placeholder='请输入公司名称'
            className={stylus.searchcondition}
          />
        </div>
        <div>
          <Table
            columns={columns}
            dataSource={this.state.dataSource}
            rowSelection={rowSelection}
            pagination={{
              showQuickJumper: true
            }}
          />
        </div>
        {
          this.state.dataSource.length === 0
          || <Button
            type='primary'
            disabled={!this.state.selectedRowKeys.length}
            className={stylus.delBtn}
            onClick={this.delConfirm}
          >
            批量删除
          </Button>
        }
        {
          this.state.visible &&
          <RoleModal
            mode={this.state.mode}
            onOk={() => {}}
            onCancel={() => {
              this.setState({visible: false})
            }}
          />
        }
      </div>
    )
  }
}

export default CustomRole
