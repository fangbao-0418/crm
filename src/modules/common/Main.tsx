import React from 'react'
import { Layout } from 'antd'
const { Content } = Layout
import Top from './Top'
import {
  Route,
  Switch
} from 'react-router-dom'
import Menu from './Menu'
import modules from '@/router/modules'
const styles = require('@/stylus/main')
export default class extends React.Component {
  public render () {
    console.log('main')
    return (
      <Layout className={styles.container}>
        <Menu />
        <Layout>
          <Top />
          <Content className={styles.content}>
            <Switch>
              <Route path='/' component={modules.Index} exact/>
              <Route path='/customer' component={modules.Customer} />
              <Route path='/business' component={modules.Business} />
              <Route path='/appointment' component={modules.Appointment} />
              <Route path='/signed' component={modules.Signed} />
              <Route path='/open' component={modules.Open} />
              <Route path='/set' component={modules.Set} />

              {/*权限管理*/}
              <Route path='/center-account' component={modules.CenterAccount}/>
              <Route path='/center-department' component={modules.CenterDepartment}/>
              <Route path='/center-permission' component={modules.CenterPermission}/>
              <Route path='/center-role' component={modules.CenterRole}/>
              <Route path='/agent-account' component={modules.AgentAccount}/>
              <Route path='/direct-account' component={modules.DirectAccount}/>

              {/* 消息 */}
              <Route path='/message/list' component={modules.MessageList}/>

              {/* 工单 */}
              <Route path='/workorder/list' component={modules.WorkorderList}/>
              <Route path='/workorder/show/:id' component={modules.WorkorderShow}/>

              {/* 外勤 */}
              <Route path='/outsite/task/list' component={modules.WorkorderList}/>
              <Route path='/outsite/task/form/:id' component={modules.WorkorderShow}/>
              <Route path='/outsite/tasktpl/list' component={modules.WorkorderList}/>
              <Route path='/outsite/tasktpl/form/:id' component={modules.WorkorderShow}/>
              <Route path='/outsite/tasktpl/sublist' component={modules.WorkorderList}/>
              <Route path='/outsite/tasktpl/subform/:id' component={modules.WorkorderShow}/>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}
