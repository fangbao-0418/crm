import React from 'react'
import { Table, Input, Divider } from 'antd'
import { fetchAccountingList, delAccounting, changeAccounting } from '../api'
import Modal from 'pilipa/libs/modal'
import Detail from './Detail'
import { ColumnProps } from 'antd/lib/table'
const Search = Input.Search

interface State {
  pageTotal: number // 列表总数
  dataSource: Organ.AccountingItemProps[] // 数据源
}

class Main extends React.Component<any, State> {
  public columns: ColumnProps<Organ.AccountingItemProps>[] = [
    {
      title: '机构名称',
      dataIndex: 'name'
    },
    {
      title: '核算地区范围',
      dataIndex: 'regionList',
      width: 500,
      render: (text) => {
        text = text || []
        const arr: string[] = []
        text.forEach((item: {name: string}) => {
          arr.push(item.name)
        })
        const str = arr.join(',')
        return (
          <span>{str}</span>
        )
      }
    },
    {
      title: '操作',
      render: (val, item) => {
        return (
          <div>
            <a onClick={() => {this.setAccounting('modify', item)}}>修改</a>
            <Divider type='vertical' />
            <a onClick={() => {this.delAccounting(item.id)}}>删除</a>
          </div>
        )
      }
    }
  ]

  public searchVal = {
    pageCurrent: 1,
    pageSize: 10,
    name: ''
  }

  public state: State = {
    pageTotal: 0,
    dataSource: []
  }

  public componentWillMount () {
    this.getList()
  }

  // public componentWillReceiveProps (nextProps: any) {
  //   if (nextProps.showAccountingModal - this.props.showAccountingModal === 1) { // 该条件代表点击添加
  //     this.setAccounting('add')
  //   }
  // }

  // 获取列表
  public getList () {
    const {pageCurrent, pageSize, name} = this.searchVal
    fetchAccountingList(pageCurrent, pageSize, name).then((res) => {
      this.setState({
        pageTotal: res.pageTotal,
        dataSource: res.records
      })
    })
  }

  // 删除
  public delAccounting (id: number) {
    const modal = new Modal({
      content: (
        <div>确认要删除吗？</div>
      ),
      title: '删除机构',
      mask: true,
      onOk: () => {
        delAccounting(id).then(() => {
          this.getList()
          modal.hide()
        })
      }
    })
    modal.show()
  }

  // 添加修改机构
  public setAccounting (mode: 'add' | 'modify', item?: Organ.AccountingItemProps) {
    const modal = new Modal({
      content: (
        <Detail
          item={item}
          onOk={(vals) => {
            // const payload: any = {name: val.name}
            // if (mode === 'modify') {
            //   payload.id = id
            // }
            if (mode === 'modify') {
              vals.id = item.id
            }
            console.log(vals, 'vals')
            changeAccounting(vals).then(() => {
              APP.success('操作成功')
              this.getList()
              modal.hide()
            })
            // .catch((err: any) => {
            //   APP.error(err.responseJSON.errors[0].message)
            // })
          }}
          onCancel={() => {modal.hide()}}
        />
      ),
      title: mode === 'add' ? '新增核算中心' : '修改核算中心',
      mask: true,
      style: 'width: 500px;',
      footer: null
    })
    modal.show()
  }
  public render () {
    return (
      <div>
        <div className='mb10'>
          <Search
            className='inline-block middle mr5'
            placeholder='请输入机构名称'
            onSearch={(value) => {
              this.searchVal.name = value
              this.getList()
            }}
            style={{ width: 200 }}
          />
        </div>
        <div>
          <Table
            columns={this.columns}
            dataSource={this.state.dataSource}
            rowKey='id'
            pagination={{
              showQuickJumper: true,
              total: this.state.pageTotal,
              onChange: (pageCurrent, pageSize) => {
                this.searchVal.pageCurrent = pageCurrent
                this.searchVal.pageSize = pageSize
                this.getList()
              },
              showTotal (total) {
                return `共计 ${total} 条`
              }
            }}
          />
        </div>
      </div>
    )

  }
}
export default Main
