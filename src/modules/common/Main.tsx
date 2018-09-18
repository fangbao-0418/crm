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
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}
