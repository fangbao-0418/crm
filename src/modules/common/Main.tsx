import React from 'react'
import { Layout } from 'antd'
import { fetchEnum } from './api'
const { Content } = Layout
import { connect } from 'react-redux'
import Top from './Top'
import {
  Switch
} from 'react-router-dom'
import Route from '@/components/Route'
import Left from '@/modules/common/left'
import modules from '@/router/modules'
import { fetchUserInfo } from './api'
const styles = require('@/stylus/main')
class Main extends React.Component<Common.Props> {
  public componentWillMount () {
    if (!APP.token) {
      APP.history.push('/login')
      return
    }
    fetchUserInfo()
    fetchEnum().then(() => {
      this.forceUpdate()
    })
  }
  public render () {
    if (APP.user === undefined) {
      return null
    }
    return (
      <Layout className={styles.container}>
        <Left />
        <Layout>
          <Top />
          <Content className={styles.content}>
            <Switch>
              {/*crm*/}
              <Route path='/' component={modules.Index} exact/>
              <Route hidden={!APP.hasPermission('crm_customer_list')} path='/customer' component={modules.Customer} />
              <Route hidden={!APP.hasPermission('crm_business_mine')} path='/business' component={modules.Business} />
              <Route hidden={!APP.hasPermission('crm_business_appointment')} path='/appointment' component={modules.Appointment} />
              <Route hidden={!APP.hasPermission('crm_sign_myself')} path='/signed' component={modules.Signed} />
              <Route hidden={!APP.hasPermission('crm_sea_manage')} path='/open' component={modules.Open} />
              <Route hidden={!APP.hasPermission('crm_set_customer')} path='/customer-set/index' component={modules.CustomerSet} />
              <Route hidden={!APP.hasPermission('crm_set_customer_diversion')} path='/customer-set/assign' component={modules.CustomerSetAssign} />

              {/*权限管理*/}
              <Route hidden={!APP.hasPermission('bizbase_user_user_list')} path='/center-account' component={modules.CenterAccount}/>
              <Route hidden={!APP.hasPermission('bizbase_user_organization')} path='/center-department' component={modules.CenterDepartment}/>
              <Route hidden={!APP.hasPermission('bizbase_user_authority')} path='/center-permission' component={modules.CenterPermission}/>
              <Route hidden={!APP.hasPermission('bizbase_user_role')} path='/center-role' component={modules.CenterRole}/>
              <Route hidden={!APP.hasPermission('bizbase_user_company')} path='/organ' component={modules.Organ}/>
              <Route hidden={!APP.hasPermission('bizbase_user_customer')} path='/user-manage/:type' component={modules.UserManage}/>

              {/* 消息 */}
              <Route hidden={!APP.hasPermission('notification_remind')} path='/message/list' component={modules.MessageList}/>

              {/* 工单 */}
              <Route path='/workorder/list' component={modules.WorkorderList}/>
              <Route path='/workorder/show/:id' component={modules.WorkorderShow}/>

              {/* 外勤 */}
              <Route path='/outsite/task/list' component={modules.TaskList}/>
              <Route path='/outsite/task/show/:id' component={modules.TaskShow}/>
              <Route path='/outsite/task/form' component={modules.TaskForm}/>
              <Route path='/outsite/tasktpl/list' component={modules.TasktplList}/>
              <Route path='/outsite/tasktpl/form/:id?' component={modules.TasktplForm}/>
              <Route path='/outsite/tasktpl/sublist' component={modules.TasktplSublist}/>
              <Route path='/outsite/tasktpl/subform/:id?' component={modules.TasktplSubform}/>
              <Route path='/outsite/perform/list' component={modules.PerformList}/>
              <Route path='/outsite/data-overview' component={modules.TaskDataOverview}/>
              <Route path='/outsite/data-detail' component={modules.TaskDataDetail}/>

              {/* 配置中心 */}
              <Route hidden={!APP.hasPermission('config_dict')} path='/configure' component={modules.Configure}/>
              {/* 操作日志 */}
              <Route path='/operate-log' component={modules.OperateLog} exact />
              <Route path='/operate-log/detail/:id' component={modules.OperateLogDetail}/>
              <Route component={modules.Unfound} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}
export default connect((state: Reducer.State) => {
  return state.common
})(Main)
