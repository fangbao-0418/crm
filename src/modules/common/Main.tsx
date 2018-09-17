import React from 'react'
import { Layout, Icon } from 'antd'
const { Header, Content } = Layout
import {
  Route,
  Switch
} from 'react-router-dom'
import Menu from './Menu'
import modules from '@/router/modules'
const styles = require('@/stylus/main')
export default class extends React.Component {
  public state = {
    collapsed: false
  }
  public toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  public render () {
    console.log('main')
    return (
      <Layout className={styles.container}>
        <Menu />
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className='trigger'
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <Switch>
              <Route path='/' component={modules.Index} exact/>
              <Route path='/customer' component={modules.Customer} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}
