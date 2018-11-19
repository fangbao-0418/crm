import React from 'react'
import ContentBox from '@/modules/common/content'
import { Tabs } from 'antd'
import Monitor from './monitor'
import CallDetail from './CallDetail'
const TabPane = Tabs.TabPane
class Main extends React.Component {
  public render () {
    const defaultActiveKey = APP.hasPermission('crm_data_call_monitors') ? 'monitor' : 'detail'
    return (
      <ContentBox
        title='呼叫统计'
      >
        <Tabs
          defaultActiveKey={defaultActiveKey}
          animated={false}
        >
          {
            APP.hasPermission('crm_data_call_monitors') &&
            <TabPane
              tab='坐席监控'
              key='monitor'
            >
              <Monitor />
            </TabPane>
          }
          {
            APP.hasPermission('crm_data_call_detail') &&
            <TabPane tab='通话详情' key='detail'>
              <CallDetail />
            </TabPane>
          }
        </Tabs>
      </ContentBox>
    )
  }
}
export default Main
