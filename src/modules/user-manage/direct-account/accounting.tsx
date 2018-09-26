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

class Accounting extends React.Component<any, any> {
  public state: States = {
    selectedRowKeys: [],
    dataSource: [
      {
        key: 1,
        name: '赵飞燕',
        cellPhone: '13122563584',
        agency: '北京凯德茂有限公司',
        roleName: '运营主管',
        mailBox: '315774963@qq.com',
        department: '市场部'
      },
      {
        key: 2,
        name: '赵合德',
        cellPhone: '12345678901',
        agency: '北京凯德茂无限公司',
        roleName: '运营主管',
        mailBox: '315774963@qq.com',
        department: '市场部'
      },
      {
        key: 3,
        name: '张飞燕',
        cellPhone: '13294389438',
        agency: '北京凯德茂到底有没有限公司',
        roleName: '运营主管',
        mailBox: '315774963@qq.com',
        department: '市场部'
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
        title: '姓名',
        dataIndex: 'name'
      },
      {
        title: '手机号',
        dataIndex: 'cellPhone'
      },
      {
        title: '代理商',
        dataIndex: 'agency'
      },
      {
        title: '角色名称',
        dataIndex: 'roleName'
      },
      {
        title: '邮箱',
        dataIndex: 'mailBox'
      },
      {
        title: '部门',
        dataIndex: 'department'
      },
      {
        title: '操作',
        dataIndex: 'oprate',
        render: () => {
          return (
            <div>
              <a>查看</a>
              <Divider type='vertical'/>
              <a>修改</a>
              <Divider type='vertical' />
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
          <Input
            placeholder='请输入姓名'
            className={stylus.searchcondition}
          />
          <Input
            placeholder='请输入手机号'
            className={stylus.searchcondition}
          />
          <Input
            placeholder='请输入部门名称'
            className={stylus.searchcondition}
          />
        </div>
        <div>
          <Table
            bordered
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

export default Accounting
