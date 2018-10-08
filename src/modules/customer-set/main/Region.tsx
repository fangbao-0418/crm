import React from 'react'
import { Select } from 'antd'
import { LabeledValue } from 'antd/lib/select'
import { fetchRegion } from '@/modules/common/api'
const styles = require('./style')
const Option = Select.Option
interface Props {
  onChange?: (values: LabeledValue[]) => void
}
interface State {
  cityName: string
  cityList: Common.RegionProps[]
  areaName: string
  areaList: Common.RegionProps[]
  areaValues: LabeledValue[]
}
class Main extends React.Component<Props> {
  public state: State = {
    cityName: '',
    areaName: '',
    cityList: [],
    areaList: [],
    areaValues: []
  }
  public areaList: Common.RegionProps[] = []
  public componentWillMount () {
    fetchRegion().then((res) => {
      this.setState({
        cityList: res
      })
    })
  }
  public handleChange (value: {key: string, value: string}) {

  }
  public handleCityChange (values: {key: string, label: string}[]) {
    const labels: string[] = []
    const p: Promise<any>[] = []
    values.forEach((item) => {
      labels.push(item.label)
      p.push(
        fetchRegion({
          parentId: item.key,
          level: 2
        })
      )
    })
    Promise.all(p).then((res) => {
      let arr: Common.RegionProps[] = []
      const areaValues: LabeledValue[] = []
      res.forEach((item) => {
        item.forEach((item2: Common.RegionProps) => {
          areaValues.push({
            key: item2.code,
            label: item2.name
          })
        })
        arr = arr.concat(item)
      })
      if (this.props.onChange) {
        this.props.onChange(areaValues)
      }
      this.setState({
        areaValues,
        areaList: arr
      })
    })
    this.setState({
      cityName: labels.join(','),
      areaName: '全部'
    })
  }
  public handleAreaChange (values: {key: string, label: string}[]) {
    const labels: string[] = []
    values.forEach((item) => {
      labels.push(item.label)
    })
    this.setState({
      areaValues: values,
      areaName: labels.join(',')
    })
    if (this.props.onChange) {
      this.props.onChange(values)
    }
  }
  public render () {
    return (
      <div className={styles.region}>
        <label>省份</label>
        <Select
          className='mr10'
          mode='tags'
          labelInValue
          maxTagCount={0}
          // showArrow={true}
          maxTagPlaceholder={(
            <span title={this.state.cityName} className={styles['tag-placeholder']}>{this.state.cityName}</span>
          )}
          style={{ width: '120px' }}
          onChange={this.handleCityChange.bind(this)}
        >
          {
            this.state.cityList.map((item) => {
              return (
                <Option
                  key={item.code}
                >
                {item.name}
                </Option>
              )
            })
          }
        </Select>
        <label>市区</label>
        <Select
          mode='tags'
          labelInValue
          maxTagCount={0}
          // showArrow={true}
          value={this.state.areaValues}
          maxTagPlaceholder={(
            <span title={this.state.areaName} className={styles['tag-placeholder']}>        {this.state.areaName}
            </span>
          )}
          style={{ width: '120px' }}
          onChange={this.handleAreaChange.bind(this)}
        >
          {
            this.state.areaList.map((item) => {
              return (
                <Option
                  key={item.code}
                >
                {item.name}
                </Option>
              )
            })
          }
        </Select>
      </div>
    )
  }
}
export default Main
