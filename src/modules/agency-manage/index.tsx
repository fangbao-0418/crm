import React from 'react'
import ContentBox from '@/modules/common/content'
import { Tabs } from 'antd'
import AddButton from '@/modules/common/content/AddButton'
import Direct from './direct'
import Agent from './agent'
import Accounting from './accounting'
const TabPane = Tabs.TabPane
class Main extends React.Component {
  public callback () {}
  public render () {
    return (
      <ContentBox
        title='机构管理'
        rightCotent={(
          <AddButton
            title='添加'
          />
        )}
      >
        <Tabs
          animated={false}
          defaultActiveKey='1'
          onChange={this.callback.bind(this)}
        >
          <TabPane tab='直营' key='1'>
            <Direct />
          </TabPane>
          <TabPane tab='代理商' key='2'>
            <Agent />
          </TabPane>
          <TabPane tab='核算中心' key='3'>
            <Accounting />
          </TabPane>
        </Tabs>
      </ContentBox>
    )
  }
}

export default Main
