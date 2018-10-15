import React from 'react'
import { Table, Input } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import ContentBox from '@/modules/common/content'
import { fetchListAction } from './action'
import { connect } from 'react-redux'
type PerfromItem = Perform.ItemProps

class Main extends React.Component<Perform.Props> {
  public values: {
    productName: string
  } = {
    productName: ''
  }
  public columns: ColumnProps<PerfromItem>[] = [{
    title: '任务名称',
    dataIndex: 'name',
    render: (text, item) => {
      return <span>{item.productName}</span>
    }
  }, {
    title: '任务价格',
    dataIndex: 'productPrice',
    render: (text) => {
      return <span>{text}</span>
    }
  }, {
    title: '绩效额度',
    dataIndex: 'reward',
    render: (text, record, index) => {
      const disabled = record.disabled !== undefined ? record.disabled : true
      return (
        disabled ? (
          <span>{text}</span>
        )
        : (
          <Input
            value={text}
            onChange={(e) => {
              const dataSource = this.props.dataSource
              dataSource[index].reward = e.target.value
              this.changeData(dataSource)
            }}
          />
        )
      )
    }
  }, {
    title: '操作',
    dataIndex: 'operation',
    render: (text, record, index) => {
      return (
        <span>
          <span
            className='href'
            onClick={() => {
              const dataSource = this.props.dataSource
              const disabled = dataSource[index].disabled !== undefined ? dataSource[index].disabled : true
              dataSource[index].disabled = !disabled
              this.changeData(dataSource)
              if (!disabled) {
                // api
              }
            }}
          >
          {record.disabled === false ? '保存' : '编辑'}
          </span>
        </span>
      )
    }
  }]
  public componentWillMount () {
    this.fetchData()
  }
  public fetchData () {
    fetchListAction(this.values)
  }
  public changeData (dataSource: PerfromItem[]) {
    APP.dispatch<Perform.Props>({
      type: 'change perform data',
      payload: {
        dataSource
      }
    })
  }
  public render () {
    const pagintaion = this.props.pagintaion
    return (
      <ContentBox
        title='绩效配置'
      >
        <div>
          <Input.Search
            placeholder='请输入客户和联系人名称'
            onSearch={(value) => {
              this.values.productName = value
              this.fetchData()
            }}
            style={{width: 200, marginBottom: '25px'}}
          />
          <Table
            columns={this.columns}
            dataSource={this.props.dataSource}
            size='middle'
            pagination={{
              total: pagintaion.total,
              pageSize: pagintaion.pageSize,
              current: pagintaion.current
            }}
          />
        </div>
      </ContentBox>
    )
  }
}
export default connect((state: Reducer.State) => {
  return state.perform
})(Main)
