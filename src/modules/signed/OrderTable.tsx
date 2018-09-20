import React from 'react'
import { Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
export interface DetailProps {
  contractId: string
  contractImg: string
}
interface States {
  data: DetailProps[]
}
export default class extends React.Component {
  public state: States = {
    data: []
  }
  public columns: ColumnProps<DetailProps>[] = [{
    title: '合同号',
    dataIndex: 'contractId'
  }, {
    title: '合同照片',
    dataIndex: 'contractImg'
  }, {
    title: '操作',
    render: () => {
      return (
        <a>电子合同查看</a>
      )
    }
  }]
  public render () {
    return (
      <Table
        columns={this.columns}
        dataSource={this.state.data}
        bordered
        rowKey={'contractId'}
      />
    )
  }
}
