import React from 'react'
import { Button, Table, Divider, Modal, Form, Input, Tag } from 'antd'
import ContentBox from '@/modules/common/content'
import AddButton from '@/modules/common/content/AddButton'
import PermissionModal from './permission-modal'

const styles = require('./style')

interface State {
  tab: number, // tab切换
  mode: 'view' | 'modify' | 'add' // 弹窗模式
  visible: boolean // 弹窗是否显示
  dataSource: any[]
}

class Main extends React.Component {
  public state: State = {
    tab: 0,
    mode: 'add',
    visible: false,
    dataSource: [
      {
        id: 1,
        name: '111',
        children: [
          {
            id: '12',
            name: '111222'
          }
        ]
      },
      {
        id: 2,
        name: '222'
      }
    ]
  }

  // 切换tab
  public changeTab = (tab: number) => {
    this.setState({tab})
  }

  // 修改、添加权限
  public setPermission = (mode: 'view' | 'modify' | 'add') => {
    this.setState({visible: true, mode})
  }

  // 禁用权限
  public forbidPermission = () => {

  }

  // 删除权限
  public delPermission = () => {
    Modal.confirm({
      title: '删除权限',
      content: '确认删除权限吗？',
      onOk: () => {},
      onCancel: () => {}
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
        render: () => {
          return (
            <div>
              <a onClick={() => {this.setPermission('modify')}}>修改</a>
              <Divider type='vertical'/>
              <a onClick={() => {this.setPermission('add')}}>添加子页面权限</a>
              <Divider type='vertical'/>
              <a onClick={this.forbidPermission}>禁用</a>
              <Divider type='vertical'/>
              <a onClick={this.delPermission}>删除</a>
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
            <div className={this.state.tab === 0 ? styles.active : ''} onClick={() => {this.changeTab(0)}}>中心运营系统</div>
            <div className={this.state.tab === 1 ? styles.active : ''} onClick={() => {this.changeTab(1)}}>代理商系统</div>
            <div className={this.state.tab === 2 ? styles.active : ''} onClick={() => {this.changeTab(2)}}>工单系统</div>
            <div className={this.state.tab === 3 ? styles.active : ''} onClick={() => {this.changeTab(3)}}>CRM系统</div>
          </div>

          <div className={styles.contentWrap}>
            <Table
              pagination={false}
              dataSource={this.state.dataSource}
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
