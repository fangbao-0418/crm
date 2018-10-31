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
    // {
    //   title: '商品管理',
    //   icon: <MenuIcon type='bussiness'/>,
    //   path: '/shop-admin/shop'
    // },
    // {
    //   title: '用户管理',
    //   icon: <MenuIcon type='bussiness'/>,
    //   path: '/shop-admin/user'
    // },
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
      hidden: !APP.hasPermission('bizbase_user'),
      icon: <MenuIcon type='center' />,
      path: '',
      children: [
        {
          title: '账号',
          hidden: !APP.hasPermission('bizbase_user_user_list'),
          path: '/center-account'
        },
        {
          title: '部门',
          hidden: !APP.hasPermission('bizbase_user_organization'),
          path: '/center-department'
        },
        {
          title: '权限',
          hidden: !APP.hasPermission('bizbase_user_authority'),
          path: '/center-permission'
        },
        {
          title: '角色',
          hidden: !APP.hasPermission('bizbase_user_role'),
          path: '/center-role'
        }
      ]
    },
    {
      title: '机构管理',
      path: '',
      hidden: !APP.hasPermission('bizbase_user_company'),
      icon: <MenuIcon type='organ' />,
      children: [
        {
          title: '机构管理',
          hidden: !APP.hasPermission('bizbase_user_company'),
          path: '/organ'
        }
      ]
    },
    {
      title: '用户管理',
      path: '',
      hidden: !APP.hasPermission('bizbase_user_customer'),
      icon: <MenuIcon type='user' />,
      children: [
        {
          title: '代理商用户',
          hidden: !APP.hasPermission('bizbase_user_agent'),
          path: '/user-manage/agent'
        },
        {
          title: '直营用户',
          hidden: !APP.hasPermission('bizbase_user_direct'),
          path: '/user-manage/direct'
        }
      ]
    },
    {
      title: '工单管理',
      hidden: !APP.hasPermission('track_work'),
      path: '',
      icon: <MenuIcon type='worker' />,
      children: [
        {
          title: '我的工单',
          hidden: !APP.hasPermission('track_work_order'),
          path: '/workorder/list'
        }
      ]
    },
    {
      title: '消息管理',
      hidden: !APP.hasPermission('notification_remind'),
      path: '',
      icon: <MenuIcon type='message' />,
      children: [
        {
          title: '我的消息',
          hidden: !APP.hasPermission('notification_remind'),
          path: '/message/list'
        }
      ]
    },
    {
      title: '任务管理',
      hidden: !APP.hasPermission('track_outside_task'),
      path: '',
      icon: <MenuIcon type='task' />,
      children: [
        {
          title: '外勤任务列表',
          hidden: !APP.hasPermission('track_outside_task_list'),
          path: '/outsite/task/list'
        },
        {
          title: '添加外勤任务',
          hidden: !APP.hasPermission('track_outside_task_add'),
          path: '/outsite/task/form'
        }
      ]
    },
    {
      title: '任务配置',
      hidden: !APP.hasPermission('track_outside_tasktemplate'),
      path: '',
      icon: <MenuIcon type='tasktpl' />,
      children: [
        {
          title: '其他任务配置',
          hidden: !APP.hasPermission('track_outside_tasktemplate_sub'),
          path: '/outsite/tasktpl/sublist'
        },
        {
          title: '通办任务配置',
          hidden: !APP.hasPermission('track_outside_tasktemplate_main'),
          path: '/outsite/tasktpl/list'
        }
      ]
    },
    {
      title: '绩效配置',
      hidden: !APP.hasPermission('track_outside_reward'),
      path: '',
      icon: <MenuIcon type='perform' />,
      children: [
        {
          title: '绩效配置',
          hidden: !APP.hasPermission('track_outside_reward_config'),
          path: '/outsite/perform/list'
        }
      ]
    },
    {
      title: '数据统计',
      hidden: !APP.hasPermission('track_outside_data'),
      path: '',
      icon: <MenuIcon type='data' />,
      children: [
        {
          title: '数据总览',
          hidden: !APP.hasPermission('track_outside_data_overview'),
          path: '/outsite/data-overview'
        },
        {
          title: '数据明细',
          hidden: !APP.hasPermission('track_outside_data_detail'),
          path: '/outsite/data-detail'
        }
      ]
    },
    {
      title: '配置中心',
      path: '/configure',
      hidden: !APP.hasPermission('config_dict'),
      icon: <MenuIcon type='configure' />
    },
    {
      title: '操作日志',
      path: '/operate-log',
      hidden: !APP.hasPermission('bizbase_log'),
      icon: <MenuIcon type='log' />
    }
  ]
  public componentWillMount () {
    if (!APP.homepage && window.location.pathname === '/') {
      this.toHome()
    }
  }
  public componentDidMount () {
    this.getActive()
  }
  public componentWillReceiveProps (props: Props) {
    if (this.props.location.pathname !== props.location.pathname) {
      this.getActive(props.location.pathname)
    }
  }
  public getActive (pathname = this.props.location.pathname) {
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
  public getFirstUrl () {
    let url = ''
    this.configs.find((item) => {
      if (item.hidden !== true) {
        if (item.path) {
          url = item.path
          return true
        } else {
          if (item.children) {
            return item.children.findIndex((item2) => {
              if (item2.hidden !== true) {
                url = item2.path
                return true
              }
            }) > -1
          }
        }
      }
    })
    // if (APP.env === 'production') {
    //   url = window.location.origin + url
    // } else {
    //   url = `#${url}`
    // }
    APP.homepage = url
    return APP.homepage
  }
  public toHome () {
    console.log('to home')
    APP.history.push(this.getFirstUrl())
    // parent.location.href = this.getFirstUrl()
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
                // APP.history.push(path)
                // if (APP.env === 'development') {
                if (APP.env === 'production') {
                  // parent.location.href = 'https://x-b.i-counting.cn' + path
                  parent.location.href = window.location.origin + path
                } else {
                  parent.location.href = `#${path}`
                }
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
        <div className={styles.top}>
          <div
            onClick={() => {
              this.toHome()
            }}
            className={styles.logo}
          />
        </div>
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
