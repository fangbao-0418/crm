import React from 'react'
import { Table, Radio } from 'antd'
import { ColumnProps } from 'antd/lib/table'
const RadioGroup = Radio.Group
export interface DetailProps {
  opetarePerson: string
  opetareTime: string
  opetareContent: string
}
interface States {
  data: DetailProps[],
  current: number
}
export default class extends React.Component {
  public state: States = {
    data: [],
    current: 1
  }
  public onChange (e: any) {
    this.setState({
      current: e.target.value,
    })
  }
  public columns: ColumnProps<DetailProps>[] = [{
    title: '操作人',
    dataIndex: 'opetarePerson'
  }, {
    title: '操作时间',
    dataIndex: 'opetareTime'
  }, {
    title: '操作内容',
    dataIndex: 'opetareContent'
  }]
  public render () {
    return (
      <div>
        <RadioGroup onChange={this.onChange} value={this.state.current}>
          <Radio value={1}>操作记录</Radio>
          <Radio value={2}>线索记录</Radio>
        </RadioGroup>
        <Table
          columns={this.columns}
          dataSource={this.state.data}
          bordered
          rowKey={'opetarePerson'}
        />
      </div>
      
    )
  }
}