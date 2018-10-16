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
    dataIndex: 'customerName'
  }, {
    title: '联系人',
    dataIndex: 'contactPerson'
  }, {
    title: '联系电话',
    dataIndex: 'contactPhone'
  }, {
    title: '所属机构',
    dataIndex: 'agencyName'
  }, {
    title: '是否签单',
    dataIndex: 'status',
    render: (val) => {
      if (val === 4) {
        return <span>是</span>
      } else {
        return <span>否</span>
      }
    }
  }, {
    title: '开始账期',
    dataIndex: 'serveTimeBegin',
    render: (val) => {
      return (moment(val).format('YYYY-MM-DD'))
    }
  }, {
    title: '结束账期',
    dataIndex: 'serveTimeEnd',
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
