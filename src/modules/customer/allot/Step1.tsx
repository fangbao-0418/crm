import React from 'react'
import { Select, Switch, Button } from 'antd'
const Option = Select.Option
interface Props {
  onOk?: (value: ValueProps) => void
}
interface ValueProps {
  agencyId?: string,
  customerIds?: string[]
  salesPerson?: Array<{id: string, name: string}>
  checkAllParam?: any
}
class Main extends React.Component<Props> {
  public values: ValueProps = {}
  public onChange () {
    console.log(this.values)
  }
  public render () {
    return (
      <div className='text-center mt10'>
        <div>
          <div className='mt12'>
            <span>选择机构：</span>
            <Select
              style={{width:'200px'}}
              onChange={(val: string) => {
                this.values.agencyId = val
              }}
            >
              <Option key='1'>机构1</Option>
              <Option key='2'>机构2</Option>
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
                if (this.values.agencyId && this.values.salesPerson) {
                  if (this.props.onOk) {
                    this.props.onOk(this.values)
                  }
                } else {
                  APP.error('请选择机构和销售')
                  return false
                }
              }}
            >
              下一步
            </Button>
          </div>
        </div>
      </div>
    )
  }
}
export default Main
