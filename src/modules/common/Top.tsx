import React from 'react'
import { Layout } from 'antd'
const { Header } = Layout
const styles = require('@/stylus/top')
class Main extends React.Component {
  public state = {
    collapsed: false
  }
  public toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  public render () {
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
            className='icon'
            style={{
              backgroundImage: `url(${require('@/assets/images/message.png')})`,
              width: '18px',
              height: '20px',
              marginRight: '25px'
            }}
          />
          <span
            className={styles.username}
            style={{
              marginRight: '15px'
            }}
          >
            西蒙船长
          </span>
          <span
            className='icon'
            style={{
              backgroundImage: `url(${require('@/assets/images/user-menu.png')})`,
              width: '18px',
              height: '18px'
            }}
          />
        </div>
      </Header>
    )
  }
}
export default Main
