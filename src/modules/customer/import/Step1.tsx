import React from 'react'
import { Select, Switch } from 'antd'
const Option = Select.Option
interface Status {
  isChecked: boolean
}
class Main extends React.Component {
  public state: Status = {
    isChecked: true
  }
  public onChange (e: any) {
    this.setState({
      isChecked: e.target
    })
  }
  public render () {
    return (
      <div style={{ textAlign: 'center' }}>
        <div>
          <span>客户来源：</span>
          <Select
            style={{width:'200px'}}
          >
            <Option key='1'>公司</Option>
            <Option key='2'>啊啊</Option>
          </Select>
        </div>
        <div>
          <span>选择城市：</span>
          <Select
            style={{width:'200px'}}
          >
            <Option key='1'>北京</Option>
            <Option key='2'>天津</Option>
          </Select>
        </div>
        <div>
          <span>是否分配：</span>
          <Switch onChange={this.onChange.bind(this)} checked={this.state.isChecked}/>
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
            <div>
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
    )
  }
}
export default Main
