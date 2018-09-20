import React from 'react'
import Profile from '@/modules/common/company-detail/Profile'
import Title from '@/modules/common/content/Title'
import { Tabs } from 'antd'
class Main extends React.Component {
  public callback () {
    console.log('11')
  }
  public render () {
    return (
      <div>
        <Profile />
        <Tabs defaultActiveKey='1' onChange={this.callback}>
          <Tabs.TabPane tab='客户信息' key='1'>
            <Title/>
          </Tabs.TabPane>
          <Tabs.TabPane tab='订单信息' key='2'>
            <div>2</div>
          </Tabs.TabPane>
          <Tabs.TabPane tab='工单任务' key='3'>
            <div>3</div>
          </Tabs.TabPane>
          <Tabs.TabPane tab='相关公司' key='4'>
            <div>4</div>
          </Tabs.TabPane>
          <Tabs.TabPane tab='操作记录' key='5'>
            <div>5</div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  }
}
export default Main
