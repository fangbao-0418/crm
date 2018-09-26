import ContentBox from '@/modules/common/content'
import AddButton from '@/modules/common/content/AddButton'
import {
  Button , Divider, Input, Table, Tabs
} from 'antd'
import React from 'react'

const stylus = require('./index.styl')

interface States {
  selectedRowKeys: any[],
  dataSource: any[]
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
    ]
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
        render: () => {
          return (
            <div>
              <a>查看</a>
              <Divider type='vertical'/>
              <a>修改</a>
              <Divider type='vertical' />
              <a>禁用</a>
              <Divider type='vertical'/>
              <a>删除</a>
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
        {this.state.dataSource.length === 0 || <Button type='primary' className={stylus.delBtn}>批量删除</Button>}
      </div>
    )
  }
}

export default CustomRole
