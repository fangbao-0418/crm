import React from 'react'
import ContentBox from '@/modules/common/content'
import AddButton from '@/modules/common/content/AddButton'
import Department from './department'
import DepartmentDetail from './department/detail'
import Account from './account'
import AccountDetail from './account/detail'
import Role from './role'
import RoleDetail from './role/detail'
import { Modal } from 'pilipa'
import { fetchDepartmentAction, fetchAccountListAction } from './action'
import { Tabs } from 'antd'
import { addDepartment, addAccount } from './api'
import { connect } from 'react-redux'
const TabPane = Tabs.TabPane
class Main extends React.Component<UserManage.Props> {
  public titles = {
    department: '添加一级部门',
    account: '添加账号',
    role: '添加角色'
  }
  public add () {
    let modal: any
    switch (this.props.tab) {
    case 'department':
      modal = new Modal({
        title: '添加部门',
        content: (
          <DepartmentDetail
            onOk={(value) => {
              addDepartment(
                {
                  name: value.name
                }
              ).then((res) => {
                fetchDepartmentAction()
              })
              modal.hide()
            }}
            onCancel={() => {
              modal.hide()
            }}
          />
        ),
        footer: null
      })
      break
    case 'account':
      modal = new Modal({
        title: '添加账号',
        content: (
          <AccountDetail
            item={{}}
            onOk={(values: UserManage.AccountItemProps) => {
              console.log(values, 'values')
              addAccount(values).then(() => {
                fetchAccountListAction()
              })
            }}
            onCancel={() => {
              modal.hide()
            }}
          />
        ),
        footer: null
      })
      break
    case 'role':
      modal = new Modal({
        title: '添加角色',
        content: (
          <RoleDetail
            onOk={() => {
              // addDepartment(
              //   {
              //     name: value.name
              //   }
              // ).then((res) => {
              //   fetchDepartmentAction()
              // })
              modal.hide()
            }}
            onCancel={() => {
              modal.hide()
            }}
          />
        ),
        footer: null
      })
      break
    }
    modal.show()
  }
  public callback (value: any) {
    APP.dispatch<UserManage.Props>({
      type: 'change user manage data',
      payload: {
        tab: value
      }
    })
  }
  public render () {
    const { tab } = this.props
    return (
      <div>
        <ContentBox
          title='代理商账号'
          rightCotent={(
            <AddButton
              title={this.titles[tab]}
              onClick={this.add.bind(this)}
            />
          )}
        >
          <div>
            <Tabs
              defaultActiveKey={this.props.tab}
              animated={false}
              onChange={this.callback.bind(this)}
            >
              <TabPane tab='部门' key='department'>
                <Department />
              </TabPane>
              <TabPane tab='账号' key='account'><Account /></TabPane>
              <TabPane tab='自定义角色' key='role'><Role /></TabPane>
            </Tabs>
          </div>
        </ContentBox>
      </div>
    )
  }
}

export default connect((state: Reducer.State) => {
  return state.userManage
})(Main)
