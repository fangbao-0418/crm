import React from 'react'
import { Radio, Row, Col } from 'antd'
import Service from '@/modules/outsite/services'
import _ from 'lodash'

const styles = require('@/modules/outsite/styles/other.styl')
interface States {
  value: number
  data?: Array<any>
  subGroup: any
}
const RadioGroup = Radio.Group
class Main extends React.Component<any, any> {
  public state: States = {
    value:1,
    subGroup: {}
  }

  public componentWillMount () {
    this.getSublist()
  }

  // 获取子任务列表
  public getSublist () {
    return Service.getTplSublist({}).then((data: any) => {
      data.map((item: any, i: number) => {
        data[i].subId = item.id
      })
      this.setState({
        subList: data,
        subGroup: Service.getTplSublistGroupByCate(data)
      }, () => {
        console.log('get list::', this.state)
      })
    })
  }

  public onChange = (e: any) => {
    console.log('radio checked', e.target.value)
    const value = e.target.value
    this.setState({
      value
    })
    this.props.onChange(value)
  }

  public render () {
    const radioStyle = {
      height: '40px'
    }
    return (
      <div>
        <div>
          {/* <span>税务任务：</span> */}
          <RadioGroup name='radiogroup' defaultValue={1} onChange={this.onChange.bind(this)}>
          {
            _.map(Service.taskTplCateDict, (val: any, key: string) => {
              return (
              <div>
                <span>{val}：</span>
                {
                  this.state.subGroup[key] && this.state.subGroup[key].map((item: any, i: number) => {
                    return (<Radio style={radioStyle} value={item.id} key={`mission-item-${i}`}>{item.name}</Radio>)
                  })
                }
              </div>)
            })
          }
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
