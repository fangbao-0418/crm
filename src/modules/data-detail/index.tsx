import React from 'react'
import { Row, Col, Tabs } from 'antd'
import ContentBox from '@/modules/common/content'
import Personal from '@/modules/data-detail/views/personal'
import Task from '@/modules/data-detail/views/task'
const TabPane = Tabs.TabPane
const styles = require('./styles/index.styl')
class Main extends React.Component {
  public render () {
    return (
      <ContentBox title='数据明细'>
        <Tabs defaultActiveKey='1'>
          <TabPane tab='外勤人员' key='1'>
            <Personal/>
          </TabPane>
          <TabPane tab='外勤任务' key='2'>
            <Task/>
          </TabPane>
        </Tabs>
      </ContentBox>
    )
  }
}
export default Main
