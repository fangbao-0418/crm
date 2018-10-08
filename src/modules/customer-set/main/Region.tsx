import React from 'react'
import { Select } from 'antd'
import DropDown from 'pilipa/libs/dropdown'
import { fetchRegion } from '@/modules/common/api'
const styles = require('./style')
const Option = Select.Option
interface State {
  cityName: string
  cityList: Common.RegionProps[]
  areaName: string
  areaList: Common.RegionProps[]
}
class Main extends React.Component {
  public state: State = {
    cityName: '',
    areaName: '',
    cityList: [],
    areaList: []
  }
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
    values.forEach((item) => {
      labels.push(item.label)
    })
    this.setState({
      cityName: labels.join(',')
    })
    // this.handleChange({
    //   key: 'cityCode',
    //   value: value.key
    // })
    // this.setState({
    //   areaName: '请选择',
    //   cityName: value.title
    // })
    // fetchRegion({
    //   parentId: value.key,
    //   level: 2
    // }).then((res) => {
    //   this.setState({
    //     areaList: res
    //   })
    // })
  }
  public render () {
    return (
      <div className={styles.region}>
        <Select
          mode='multiple'
          labelInValue
          maxTagCount={0}
          maxTagPlaceholder={(
            <span>{this.state.cityName}</span>
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
        <DropDown
          style={{width: '120px'}}
          className='inline-block'
          title={this.state.areaName}
          data={this.state.areaList}
          onChange={(value) => {
            this.handleChange({
              key: 'areaCode',
              value: value.key
            })
            this.setState({
              areaName: value.title
            })
          }}
          setFields={{
            title: 'name',
            key: 'code'
          }}
        />
      </div>
    )
  }
}
export default Main
