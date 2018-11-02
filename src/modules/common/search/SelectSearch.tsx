import React from 'react'
import { Select } from 'antd'
const styles = require('./style')
const Option = Select.Option
interface Props {
  type?: 'signed'
  onChange?: (value: ValueProps) => void
}
interface ValueProps {
  customerSource?: string
  payTaxesNature?: string
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
        {
          this.props.type !== 'signed' &&
          <Select
            allowClear={true}
            style={{width:'150px'}}
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
        }
      </div>
    )
  }
}
export default Main
