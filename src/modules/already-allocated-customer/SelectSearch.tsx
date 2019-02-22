import React from 'react'
import { Input, Select } from 'antd'
import { getFirms } from '@/modules/stat/api'
import { fetchCityCount } from '@/modules/customer/api'
const Option = Select.Option
interface ValueProps {
  customerSource?: string
  agencyId?: string
  status?: string
  cityCode?: string
}
interface Props {
  onChange?: (value: ValueProps) => void
}
interface States {
  companyLisy: Array<{id: string, name: string}>
  cityList: Array<{cityCode: string, cityName: string, rows: number}>
}
class Main extends React.Component<Props, States> {
  public values: ValueProps = {}
  public state: States = {
    companyLisy: [],
    cityList: []
  }
  public componentWillMount () {
    getFirms(['Agent', 'DirectCompany']).then((res) => {
      this.setState({
        companyLisy: res
      })
    })
    fetchCityCount().then((res) => {
      this.setState({
        cityList: res.data
      })
    })
  }
  public render () {
    return (
      <div style={{display: 'inline-block', marginLeft: -35}}>
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
        <Select
          showSearch
          allowClear={true}
          className='mr5'
          style={{width: 150}}
          placeholder='请选择当前机构'
          optionFilterProp='children'
          filterOption={(input, option) => String(option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0}
          onChange={(value: string) => {
            this.values.agencyId = value
            this.props.onChange(this.values)
          }}
        >
          {
            this.state.companyLisy.length > 0 &&
            this.state.companyLisy.map((item) => {
              return (
                <Option key={item.id}>{item.name}</Option>
              )
            })
          }
        </Select>
        <Select
          className='mr5'
          style={{width: 150}}
          placeholder='请选择当前状态'
          onChange={(value: string) => {
            this.values.status = value
            this.props.onChange(this.values)
          }}
        >
          <Option key='公海'>公海</Option>
          <Option key='跟进中'>跟进中</Option>
          <Option key='已签约'>已签约</Option>
          <Option key='已删除'>已删除</Option>
        </Select>
        <Select
          allowClear={true}
          style={{width:'150px'}}
          className='mr5'
          placeholder='请选择城市'
          onChange={(value: string) => {
            this.values.cityCode = value
            this.props.onChange(this.values)
          }}
        >
          {
            this.state.cityList.map((item) => {
              return (
                <Option
                  key={item.cityCode}
                >
                  {item.cityName}
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
