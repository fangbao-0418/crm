import React from 'react'
import { Tabs } from 'antd'
import Import from '@/modules/customer/Import'
import BaseInfo from '@/modules/customer/BaseInfo'
class Main extends React.Component {
  public callback () {
    console.log('11')
  }
  public render () {
    return (
      <div>
        <Tabs defaultActiveKey='1' onChange={this.callback}>
          <Tabs.TabPane tab='录入客资' key='1'>
            <BaseInfo />
          </Tabs.TabPane>
          <Tabs.TabPane tab='导入客资' key='2'>
            <Import />
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  }
}
export default Main
