import React from 'react'
import { Table, Input } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { connect } from 'react-redux'
import { changeCapacityAction } from './actions'
import { saveStorageCapacity } from './api'
type DetailProps = Customer.CapacityProps
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
  public componentWillMount () {
    changeCapacityAction()
  }
  public onChange (index: number, field: string, e: React.SyntheticEvent) {
    const dataSource: any = this.props.capacity
    dataSource[index][field] = $(e.target).val()
    APP.dispatch({
      type: 'change customer data',
      payload: {
        capacity: dataSource
      }
    })
    saveStorageCapacity(dataSource)
  }
  public onSelectAllChange () {
    console.log('select')
  }
  public render () {
    return (
      <Table
        columns={this.columns}
        dataSource={this.props.capacity}
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
