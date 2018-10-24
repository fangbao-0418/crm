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
  hidden?: boolean
  children?: Array<MenuItem>
}
const styles = require('./style')
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
      hidden: !APP.hasPermission('crm_business'),
      children: [
        {
          title: '我的商机',
          path: '/business',
          hidden: !APP.hasPermission('crm_business_mine')
        },
        {
          title: '我的预约',
          path: '/appointment',
          hidden: !APP.hasPermission('crm_business_appointment')
        }
      ]
    },
    {
      title: '公海管理',
      path: '',
      icon: <MenuIcon type='open'/>,
      hidden: !APP.hasPermission('crm_sea'),
      children: [
        {
          title: '公海管理',
          path: '/open',
          hidden: !APP.hasPermission('crm_sea_manage')
        }
      ]
    },
    {
      title: '客资管理',
      path: '',
      icon: <MenuIcon type='customer'/>,
      hidden: !APP.hasPermission('crm_customer'),
      children: [
        {
          title: '我的客资',
          path: '/customer',
          hidden: !APP.hasPermission('crm_customer_list')
        }
      ]
    },
    {
      title: '签约客户',
      path: '',
      icon: <MenuIcon type='sign'/>,
      hidden: !APP.hasPermission('crm_sign'),
      children: [
        {
          title: '签约客户',
          path: '/signed',
          hidden: !APP.hasPermission('crm_sign_myself')
        }
      ]
    },
    {
      title: '客户设置',
      path: '',
      icon: <MenuIcon type='set' />,
      hidden: !APP.hasPermission('crm_set'),
      children: [
        {
          title: '客户设置',
          path: '/customer-set/index',
          hidden: !APP.hasPermission('crm_set_customer')
        },
        {
          title: '分客设置',
          path: '/customer-set/assign',
          hidden: !APP.hasPermission('crm_set_customer_diversion')
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
      icon: <MenuIcon type='organ' />,
      children: [
        {
          title: '机构管理',
          path: '/organ'
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
          path: '/user-manage/agent'
        },
        {
          title: '直营账号',
          path: '/user-manage/direct'
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
    },
    {
      title: '配置中心',
      path: '/configure',
      icon: <MenuIcon type='configure' />
    },
    {
      title: '操作日志',
      path: '/operate-log',
      icon: <MenuIcon type='log' />
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
            hidden={item.hidden}
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
            hidden={item.hidden}
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
    return (
      <Sider
        className={styles.container}
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}
      >
        <div className={styles.logo} />
        <div className={styles.menu}>
          <Menu
            theme='dark'
            mode='inline'
            selectedKeys={this.state.selectedKeys}
            openKeys={this.state.openKeys}
            // defaultSelectedKeys={['m-0-0']}
          >
            {this.getMenuNodes()}
          </Menu>
        </div>
      </Sider>
    )
  }
}
export default withRouter(Main)
