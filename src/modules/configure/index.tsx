import React from 'react'
import ContentBox from '@/modules/common/content'
import AddButton from '@/modules/common/content/AddButton'
import { Input, Select, Table, Divider } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { Modal } from 'pilipa'
import Detail from './Detail'
import { fetchList, add, update, deleteDict } from './api'
const Search = Input.Search
const Option = Select.Option
interface States {
  dataSource: Configure.ItemProps[]
  pagination: {
    current: number,
    pageSize: number,
    total: number
  }
}
class Main extends React.Component<null, States> {
  public state: States = {
    dataSource: [],
    pagination: {
      current: 1,
      pageSize: 15,
      total: 0
    }
  }
  public payload: Configure.SearchPayload = {
    pageCurrent: 1,
    pageSize: 15
  }
  public columns: ColumnProps<Configure.ItemProps>[] = [
    {
      title: 'Key值',
      dataIndex: 'value'
    },
    {
      title: '键值',
      dataIndex: 'name'
    },
    {
      title: '类型',
      dataIndex: 'typeCode'
    },
    {
      title: '描述',
      dataIndex: 'typeName'
    },
    {
      title: '操作',
      render: (text, record) => {
        return (
          <div>
            <span
              className='href'
              onClick={this.showDetail.bind(this, record)}
            >
              查看
            </span>
            <Divider type='vertical'/>
            <span
              className='href'
              onClick={this.delete.bind(this, record)}
            >
              删除
            </span>
          </div>
        )
      }
    }
  ]
  public componentWillMount () {
    this.fetchList()
  }
  public fetchList () {
    this.payload.typeCode = this.payload.typeCode || undefined
    fetchList(this.payload).then((res) => {
      this.setState({
        dataSource: res.records,
        pagination: {
          total: res.pageTotal,
          pageSize: res.pageSize,
          current: res.pageCurrent
        }
      })
    })
  }
  public showDetail (record?: Configure.ItemProps) {
    const modal = new Modal({
      title: !record ? '添加' : '查看',
      content: (
        <Detail
          item={record}
          onOk={(values) => {
            if (!record) {
              add(values).then(() => {
                this.fetchList()
              })
            } else {
              update(values).then(() => {
                this.fetchList()
              })
            }
            modal.hide()
          }}
          onCancel={() => {
            modal.hide()
          }}
        />
      ),
      footer: null
    })
    modal.show()
  }
  public delete (record: Configure.ItemProps) {
    deleteDict(record.id).then(() => {
      this.fetchList()
    })
  }
  public render () {
    const { dataSource, pagination } = this.state
    return (
      <ContentBox
        title='配置中心'
        rightCotent={(
          <AddButton
            title='添加键值'
            onClick={this.showDetail.bind(this)}
          />
        )}
      >
        <div className='mb10'>
          <Search
            placeholder='请输入键值名称'
            onSearch={(value) => {
              this.payload.typeCode = value
              this.fetchList()
            }}
            style={{ width: 200 }}
            className='mr5'
          />
          <Select
            style={{ width: 120 }}
          >
            <Option value='jack'>Jack</Option>
          </Select>
        </div>
        <div>
          <Table
            columns={this.columns}
            dataSource={dataSource}
            pagination={{
              total: pagination.total,
              current: pagination.current,
              pageSize: pagination.pageSize
            }}
          />
        </div>
      </ContentBox>
    )
  }
}
export default Main
