import React from 'react'
import { Input, Button, Table, Divider, Modal } from 'antd'
import ContentBox from '@/modules/common/content'
import AddButton from '@/modules/common/content/AddButton'
import AccountModal from './account-modal'
import { fetchAccountList, delAccount, addAccount, modifyAccount, fetchRegionList } from './api'

const styles = require('./style')
const Search = Input.Search

interface State {
  pageTotal: number // 数据条数
  selectedRowKeys: number[] // 选中账号
  mode: 'view' | 'modify' | 'add' // 弹窗的模式
  visible: boolean // 弹窗是否显示
  itemInfo: any // 选中项信息
  dataSource: any[] // 表格数据
}

class Main extends React.Component {

  public searchVal = {
    pageCurrent: 1,
    pageSize: 10,
    name: '',
    phone: '',
    organizationName: '',
    userType: 'System'
  }

  public state: State = {
    pageTotal: 0,
    selectedRowKeys: [],
    mode: 'add',
    visible: false,
    itemInfo: {},
    dataSource: []
  }

  public componentWillMount () {
    this.getList()
  }

  // 点击确认按钮
  public onOk (val: any) {
    const {mode, itemInfo} = this.state
    const {center, department, email, identity, name, phone, region, resource, role} = val
    const payload = {
      name,
      phone,
      email,
      organizationId: department,
      roleId: role,
      adjustAccountId: center,
      acceptType: resource,
      identity,
      regionList: region,
      userType: 'System'
    }
    if (mode === 'add') {
      addAccount(payload)
        .then((res) => {
          this.setState({visible: false})
          this.getList()
        })
        // .catch((err: any) => {
        //   APP.error(err.responseJSON.errors[0].message)
        // })
    } else {
      modifyAccount(payload, itemInfo.id)
        .then((res) => {
          this.setState({visible: false})
          this.getList()
        })
    }
  }

  // 获取数据列表
  public getList () {
    fetchAccountList(this.searchVal).then((res) => {
      this.setState({
        dataSource: res.records,
        pageTotal: res.pageTotal
      })
    })
  }

  // 多选触发
  public onSelectChange = (selectedRowKeys: any) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({ selectedRowKeys })
  }

  // 查看、修改、添加账户
  public showAccountModal = (mode: 'view' | 'modify' | 'add', itemInfo?: any) => {
    itemInfo = itemInfo || {}
    this.setState({mode, itemInfo, visible: true})
  }

  // 确认删除
  public delConfirm = (type: 'batch' | 'single', id?: number) => {
    Modal.confirm({
      title: '删除账号',
      content: '确定删除账号吗？',
      onOk: () => {
        let ids
        type === 'batch' ? ids = this.state.selectedRowKeys : ids = [id]
        delAccount({ids}).then(() => {
          this.getList()
        })
      }
    })
  }

  public render () {
    const { selectedRowKeys, itemInfo, mode } = this.state
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
              <a onClick={() => this.delConfirm('single', info.id)}>删除</a>
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
            onClick={() => this.showAccountModal('add')}
          />
        )}
      >

        <div className={styles.topWarp}>
          <Search
            className={styles.search}
            placeholder='请输入姓名'
            onSearch={(value) => {
              this.searchVal = {...this.searchVal, name: value, phone: '', organizationName: ''}
              this.getList()
            }}
          />
          <Search
            className={styles.search}
            placeholder='请输入手机号'
            onSearch={(value) => {
              this.searchVal = {...this.searchVal, name: '', phone: value, organizationName: ''}
              this.getList()
            }}
          />
          <Search
            className={styles.search}
            placeholder='请输入部门名称'
            onSearch={(value) => {
              this.searchVal = {...this.searchVal, name: '', phone: '', organizationName: value}
              this.getList()
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
              showQuickJumper: true,
              total: this.state.pageTotal,
              onChange: (page, pageSize) => {
                this.searchVal = {...this.searchVal, pageCurrent: page, pageSize}
                this.getList()
              },
              showTotal (total) {
                return `共计 ${total} 条`
              }
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
            onClick={() => this.delConfirm('batch')}
          >
            批量删除
          </Button>
        }

        {
          this.state.visible &&
          <AccountModal
            info={itemInfo}
            mode={mode}
            onOk={(val: any) => {this.onOk(val)}}
            onCancel={() => {
              this.setState({visible: false})
            }}
          />
        }
      </ContentBox>
    )
  }
}

export default Main
