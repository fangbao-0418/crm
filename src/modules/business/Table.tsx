import React from 'react'
import { Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { PaginationConfig } from 'antd/lib/pagination'
import { fetchList } from './api'
import _ from 'lodash'
type DetailProps = Business.DetailProps
interface Props {
  columns: ColumnProps<DetailProps>[]
  params: Business.SearchProps
}
interface States {
  dataSource: DetailProps[]
  selectedRowKeys: string[]
  pagination: PaginationConfig
}
class Main extends React.Component<Props> {
  public state: States = {
    dataSource: [],
    selectedRowKeys: [],
    pagination: {
      current: 1,
      pageSize: 15,
      showQuickJumper: true,
      showSizeChanger: true,
      pageSizeOptions: ['15', '30', '50', '80', '100', '200'],
      showTotal (total) {
        return `共计 ${total} 条`
      }
    }
  }
  public componentWillMount () {
    this.fetchList()
  }
  public fetchList () {
    const params = _.cloneDeep(this.props.params)
    const pagination = this.state.pagination
    params.pageSize = pagination.pageSize
    params.pageCurrent = pagination.current
    fetchList(params).then((res) => {
      const pagination2 = { ...this.state.pagination }
      pagination2.total = res.pageTotal
      this.setState({
        dataSource: res.data
      })
    })
  }
  public onSelectAllChange (selectedRowKeys: string[]) {
    this.setState({ selectedRowKeys })
  }
  public render () {
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectAllChange.bind(this)
    }
    return (
      <Table
        columns={this.props.columns}
        dataSource={this.state.dataSource}
        rowSelection={rowSelection}
        bordered
        rowKey={'customerId'}
        pagination={this.state.pagination}
      />
    )
  }
}
export default Main
