import React from 'react'
import { Radio, Row, Col } from 'antd'
const styles = require('@/modules/outsite/styles/other.styl')
interface States {
  value: number
}
const RadioGroup = Radio.Group
class Main extends React.Component<any, any> {
  public state: States = {
    value:1
  }
  public onChange (checkedValues: any) {
    console.log('checked = ', checkedValues)
  }
  public render () {
    const radioStyle = {
      height: '40px'
    }
    return (
      <div>
        <div>
          {/* <span>税务任务：</span> */}
          <RadioGroup name='radiogroup' defaultValue={1}>
             <div>
               <span>税务任务：</span>
               <Radio value={1} style={radioStyle}>注销税务</Radio>
               <Radio value={2} style={radioStyle}>注销税务</Radio>
               <Radio value={3} style={radioStyle}>注销税务</Radio>
               <Radio value={4} style={radioStyle}>注销税务</Radio>
               <Radio value={5} style={radioStyle}>注销税务</Radio>
               <Radio value={6} style={radioStyle}>注销税务</Radio>
               <Radio value={7} style={radioStyle}>注销税务</Radio>
             </div>
             <div>
               <span>工商服务：</span>
               <Radio value={8} style={radioStyle}>核名</Radio>
               <Radio value={9} style={radioStyle}>核名</Radio>
               <Radio value={10} style={radioStyle}>核名</Radio>
               <Radio value={11} style={radioStyle}>核名</Radio>
               <Radio value={12} style={radioStyle}>核名</Radio>
               <Radio value={13} style={radioStyle}>核名</Radio>
             </div>
             <div>
               <span>其他任务：</span>
               <Radio value={14} style={radioStyle}>公积金开户</Radio>
               <Radio value={15} style={radioStyle}>公积金开户</Radio>
               <Radio value={16} style={radioStyle}>公积金开户</Radio>
             </div>
             <div>
               <span>特殊任务：</span>
               <Radio value={17} style={radioStyle}>补税报表</Radio>
               <Radio value={18} style={radioStyle}>补税报表</Radio>
               <Radio value={19} style={radioStyle}>补税报表</Radio>
             </div>
          </RadioGroup>
        </div>
        {/* <br/>
        <div>
          <span>工商服务：</span>
          <Radio.Group  options={options} onChange={this.onChange}/>
        </div>
        <br/>
        <div>
          <span>其他任务：</span>
          <Radio.Group  options={options} onChange={this.onChange}/>
        </div>
        <br/>
        <div>
          <span>特殊任务：</span>
          <Radio.Group  options={options} onChange={this.onChange}/>
        </div>
        <br/> */}
      </div>
    )
  }
}

export default Main
