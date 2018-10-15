import React from 'react'
import { Table, Radio, Input } from 'antd'
const RadioGroup = Radio.Group
interface States {
  value: number,
  color: string,
  text: string
}

function onShowSizeChange (current: any, pageSize: any) {
  console.log(current, pageSize)
}

class Main extends React.Component<any, any> {
  public state: States = {
    value:1,
    color:'blue',
    text : '注册公司：核名 网上申请 下发执照 刻章'
  }
  public onChange = (e: any) => {
    console.log('radio checked', e.target.value)
    this.setState({
      value: e.target.value
    })
  }
  public render () {
    const radioStyle = {
      display: 'block',
      height: '40px'
    }
    return (
      <div>
        <RadioGroup onChange={this.onChange} value={this.state.value}>
          <Radio style={radioStyle} value={1}>{this.state.text}</Radio>
          <Radio style={radioStyle} value={2}>{this.state.text}</Radio>
          <Radio style={radioStyle} value={3}>{this.state.text}</Radio>
          <Radio style={radioStyle} value={4}>{this.state.text}</Radio>
        </RadioGroup>
      </div>
    )
  }
}

export default Main
