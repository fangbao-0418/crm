import React from 'react'
import { Select, DatePicker } from 'antd'
import moment from 'moment'
import { fetchOverViewAction } from './action'
import { fetchOwnRegion } from '@/modules/common/api'
import { fetchAgentList, fetchDirectList } from './api'
const styles = require('./style')
const { MonthPicker } = DatePicker
const Option = Select.Option
const monthFormat = 'YYYY/MM'
interface State {
  type: 'month' | 'year'
  provinceList: Common.RegionProps[]
  cityList: Common.RegionProps[]
  agentList: Common.AgentProps[]
  cityCode: string
  companyId: any
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
    dateType: 'month',
    date: moment().format('YYYY-MM')
  }
  public state: State = {
    type: 'month',
    provinceList: [],
    cityList: [],
    agentList: [],
    cityCode: undefined,
    companyId: undefined
  }
  public componentWillMount () {
    fetchOwnRegion().then((res) => {
      if (res.length === 0) {
        this.payload.companyId = APP.user.companyId
        fetchDirectList().then((res2) => {
          if (res2.length > 0) {
            this.setState({
              agentList: res2
            })
            this.payload.companyId = res2[0].id
            this.fetchData()
          } else {
            return Promise.reject()
          }
        }).catch(() => {
          this.fetchData()
        })
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
        provinceList: res,
        cityCode: undefined
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
        cityList: res || [],
        cityCode: undefined,
        companyId: undefined
      })
    }
  }
  public onCityChange (code?: string, first = false) {
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
  public render () {
    const { type, provinceList, cityList, agentList } = this.state
    console.log(agentList, 'agentList')
    return (
      <div className={styles['overview-search']}>
        <Select
          defaultValue='按月查询'
          className={styles.selected}
          style={{width: 120}}
          onChange={(value: any) => {
            this.payload.dateType = value
            this.setState({
              type: value
            })
            this.payload.dateType = value
            this.payload.date = value === 'year' ? moment().format('YYYY') : moment().format('YYYY-MM')
            APP.dispatch<Statistics.Props>({
              type: 'change screen data',
              payload: {
                overView: {
                  type: value,
                  date: value === 'year' ? moment().format('YYYY年') : moment().format('YYYY年MM月')
                }
              }
            })
            this.fetchData()
          }}
        >
          <Option key='month'>
            按月查询
          </Option>
          <Option key='year'>
            按年查询
          </Option>
        </Select>
        {
          type === 'month' ? (
            <MonthPicker
              placeholder='请选择月份'
              className={styles.selected}
              format={monthFormat}
              defaultValue={moment(moment().format('YYYY-MM'))}
              onChange={(current) => {
                APP.dispatch<Statistics.Props>({
                  type: 'change screen data',
                  payload: {
                    overView: {
                      date: current.format('YYYY年MM月')
                    }
                  }
                })
                this.payload.date = current.format('YYYY-MM')
                this.fetchData()
              }}
            />
          ) : (
            <Select
              style={{width: '100px'}}
              className={styles.selected}
              defaultValue={years[0].value}
              onChange={(value: string) => {
                console.log(value)
                APP.dispatch<Statistics.Props>({
                  type: 'change screen data',
                  payload: {
                    overView: {
                      date: moment(value).format('YYYY年')
                    }
                  }
                })
                this.payload.date = moment(value).format('YYYY')
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
                value={this.state.cityCode}
                style={{width: '100px'}}
                placeholder='请选择城市'
                className={styles.selected}
                onChange={(code: string) => {this.onCityChange(code, false)}}
              >
                {
                  cityList.map((item) => {
                    return (
                      <Option key={item.id}>{item.name}</Option>
                    )
                  })
                }
              </Select>
            </span>
          )
        }
        {
          agentList.length > 0 && (
            <Select
              style={{width: '100px'}}
              placeholder='请选择代理商'
              className={styles.selected}
              value={this.state.companyId}
              onChange={(id: number) => {
                this.setState({
                  companyId: id
                })
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
          )
        }
      </div>
    )
  }
}
export default Main
