import React from 'react'
import { Select, Switch, Button, Tooltip } from 'antd'
import FormItem from '@/components/form/Item1'
import { getSalesList } from '@/modules/common/api'
const Option = Select.Option
interface Props {
  onOk?: (value: ValueProps) => void
}
interface State {
  sales: Array<{id: string, name: string}>
}
interface ValueProps {
  customerSource?: string,
  salesPerson?: Array<{id: string, name: string}>
}
class Main extends React.Component<Props> {
  public values: ValueProps = {}
  public state: State = {
    sales: []
  }
  public componentWillMount () {
    getSalesList().then((res) => {
      this.setState({
        sales: res
      })
    })
  }
  public render () {
    return (
      <div className='text-center mt10'>
        <div>
          <span>选择客户来源：</span>
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
          <span>
            <Tooltip placement='top' title='默认分给自己；若勾选其他多个销售，可直接平均分配到其他销售库中'>
              <i className='fa fa-exclamation-circle ml5' style={{color: '#FBCD5D', marginRight: 5}}></i>
            </Tooltip>
            分配销售：
          </span>
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
            {
              this.state.sales.map((item, index) => {
                return (
                  <Option key={item.id}>{item.name}</Option>
                )
              })
            }
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
