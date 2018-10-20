import React from 'react'
import { Row, Col, Tabs } from 'antd'
import ContentBox from '@/modules/common/content'
import { connect } from 'react-redux'
import Personal from '@/modules/data-detail/views/personal'
import Task from '@/modules/data-detail/views/task'
import { fetchListAction } from './action'
import { taskList, missionList, rate } from './api'
const TabPane = Tabs.TabPane
function callback (key: string) {
  console.log(key)
}
const styles = require('./styles/index.styl')
class Main extends React.Component {
  public values: {
    customerId: number,
    dateFlag: string,
    date: string
  } = {
    customerId:2001,
    dateFlag: 'MONTH',
    date:'2018-10-19'
  }
  public method: {
    customerId: number,
    dateFlag: string,
    date: string,
    category: string
  } = {
    customerId:2001,
    dateFlag: 'MONTH',
    date:'2018-10-19',
    category: 'CATEGORY'
  }
  public constructor (props: any, state: any) {
    super({props})
  }
  public componentWillMount () {
    this.fetchData()
    this.taskListData()
    this.missionListData()
    this.rateData()
  }
  public fetchData () {
    fetchListAction(this.values)
  }
  public taskListData () {
    taskList(this.values)
  }
  public missionListData () {
    missionList(this.method)
  }
  public rateData () {
    rate(this.method)
  }
  public render () {
    return (
    <div>
      <ContentBox title='数据明细'>
        <Tabs defaultActiveKey='1' onChange={callback}>
          <TabPane tab='外勤人员' key='1'>
            <Personal/>
          </TabPane>
          <TabPane tab='外勤任务' key='2'>
            <Task/>
          </TabPane>
        </Tabs>
      </ContentBox>
    </div>
    )
  }
}
export default connect((state: Reducer.State) => {
  return state.statistics
})(Main)
