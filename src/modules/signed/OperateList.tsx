import React from 'react'
import { Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
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
      <Table
        columns={this.columns}
        dataSource={this.state.data}
        bordered
        rowKey={'opetarePerson'}
      />
    )
  }
}