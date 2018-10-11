import React from 'react'
import { Radio, Row, Col, Checkbox } from 'antd'
const styles = require('@/modules/outsite/styles/other.styl')
interface States {
  value: number
}
const options = [
  { label: '注销税务', value:1 },
  { label: '注销税务', value:2 },
  { label: '注销税务', value:3 },
  { label: '注销税务', value:4 },
  { label: '注销税务', value:5 },
  { label: '注销税务', value:6 }
]
const optionsA = [
  { label: '核名', value:1 },
  { label: '核名', value:2 },
  { label: '核名', value:3 }
]
const optionsB = [
  { label: '公积金开户', value:1 },
  { label: '公积金开户', value:2 },
  { label: '公积金开户', value:3 }
]
const optionsC = [
  { label: '补税报表', value:1 },
  { label: '补税报表', value:2 },
  { label: '补税报表', value:3 }
]
class Main extends React.Component<any, any> {
  public state: States = {
    value:1
  }
  public onChange (checkedValues: any) {
    console.log('checked = ', checkedValues)
  }
  public render () {
    return (
      <div>
        <div>
          <span>税务任务：</span>
          <Checkbox.Group options={options} onChange={this.onChange}/>
        </div>
        <br/>
        <div>
          <span>工商服务：</span>
          <Checkbox.Group  options={optionsA} onChange={this.onChange}/>
        </div>
        <br/>
        <div>
          <span>其他任务：</span>
          <Checkbox.Group  options={optionsB} onChange={this.onChange}/>
        </div>
        <br/>
        <div>
          <span>特殊任务：</span>
          <Checkbox.Group  options={optionsC} onChange={this.onChange}/>
        </div>
        <br/>
      </div>
    )
  }
}

export default Main
