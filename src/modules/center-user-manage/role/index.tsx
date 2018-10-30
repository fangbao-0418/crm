import React from 'react'
import { Button, Table, Divider, Modal } from 'antd'
import ContentBox from '@/modules/common/content'
import AddButton from '@/modules/common/content/AddButton'
import RoleModal from './role-modal'
import ModalShow from 'pilipa/libs/modal'
import { fetchRoleList, toggleForbidRole, delRole, modifyRole, addRole } from './api'

const styles = require('./style')

interface State {
  tab: 'System' | 'Agent' | 'DirectCompany' // 切换类型  直营中心 | 代理商 | 直营公司
  selectedRowKeys: any[] // 选中项索引
  mode: 'view' | 'modify' | 'add' // 弹窗模式
  visible: boolean // 弹窗是否显示
  pageCurrent: number // 当前页
  pageSize: number // 一页容量
  pageTotal: number // 总数
  currentRoleId: number // 当前角色id
  dataSource: any[] // 数据源
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
    this.setState({selectedRowKeys: []})
    fetchRoleList(pageCurrent, pageSize, tab).then((res) => {
      this.setState({
        dataSource: res.records,
        pageTotal: res.pageTotal
      })
    })
  }

  // 确认删除
  public delConfirm = (type: 'batch' | 'single', id?: number) => {

    Modal.confirm({
      title: '删除角色',
      content: '确定删除角色吗？',
      onOk: () => {
        let ids
        type === 'batch' ? ids = this.getSelectIDs(this.state.dataSource) : ids = [id]
        delRole({ids})
          .then(() => {
            this.getRoleList()
          })
          // .catch((err: any) => {
          //   APP.error(err.responseJSON.errors[0].message)
          // })
      },
      onCancel: () => {}
    })
  }

  // 根据selectedRowKeys索引值得到id
  public getSelectIDs (data: any[]) {
    const roleIds: any[] = []
    this.state.selectedRowKeys.forEach((item: any) => {
      roleIds.push(data[item].id)
    })
    return roleIds
  }

  // 确认禁用
  public forbidConfirm = (id: number) => {
    const modal = new ModalShow({
      content: (
        <div>你确定禁用此角色吗？</div>
      ),
      title: `禁用角色`,
      mask: true,
      onOk: () => {
        toggleForbidRole(id, 1).then((res) => {
          modal.hide()
          this.getRoleList()
        })
      },
      onCancel: () => {
        modal.hide()
      }
    })
    modal.show()
  }

  // 启用
  public unforbidRole = (id: number) => {
    const modal = new ModalShow({
      content: (
        <div>你确定启用此角色吗？</div>
      ),
      title: `启用角色`,
      mask: true,
      onOk: () => {
        toggleForbidRole(id, 0).then((res) => {
          modal.hide()
          this.getRoleList()
        })
      },
      onCancel: () => {
        modal.hide()
      }
    })
    modal.show()
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
                      <a hidden={!APP.hasPermission('bizbase_user_role_list')} onClick={() => {this.setRole('view', id)}}>查看</a>
                      <Divider type='vertical'/>
                      <a hidden={!APP.hasPermission('bizbase_user_role_edit')} onClick={() => {this.setRole('modify', id)}}>修改</a>
                      <Divider type='vertical'/>
                      <a hidden={!APP.hasPermission('bizbase_user_role_update_status')} onClick={() => {this.forbidConfirm(id)}}>禁用</a>
                      <Divider type='vertical'/>
                      <a hidden={!APP.hasPermission('bizbase_user_role_delete')} onClick={() => {this.delConfirm('single', id)}}>删除</a>
                    </div>
                  : <div>
                      <span hidden={!APP.hasPermission('bizbase_user_role_list')} className={styles.disable}>查看</span>
                      <Divider type='vertical'/>
                      <span hidden={!APP.hasPermission('bizbase_user_role_edit')} className={styles.disable}>修改</span>
                      <Divider type='vertical'/>
                      <a hidden={!APP.hasPermission('bizbase_user_role_update_status')} onClick={() => {this.unforbidRole(id)}}>已禁用</a>
                      <Divider type='vertical'/>
                      <span hidden={!APP.hasPermission('bizbase_user_role_delete')} className={styles.disable}>删除</span>
                    </div>

              }
            </div>
          )
        }
      }
    ]

    return (
      <ContentBox
        title='角色'
        rightCotent={(
          <AddButton
            hidden={!APP.hasPermission('bizbase_user_role_add')}
            title='添加角色'
            onClick={() => {this.setRole('add')}}
          />
        )}
      >
        <div className={styles.wrap}>

          <div className={styles.tabWrap}>
            <div className={this.state.tab === 'System' ? styles.active : ''} onClick={() => {this.changeTab('System')}}>中心</div>
            <div className={this.state.tab === 'Agent' ? styles.active : ''} onClick={() => {this.changeTab('Agent')}}>代理商</div>
            <div className={this.state.tab === 'DirectCompany' ? styles.active : ''} onClick={() => {this.changeTab('DirectCompany')}}>直营公司</div>
          </div>

          <div className={styles.contentWrap}>
            <Table
              dataSource={this.state.dataSource}
              columns={columns}
              rowSelection={{
                selectedRowKeys,
                onChange: (keys: any) => {
                  this.setState({ selectedRowKeys: keys })
                }
              }}
              pagination={{
                showQuickJumper: true,
                total: this.state.pageTotal,
                current: this.state.pageCurrent,
                onChange: (page, pageSize) => {
                  this.setState({pageCurrent: page}, () => {
                    this.getRoleList()
                  })
                },
                showTotal (total) {
                  return `共计 ${total} 条`
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
