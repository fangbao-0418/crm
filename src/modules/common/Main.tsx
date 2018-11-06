import React from 'react'
import { connect } from 'react-redux'
import Route from '@/components/Route'
import Iframe from 'pilipa-terrace/libs/iframe'
import modules from '@/router/modules'
class Main extends React.Component<Common.Props> {
  public render () {
    return (
      <Iframe
        token={APP.token}
        onChange={(user) => {
          APP.user = user
        }}
      >
        {/* <Route path='/' component={modules.Index} exact/> */}
        {/*权限管理*/}
        <Route hidden={!APP.hasPermission('bizbase_user_user_list')} path='/center-account' component={modules.CenterAccount}/>
        <Route hidden={!APP.hasPermission('bizbase_user_organization')} path='/center-department' component={modules.CenterDepartment}/>
        <Route hidden={!APP.hasPermission('bizbase_user_authority')} path='/center-permission' component={modules.CenterPermission}/>
        <Route hidden={!APP.hasPermission('bizbase_user_role')} path='/center-role' component={modules.CenterRole}/>
        <Route hidden={!APP.hasPermission('bizbase_user_company')} path='/organ' component={modules.Organ}/>
        <Route hidden={!APP.hasPermission('bizbase_user_customer')} path='/user-manage/:type' component={modules.UserManage}/>
      </Iframe>
    )
  }
}
export default connect((state: Reducer.State) => {
  return state.common
})(Main)
