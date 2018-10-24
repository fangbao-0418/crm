import React from 'react'
import { Table, Button } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { fetchList } from './api'
import _ from 'lodash'
import { connect } from 'react-redux'
type DetailProps = Business.DetailProps
interface Props extends Business.Props {
  columns: ColumnProps<DetailProps>[]
  params: Business.SearchProps
  handleSelectAll?: (selectedRowKeys: string[], type: number) => void
}
interface States {
  selectedRowKeys: string[]
}
class Main extends React.Component<Props, States> {
  public state: States = {
    selectedRowKeys: []
  }
  public pageSizeOptions = ['15', '30', '50', '80', '100', '200']
  public componentWillMount () {
    this.fetchList()
  }
  public fetchList () {
    const params = _.cloneDeep(this.props.params)
    const pagination = this.props.tab3.pagination
    params.pageSize = pagination.pageSize
    params.pageCurrent = pagination.current
    fetchList(params).then((res) => {
      pagination.total = res.pageTotal
      APP.dispatch<Business.Props>({
        type: 'change business data',
        payload: {
          tab3: {
            searchPayload: params,
            pagination,
            dataSource: res.data
          }
        }
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
  public handlePageChange (page: number) {
    const { pagination } = this.props.tab3
    pagination.current = page
    APP.dispatch<Business.Props>({
      type: 'change business data',
      payload: {
        tab3: {
          pagination
        }
      }
    })
    this.fetchList()
  }
  public onShowSizeChange (current: number, size: number) {
    const { pagination } = this.props.tab3
    pagination.current = current
    pagination.pageSize = size
    APP.dispatch<Business.Props>({
      type: 'change business data',
      payload: {
        tab3: {
          pagination
        }
      }
    })
    this.fetchList()
  }
  public render () {
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectAllChange.bind(this)
    }
    const { pagination, dataSource } = this.props.tab3
    return (
      <div>
        <Table
          columns={this.props.columns}
          dataSource={dataSource}
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
          {
            APP.hasPermission('crm_business_mine_list_appoint') &&
            <Button type='primary' className='mr5' onClick={this.handleSelectAll.bind(this, 1)}>批量预约</Button>
          }
          {
            APP.hasPermission('crm_business_mine_list_distribute') &&
            <Button type='primary' className='mr5' onClick={this.handleSelectAll.bind(this, 2)}>转销售</Button>
          }
          {
            APP.hasPermission('crm_business_mine_list_sea') &&
            <Button type='primary' className='mr5' onClick={this.handleSelectAll.bind(this, 3)}>转公海</Button>
          }
          {
            APP.hasPermission('crm_business_mine_list_pool') &&
            <Button type='primary' className='mr5' onClick={this.handleSelectAll.bind(this, 4)}>转客资池</Button>
          }
        </div>
      </div>
    )
  }
}
export default connect((state: Reducer.State) => {
  return state.business
})(Main)
