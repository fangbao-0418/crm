import React from 'react'
import { Tabs, Cascader } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { fetchRegion } from '@/modules/common/api'
import ContentBox from '@/modules/common/content'
import SetAuto from './SetAuto'
import SetCapacity from './SetCapacity'
class Main extends React.Component {
  public componentWillMount () {
    fetchRegion().then((res) => {
      console.log(res)
    })
  }
  public callback (key: string) {
    console.log('key', key)
  }
  public render () {
    return (
      <ContentBox
        title='客户设置'
        rightCotent={(
          <Cascader
            // options={this.state.options}
            // loadData={this.loadData}
            // onChange={this.onChange}
            changeOnSelect
          />
        )}
      >
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
