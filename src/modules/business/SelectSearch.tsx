import React from 'react'
import { Input, Select } from 'antd'
import { getSales } from '@/modules/common/api'
const styles = require('./style')
const Option = Select.Option
interface ValueProps {
  customerSource?: string
  payTaxesNature?: string
  currentSalesperson?: string
}
interface Props {
  onChange?: (value: ValueProps) => void
}
interface State {
  sales: Array<{
    saleId: string
    salesPerson: string
  }>
}
class Main extends React.Component<Props, State> {
  public values: ValueProps = {}
  public state: State = {
    sales: []
  }
  public componentWillMount () {
    getSales(1).then((res) => {
      this.setState({
        sales: res
      })
    })
  }
  public render () {
    return (
      <div className={styles.select}>
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
          allowClear={true}
          style={{width:'150px'}}
          className='mr5'
          placeholder='请选择纳税类别'
          onChange={(val: string) => {
            this.values.payTaxesNature = val
            this.props.onChange(this.values)
          }}
        >
          {
            APP.keys.EnumPayTaxesNature.map((item) => {
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
          allowClear={true}
          style={{width:'150px'}}
          placeholder='请选择销售'
          showSearch
          optionFilterProp='children'
          filterOption={(input, option) => String(option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0}
          labelInValue
          onChange={(val: {key: '', label: ''}) => {
            this.values.currentSalesperson = val ? val.label : undefined
            this.props.onChange(this.values)
          }}
        >
          {
            this.state.sales.map((item) => {
              return (
                <Option key={item.saleId}>{item.salesPerson}</Option>
              )
            })
          }
        </Select>
      </div>
    )
  }
}
export default Main
