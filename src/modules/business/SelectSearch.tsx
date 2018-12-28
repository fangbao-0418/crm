import React from 'react'
import { Input, Select } from 'antd'
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
class Main extends React.Component<Props> {
  public values: ValueProps = {}
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
          onChange={(val: string) => {
            this.values.currentSalesperson = val
            this.props.onChange(this.values)
          }}
        >
          <Option key='王敏'>王敏</Option>
          <Option key='王敏2'>王敏2</Option>
          <Option key='王敏3'>王敏3</Option>
        </Select>
      </div>
    )
  }
}
export default Main
