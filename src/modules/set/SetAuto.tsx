import React from 'react'
import { Table, Input } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { connect } from 'react-redux'
type DetailProps = Customer.AutoAssignProps
interface States {
  selectedRowKeys: string[]
}
class Main extends React.Component<Customer.Props> {
  public state: States = {
    selectedRowKeys: []
  }
  public columns: ColumnProps<DetailProps>[] = [{
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
    dataIndex: 'autoDistributeWeight',
    render: (text, record, index) => {
      return <Input onChange={this.onChange.bind(this, index, 'autoDistributeWeight')} value={text}/>
    }
  }, {
    title: '自动分配日最大值',
    dataIndex: 'autoDistributeMaxNum',
    render: (text, record, index) => {
      return <Input onChange={this.onChange.bind(this, index, 'autoDistributeMaxNum')} value={text}/>
    }
  }]
  public onChange (index: number, field: string, e: React.SyntheticEvent) {
    const dataSource: any = this.props.autoAssign
    dataSource[index][field] = $(e.target).val()
    APP.dispatch({
      type: 'change customer set auto data',
      payload: {
        autoAssign: dataSource
      }
    })
  }
  public onSelectAllChange () {
    console.log('select')
  }
  public render () {
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectAllChange.bind(this)
    }
    return (
      <Table
        columns={this.columns}
        dataSource={this.props.autoAssign}
        rowSelection={rowSelection}
        bordered
        rowKey={'customerId'}
        pagination={false}
      />
    )
  }
}
export default connect((state: Reducer.State) => {
  return {
    ...state.customer
  }
})(Main)
