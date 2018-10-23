import React from 'react'
import { Layout, Dropdown, Menu } from 'antd'
// 消息提醒
import Msg from '@/modules/message/services/message.tsx'
import { companylist, bindCompany } from './api'
const { Header } = Layout
const styles = require('@/stylus/top')
interface State {
  msgCount: number
  collapsed: boolean
  companyList: Array<{companyName: string, companyId: string}>
}
class Main extends React.Component<{}, State> {
  public msg: any
  public state: State = {
    msgCount: 0,
    collapsed: false,
    companyList: []
  }
  public componentWillMount () {
    // 消息初始化
    this.msg = Msg({}).connect()
    // 交互：获取到已读消息数
    this.msg.evAdd('service:get unreaded count data', (data: number) => {
      data = data ? data : 0
      this.setState({
        msgCount: data
      })
    })
    companylist(APP.token).then((res) => {
      this.setState({
        companyList: res
      })
    })
  }
  // 设置右上角消息提醒
  public msgAlert () {

  }
  public toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  public switchCompany (code: string) {
    bindCompany({
      token: APP.token,
      companyId: code
    }).then(() => {
      APP.dispatch<Common.Props>({
        type: 'change main display status',
        payload: {
          visible: false
        }
      })
      APP.dispatch<Common.Props>({
        type: 'change main display status',
        payload: {
          visible: true
        }
      })
    })
  }
  public render () {
    const { companyList } = this.state
    const menu = (
      <Menu
        mode='inline'
        // style={{width: 00}}
      >
        {
          companyList.length > 1 && (
            <Menu.SubMenu title='切换公司'>
              {
                companyList.map((item) => {
                  return (
                    <Menu.Item
                      onClick={(val: {key: string}) => {
                        this.switchCompany(val.key)
                      }}
                      key={item.companyId}
                    >
                      <span>{item.companyName}</span>
                    </Menu.Item>
                  )
                })
              }
            </Menu.SubMenu>
          )
        }
        <Menu.Item
          onClick={() => {
            APP.history.push('/logout')
          }}
        >
          <span>
            退出
          </span>
        </Menu.Item>
      </Menu>
    )
    return (
      <Header className={styles.container}>
        {/* <Icon
          className='trigger'
          type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        /> */}
        <div
          className={styles['top-right']}
        >
          <span
            className={`icon ${styles.message}`}
            style={{
              backgroundImage: `url(${require('@/assets/images/message.png')})`,
              width: '18px',
              height: '20px',
              marginRight: '25px'
            }}
            onClick={() => {
              if (this.state.msgCount > 0) {
                this.msg.uiLogicLinkToList()
              }
            }}
          >
            <i className={styles.point} style={{visibility: this.state.msgCount ? 'visible' : 'hidden'}} />
          </span>
          <span
            className={styles.username}
            style={{
              marginRight: '15px'
            }}
          >
            {APP.user.username}
          </span>
          <Dropdown
            overlay={menu}
          >
            <span
              className='icon'
              style={{
                backgroundImage: `url(${require('@/assets/images/user-menu.png')})`,
                width: '18px',
                height: '18px'
              }}
            />
          </Dropdown>
        </div>
      </Header>
    )
  }
}
export default Main
