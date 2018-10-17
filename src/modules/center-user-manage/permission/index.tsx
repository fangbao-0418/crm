import React from 'react'
import { Button, Table, Divider, Modal, Form, Input, Tag } from 'antd'
import ContentBox from '@/modules/common/content'
import AddButton from '@/modules/common/content/AddButton'
import PermissionModal from './permission-modal'
import { fetchPermissionList, toggleForbidPermission, delPermission, addPermission, modifyPermission } from './api'

const styles = require('./style')

interface State {
  tab: number, // tab切换
  mode: 'view' | 'modify' | 'add' // 弹窗模式
  visible: boolean // 弹窗是否显示
  currentId: number // 当前选中权限id
  itemInfo: any // 当前选中权限信息
  permissionList: any[] // 权限列表
}

interface Info {
  name: string,
  url: string,
  code: string,
  button: any[]
}

class Main extends React.Component {
  public state: State = {
    tab: 0,
    mode: 'add',
    visible: false,
    currentId: 0,
    itemInfo: null,
    permissionList: []
  }

  public componentWillMount () {
    this.getPermissionList()
  }

  // 获取权限列表
  public getPermissionList () {
    fetchPermissionList()
      .then((res) => {
        this.filterNoData(res)
        this.setState({permissionList: res})
      })
  }

  // 切换tab
  public changeTab = (tab: number) => {
    this.setState({tab})
  }

  // 修改、添加权限
  public setPermission = (mode: 'view' | 'modify' | 'add', currentId: number, itemInfo: any) => {
    this.setState({visible: true, mode, currentId, itemInfo})
  }

  // 禁用、启用权限
  public forbidPermission = (id: number, status: 0 | 1) => {
    toggleForbidPermission(id, status)
      .then((res) => {
        this.getPermissionList()
      })
  }

  // 删除权限
  public delPermission = (id: number) => {
    Modal.confirm({
      title: '删除权限',
      content: '确认删除权限吗？',
      onOk: () => {
        delPermission(id)
          .then((res) => {
            this.getPermissionList()
          })
          .catch((err: any) => {
            APP.error(err.responseJSON.errors[0].message)
          })
      },
      onCancel: () => {}
    })
  }

  // 渲染tab切换栏
  public renderTab () {
    return this.state.permissionList.map((item, index) => {
      return (
        <div
          key={item.id}
          className={this.state.tab === index ? styles.active : ''}
          onClick={() => {this.changeTab(index)}}
        >
          {item.name}
        </div>
      )
    })
  }

  // 过滤空的权限信息，防止没有子权限还会有展开的加号
  public filterNoData (data: any) {
    function del (list: any[]) {
      list.forEach((item: any) => {
        if (item.authorityResponseList) {
          if (item.authorityResponseList.length === 0) {
            delete item.authorityResponseList
          } else {
            del(item.authorityResponseList)
          }
        }
      })
    }
    del(data)
  }

  // 新增权限
  public addPermission (val: Info) {
    const {name, code, url, button} = val
    const {currentId, permissionList, tab} = this.state
    const payload = {
      name,
      code,
      url,
      buttonList: button,
      parentId: currentId,
      systemCode: permissionList[tab].id
    }
    addPermission(payload).then((res) => {
      this.setState({visible: false})
      this.getPermissionList()
    })
  }

  // 修改权限
  public modifyPermission (val: Info) {
    const {currentId} = this.state
    const {name, code, url, button} = val
    const payload = {
      name,
      code,
      url,
      buttonList: button
    }
    modifyPermission(currentId, payload).then((res) => {
      this.setState({visible: false})
      this.getPermissionList()
    })
  }

  public render () {
    const {permissionList, tab, currentId, mode, visible} = this.state
    const columns = [
      {
        title: '权限名称',
        dataIndex: 'name'
      },
      {
        title: '操作',
        render: (val: any, itemInfo: any) => {
          const {status, id} = itemInfo
          return (
            <div>
              {
                status === 0
                ? <div>
                    <a onClick={() => {this.setPermission('modify', id, itemInfo)}}>修改</a>
                    <Divider type='vertical'/>
                    <a onClick={() => {this.setPermission('add', id, {})}}>添加子页面权限</a>
                    <Divider type='vertical'/>
                    <a onClick={() => {this.forbidPermission(id, 1)}}>禁用</a>
                    <Divider type='vertical'/>
                    <a onClick={() => {this.delPermission(id)}}>删除</a>
                  </div>
                : <div>
                    <span className={styles.disable}>修改</span>
                    <Divider type='vertical'/>
                    <span className={styles.disable}>添加子页面权限</span>
                    <Divider type='vertical'/>
                    <a onClick={() => {this.forbidPermission(id, 0)}}>已禁用</a>
                    <Divider type='vertical'/>
                    <span className={styles.disable}>删除</span>
                  </div>
              }
            </div>
          )
        }
      }
    ]
    return (
      <ContentBox
        title='权限'
        rightCotent={(
          <AddButton
            title='添加页面权限'
            onClick={() => {this.setPermission('add', 0, {})}} // 添加根级权限时id传0
          />
        )}
      >
        <div className={styles.wrap}>

          <div className={styles.tabWrap}>
            {this.renderTab()}
          </div>

          <div className={styles.contentWrap}>
            <Table
              pagination={false}
              childrenColumnName='authorityResponseList'
              dataSource={permissionList.length ? permissionList[tab].authorityResponseList : []}
              columns={columns}
              rowKey='id'
            />
          </div>

        </div>

        {
          visible &&
          <PermissionModal
            mode={mode}
            id={currentId}
            info={this.state.itemInfo}
            systemCode={permissionList[tab].id}
            onOk={(val) => {
              if (mode === 'add') {
                this.addPermission(val)
              } else {
                this.modifyPermission(val)
              }
            }}
            onCancel={() => {this.setState({visible: false})}}
          />
        }

      </ContentBox>
    )
  }
}

export default Main
