import React from 'react'
import { Radio, Select, DatePicker } from 'antd'
import { fetchOwnRegion } from '@/modules/common/api'
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
interface Props {
  onChange?: (values?: Statistics.DetailSearchPayload) => void
}
interface State {
  type: 'day' | 'week' | 'month'
  provinceList: Common.RegionProps[]
  cityList: Common.RegionProps[]
  agentList: Common.AgentProps[]
}
class Main extends React.Component<Props, State> {
  public payload: Statistics.DetailSearchPayload = {
    dateFlag: 'DAY'
  }
  public state: State = {
    type: 'day',
    provinceList: [],
    cityList: [],
    agentList: []
  }
  public componentWillMount () {
    fetchOwnRegion().then((res) => {
      if (res.length === 0) {
        this.payload.customerId = APP.user.companyId
        this.fetchData()
      }
      this.setState({
        provinceList: res
      })
    })
  }
  public fetchData () {
    if (this.payload.customerId !== undefined) {
      // fetchOverViewAction(this.payload)
      // fetchOverViewTotalAction(this.payload.customerId)
    }
  }
  public onProvinceChange (index?: number) {
    if (this.state.provinceList[index]) {
      const res = this.state.provinceList[index].regionLevelResponseList
      this.setState({
        cityList: res || []
      })
    }
  }
  public onCityChange (code?: string) {
    fetchAgentList(code).then((res) => {
      this.setState({
        agentList: res
      })
    })
  }
  public onChange () {
    console.log(this.payload, 'search change')
    if (this.props.onChange) {
      this.props.onChange(this.payload)
    }
  }
  public render () {
    const { type, provinceList, cityList, agentList } = this.state
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
            this.payload.dateFlag = e.target.value.toUppercase()
          }}
        >
          <span style={{lineHeight:'24px'}}>日期：</span>
          <Radio value='day' >日</Radio>
          <Radio value='week' >周</Radio>
          <Radio value='month' >月</Radio>
        </RadioGroup>
        <div className={styles.frameDate}>
          <span>选择日期:</span>
          <DateComponent
            onChange={(current: any) => {
              if (type === 'day') {

              }
              this.payload.date = current.format('YYYY-MM-DD')
              this.onChange()
            }}
          />
          {
            provinceList.length > 0 && (
              <span>
                <span>省份: </span>
                <Select
                  style={{width: '120px'}}
                  placeholder='请选择省份'
                  className={styles.selected}
                  onChange={this.onProvinceChange.bind(this)}
                >
                  {
                    provinceList.map((item, index: any) => {
                      return (
                        <Option key={index}>{item.name}</Option>
                      )
                    })
                  }
                </Select>
                <span>城市：</span>
                <Select
                  style={{width: '120px'}}
                  placeholder='请选择城市'
                  className={styles.selected}
                  onChange={this.onCityChange.bind(this)}
                >
                  {
                    cityList.map((item) => {
                      return (
                        <Option key={item.id}>{item.name}</Option>
                      )
                    })
                  }
                </Select>
                <span>代理商：</span>
                <Select
                  style={{width: '120px'}}
                  placeholder='请选择代理商'
                  className={styles.selected}
                  onChange={(id: number) => {
                    this.payload.customerId = id
                    this.onChange()
                  }}
                >
                  {
                    agentList.map((item) => {
                      return (
                        <Option key={item.id}>{item.name}</Option>
                      )
                    })
                  }
                </Select>
              </span>
            )
          }
        </div>
      </div>
    )
  }
}
export default Main
