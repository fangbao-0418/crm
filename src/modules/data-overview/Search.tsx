import React from 'react'
import { Select, DatePicker } from 'antd'
import moment from 'moment'
import { fetchOverViewAction } from './action'
import { fetchOwnRegion } from '@/modules/common/api'
import { fetchAgentList } from './api'
const styles = require('./style')
const { MonthPicker } = DatePicker
const Option = Select.Option
const monthFormat = 'YYYY/MM'
const monthFormatYear = 'YYYY'
interface State {
  type: 'month' | 'year'
  provinceList: Common.RegionProps[]
  cityList: Common.RegionProps[]
  agentList: Common.AgentProps[]
}
const years: {label: string, value: string}[] = []
let currentYear = Number(new Date().getFullYear())
while (currentYear >= 2014) {
  years.push({
    label: `${currentYear}年`,
    value: `${currentYear}-01-01`
  })
  currentYear -= 1
}
class Main extends React.Component<{}, State> {
  public payload: Statistics.OverViewSearchPayload = {
    dateType: 'month'
  }
  public state: State = {
    type: 'month',
    provinceList: [],
    cityList: [],
    agentList: []
  }
  public componentWillMount () {
    // this.fetchData()
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
      fetchOverViewAction(this.payload)
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
  public render () {
    const { type, provinceList, cityList, agentList } = this.state
    return (
      <div className={styles['overview-search']}>
        <Select
          defaultValue='按月查询'
          className={styles.selected}
          style={{width: 120}}
          onChange={(value: any) => {
            this.payload.dateType = value
            APP.dispatch<Statistics.Props>({
              type: 'change screen data',
              payload: {
                overView: {
                  type: value
                }
              }
            })
            this.setState({
              type: value
            })
            this.payload.dateType = value
            // this.fetchData()
          }}
        >
          <Option key='MONTH'>
            按月查询
          </Option>
          <Option key='YEAR'>
            按年查询
          </Option>
        </Select>
        {
          type === 'month' ? (
            <MonthPicker
              placeholder='请选择月份'
              className={styles.selected}
              format={monthFormat}
              onChange={(current) => {
                APP.dispatch<Statistics.Props>({
                  type: 'change screen data',
                  payload: {
                    overView: {
                      date: current.format('YYYY年MM月')
                    }
                  }
                })
                this.payload.date = current.format('YYYY-MM-DD')
                this.fetchData()
              }}
            />
          ) : (
            <Select
              style={{width: '100px'}}
              className={styles.selected}
              onChange={(value: string) => {
                APP.dispatch<Statistics.Props>({
                  type: 'change screen data',
                  payload: {
                    overView: {
                      date: moment(value).format('YYYY年')
                    }
                  }
                })
                this.payload.date = value
                this.fetchData()
              }}
            >
              {
                years.map((item) => {
                  return (
                    <Option key={item.value}>{item.label}</Option>
                  )
                })
              }
            </Select>
          )
        }
        {
          provinceList.length > 0 && (
            <span>
              <Select
                style={{width: '100px'}}
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
              <Select
                style={{width: '100px'}}
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
              <Select
                style={{width: '100px'}}
                placeholder='请选择代理商'
                className={styles.selected}
                onChange={(id: number) => {
                  this.payload.companyId = id
                  this.fetchData()
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
    )
  }
}
export default Main
