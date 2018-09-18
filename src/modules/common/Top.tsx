import React from 'react'
import { Layout, Icon } from 'antd'
const { Header } = Layout
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
      <Header style={{ background: '#fff', padding: 0 }}>
        {/* <Icon
          className='trigger'
          type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        /> */}
      </Header>
    )
  }
}
export default Main
