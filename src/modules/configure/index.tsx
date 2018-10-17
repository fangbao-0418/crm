import React from 'react'
import ContentBox from '@/modules/common/content'
import AddButton from '@/modules/common/content/AddButton'
import { Input, Select, Table, Divider, Button } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { Modal } from 'pilipa'
import Detail from './Detail'
import { fetchList, add, update, deleteDict, fetchDirecTypeList } from './api'
const Search = Input.Search
const Option = Select.Option
const styles = require('./style')
interface States {
  dataSource: Configure.ItemProps[]
  pagination: {
    current: number,
    pageSize: number,
    total: number
  }
  typeList: Configure.TypeProps[]
  selectedRowKeys: string[]
}
class Main extends React.Component<null, States> {
  public state: States = {
    dataSource: [],
    pagination: {
      current: 1,
      pageSize: 15,
      total: 0
    },
    typeList: [],
    selectedRowKeys: []
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
              修改
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
    fetchDirecTypeList().then((res) => {
      this.setState({
        typeList: res
      })
    })
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
      title: !record ? '添加' : '修改',
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
  public batchDelete () {
    const { selectedRowKeys } = this.state
    console.log(selectedRowKeys, 'selectedRowKeys')
  }
  public render () {
    const { dataSource, pagination, typeList } = this.state
    const rowSelection = {
      onChange: (selectedRowKeys: string[]) => {
        this.setState({
          selectedRowKeys
        })
      }
    }
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
            onChange={(value) => {
              if (value === 'all') {
                this.payload.typeCode = undefined
              } else {
                this.payload.typeCode = String(value)
              }
              this.fetchList()
            }}
          >
            <Option key='all'>全部</Option>
            {
              typeList.map((item) => {
                return (
                  <Option key={item.typeCode}>{item.typeName}</Option>
                )
              })
            }
          </Select>
        </div>
        <div className={styles.table}>
          <Table
            rowSelection={rowSelection}
            columns={this.columns}
            dataSource={dataSource}
            pagination={{
              total: pagination.total,
              current: pagination.current,
              pageSize: pagination.pageSize
            }}
          />
          <div className={styles.operate}>
            <Button
              type='primary'
              onClick={this.batchDelete.bind(this)}
            >
              批量删除
            </Button>
          </div>
        </div>
      </ContentBox>
    )
  }
}
export default Main
