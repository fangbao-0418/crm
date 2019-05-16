import React from 'react'
import { fetchSelfCompanyList, fetchAllCompanyList } from '@/modules/common/api'
import { Select } from 'antd'
import { SelectProps } from 'antd/lib/select'
interface CompanyProps {
  id: any
  name: string
}
interface Props extends SelectProps {
  type?: 'self' | 'all'
  className?: string
  onChange?: (value: any) => void
}
interface State {
  companies: CompanyProps[]
  value: any
}
class Main extends React.Component<Props, State> {
  public companyTypeList: string[] = ['Agent', 'DirectCompany']
  public state: State = {
    companies: [],
    value: this.props.defaultValue ? String(this.props.defaultValue) : undefined
  }
  public componentWillMount () {
    const type = this.props.type || 'all'
    if (type === 'self') {
      this.getCompaniesSelf()
    } else {
      this.getCompaniesAll()
    }
  }
  public getCompaniesSelf () {
    fetchSelfCompanyList(this.companyTypeList).then((res) => {
      this.setState({
        companies: res
      })
    })
  }
  public getCompaniesAll () {
    fetchAllCompanyList().then((res) => {
      this.setState({
        companies: res
      })
    })
  }
  public render () {
    const { companies } = this.state
    return (
      <Select
        className={this.props.className}
        allowClear={true}
        showSearch
        style={{ width: 200 }}
        placeholder='请选择机构'
        optionFilterProp='children'
        value={this.state.value !== undefined ? String(this.state.value) : undefined}
        {...this.props}
        onChange={(value) => {
          this.setState({
            value
          })
          if (this.props.onChange) {
            this.props.onChange(value)
          }
        }}
        filterOption={(input, option) => {
          return String(option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0
        }}
      >
        {
          companies.map((item) => {
            return (
              <Select.Option title={item.name} key={`${item.id}`} value={String(item.id)}>{item.name}</Select.Option>
            )
          })
        }
      </Select>
    )
  }
}
export default Main
