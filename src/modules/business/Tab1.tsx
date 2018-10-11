import React from 'react'
import { Table, Button } from 'antd'
import { ColumnProps } from 'antd/lib/table'
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
  pagination: {
    total: number
    current: number
    pageSize: number
  }
}
class Main extends React.Component<Props> {
  public state: States = {
    dataSource: [],
    selectedRowKeys: [],
    pagination: {
      total: 0,
      current: 1,
      pageSize: 15
    }
  }
  public pageSizeOptions = ['15', '30', '50', '80', '100', '200']
  public componentWillMount () {
    this.fetchList()
  }
  public fetchList () {
    const params = _.cloneDeep(this.props.params)
    const pagination = this.state.pagination
    params.pageSize = pagination.pageSize
    params.pageCurrent = pagination.current
    fetchList(params).then((res) => {
      pagination.total = res.pageTotal
      this.setState({
        pagination,
        dataSource: res.data
      })
    })
  }
  public handlePageChange (page: number) {
    const { pagination } = this.state
    pagination.current = page
    this.setState({
      pagination
    }, () => {
      this.fetchList()
    })
  }
  public onShowSizeChange (current: number, size: number) {
    const { pagination } = this.state
    pagination.current = current
    pagination.pageSize = size
    this.setState({
      pagination
    }, () => {
      this.fetchList()
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
    const { pagination } = this.state
    return (
      <div>
        <Table
          columns={this.props.columns}
          dataSource={this.state.dataSource}
          rowSelection={rowSelection}
          bordered
          rowKey={'id'}
          pagination={{
            onChange: this.handlePageChange.bind(this),
            onShowSizeChange: this.onShowSizeChange.bind(this),
            total: pagination.total,
            current: pagination.current,
            pageSize: pagination.pageSize,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: this.pageSizeOptions,
            showTotal (total) {
              return `共计 ${total} 条`
            }
          }}
        />
        <div className='btn-position'>
          {/* <Button type='primary' className='mr5' onClick={this.props.haneleSelectAll.bind(this, this.state.selectedRowKeys, 1)}>批量预约</Button> */}
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
