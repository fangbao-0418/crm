import React from 'react'
import { Input, Select } from 'antd'
import { getCityByCompany } from './api'
import { getAgencylist } from '@/modules/setting/api'
import Company from '@/modules/common/content/Company'
const Option = Select.Option
interface ValueProps {
  customerSource?: string
  agencyId?: string
  lifeCycle?: string
  cityCode?: string
}
interface Props {
  onChange?: (value: ValueProps) => void
}
interface States {
  companyLisy: Array<{agencyName: string, agencyId: string}>
  cityList: any
}
class Main extends React.Component<Props, States> {
  public values: ValueProps = {}
  public state: States = {
    companyLisy: [],
    cityList: []
  }
  public componentWillMount () {
    // getFirms(['Agent', 'DirectCompany']).then((res) => {
    //   this.setState({
    //     companyLisy: res
    //   })
    // })
    getAgencylist().then((res) => {
      this.setState({
        companyLisy: res.data
      })
    })
    getCityByCompany().then((res) => {
      this.setState({
        cityList: res
      })
    })
  }
  public render () {
    return (
      <div>
        {this.props.children}
        <Select
          allowClear={true}
          style={{width:'150px'}}
          className='mr5'
          placeholder='请选择客户来源'
          onChange={(val: string) => {
            this.values.customerSource = val
            this.props.onChange(this.values)
          }}
        >
          {
            APP.keys.EnumCustomerSource.map((item) => {
              return (
                <Option
                  key={item.value}
                >
                  {item.label}
                </Option>
              )
            })
          }
        </Select>
        <Company
          type='self'
          className='mr5'
          allowClear
          onChange={(value: string) => {
            this.values.agencyId = value
            this.props.onChange(this.values)
          }}
        />
        <Select
          allowClear={true}
          className='mr5'
          style={{width: 150}}
          placeholder='请选择客户状态'
          onChange={(value: string) => {
            this.values.lifeCycle = value
            this.props.onChange(this.values)
          }}
        >
          {
            APP.keys.EnumCustomerLiftCycle.map((item) => {
              return (
                <Option
                  key={item.value}
                >
                  {item.label}
                </Option>
              )
            })
          }
        </Select>
        <Select
          showSearch
          allowClear={true}
          style={{width:'150px'}}
          className='mr5'
          placeholder='请选择城市'
          optionFilterProp='children'
          filterOption={(input, option) => String(option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0}
          onChange={(value: string) => {
            this.values.cityCode = value
            this.props.onChange(this.values)
          }}
        >
          {
            this.state.cityList.length > 0 &&
            this.state.cityList.map((item: any) => {
              return (
                <Option
                  key={item.regionCity}
                >
                  {item.regionCityName}
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
