import React from 'react'
import { Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { fetchRelatedCompanyListy } from './api'
export interface DetailProps {
  id: string
  customerName: string
  contactPhone: string
  contactPerson: string
  AgencyName: string
  Status: string
  serveTimeBegin: string
  serveTimeEnd: string
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
    dataIndex: 'customerName'
  }, {
    title: '联系人',
    dataIndex: 'contactPerson'
  }, {
    title: '联系电话',
    dataIndex: 'contactPhone'
  }, {
    title: '所属机构',
    dataIndex: 'AgencyName'
  }, {
    title: '是否签单',
    dataIndex: 'Status'
  }, {
    title: '开始账期',
    dataIndex: 'serveTimeBegin'
  }, {
    title: '结束账期',
    dataIndex: 'serveTimeEnd'
  }]
  public componentWillMount () {
    const curCompanyId = ''
    fetchRelatedCompanyListy(curCompanyId).then((res) => {
      this.setState({
        data: res.data
      })
    })
  }
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
