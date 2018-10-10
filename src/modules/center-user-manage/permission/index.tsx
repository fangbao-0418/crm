import React from 'react'
import { Button, Table, Divider, Modal, Form, Input, Tag } from 'antd'
import ContentBox from '@/modules/common/content'
import AddButton from '@/modules/common/content/AddButton'
import PermissionModal from './permission-modal'
import { fetchPermissionList, toggleForbidPermission, delPermission } from './api'

const styles = require('./style')

interface State {
  tab: number, // tab切换
  mode: 'view' | 'modify' | 'add' // 弹窗模式
  visible: boolean // 弹窗是否显示
  permissionList: any[] // 权限列表
}

class Main extends React.Component {
  public state: State = {
    tab: 0,
    mode: 'add',
    visible: false,
    permissionList: []
  }

  public componentWillMount () {
    this.getPermissionList()
  }

  // 获取权限列表
  public getPermissionList () {
    fetchPermissionList()
      .then((res) => {
        this.setState({permissionList: res})
      })
  }

  // 切换tab
  public changeTab = (tab: number) => {
    this.setState({tab})
  }

  // 修改、添加权限
  public setPermission = (mode: 'view' | 'modify' | 'add') => {
    this.setState({visible: true, mode})
  }

  // 禁用、启用权限
  public forbidPermission = (id: number, status: 0 | 1) => {
    const updateUser = 111 // todo 改为登陆id
    toggleForbidPermission(id, updateUser, status)
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
        const updateUser = 111 // todo 改为登陆id
        delPermission(id, updateUser)
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
          key={item.systemCode}
          className={this.state.tab === index ? styles.active : ''}
          onClick={() => {this.changeTab(index)}}
        >
          {item.systemName}
        </div>
      )
    })
  }

  public render () {
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
                    <a onClick={() => {this.setPermission('modify')}}>修改</a>
                    <Divider type='vertical'/>
                    <a onClick={() => {this.setPermission('add')}}>添加子页面权限</a>
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
            onClick={() => {this.setPermission('add')}}
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
              childrenColumnName='authorityList'
              dataSource={this.state.permissionList.length ? this.state.permissionList[this.state.tab].authorityResponseList : []}
              columns={columns}
            />
          </div>

        </div>

        {
          this.state.visible &&
          <PermissionModal
            mode={this.state.mode}
            info={{
              name: '3344',
              code: 333,
              option: [{label: '22', value: '333'}]
            }}
            onOk={() => {}}
            onCancel={() => {this.setState({visible: false})}}
          />
        }

      </ContentBox>
    )
  }
}

export default Main
