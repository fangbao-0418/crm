import React from 'react'
import { Input, Button, Table, Divider } from 'antd'
import ContentBox from '@/modules/common/content'

const styles = require('./style')

interface State {
  selectedRowKeys: any[],
  dataSource: any[]
}

class Main extends React.Component {

  public state: State = {
    selectedRowKeys: [],
    dataSource: [
      {
        id:3,
        name: '张三',
        email:'1@qq.com',
        roleName:'财务',
        phone: '11111111',
        organizationName:'财务部'
      },
      {
        id:5,
        name: '李四',
        email:'2@qq.com',
        roleName:'财务1',
        phone: '22222222',
        organizationName:'财务部'
      }
    ]
  }

  public onSelectChange = (selectedRowKeys: any) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({ selectedRowKeys })
  }

  public render () {
    const { selectedRowKeys } = this.state
    const columns: any[] = [
      {
        title: '姓名',
        dataIndex: 'name'
      },
      {
        title: '手机号',
        dataIndex: 'phone'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },
      {
        title: '角色',
        dataIndex: 'roleName'
      },
      {
        title: '部门',
        dataIndex: 'organizationName'
      },
      {
        title: '操作',
        render: () => {
          return (
            <div>
              <a>查看</a>
              <Divider type='vertical'/>
              <a>修改</a>
              <Divider type='vertical'/>
              <a>删除</a>
            </div>
          )
        }
      }
    ]

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    }

    return (
      <ContentBox title='账号'>
        <div className={styles.topWarp}>
          <div className={styles.left}>
            <Input
              placeholder='请输入姓名'
            />
            <Input
              placeholder='请输入手机号'
            />
            <Input
              placeholder='请输入部门名称'
            />
          </div>
          <div className={styles.right}>
            <Button type='primary' style={{marginRight: '10px'}}>添加账号</Button>
            <Button>批量删除</Button>
          </div>
        </div>

        <div style={styles.tableWrap}>
          <Table
            bordered
            style={{paddingTop: '10px'}}
            rowSelection={rowSelection}
            dataSource={this.state.dataSource}
            columns={columns}
            pagination={{
              showQuickJumper: true
            }}
            rowKey='id'
          />
        </div>
      </ContentBox>
    )
  }
}

export default Main
