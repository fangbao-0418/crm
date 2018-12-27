import React from 'react'
import { Table, Tooltip } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { getCallMonitors } from '@/modules/stat/api'
import { PayloadProps } from './index'
import _ from 'lodash'
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
            <i className='fa fa-info-circle ml5 ml5' style={{color: '#C9C9C9'}}></i>
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
        return ((Math.round((record.callSuccessNums / (record.callInTotalNums + record.callOutTotalNums)) * 100)) || 0) + '%'
      }
    },
    {
      title: '通话时长',
      dataIndex: 'totalCallDuration',
      render: (text) => {
        return APP.fn.formatDuration(text)
      }
    },
    {
      title: '平均通话时长',
      dataIndex: 'averageCallDuration',
      render: (text) => {
        return APP.fn.formatDuration(text)
      }
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
      if (res && res.data) {
        const a = res.data.data || []
        const total = (res.data.pageTotal + 1)
        if (res.data.pageCurrent === Math.ceil(total / res.data.pageSize)) {
          res.totalData.salespersonName = '合计'
          a.push(_.cloneDeep(res.totalData))
        }
        pagination.total = total
        pagination.pageCurrent = res.data.pageCurrent
        pagination.pageSize = res.data.pageSize
        this.setState({
          dataSource: a,
          pagination
        })
      }
    })
  }
  public render () {
    const { pagination } = this.state
    console.log(this.state.dataSource, 'datasource')
    return (
      <div>
        <Table
          rowKey='id'
          columns={this.columns}
          dataSource={this.state.dataSource}
          pagination={{
            total: pagination.total,
            pageSize: pagination.pageSize,
            current: pagination.pageCurrent,
            showQuickJumper: true,
            showSizeChanger: true,
            size: 'small',
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
