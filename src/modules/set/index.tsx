import React from 'react'
import { Table, Tabs } from 'antd'
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
  public columnstab1: ColumnProps<DetailProps>[] = [{
    title: '大区',
    dataIndex: 'bigAreaName'
  }, {
    title: '省市',
    dataIndex: 'cityName'
  }, {
    title: '机构名称',
    dataIndex: 'agencyName'
  }, {
    title: '自动分配权值',
    dataIndex: 'autoDistributeWeight'
  }, {
    title: '自动分配日最大值',
    dataIndex: 'autoDistributeMaxNum'
  }]
  public columnstab2: ColumnProps<DetailProps>[] = [{
    title: '大区',
    dataIndex: 'bigAreaName'
  }, {
    title: '省市',
    dataIndex: 'cityName'
  }, {
    title: '机构名称',
    dataIndex: 'agencyName'
  }, {
    title: '销售库容',
    dataIndex: 'storageCapacity'
  }, {
    title: '最大跟进期',
    dataIndex: 'maxTrackDays'
  }, {
    title: '最大保护期',
    dataIndex: 'maxProtectDays'
  }]
  public onSelectAllChange () {
    console.log('select')
  }
  public callback (key: string) {
    console.log('key', key)
  }
  public render () {
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectAllChange.bind(this)
    }
    return (
      <ContentBox title='客户设置'>
        <Tabs defaultActiveKey='1' onChange={this.callback}>
          <Tabs.TabPane tab='自动分配设置' key='1'>
            <Table
              columns={this.columnstab1}
              dataSource={this.state.dataSource}
              rowSelection={rowSelection}
              bordered
              rowKey={'customerId'}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab='库容设置' key='2'>
            <Table
              columns={this.columnstab2}
              dataSource={this.state.dataSource}
              rowSelection={rowSelection}
              bordered
              rowKey={'customerId'}
            />
          </Tabs.TabPane>
        </Tabs>
      </ContentBox>
    )
  }
}
export default Main
