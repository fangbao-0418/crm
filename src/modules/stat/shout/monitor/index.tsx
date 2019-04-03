import React from 'react'
import moment from 'moment'
import Condition, { ConditionOptionProps } from '@/modules/common/search/Condition'
import Group from './Group'
import Seller from './Seller'
import { Tabs } from 'antd'
const TabPane = Tabs.TabPane
export interface PayloadProps {
  callTimeBeginDate?: string
  callTimeEndDate?: string
  pageSize: number
  pageCurrent: number
}
interface State {
  type: 'group' | 'seller'
}
class Main extends React.Component<{}, State> {
  public state: State = {
    type: 'seller'
  }
  public payload: PayloadProps = {
    callTimeBeginDate: moment().format('YYYY-MM-DD'),
    callTimeEndDate: moment().format('YYYY-MM-DD'),
    pageCurrent: 1,
    pageSize: 15
  }
  public condition: ConditionOptionProps[] = [
    {
      field: 'date',
      label: ['时间'],
      type: 'date',
      value: '0',
      options: [{
        label: '今日',
        value: '0'
      }, {
        label: '昨日',
        value: '-1'
      }, {
        label: '7天',
        value: '-7'
      }, {
        label: '30天',
        value: '-30'
      }]
    }
  ]
  public componentDidMount () {
    // this.fetchList()
  }
  public fetchList () {
    let ins: any
    if (this.state.type === 'group') {
      ins = this.refs.group
    } else {
      ins = this.refs.seller
    }
    ins.fetchList(this.payload)
  }
  public onChange (value: {[field: string]: {label: string, value: string}}) {
    this.payload.pageCurrent = 1
    if (value.date.value.split('至').length === 2) {
      this.payload.callTimeBeginDate = value.date.value.split('至')[0]
      this.payload.callTimeEndDate = value.date.value.split('至')[1]
    } else {
      this.payload.callTimeBeginDate = moment().add(value.date.value, 'day').format('YYYY-MM-DD')
      if (value.date.value === '-1') {
        this.payload.callTimeEndDate = this.payload.callTimeBeginDate
      } else {
        this.payload.callTimeEndDate = moment().format('YYYY-MM-DD')
      }
    }
    this.fetchList()
  }
  public render () {
    const { type } = this.state
    return (
      <div>
        <Tabs
          defaultActiveKey='group'
        >
          <TabPane
            key='group'
            tab='坐席监控'
          >
            <Condition
              style={{marginLeft: -30}}
              onChange={this.onChange.bind(this)}
              dataSource={this.condition}
            />
            <Seller ref='seller' payload={this.payload} />
          </TabPane>
          <TabPane
            key='seller'
            tab='小组监控'
          >
            <Condition
              style={{marginLeft: -30}}
              onChange={this.onChange.bind(this)}
              dataSource={this.condition}
            />
            <Group ref='group' payload={this.payload} />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
export default Main
