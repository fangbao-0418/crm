import React from 'react'
import { Table, Input } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { connect } from 'react-redux'
type DetailProps = Customer.SetCapacity
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
    title: '销售库容',
    dataIndex: 'storageCapacity',
    render: (text, record, index) => {
      return <Input onChange={this.onChange.bind(this, index, 'storageCapacity')} value={text}/>
    }
  }, {
    title: '最大跟进期',
    dataIndex: 'maxTrackDays',
    render: (text, record, index) => {
      return <Input onChange={this.onChange.bind(this, index, 'maxTrackDays')} value={text}/>
    }
  }, {
    title: '最大保护期',
    dataIndex: 'maxProtectDays',
    render: (text, record, index) => {
      return <Input onChange={this.onChange.bind(this, index, 'maxProtectDays')} value={text}/>
    }
  }]
  public onChange (index: number, field: string, e: React.SyntheticEvent) {
    const dataSource: any = this.props.setCapacity
    dataSource[index][field] = $(e.target).val()
    APP.dispatch({
      type: 'change customer set capacity data',
      payload: {
        setCapacity: dataSource
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
        dataSource={this.props.setCapacity}
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
