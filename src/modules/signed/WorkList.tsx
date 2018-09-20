import React from 'react'
import { Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
export interface DetailProps {
  orderId: string
  workList: string
  createTime: string
  sales: string
  service: string
  status: string
  person: string
}
interface States {
  data: DetailProps[]
}
export default class extends React.Component {
  public state: States = {
    data: []
  }
  public columns: ColumnProps<DetailProps>[] = [{
    title: '订单号',
    dataIndex: 'orderId'
  }, {
    title: '对应工单',
    dataIndex: 'workList'
  }, {
    title: '创建日期',
    dataIndex: 'createTime'
  }, {
    title: '提单人',
    dataIndex: 'sales'
  }, {
    title: '服务内容',
    dataIndex: 'service'
  }, {
    title: '当前状态',
    dataIndex: 'status'
  }, {
    title: '当前负责人',
    dataIndex: 'person'
  }]
  public render () {
    return (
      <Table
        columns={this.columns}
        dataSource={this.state.data}
        bordered
        rowKey={'orderId'}
      />
    )
  }
}