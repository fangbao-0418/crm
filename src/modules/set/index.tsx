import React from 'react'
import { Table, Tabs, Input } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import ContentBox from '@/modules/common/content'
import SetAuto from './SetAuto'
import SetCapacity from './SetCapacity'
class Main extends React.Component {
  public callback (key: string) {
    console.log('key', key)
  }
  public render () {
    return (
      <ContentBox title='客户设置'>
        <Tabs defaultActiveKey='1' onChange={this.callback}>
          <Tabs.TabPane tab='自动分配设置' key='1'>
            <SetAuto />
          </Tabs.TabPane>
          <Tabs.TabPane tab='库容设置' key='2'>
            <SetCapacity />
          </Tabs.TabPane>
        </Tabs>
      </ContentBox>
    )
  }
}
export default Main
