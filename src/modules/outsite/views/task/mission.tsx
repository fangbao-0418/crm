import React from 'react'
import { Table, Radio, Input } from 'antd'
const RadioGroup = Radio.Group
interface States {
  value: number
}

function onShowSizeChange (current: any, pageSize: any) {
  console.log(current, pageSize)
}

class Main extends React.Component<any, any> {
  public state: States = {
    value:1
  }
  public data: any [
    '注册公司：核名 网上申请 下发执照 刻章'
  ]
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
          <Radio style={radioStyle} value={1}>注册公司：核名 网上申请 下发执照 刻章</Radio>
          <Radio style={radioStyle} value={2}>注册公司：核名 网上申请 下发执照 刻章 核名 网上申请 下发执照 刻章</Radio>
          <Radio style={radioStyle} value={3}>注册公司：核名 网上申请 下发执照 刻章</Radio>
          <Radio style={radioStyle} value={4}>注册公司：核名 网上申请 下发执照 刻章 核名 网上申请 下发执照 刻章 核名 网上申请 下发执照 刻章</Radio>
        </RadioGroup>
      </div>
    )
  }
}

export default Main
