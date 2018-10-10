import React from 'react'
import { Select, Switch, Button } from 'antd'
import FormItem from '@/components/form/Item1'
const Option = Select.Option
interface Props {
  onOk?: (value: ValueProps) => void
}
interface ValueProps {
  customerSource?: string,
  salesPerson?: Array<{id: string, name: string}>
}
class Main extends React.Component<Props> {
  public values: ValueProps = {}
  public render () {
    return (
      <div className='text-center mt10'>
        <div>
          <span>客户来源：</span>
          <Select
            style={{width:'200px'}}
            onChange={(val: string) => {
              this.values.customerSource = val
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
        </div>
        <div className='mt12'>
          <span>分配销售：</span>
          <Select
            labelInValue
            style={{width:'200px'}}
            mode='multiple'
            onChange={(val: Array<{key: string, label: string, id: string, name: string}>) => {
              const newVal = val.map((item) => {
                return {
                  id: item.key,
                  name: item.label
                }
              })
              this.values.salesPerson = newVal
            }}
          >
            <Option value='1'>销售1</Option>
            <Option value='2'>销售2</Option>
          </Select>
        </div>
        <div className='text-right mt10'>
          <Button
            type='primary'
            onClick={() => {
              if (this.values.customerSource && this.values.salesPerson) {
                if (this.props.onOk) {
                  this.props.onOk(this.values)
                }
              } else {
                APP.error('请选择客户来源和销售')
              }
            }}
          >
            下一步
          </Button>
        </div>
      </div>
    )
  }
}
export default Main
