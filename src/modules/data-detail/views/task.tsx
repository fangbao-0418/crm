import React from 'react'
import { Radio, Tabs } from 'antd'
import Rate from '@/modules/data-detail/views/model.rate'
import Perform from '@/modules/data-detail/views/model.perform'
import { connect } from 'react-redux'
import Search from '../Search'
const styles = require('@/modules/data-detail/styles/task.styl')
const RadioGroup = Radio.Group
const TabPane = Tabs.TabPane
interface States {
  cities: any,
  secondCity: any
}
const provinceData: any = ['河北', '河南']
const cityData: any = {
  河北: ['邯郸', '秦皇岛', '廊坊'],
  河南: ['信阳', '郑州', '南阳']
}
class Main extends React.Component<any, any> {
  public constructor (props: any, state: any) {
    super(props)
    this.state = {
      cities: cityData[provinceData[0]],
      secondCity: cityData[provinceData[0]][0]
    }
  }
  public callback (key: any) {
    console.log(key)
  }
  public handleProvinceChange = (value: any) => {
    this.setState({
      cities: cityData[value],
      secondCity: cityData[value][0]
    })
  }
  public  onSecondCityChange = (value: any) => {
    this.setState({
      secondCity: value
    })
  }
  public handleChange (value: any) {
    console.log(`selected ${value}`)
  }
  public render () {
    const { cities } = this.state
    return (
    <div>
      <Search type='2' />
      <Tabs onChange={this.callback} type='card'>
        <TabPane tab='任务完成率' key='1'>
          <Rate/>
        </TabPane>
        <TabPane tab='绩效' key='2'>
          <Perform/>
        </TabPane>
      </Tabs>
    </div>
    )
  }
}

export default connect((state: Reducer.State) => {
  return state.statistics
})(Main)
