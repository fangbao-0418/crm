import React from 'react'
import { Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { DetailProps } from './set'
import ContentBox from '@/modules/common/content'
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
    title: '大区',
    dataIndex: 'customerName'
  }, {
    title: '省市',
    dataIndex: 'contactPerson'
  }, {
    title: '机构名称',
    dataIndex: 'contactPhone'
  }, {
    title: '自动分配权值',
    dataIndex: 'can'
  }, {
    title: '自动分配日最大值',
    dataIndex: 'flowtime'
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
      <ContentBox>
        <Table
          columns={this.columns}
          dataSource={this.state.dataSource}
          rowSelection={rowSelection}
          bordered
          rowKey={'customerId'}
        />
      </ContentBox>
    )
  }
}
export default Main
