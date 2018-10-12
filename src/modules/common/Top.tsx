import React from 'react'
import { Layout, Dropdown, Menu } from 'antd'
// 消息提醒
import Msg from '@/modules/message/services/message.tsx'

const { Header } = Layout
const styles = require('@/stylus/top')
class Main extends React.Component {
  public msg: any
  public state = {
    msgCount: 0,
    collapsed: false
  }
  public componentWillMount () {
    // 消息初始化
    this.msg = Msg({}).connect()
    // 交互：获取到已读消息数
    this.msg.evAdd('service:get unreaded count data', (data: any) => {
      console.log('get unreaded count::', data)
      data = data ? data : 0
      this.setState({
        msgCount: data
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
  public render () {
    const menu = (
      <Menu>
        <Menu.Item>
          <span
            onClick={() => {
              APP.history.push('/logout')
            }}
          >
            注销
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
            西蒙船长
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
