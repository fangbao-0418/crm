import React from 'react'
import ContentBox from '@/modules/common/content'
import { Input, Select, Table, Divider, DatePicker } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { fetchList } from './api'
const Search = Input.Search
const Option = Select.Option
const { RangePicker } = DatePicker
interface State {
  dataSource?: OperateLog.ItemProps[]
  pagination: Common.PaginationProps
}
class Main extends React.Component<null, State> {
  public state: State = {
    dataSource: [],
    pagination: {
      total: 0,
      pageSize: 10,
      current: 1
    }
  }
  public payload: OperateLog.SearchPayload = {
    pageCurrent: 1,
    pageSize: 10
  }
  public columns: ColumnProps<OperateLog.ItemProps>[] = [
    {
      title: '操作时间',
      dataIndex: 'operationTime'
    },
    {
      title: '操作人',
      dataIndex: 'operatorName'
    },
    {
      title: '操作事件',
      dataIndex: 'operatorName'
    },
    {
      title: '操作',
      render: (text, record) => {
        return (
          <div>
            <span
              className='href'
              onClick={() => {
                APP.history.push(`/operate-log/detail/${record.operatorId}`)
              }}
            >
              查看
            </span>
            {/* <Divider type='vertical'/> */}
            {/* <span className='href'>删除</span> */}
          </div>
        )
      }
    }
  ]
  public componentWillMount () {
    this.fetchList()
  }
  public fetchList () {
    fetchList(this.payload).then((res) => {
      this.setState({
        dataSource: res.records,
        pagination: {
          total: res.pageTotal,
          current: res.pageCurrent,
          pageSize: res.pageSize
        }
      })
    })
  }
  public render () {
    const { dataSource, pagination } = this.state
    return (
      <ContentBox
        title='操作日志'
      >
        <div className='mb10'>
          <Search
            placeholder='请输入操作人'
            onSearch={(value) => {
              this.payload.operatorName = value
              this.fetchList()
            }}
            style={{ width: 200 }}
            className='mr5'
          />
          <RangePicker
            onChange={(current) => {
              this.payload.operationStartTime = current[0].format('YYYY-MM-DD HH:mm:ss')
              this.payload.operationEndTime = current[1].format('YYYY-MM-DD HH:mm:ss')
              this.fetchList()
            }}
          />
        </div>
        <div>
          <Table
            columns={this.columns}
            dataSource={dataSource}
            pagination={{
              total: pagination.total,
              current: pagination.current,
              pageSize: pagination.pageSize,
              onChange: (page) => {
                pagination.current = page
                this.setState({
                  pagination
                })
                this.payload.pageCurrent = page
                this.fetchList()
              },
              showQuickJumper: true,
              showSizeChanger: true,
              onShowSizeChange: (current, size) => {
                this.payload.pageSize = size
                this.fetchList()
              },
              showTotal: (total) => {
                return `共计${total}条`
              }
            }}
          />
        </div>
      </ContentBox>
    )
  }
}
export default Main
