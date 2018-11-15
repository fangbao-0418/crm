import React from 'react'
import ContentBox from '@/modules/common/content'
import { Tabs } from 'antd'
import Monitor from './monitor'
import CallDetail from './CallDetail'
const TabPane = Tabs.TabPane
class Main extends React.Component {
  public render () {
    return (
      <ContentBox
        title='呼叫统计'
      >
        <Tabs
          defaultActiveKey='monitor'
          animated={false}
        >
          <TabPane tab='坐席监控' key='monitor'>
            <Monitor />
          </TabPane>
          <TabPane tab='通话详情' key='detail'>
            <CallDetail />
          </TabPane>
        </Tabs>
      </ContentBox>
    )
  }
}
export default Main
