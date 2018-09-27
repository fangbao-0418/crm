import React from 'react'
import { Input, Button, Table, Divider, Modal } from 'antd'
import ContentBox from '@/modules/common/content'
import AddButton from '@/modules/common/content/AddButton'
import AccountModal from './account-modal'

const styles = require('./style')
const Search = Input.Search

interface State {
  selectedRowKeys: any[]
  dataSource: any[]
  accountInfo: any
}

class Main extends React.Component {

  public state: State = {
    accountInfo: {},
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

  // 多选触发
  public onSelectChange = (selectedRowKeys: any) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({ selectedRowKeys })
  }

  // 查看、修改、添加账户
  public showAccountModal = (mode: 'view' | 'modify' | 'add', info?: any) => {
    this.setState({
      accountInfo: {...info, mode, visible: true}
    })
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
        render: (val: any, info: any) => {
          return (
            <div>
              <a onClick={() => {this.showAccountModal('view', info)}}>查看</a>
              <Divider type='vertical'/>
              <a onClick={() => {this.showAccountModal('modify', info)}}>修改</a>
              <Divider type='vertical'/>
              <a onClick={this.delConfirm}>删除</a>
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
      <ContentBox
        title='账号'
        rightCotent={(
          <AddButton
            title='添加账号'
            onClick={() => {this.showAccountModal('add')}}
          />
        )}
      >

        <div className={styles.topWarp}>
          <Search
            className={styles.search}
            placeholder='请输入姓名'
            onSearch={(value) => {
              console.log(value)
            }}
          />
          <Search
            className={styles.search}
            placeholder='请输入手机号'
            onSearch={(value) => {
              console.log(value)
            }}
          />
          <Search
            className={styles.search}
            placeholder='请输入部门名称'
            onSearch={(value) => {
              console.log(value)
            }}
          />
        </div>

        <div style={styles.tableWrap}>
          <Table
            bordered
            rowSelection={rowSelection}
            dataSource={this.state.dataSource}
            columns={columns}
            pagination={{
              showQuickJumper: true
            }}
            rowKey='id'
          />
        </div>

        {
          this.state.dataSource.length === 0
          || <Button
            type='primary'
            disabled={!this.state.selectedRowKeys.length}
            className={styles.delBtn}
            onClick={this.delConfirm}
          >
            批量删除
          </Button>
        }

        <AccountModal
          info={this.state.accountInfo}
          onOk={(val: any) => {
            console.log(445, val)
          }}
          onCancel={() => {
            this.setState({accountInfo: {...this.state.accountInfo, visible: false}})
          }}
        />
      </ContentBox>
    )
  }
}

export default Main
