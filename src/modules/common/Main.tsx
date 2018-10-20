import React from 'react'
import { Layout } from 'antd'
import { fetchEnum } from './api'
const { Content } = Layout
import { connect } from 'react-redux'
import Top from './Top'
import {
  Route,
  Switch
} from 'react-router-dom'
import Left from '@/modules/common/left'
import modules from '@/router/modules'
import { fetchUserInfo } from './api'
const styles = require('@/stylus/main')
class Main extends React.Component {
  public componentWillMount () {
    fetchUserInfo()
    fetchEnum().then(() => {
      this.forceUpdate()
    })
  }
  public render () {
    console.log(APP.user, 'user')
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
              <Route path='/customer' component={modules.Customer} />
              <Route path='/business' component={modules.Business} />
              <Route path='/appointment' component={modules.Appointment} />
              <Route path='/signed' component={modules.Signed} />
              <Route path='/open' component={modules.Open} />
              <Route path='/customer-set/index' component={modules.CustomerSet} />
              <Route path='/customer-set/assign' component={modules.CustomerSetAssign} />

              {/*权限管理*/}
              <Route path='/center-account' component={modules.CenterAccount}/>
              <Route path='/center-department' component={modules.CenterDepartment}/>
              <Route path='/center-permission' component={modules.CenterPermission}/>
              <Route path='/center-role' component={modules.CenterRole}/>
              <Route path='/organ' component={modules.Organ}/>
              <Route path='/user-manage/:type' component={modules.UserManage}/>

              {/* 消息 */}
              <Route path='/message/list' component={modules.MessageList}/>

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
              <Route path='/configure' component={modules.Configure}/>
              {/* 操作日志 */}
              <Route path='/operate-log' component={modules.OperateLog} exact />
              <Route path='/operate-log/detail/:id' component={modules.OperateLogDetail}/>
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
