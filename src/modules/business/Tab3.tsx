import React from 'react'
import { Table, Button } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { PaginationConfig } from 'antd/lib/pagination'
import { fetchList } from './api'
import _ from 'lodash'
type DetailProps = Business.DetailProps
interface Props {
  columns: ColumnProps<DetailProps>[]
  params: Business.SearchProps
  handleSelectAll?: (selectedRowKeys: string[], type: number) => void
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
      pageSizeOptions: ['10', '20', '30', '40', '50'],
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
  public handleSelectAll (key: number) {
    if (this.props.handleSelectAll) {
      this.props.handleSelectAll(this.state.selectedRowKeys, key)
    }
  }
  public render () {
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectAllChange.bind(this)
    }
    return (
      <div>
        <Table
          columns={this.props.columns}
          dataSource={this.state.dataSource}
          rowSelection={rowSelection}
          bordered
          rowKey={'id'}
          pagination={this.state.pagination}
        />
        <div>
          <Button type='primary' className='mr5' onClick={this.handleSelectAll.bind(this, 1)}>批量预约</Button>
          <Button type='primary' className='mr5' onClick={this.handleSelectAll.bind(this, 2)}>转销售</Button>
          <Button type='primary' className='mr5' onClick={this.handleSelectAll.bind(this, 3)}>转公海</Button>
          <Button type='primary' className='mr5' onClick={this.handleSelectAll.bind(this, 4)}>转客资池</Button>
        </div>
      </div>
    )
  }
}
export default Main
