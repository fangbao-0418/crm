import React from 'react'
import { fetchAllCompanyList } from '@/modules/common/api'
import { Select } from 'antd'
interface Props {
  onChange?: (value: any) => void
}
interface State {
  companies: any[]
  value: any
}
class Main extends React.Component<Props, State> {
  public state: State = {
    companies: [],
    value: String(APP.user.companyId)
  }
  public componentWillMount () {
    this.getCompanies()
  }
  public getCompanies () {
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
        showSearch
        style={{ width: 200 }}
        placeholder='请选择机构'
        optionFilterProp='children'
        value={this.state.value}
        onChange={(value) => {
          this.setState({
            value
          })
          if (this.props.onChange && value !== undefined) {
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
              <Select.Option key={`${item.id}`} value={String(item.id)}>{item.name}</Select.Option>
            )
          })
        }
      </Select>
    )
  }
}
export default Main
