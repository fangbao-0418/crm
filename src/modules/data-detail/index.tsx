import React from 'react'
import { Row, Col, Tabs } from 'antd'
import ContentBox from '@/modules/common/content'
import Personal from '@/modules/data-detail/views/personal'
import Task from '@/modules/data-detail/views/task'
const TabPane = Tabs.TabPane
const styles = require('./styles/index.styl')
interface State {
  tab: '1' | '2'
}
class Main extends React.Component<{}, State> {
  public state: State = {
    tab: '1'
  }
  public callBack (value: any) {
    this.setState({
      tab: value
    })
  }
  public render () {
    const { tab } = this.state
    return (
      <ContentBox title='数据明细'>
        <Tabs defaultActiveKey='1' onChange={this.callBack.bind(this)}>
          <TabPane tab='外勤人员' key='1'>
            {tab === '1' && <Personal/>}
          </TabPane>
          <TabPane tab='外勤任务' key='2'>
            {tab === '2' && <Task />}
          </TabPane>
        </Tabs>
      </ContentBox>
    )
  }
}
export default Main
