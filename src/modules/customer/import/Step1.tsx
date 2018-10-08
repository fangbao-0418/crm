import React from 'react'
import { Select, Switch, Button } from 'antd'
import FormItem from '@/components/form/Item1'
const Option = Select.Option
interface Status {
  isChecked: boolean
}
interface Props {
  isBussiness?: boolean
  onOk?: (value?: any) => void
}
class Main extends React.Component<Props> {
  public value: any = {a: 1}
  public state: Status = {
    isChecked: true
  }
  public onChange (checked: any) {
    this.setState({
      isChecked: checked
    })
  }
  public handleChange (e: React.SyntheticEvent, value: {key: string, value: any}) {
    console.log(value, 'value')
  }
  public render () {
    return (
      <div className='text-center mt10'>
        <div>
          <span>客户来源：</span>
          <Select
            style={{width: '200px'}}
            onChange={(value) => {
              this.handleChange(null, {
                key: 'customerSource',
                value
              })
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
          <span>选择城市：</span>
          <Select
            style={{width:'200px'}}
          >
            <Option key='1'>北京</Option>
            <Option key='2'>天津</Option>
          </Select>
        </div>
        {
          !this.props.isBussiness &&
          <div>
            <div className='mt12' style={{ textAlign: 'left', marginLeft: 250 }}>
              <span>是否分配：</span>
              <Switch onChange={this.onChange.bind(this)} defaultChecked/>
            </div>
            {
              this.state.isChecked &&
              <div>
                <div className='mt12'>
                  <span>选择机构：</span>
                  <Select
                    style={{width:'200px'}}
                  >
                    <Option key='1'>机构1</Option>
                    <Option key='2'>机构2</Option>
                  </Select>
                </div>
                <div className='mt12'>
                  <span>分配销售：</span>
                  <Select
                    style={{width:'200px'}}
                    mode='multiple'
                  >
                    <Option key='1'>销售1</Option>
                    <Option key='2'>销售2</Option>
                  </Select>
                </div>
              </div>
            }
          </div>
        }
        <div className='text-right mt10'>
          <Button
            type='primary'
            onClick={() => {
              if (this.props.onOk) {
                this.props.onOk(this.value)
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
