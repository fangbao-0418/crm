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
import {
  fetchDepartmentAction,
  fetchAccountListAction,
  fetchRoleListAction,
  fetchCompanyListAction
} from './action'
import { Tabs } from 'antd'
import { addDepartment, addAccount, addRole } from './api'
import { connect } from 'react-redux'
const TabPane = Tabs.TabPane
interface Props extends UserManage.Props {
  type: UserManage.TypeProps
}
class Main extends React.Component<Props> {
  public type = this.props.type
  public titles = {
    department: '添加一级部门',
    account: '添加账号',
    role: '添加角色'
  }
  public componentWillMount () {
    fetchCompanyListAction(this.type)
  }
  public add () {
    if (!this.props.companyCode) {
      APP.error('请选择公司！')
      return
    }
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
                  companyId: this.props.companyCode,
                  name: value.name,
                  organizationType: this.type
                }
              ).then((res) => {
                fetchDepartmentAction(this.props.companyCode, this.type)
                modal.hide()
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
    case 'account':
      modal = new Modal({
        title: '添加账号',
        content: (
          <AccountDetail
            item={{
              companyName: this.props.companyName
            }}
            type={this.type}
            companyCode={this.props.companyCode}
            onOk={(values: UserManage.AccountItemProps) => {
              values.companyId = this.props.companyCode
              values.userType = this.type
              console.log(this.props, 'props')
              addAccount(values).then(() => {
                fetchAccountListAction(this.props.account.searchPayload)
                modal.hide()
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
            type={this.type}
            onOk={(value) => {
              value.roleType = this.type
              value.companyId = this.props.companyCode
              addRole(value).then(() => {
                fetchRoleListAction({
                  pageCurrent: 1,
                  roleType: this.type,
                  companyId: this.props.companyCode
                })
                modal.hide()
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
    console.log(this.props.account, 'render')
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
                <Department type={this.type} />
              </TabPane>
              <TabPane tab='账号' key='account'>
                <Account type={this.type} />
              </TabPane>
              <TabPane tab='自定义角色' key='role'>
                <Role type={this.type} />
              </TabPane>
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
