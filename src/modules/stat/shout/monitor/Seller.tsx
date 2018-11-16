import React from 'react'
import { Table, Tooltip } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { getCallMonitors } from '@/modules/stat/api'
import moment from 'moment'
import { PayloadProps } from './index'
interface State {
  dataSource: CrmStat.MonitorItemProps[]
  pagination: {
    pageSize: number,
    pageCurrent: number,
    total: number
  }
}
interface Props {
  payload: PayloadProps
}
class Main extends React.Component<Props, State> {
  public payload: PayloadProps = this.props.payload
  public state: State = {
    dataSource: [],
    pagination: {
      pageCurrent: this.payload.pageCurrent,
      pageSize: this.payload.pageSize,
      total: 0
    }
  }
  public columns: ColumnProps<CrmStat.MonitorItemProps>[] = [
    {
      title: '坐席',
      dataIndex: 'salespersonName'
    },
    {
      title: (
        <span>
          坐席账号
          <Tooltip title='座席账号修改、绑定请至账号管理中心设置'>
            <i className='fa fa-exclamation-circle ml5'></i>
          </Tooltip>
        </span>
      ),
      dataIndex: 'siteNumber'
    },
    {
      title: '呼入量',
      dataIndex: 'callInTotalNums'
    },
    {
      title: '呼出量',
      dataIndex: 'callOutTotalNums'
    },
    {
      title: '接通量',
      dataIndex: 'callSuccessNums'
    },
    {
      title: '接通率',
      render: (text, record) => {
        return ((Math.round((record.callSuccessNums / (record.callInTotalNums + record.callOutTotalNums)) * 100) / 100) || 0) + '%'
      }
    },
    {
      title: '通话时长',
      dataIndex: 'totalCallDuration'
    },
    {
      title: '平均通话时长',
      dataIndex: 'averageCallDuration'
    },
    {
      title: '小组',
      dataIndex: 'salespersonGroupName'
    }
  ]
  public componentDidMount () {
    this.fetchList()
  }
  public fetchList () {
    const { pagination } = this.state
    return getCallMonitors(this.payload).then((res) => {
      pagination.total = res.totalCount
      pagination.pageCurrent = res.pageCurrent
      pagination.pageSize = res.pageSize
      this.setState({
        dataSource: res.data,
        pagination
      })
    })
  }
  public onChange (value: {[field: string]: {label: string, value: string}}) {
    if (value.date.value.split('至').length === 2) {
      this.payload.callTimeBeginDate = value.date.value.split('至')[0]
      this.payload.callTimeEndDate = value.date.value.split('至')[1]
    } else {
      this.payload.callTimeBeginDate = moment().add(value.date.value, 'day').format('YYYY-MM-DD')
      this.payload.callTimeEndDate = moment().format('YYYY-MM-DD')
    }
    this.fetchList()
  }
  public render () {
    const { pagination } = this.state
    return (
      <div>
        <Table
          columns={this.columns}
          dataSource={this.state.dataSource}
          pagination={{
            total: pagination.total,
            pageSize: pagination.pageSize,
            current: pagination.pageCurrent,
            showQuickJumper: true,
            showSizeChanger: true,
            showTotal: (total) => {
              return `共计 ${total} 条`
            },
            onChange: (current) => {
              this.payload.pageCurrent = current
              this.fetchList()
            },
            onShowSizeChange: (current, pageSize) => {
              this.payload.pageCurrent = 1
              this.payload.pageSize = pageSize
              this.fetchList()
            },
            pageSizeOptions: ['15', '30', '50', '80', '100', '200']
          }}
        />
      </div>
    )
  }
}
export default Main
