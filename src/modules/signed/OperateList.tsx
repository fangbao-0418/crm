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
  public columns: ColumnProps<DetailProps>[] = [{
    title: '操作人',
    width: 100,
    dataIndex: 'opetarePerson'
  }, {
    title: '操作时间',
    width: 150,
    dataIndex: 'opetareTime'
  }, {
    title: '操作内容',
    dataIndex: 'opetareContent'
  }]
  public onChange (e: any) {
    this.setState({
      current: e.target.value
    })
  }
  public render () {
    return (
      <div>
        <div style={{float: 'right', marginBottom: 5 }}>
          <RadioGroup onChange={this.onChange.bind(this)} value={this.state.current}>
            <Radio value={1}>操作记录</Radio>
            <Radio value={2}>线索记录</Radio>
          </RadioGroup>
        </div>
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
