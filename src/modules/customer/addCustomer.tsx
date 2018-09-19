import React from 'react'
import { Tabs } from 'antd'
class Main extends React.Component {
  public callback () {
    console.log('11')
  }
  public render () {
    return (
      <div>
        <Tabs defaultActiveKey='1' onChange={this.callback}>
          <Tabs.TabPane tab='录入客资' key='1'>
            <div>111</div>
          </Tabs.TabPane>
          <Tabs.TabPane tab='倒入客资' key='2'>
            <div>222</div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  }
}
export default Main
