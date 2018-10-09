import React from 'react'
import { Tabs } from 'antd'
import ContentBox from '@/modules/common/content'
import SetAuto from '@/modules/customer-set/main/SetAuto'
import SetCapacity from '@/modules/customer-set/main/SetCapacity'
import Region from './Region'
interface States {
  cityCodes: {key: string, label: string}[]
}
const styles = require('./style')
class Main extends React.Component<null, States> {
  public state: States = {
    cityCodes: []
  }
  public handleRegionChange (value: any) {
    console.log(value)
    this.setState({
      cityCodes: value
    })
  }
  public render () {
    const cityCodes = this.state.cityCodes
    console.log(cityCodes, 'index')
    return (
      <ContentBox
        className={styles.container}
        title='客户设置'
        rightCotent={(
          <Region onChange={this.handleRegionChange.bind(this)} />
        )}
      >
        <Tabs
          animated={false}
          defaultActiveKey='1'
          // onChange={this.callback}
        >
          <Tabs.TabPane tab='自动分配设置' key='1'>
            <SetAuto cityCodes={cityCodes} />
          </Tabs.TabPane>
          <Tabs.TabPane tab='库容设置' key='2'>
            <SetCapacity cityCodes={cityCodes} />
          </Tabs.TabPane>
        </Tabs>
      </ContentBox>
    )
  }
}
export default Main
