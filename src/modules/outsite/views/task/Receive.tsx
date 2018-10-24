/** 领用详情 */
import React from 'react'
import { Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { fetchReceiveList } from '@/modules/outsite/api'
interface Props {
  id?: string
}
interface State {
  dataSource: OutSide.ReceiveItemProps[]
}
class Main extends React.Component<Props, State> {
  public state: State = {
    dataSource: []
  }
  public columns: ColumnProps<OutSide.ReceiveItemProps>[] = [
    {
      title: '子项目',
      dataIndex: 'taskName'
    },
    {
      title: '费用',
      dataIndex: 'charge'
    },
    {
      title: '已领金额',
      dataIndex: 'taskName'
    },
    {
      title: '剩余可领金额',
      dataIndex: 'taskName'
    },
    {
      title: '申请时间',
      dataIndex: ''
    },
    {
      title: '主管审核时间',
      dataIndex: 'taskName'
    },
    {
      title: '财务审核时间',
      dataIndex: 'taskName'
    }
  ]
  public payload: OutSide.ReceivePayload = {
    pageCurrent: 1,
    pageSize: 15
  }
  public componentWillMount () {
    this.fetchData()
  }
  public fetchData () {
    fetchReceiveList(this.payload).then((res) => {
      this.setState({
        dataSource: res.records
      })
    })
  }
  public render () {
    const { dataSource } = this.state
    return (
      <div>
        <Table
          bordered
          columns={this.columns}
          dataSource={dataSource}
        />
      </div>
    )
  }
}
export default Main
