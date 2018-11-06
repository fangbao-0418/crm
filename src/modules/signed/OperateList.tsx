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
  data: DetailProps[]
}
export default class extends React.Component {
  public state: States = {
    data: []
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
  public render () {
    return (
      <div>
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
