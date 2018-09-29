import React from 'react'
import { Table, Input } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { connect } from 'react-redux'
import { saveAutoAssign } from './api'
import { changeAutoAssignAction } from './actions'
type DetailProps = Customer.AutoAssignProps
class Main extends React.Component<Customer.Props> {
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
      return (
        <Input
          onChange={this.onChange.bind(this, index, 'autoDistributeWeight')}
          onBlur={this.save.bind(this)}
          value={text}
        />
      )
    }
  }, {
    title: '自动分配日最大值',
    dataIndex: 'autoDistributeMaxNum',
    render: (text, record, index) => {
      return (
        <Input
          onChange={this.onChange.bind(this, index, 'autoDistributeMaxNum')}
          onBlur={this.save.bind(this)}
          value={text}
        />
      )
    }
  }]
  public componentWillMount () {
    changeAutoAssignAction()
  }
  public onChange (index: number, field: string, e: React.SyntheticEvent) {
    console.log(field)
    let value = String($(e.target).val())
    const dataSource: any = this.props.autoAssign
    if (field === 'autoDistributeWeight' && value && /^([0-9]|10)$/.test(value) === false) {
      value = '10'
      APP.error('权值只能是1-10')
    }
    dataSource[index][field] = value
    console.log(dataSource, 'dataSource')
    APP.dispatch({
      type: 'change customer data',
      payload: {
        autoAssign: dataSource
      }
    })
  }
  public save () {
    const dataSource: any = this.props.autoAssign
    saveAutoAssign(dataSource)
  }
  public render () {
    return (
      <Table
        columns={this.columns}
        dataSource={this.props.autoAssign}
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
