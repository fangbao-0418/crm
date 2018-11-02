import React from 'react'
import { Radio, Select, DatePicker } from 'antd'
import { fetchOwnRegion } from '@/modules/common/api'
import { fetchAgentList } from '@/modules/data-overview/api'
import { fetchCompleteRateDataAction, fetchRewardDataAction } from '@/modules/data-detail/action'
import moment from 'moment'
const styles = require('@/modules/data-detail/styles/personal')
const RadioGroup = Radio.Group
const Option = Select.Option
const { MonthPicker, WeekPicker } = DatePicker
const DateComponents: any = {
  day: DatePicker,
  week: WeekPicker,
  month: MonthPicker
}
interface Props {
  type?: '1' | '2'
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
    periodType: 'DAY',
    dataType: 'PERSON',
    date: moment().format('YYYY-MM-DD')
  }
  public state: State = {
    type: 'day',
    provinceList: [],
    cityList: [],
    agentList: []
  }
  public componentWillMount () {
    if (this.props.type === '2') {
      this.payload.dataType = 'AREA'
    }
    fetchOwnRegion().then((res) => {
      if (res.length === 0) {
        this.payload.companyId = APP.user.companyId
        this.fetchData()
      }
      this.setState({
        provinceList: res
      })
    })
  }
  public fetchData () {
    if (this.payload.companyId !== undefined) {
      fetchCompleteRateDataAction(this.payload)
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
    // console.log(this.payload, 'search change')
    this.fetchData()
    // if (this.props.onChange) {
    //   this.props.onChange(this.payload)
    // }
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
            this.payload.periodType = e.target.value.toUppercase()
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
              console.log(current)
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
                    this.payload.companyId = id
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
        {
          this.props.type === '2' && (
            <div style={{paddingBottom:'20px'}}>
              <RadioGroup
                name='radiogroup'
                defaultValue='AREA'
                onChange={(e: any) => {
                  this.payload.dataType = e.target.value
                  this.fetchData()
                }}
              >
                <span>类别：</span>
                <Radio value='AREA'>区域</Radio>
                <Radio value='TASKTYPE'>任务分类</Radio>
              </RadioGroup>
            </div>
          )
        }
      </div>
    )
  }
}
export default Main
