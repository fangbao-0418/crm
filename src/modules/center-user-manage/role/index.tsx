import React from 'react'
import { Button, Table, Divider, Modal } from 'antd'
import ContentBox from '@/modules/common/content'
import AddButton from '@/modules/common/content/AddButton'
import RoleModal from './role-modal'
import { fetchRoleList, toggleForbidRole, delRole, modifyRole, addRole } from './api'

const styles = require('./style')

interface State {
  tab: 'System' | 'Proxy'
  selectedRowKeys: any[]
  mode: 'view' | 'modify' | 'add'
  visible: boolean
  pageCurrent: number
  pageSize: number
  pageTotal: number
  currentRoleId: number
  dataSource: any[]
}

class Main extends React.Component {
  public state: State = {
    tab: 'System',
    selectedRowKeys: [],
    mode: 'add',
    visible: false,
    pageCurrent: 1,
    pageSize: 10,
    pageTotal: 0,
    currentRoleId: 0,
    dataSource: []
  }

  public componentWillMount () {
    this.getRoleList()
  }

  // 切换tab
  public changeTab = (tab: string) => {
    this.setState({tab, pageCurrent: 1}, () => {
      this.getRoleList()
    })
  }

  // 获取角色列表
  public getRoleList () {
    const {tab, pageCurrent, pageSize} = this.state
    fetchRoleList(pageCurrent, pageSize, tab).then((res) => {
      this.setState({
        dataSource: res.records,
        pageTotal: res.pageTotal
      })
    })
  }

  // 多选事件触发
  public onSelectChange = (selectedRowKeys: any) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({ selectedRowKeys })
  }

  // 确认删除
  public delConfirm = (type: 'batch' | 'single', id?: number) => {
    Modal.confirm({
      title: '删除账号',
      content: '确定删除账号吗？',
      onOk: () => {
        let ids
        type === 'batch' ? ids = this.state.selectedRowKeys : ids = [id]
        // todo updateUser要从全局获取
        delRole({ids, updateUser: 111111}).then(() => {
          this.getRoleList()
        })
      },
      onCancel: () => {}
    })
  }

  // 确认禁用
  public forbidConfirm = (id: number) => {
    Modal.confirm({
      title: '禁用角色',
      content: '确定禁用角色吗？',
      onOk: () => {
        const updateUser = 111 // todo 改为全局id
        toggleForbidRole(id, updateUser, 1).then((res) => {
          this.getRoleList()
        })
      },
      onCancel: () => {}
    })
  }

  // 启用
  public unforbidRole = (id: number) => {
    const updateUser = 111 // todo 改为全局id
    toggleForbidRole(id, updateUser, 0).then((res) => {
      this.getRoleList()
    })
  }

  // 修改、添加、查看角色
  public setRole = (mode: 'view' | 'modify' | 'add', id?: number) => {
    this.setState({
      visible: true,
      mode,
      currentRoleId: id || 0
    })
  }

  // 点击确认
  public onOk (info: any) {
    const {mode, currentRoleId} = this.state
    const updateUser = 111 // todo 改为登陆id
    info.updateUser = updateUser
    if (mode === 'add') {
      addRole(info)
        .then((res) => {
          this.setState({visible: false})
          this.getRoleList()
        })
    } else {
      modifyRole(info, currentRoleId)
        .then((res) => {
          this.setState({visible: false})
          this.getRoleList()
        })
    }
  }

  public render () {
    const { selectedRowKeys} = this.state
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'name'
      },
      {
        title: '操作',
        render: (val: any, record: any) => {
          const {id, name, roleType, status} = record
          return (
            <div>
              {
                status === 0
                  ? <div>
                      <a onClick={() => {this.setRole('view', id)}}>查看</a>
                      <Divider type='vertical'/>
                      <a onClick={() => {this.setRole('modify', id)}}>修改</a>
                      <Divider type='vertical'/>
                      <a onClick={() => {this.forbidConfirm(id)}}>禁用</a>
                      <Divider type='vertical'/>
                      <a onClick={() => {this.delConfirm('single', id)}}>删除</a>
                    </div>
                  : <div>
                      <span className={styles.disable}>查看</span>
                      <Divider type='vertical'/>
                      <span className={styles.disable}>修改</span>
                      <Divider type='vertical'/>
                      <a onClick={() => {this.unforbidRole(id)}}>已禁用</a>
                      <Divider type='vertical'/>
                      <span className={styles.disable}>删除</span>
                    </div>

              }
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
        title='角色'
        rightCotent={(
          <AddButton
            title='添加角色'
            onClick={() => {this.setRole('add')}}
          />
        )}
      >
        <div className={styles.wrap}>

          <div className={styles.tabWrap}>
            <div className={this.state.tab === 'System' ? styles.active : ''} onClick={() => {this.changeTab('System')}}>系统角色</div>
            <div className={this.state.tab === 'Proxy' ? styles.active : ''} onClick={() => {this.changeTab('Proxy')}}>代理商角色</div>
          </div>

          <div className={styles.contentWrap}>
            <Table
              dataSource={this.state.dataSource}
              columns={columns}
              rowSelection={rowSelection}
              pagination={{
                showQuickJumper: true,
                total: this.state.pageTotal,
                current: this.state.pageCurrent,
                onChange: (page, pageSize) => {
                  this.setState({pageCurrent: page}, () => {
                    this.getRoleList()
                  })
                }
              }}
            />

            {
              this.state.dataSource.length === 0
              || <Button
                type='primary'
                disabled={!this.state.selectedRowKeys.length}
                className={styles.delBtn}
                onClick={() => {this.delConfirm('batch')}}
              >
                批量删除
              </Button>
            }

            {
              this.state.visible &&
              <RoleModal
                mode={this.state.mode}
                tab={this.state.tab}
                currentRoleId={this.state.currentRoleId}
                onOk={(info: any) => {this.onOk(info)}}
                onCancel={() => {
                  this.setState({visible: false})
                }}
              />
            }

          </div>
        </div>
      </ContentBox>
    )
  }
}

export default Main
