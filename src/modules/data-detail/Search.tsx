import React from 'react'
import { Radio, Select, DatePicker } from 'antd'
import { fetchAgentList } from '@/modules/data-overview/api'
const styles = require('@/modules/data-detail/styles/personal')
const RadioGroup = Radio.Group
const dateFormat = 'YYYY/MM/DD'
const Option = Select.Option
const { MonthPicker, WeekPicker } = DatePicker
const DateComponents: any = {
  day: DatePicker,
  week: WeekPicker,
  month: MonthPicker
}
interface State {
  type: 'day' | 'week' | 'month'
  provinceList: any[]
  cityList: any[]
}
class Main extends React.Component<{}, State> {
  public state: State = {
    type: 'day',
    provinceList: [],
    cityList: []
  }
  public componentWillMount () {
    //
  }
  public handleProvinceChange () {}
  public handleCityChange () {}
  public render () {
    const { type, provinceList, cityList } = this.state
    const DateComponent = DateComponents[type] || DatePicker
    return (
      <div>
        <RadioGroup
          name='radiogroup'
          defaultValue='day'
          onChange={(e: any) => {
            this.setState({
              type: e.target.value
            })
          }}
        >
          <span style={{lineHeight:'24px'}}>日期：</span>
          <Radio value='day' >日</Radio>
          <Radio value='week' >周</Radio>
          <Radio value='month' >月</Radio>
        </RadioGroup>
        <div className={styles.frameDate}>
          <span>选择日期:</span>
          <DateComponent />
          <span>省份: </span>
          <Select
            defaultValue={provinceList[0]}
            style={{ width: 120 }}
            onChange={this.handleProvinceChange}
          >
            {provinceList.map((province) => <Option key={province}>{province}</Option>)}
          </Select>
          <span>城市：</span>
          <Select
            style={{ width: 120 }}
            // value={this.state.secondCity}
            onChange={this.handleCityChange.bind(this)}
          >
            {cityList.map((city: any) => <Option key={city}>{city}</Option>)}
          </Select>
          <span>代理商：</span>
          <Select
            style={{ width: 120 }}
            onChange={() => {}}
          >
            <Option value='河北'>河北</Option>
            <Option value='安徽'>安徽</Option>
            <Option value='河南'>河南</Option>
          </Select>
        </div>
      </div>
    )
  }
}
export default Main
