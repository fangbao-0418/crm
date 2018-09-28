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
    },
    {
      title: '客户设置',
      path: '',
      icon: <Icon type='user' />,
      children: [
        {
          title: '客户设置',
          path: '/set'
        }
      ]
    },
    {
      title: '中心用户管理',
      icon: <Icon type='user' />,
      path: '',
      children: [
        {
          title: '账号',
          path: '/center-account'
        },
        {
          title: '部门',
          path: '/center-department'
        },
        {
          title: '权限',
          path: '/center-permission'
        },
        {
          title: '角色',
          path: '/center-role'
        }
      ]
    },
    {
      title: '机构管理',
      path: '',
      icon: <Icon type='user' />,
      children: [
        {
          title: '机构管理',
          path: '/agency-manage'
        }
      ]
    },
    {
      title: '用户管理',
      path: '',
      icon: <Icon type='user' />,
      children: [
        {
          title: '代理商账号',
          path: '/agent-account'
        },
        {
          title: '直营账号',
          path: '/direct-account'
        }
      ]
    },
    {
      title: '工单管理',
      path: '',
      icon: <Icon type='user' />,
      children: [
        {
          title: '我的工单',
          path: '/workorder/list'
        }
      ]
    },
    {
      title: '消息管理',
      path: '',
      icon: <Icon type='user' />,
      children: [
        {
          title: '我的消息',
          path: '/message/list'
        }
      ]
    },
    {
      title: '任务管理',
      path: '',
      icon: <Icon type='user' />,
      children: [
        {
          title: '外勤任务列表',
          path: '/outsite/task/list'
        },
        {
          title: '添加外勤任务',
          path: '/outsite/task/form'
        }
      ]
    },
    {
      title: '任务配置',
      path: '',
      icon: <Icon type='user' />,
      children: [
        {
          title: '其他任务配置',
          path: '/outsite/tasktpl/list'
        },
        {
          title: '通办任务配置',
          path: '/outsite/tasktpl/sublist'
        }
      ]
    },
    {
      title: '绩效配置',
      path: '',
      icon: <Icon type='user' />,
      children: [
        {
          title: '绩效配置',
          path: '/outsite/task/list'
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
