import React from 'react'
import { Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { DetailProps } from './open'
interface States {
  dataSource: DetailProps[]
  selectedRowKeys: string[]
}
class Main extends React.Component {
  public state: States = {
    dataSource: [],
    selectedRowKeys: []
  }
  public columns: ColumnProps<DetailProps>[] = [{
    title: '客户名称',
    dataIndex: 'customerName'
  }, {
    title: '联系人',
    dataIndex: 'contactPerson'
  }, {
    title: '联系电话',
    dataIndex: 'contactPhone'
  }, {
    title: '空置天数',
    dataIndex: 'freeDays'
  }, {
    title: '跟进次数',
    dataIndex: 'trackTimesNums'
  }, {
    title: '释放次数',
    dataIndex: 'releaseTimes'
  }, {
    title: '客户来源',
    dataIndex: 'customerSource'
  }, {
    title: '释放时间',
    dataIndex: 'lastReleaseTime'
  }, {
    title: '释放销售',
    dataIndex: 'lastReleaseSalesperson'
  }]
  public onSelectAllChange () {
    console.log('select')
  }
  public render () {
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectAllChange.bind(this)
    }
    return (
      <div>
        <Table
          columns={this.columns}
          dataSource={this.state.dataSource}
          rowSelection={rowSelection}
          bordered
          rowKey={'customerId'}
        />
      </div>
    )
  }
}
export default Main
