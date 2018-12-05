import React from 'react'
import { Table, Pagination } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { getSalesRank } from '@/modules/stat/api'
import { PayloadProps } from './SaleDetail'

interface Props {
  payload: PayloadProps
}
interface State {
  dataSource: CrmStat.SalesRankItemProps[]
  // pagination: {
  //   pageSize: number,
  //   pageCurrent: number,
  //   total: number
  // }
}
class Main extends React.Component<Props, State> {
  public payload: PayloadProps = this.props.payload
  public state: State = {
    dataSource: [],
    // pagination: {
    //   pageSize: this.payload.pageSize,
    //   pageCurrent: this.payload.pageCurrent,
    //   total: 0
    // }
  }
  public columns: ColumnProps<CrmStat.SalesRankItemProps>[] = [
    {
      title: '销售',
      dataIndex: 'callDetailInfos.salespersonName'
    },
    {
      title: '通话量',
      dataIndex: 'ReportByDays.callTotalNums'
    },
    {
      title: '接通量',
      dataIndex: 'ReportByDays.callSuccessNums'
    },
    {
      title: '接通率',
      dataIndex: 'averageCallSuccessPercent'
    },
    {
      title: '通话时长',
      dataIndex: 'callDetailInfos.totalCallDuration'
    },
    {
      title: '30s接通量',
      dataIndex: 'callDetailInfos.callSuccessLte30SecondNums'
    },
    {
      title: '60s接通量',
      dataIndex: 'callDetailInfos.callSuccessLte60SecondNums'
    },
    {
      title: '60s以上接通量',
      dataIndex: 'callDetailInfos.callSuccessGt60SecondNums'
    }
  ]
  public componentWillMount () {
    this.fetchList()
  }
  public fetchList () {
    // const { pagination } = this.state
    return getSalesRank(this.payload).then((res) => {
      // pagination.pageCurrent = res.pageCurrent
      // pagination.pageSize = res.pageSize
      // pagination.total = res.pageTotal
      this.setState({
        dataSource: res.data,
        // pagination
      })
    })
  }
  public render () {
    // const { pagination } = this.state
    return (
      <div>
        <Table
          columns={this.columns}
          dataSource={this.state.dataSource}
          pagination={{
            // total: pagination.total,
            // pageSize: pagination.pageSize,
            // current: pagination.pageCurrent,
            // onChange: (current) => {
            //   this.payload.pageCurrent = current
            //   this.fetchList()
            // },
            showTotal: (total) => {
              return `共计 ${total}条`
            },
            showQuickJumper: true,
            showSizeChanger: true,
            // onShowSizeChange: (current, pageSize) => {
            //   this.payload.pageCurrent = 1
            //   this.payload.pageSize = pageSize
            //   this.fetchList()
            // },
            pageSizeOptions: ['15', '30', '50', '80', '100', '200']
          }}
        />
      </div>
    )
  }
}

export default Main
