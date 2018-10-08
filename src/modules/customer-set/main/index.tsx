import React from 'react'
import { Tabs } from 'antd'
import ContentBox from '@/modules/common/content'
import SetAuto from '@/modules/customer-set/main/SetAuto'
import SetCapacity from '@/modules/customer-set/main/SetCapacity'

import Region from './Region'
const styles = require('./style')
class Main extends React.Component {
  // public callback (key: string) {
  //   console.log('key', key)
  // }
  public render () {
    return (
      <ContentBox
        className={styles.container}
        title='客户设置'
        rightCotent={(
          <Region />
        )}
      >
        <Tabs
          animated={false}
          defaultActiveKey='1'
          // onChange={this.callback}
        >
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
