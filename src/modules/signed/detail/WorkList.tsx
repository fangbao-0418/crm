import React from 'react'
import { Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { fetchWorks } from '../api'
export interface DetailProps {
  id: string
  workNo: string
  orderNo: string
  createTime: string
  sales: string
  name: string
  status: string
}
interface States {
  data: DetailProps[]
}
interface Props {
  customerId: string
}
export default class extends React.Component<Props> {
  public state: States = {
    data: []
  }
  public columns: ColumnProps<DetailProps>[] = [{
    title: '工单号',
    dataIndex: 'workNo',
    render: (val, record) => {
      return (
        <span
          className={APP.hasPermission('track_work_order') ? 'href' : ''}
          onClick={() => {
            if (!APP.hasPermission('track_work_order')) {
              return
            }
            window.open(`/workorder/show/${record.id}`)
          }}
        >
          {val}
        </span>
      )
    }
  }, {
    title: '对应订单',
    dataIndex: 'orderNo'
  }, {
    title: '创建日期',
    dataIndex: 'createTime'
  }, {
    title: '服务内容',
    dataIndex: 'name'
  }, {
    title: '当前状态',
    dataIndex: 'status'
  }]
  public componentWillMount () {
    fetchWorks(this.props.customerId).then((res) => {
      this.setState({
        data: res
      })
    })
  }
  public render () {
    return (
      <Table
        pagination={false}
        columns={this.columns}
        dataSource={this.state.data}
        rowKey={'id'}
      />
    )
  }
}
