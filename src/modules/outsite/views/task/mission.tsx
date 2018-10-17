import React from 'react'
import { Table, Radio, Input } from 'antd'
import Service from '@/modules/outsite/services'

const RadioGroup = Radio.Group
interface States {
  value: number,
  color: string,
  text: string,
  data: Array<any>
}

function onShowSizeChange (current: any, pageSize: any) {
  console.log(current, pageSize)
}

class Main extends React.Component<any, any> {
  public state: States = {
    value:1,
    color:'blue',
    text : '注册公司：核名 网上申请 下发执照 刻章',
    data: []
  }

  public componentWillMount () {
    this.getTplList()
  }

  // 获取任务列表
  public getTplList () {
    Service.getTplList().then((res: any) => {
      if (!res) {
        return
      }
      const data = res.map((item: any) => {
        item.subContent = ''
        if (item.subList) {
          item.subContent = item.subList.map((subitem: any) => {
            return subitem.name
          })
          item.subContent = item.subContent.join('，')
        }
        return item
      })
      this.setState({
        data
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
      display: 'block',
      height: '40px'
    }
    return (
      <div>
        <RadioGroup onChange={this.onChange} value={this.state.value}>
          {
            this.state.data && this.state.data.map((item: any, i: number) => {
              return (<Radio style={radioStyle} value={item.id} key={`mission-item-${i}`}>{item.name}：{item.subContent}</Radio>)
            })
          }
        </RadioGroup>
      </div>
    )
  }
}

export default Main
