import React from 'react'
import { Radio, Select, DatePicker } from 'antd'
import { fetchOwnRegion } from '@/modules/common/api'
import { fetchAgentList } from '@/modules/data-overview/api'
import { fetchCompleteRateDataAction } from '@/modules/data-detail/action'
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
  cityCode: string
  companyId: any
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
    agentList: [],
    cityCode: undefined,
    companyId: undefined
  }
  public componentWillMount () {
    if (this.props.type === '2') {
      this.payload.dataType = 'AREA'
    }
    fetchOwnRegion().then((res) => {
      if (res.length === 0) {
        this.payload.companyId = APP.user.companyId
        this.fetchData()
      } else {
        if (res[0].regionLevelResponseList instanceof Array && res[0].regionLevelResponseList.length > 0) {
          this.onCityChange(res[0].regionLevelResponseList[0].id, true).then((res2) => {
            if (res2 instanceof Array && res2.length > 0) {
              this.payload.companyId = res2[0].id
              this.fetchData()
            }
          })
        }
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
        cityList: res || [],
        cityCode: undefined,
        companyId: undefined
      })
    }
  }
  public onCityChange (code?: string, first: boolean = false) {
    this.setState({
      cityCode: first ? undefined : code,
      companyId: undefined
    })
    return fetchAgentList(code).then((res) => {
      this.setState({
        agentList: res
      })
      return res
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
            const value = e.target.value
            this.setState({
              type: value
            })
            this.payload.periodType = value.toUpperCase()
            if (value === 'day') {
              this.payload.date = moment().format('YYYY-MM-DD')
            } else if (value === 'week') {
              this.payload.date = moment().format('YYYYWW')
            } else if (value === 'month') {
              this.payload.date = moment().format('YYYY-MM')
            }
            this.fetchData()
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
            defaultValue={moment()}
            onChange={(current: any) => {
              console.log(current)
              if (type === 'day') {
                this.payload.date = current.format('YYYY-MM-DD')
              } else if (type === 'week') {
                this.payload.date = current.format('YYYYWW')
              } else if (type === 'month') {
                this.payload.date = current.format('YYYY-MM')
              }
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
                  value={this.state.cityCode}
                  style={{width: '120px'}}
                  placeholder='请选择城市'
                  className={styles.selected}
                  onChange={(code: string) => this.onCityChange(code, false)}
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
                  value={this.state.companyId}
                  onChange={(id: number) => {
                    this.payload.companyId = id
                    this.setState({
                      companyId: id
                    })
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
