import React from 'react'
import { Layout, Menu, Icon } from 'antd'
const SubMenu = Menu.SubMenu
const { Sider } = Layout
interface MenuItem {
  title: string
  path?: string
  icon?: JSX.Element
  children?: Array<MenuItem>
}
const styles = require('@/stylus/main')
class Main extends React.Component {
  public state = {
    collapsed: false
  }
  public configs: MenuItem[] = [
    {
      title: '商机管理',
      icon: <Icon type='user' />,
      path: '',
      children: [
        {
          title: '我的商机',
          path: '/business'
        },
        {
          title: '我的预约',
          path: '/appointment'
        }
      ]
    },
    {
      title: '公海管理',
      path: '',
      icon: <Icon type='user' />,
      children: [
        {
          title: '公海管理',
          path: '/open'
        }
      ]
    },
    {
      title: '客资管理',
      path: '',
      icon: <Icon type='user' />,
      children: [
        {
          title: '我的客资',
          path: '/customer'
        }
      ]
    },
    {
      title: '签约客户',
      path: '',
      icon: <Icon type='user' />,
      children: [
        {
          title: '签约客户',
          path: '/signed'
        }
      ]
    }
  ]
  public getMenuNodes (configs = this.configs, key = '') {
    const nodes: JSX.Element[] = []
    configs.forEach((item, index) => {
      key = [key, index].join('-')
      const path = item.path
      let Item
      if (item.children) {
        Item = (
          <SubMenu
            key={key}
            title={<span><Icon type='team' /><span>{item.title}</span></span>}
          >
            {this.getMenuNodes(item.children, key)}
          </SubMenu>
        )
      } else {
        Item = (
          <Menu.Item
            key={key}
            onClick={() => {
              if (path) {
                APP.history.push(path)
              }
            }}
          >
            {item.icon}
            <span
            >
              {item.title}
            </span>
          </Menu.Item>
        )
      }
      nodes.push(Item)
    })
    return nodes
  }
  public render () {
    return (
      <Sider
        className={styles.menu}
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}
      >
        <div className={styles.logo} />
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['1']}
        >
          {this.getMenuNodes()}
        </Menu>
      </Sider>
    )
  }
}
export default Main
