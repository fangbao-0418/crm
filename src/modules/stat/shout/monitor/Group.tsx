import React from 'react'
import { Table, Tooltip } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { getGroupCallMonitors } from '@/modules/stat/api'
import moment from 'moment'
import { PayloadProps } from './index'
interface Props {
  payload: PayloadProps
}
interface State {
  dataSource: CrmStat.MonitorGroupItemProps[]
}
class Main extends React.Component<Props, State> {
  public payload: PayloadProps = this.props.payload
  public state: State = {
    dataSource: []
  }
  public columns: ColumnProps<CrmStat.MonitorGroupItemProps>[] = [
    {
      title: '坐席小组',
      dataIndex: 'name'
    },
    {
      title: '呼入量',
      dataIndex: 'totalRecord.callInTotalNums'
    },
    {
      title: '呼出量',
      dataIndex: 'totalRecord.callOutTotalNums'
    },
    {
      title: '接通量',
      dataIndex: 'totalRecord.callSuccessNums'
    },
    {
      title: '接通率',
      render: (text, record) => {
        const totalRecord = Object.assign({
          callSuccessNums: 0,
          callInTotalNums: 0,
          callOutTotalNums: 0
        }, record.totalRecord)
        return ((Math.round((totalRecord.callSuccessNums / (totalRecord.callInTotalNums + totalRecord.callOutTotalNums)) * 100)) || 0) + '%'
      }
    },
    {
      title: '通话时长',
      dataIndex: 'totalRecord.totalCallDuration',
      render: (text) => {
        return APP.fn.formatDuration(text)
      }
    },
    {
      title: '平均通话时长',
      dataIndex: 'totalRecord.averageCallDuration',
      render: (text) => {
        return APP.fn.formatDuration(text)
      }
    },
    {
      title: '组内人数',
      dataIndex: 'totalRecord.groupNums'
    }
  ]
  public componentDidMount () {
    this.fetchList()
  }
  public fetchList (payload: PayloadProps = this.payload) {
    return getGroupCallMonitors(payload).then((res) => {
      this.setState({
        dataSource: res
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
    console.log(this.state.dataSource, 'xxx')
    return (
      <div>
        <Table
          columns={this.columns}
          dataSource={this.state.dataSource}
          childrenColumnName='organizationList'
          pagination={false}
        />
      </div>
    )
  }
}
export default Main
