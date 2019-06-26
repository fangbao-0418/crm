import React from 'react'
import { Table, Radio } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { fetchOperateList } from '@/modules/signed/api'
import moment from 'moment'
const RadioGroup = Radio.Group
export interface DetailProps {
  opetarePerson: string
  opetareTime: string
  opetareContent: string
}
interface States {
  data: DetailProps[]
}
interface Props {
  customerId: string
}
export default class extends React.Component<Props>  {
  public state: States = {
    data: []
  }
  public columns: ColumnProps<DetailProps>[] = [{
    title: '操作人',
    width: 100,
    dataIndex: 'operatorName'
  }, {
    title: '操作时间',
    width: 150,
    dataIndex: 'operationTime',
    render: (val) => {
      return (
        <span>{!!val && moment(val).format('YYYY-MM-DD')}</span>
      )
    }
  }, {
    title: '操作内容',
    dataIndex: 'dataMode.description'
  }]
  public componentWillMount () {
    const customerId = this.props.customerId
    fetchOperateList(customerId).then((res) => {
      this.setState({
        data: res
      })
    })
  }
  public render () {
    return (
      <div>
        <Table
          columns={this.columns}
          dataSource={this.state.data}
          pagination={false}
          rowKey={'opetarePerson'}
        />
      </div>
    )
  }
}
