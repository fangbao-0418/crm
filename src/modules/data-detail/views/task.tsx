import React from 'react'
import { Radio, DatePicker, Select, Tabs } from 'antd'
import moment from 'moment'
import Rate from '@/modules/data-detail/views/model.rate'
import Perform from '@/modules/data-detail/views/model.perform'
import { connect } from 'react-redux'
import { findDOMNode } from 'react-dom'
const styles = require('@/modules/data-detail/styles/task.styl')
const RadioGroup = Radio.Group
const { MonthPicker, RangePicker } = DatePicker
const dateFormat = 'YYYY/MM/DD'
const monthFormat = 'YYYY/MM'
const Option = Select.Option
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
      <RadioGroup name='radiogroup' defaultValue={1}>
        <span>日期：</span>
        <Radio value={1}>日</Radio>
        <Radio value={2}>周</Radio>
        <Radio value={3}>月</Radio>
      </RadioGroup>
      <div>
        <div className={styles.frameDate}>
          <span>选择日期:</span>
          <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} />
          <span>省份: </span>
          <Select
            defaultValue={provinceData[0]}
            style={{ width: 120 }}
            onChange={this.handleProvinceChange}
          >
            {provinceData.map((province: any) => <Option key={province}>{province}</Option>)}
          </Select>
          <span>城市：</span>
          <Select
            style={{ width: 120 }}
            value={this.state.secondCity}
            onChange={this.onSecondCityChange}
          >
            {cities.map((city: any) => <Option key={city}>{city}</Option>)}
          </Select>
          <span>代理商：</span>
          <Select defaultValue='河北' style={{ width: 120 }} onChange={this.handleChange}>
            <Option value='河北'>河北</Option>
            <Option value='安徽'>安徽</Option>
            <Option value='河南'>河南</Option>
          </Select>
        </div>
        <div style={{paddingBottom:'20px'}}>
          <RadioGroup name='radiogroup' defaultValue={1}>
            <span>类别：</span>
            <Radio value={1}>区域</Radio>
            <Radio value={2}>任务分类</Radio>
          </RadioGroup>
        </div>
        <Tabs onChange={this.callback} type='card'>
          <TabPane tab='任务完成率' key='1'>
            <Rate/>
          </TabPane>
          <TabPane tab='绩效' key='2'>
            <Perform/>
          </TabPane>
       </Tabs>
      </div>
    </div>
    )
  }
}

export default connect((state: Reducer.State) => {
  return state.statistics
})(Main)
