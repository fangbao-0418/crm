import React from 'react'
import { Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
export interface DetailProps {
  name: string
  contactPerson: string
  contactPhone: string
  orgainzation: string
  isSignOrder: string
  ststartdateatus: string
  enddate: string
}
interface States {
  data: DetailProps[]
}
export default class extends React.Component {
  public state: States = {
    data: []
  }
  public columns: ColumnProps<DetailProps>[] = [{
    title: '公司名称',
    dataIndex: 'name'
  }, {
    title: '联系人',
    dataIndex: 'contactPerson'
  }, {
    title: '联系电话',
    dataIndex: 'contactPhone'
  }, {
    title: '所属机构',
    dataIndex: 'orgainzation'
  }, {
    title: '是否签单',
    dataIndex: 'isSignOrder'
  }, {
    title: '开始账期',
    dataIndex: 'startdate'
  }, {
    title: '结束账期',
    dataIndex: 'enddate'
  }]
  public render () {
    return (
      <Table
        columns={this.columns}
        dataSource={this.state.data}
        bordered
        rowKey={'name'}
      />
    )
  }
}