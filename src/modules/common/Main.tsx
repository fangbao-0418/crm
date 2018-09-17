import React from 'react'
import { Layout, Menu, Icon } from 'antd'
const { Header, Sider, Content } = Layout
import {
  Route,
  Switch
} from 'react-router-dom'
import modules from '@/router/modules'
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
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className='logo' />
          <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
            <Menu.Item key='1' onClick={() => APP.history.push('/')}>
              <Icon type='user' />
              <span
              >
                首页
              </span>
            </Menu.Item>
            <Menu.Item key='2' onClick={() => APP.history.push('/customer')}>
              <Icon type='video-camera' />
              <span>
                我的客资
              </span>
            </Menu.Item>
            <Menu.Item key='3'>
              <Icon type='upload' />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
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
