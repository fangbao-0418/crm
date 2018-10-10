import React from 'react'
import { Layout, Menu } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router'
import MenuIcon from './Icon'
const SubMenu = Menu.SubMenu

const { Sider } = Layout
interface MenuItem {
  title: string
  path?: string
  icon?: JSX.Element
  children?: Array<MenuItem>
}
const styles = require('@/stylus/main')
type Props = RouteComponentProps
interface State {
  collapsed: boolean
  selectedKeys: string[]
  openKeys: string[]
}
class Main extends React.Component<Props, State> {
  public state: State = {
    collapsed: false,
    selectedKeys: [],
    openKeys: []
  }
  public pathInfo: {[key: string]: string} = {}
  public configs: MenuItem[] = [
    {
      title: '商机管理',
      icon: <MenuIcon type='bussiness'/>,
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
      icon: <MenuIcon type='open'/>,
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
      icon: <MenuIcon type='customer'/>,
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
      icon: <MenuIcon type='sign'/>,
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
      icon: <MenuIcon type='set' />,
      children: [
        {
          title: '客户设置',
          path: '/customer-set/index'
        },
        {
          title: '分客设置',
          path: '/customer-set/assign'
        }
      ]
    },
    {
      title: '中心用户管理',
      icon: <MenuIcon type='center' />,
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
      icon: <MenuIcon type='agency' />,
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
      icon: <MenuIcon type='user' />,
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
      icon: <MenuIcon type='worker' />,
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
      icon: <MenuIcon type='message' />,
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
      icon: <MenuIcon type='task' />,
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
      icon: <MenuIcon type='tasktpl' />,
      children: [
        {
          title: '其他任务配置',
          path: '/outsite/tasktpl/sublist'
        },
        {
          title: '通办任务配置',
          path: '/outsite/tasktpl/list'
        }
      ]
    },
    {
      title: '绩效配置',
      path: '',
      icon: <MenuIcon type='perform' />,
      children: [
        {
          title: '绩效配置',
          path: '/outsite/perform/list'
        }
      ]
    },
    {
      title: '数据统计',
      path: '',
      icon: <MenuIcon type='data' />,
      children: [
        {
          title: '数据总览',
          path: '/outsite/data-overview'
        },
        {
          title: '数据明细',
          path: '/outsite/data-detail'
        }
      ]
    }
  ]
  public componentDidMount () {
    const pathname = this.props.location.pathname
    let selectedKey = ''
    for (const key in this.pathInfo) {
      if (this.pathInfo[key] === pathname) {
        selectedKey = key
      }
    }
    this.setState({
      openKeys: [selectedKey.substr(0, selectedKey.length - 2)],
      selectedKeys: [selectedKey]
    })
  }
  public getMenuNodes (configs = this.configs, prefKey = 'm') {
    const nodes: JSX.Element[] = []
    configs.forEach((item, index) => {
      const key = [prefKey, index].join('-')
      const path = item.path
      this.pathInfo[key] = path
      let Item
      if (item.children) {
        Item = (
          <SubMenu
            key={key}
            title={<span>{item.icon}<span>{item.title}</span></span>}
            onTitleClick={() => {
              this.setState({
                openKeys: [key]
              })
            }}
          >
            {this.getMenuNodes(item.children, key)}
          </SubMenu>
        )
      } else {
        Item = (
          <Menu.Item
            key={key}
            onClick={(menuitem: {key: string}) => {
              console.log(menuitem)
              if (path) {
                this.setState({
                  openKeys: [prefKey],
                  selectedKeys: [menuitem.key]
                })
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
    console.log(this.state.selectedKeys)
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
          selectedKeys={this.state.selectedKeys}
          openKeys={this.state.openKeys}
          // defaultSelectedKeys={['m-0-0']}
        >
          {this.getMenuNodes()}
        </Menu>
      </Sider>
    )
  }
}
export default withRouter(Main)
