import React from 'react'
import { Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { fetchRelatedCompanyListy } from './api'
import moment from 'moment'
export interface DetailProps {
  id: string
  customerName: string
  contactPhone: string
  contactPerson: string
  agencyName: string
  status: string
  serveTimeBegin: string
  serveTimeEnd: string
}
interface Props {
  customerId: string
}
interface States {
  data: DetailProps[]
}
export default class extends React.Component<Props> {
  public state: States = {
    data: []
  }
  public columns: ColumnProps<DetailProps>[] = [{
    title: '公司名称',
    width: 300,
    dataIndex: 'customerName'
  }, {
    title: '所属机构',
    dataIndex: 'agencyName'
  }, {
    title: '签单状态',
    dataIndex: 'status',
    render: (val) => {
      return (APP.dictionary[`EnumCustomerStatus-${val}`])
    }
  }, {
    title: '开始账期',
    dataIndex: 'serveTimeBegin',
    render: (val) => {
      return (moment(val).format('YYYY-MM-DD'))
    }
  }]
  public componentWillMount () {
    const customerId = this.props.customerId
    fetchRelatedCompanyListy(customerId).then((res) => {
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
