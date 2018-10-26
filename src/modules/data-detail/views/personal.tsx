import React from 'react'
import { Tabs } from 'antd'
import { connect } from 'react-redux'
import Rate from '@/modules/data-detail/views/model.rate'
import Perform from '@/modules/data-detail/views/model.perform'
import Search from '../Search'
import { fetchPersonDataAction } from '../action'
const TabPane = Tabs.TabPane

class Main extends React.Component {
  public payload: Statistics.DetailSearchPayload = {}
  public callback (key: any) {
    console.log(key)
  }
  public handleChange (value: any) {
    console.log(`selected ${value}`)
  }
  public fechData () {
    fetchPersonDataAction(this.payload)
  }
  public render () {
    return (
      <div>
        <Search
          onChange={(values) => {
            this.payload = values
            this.fechData()
          }}
        />
        <Tabs onChange={this.callback} type='card'>
          <TabPane tab='任务完成率' key='1'>
            <Rate />
          </TabPane>
          <TabPane tab='绩效' key='2'>
            <Perform />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default connect((state: Reducer.State) => {
  return state.statistics
})(Main)
