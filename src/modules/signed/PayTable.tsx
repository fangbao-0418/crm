import React from 'react'
import { Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
export interface DetailProps {
  payType: string
  payAccount: string
  payTime: string
  payImg: string
}
interface States {
  data: DetailProps[]
}
export default class extends React.Component {
  public state: States = {
    data: []
  }
  public columns: ColumnProps<DetailProps>[] = [{
    title: '支付类型',
    dataIndex: 'payType'
  }, {
    title: '付款账号',
    dataIndex: 'payAccount'
  }, {
    title: '付款时间',
    dataIndex: 'payTime'
  }, {
    title: '付款凭证',
    dataIndex: 'payImg'
  }]
  public render () {
    return (
      <Table
        columns={this.columns}
        dataSource={this.state.data}
        bordered
        rowKey={'payAccount'}
      />
    )
  }
}