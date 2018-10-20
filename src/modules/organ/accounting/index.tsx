import React from 'react'
import { Table, Input, Divider, Modal as AntdModal } from 'antd'
import { fetchAccountingList, delAccounting, setAccounting } from '../api'
import Modal from 'pilipa/libs/modal'
import AccountingModal from './AccountingModal'

const Search = Input.Search

interface State {
  pageTotal: number // 列表总数
  dataSource: any[] // 数据源
}

class Main extends React.Component<any, State> {

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

  public componentWillReceiveProps (nextProps: any) {
    if (nextProps.showAccountingModal - this.props.showAccountingModal === 1) { // 该条件代表点击添加
      this.setAccounting('add')
    }
  }

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
    AntdModal.confirm({
      title: '删除机构',
      content: '确认要删除吗？',
      onOk: () => {
        delAccounting(id)
          .then((res) => {
            this.getList()
          })
          .catch((err: any) => {
            APP.error(err.responseJSON.errors[0].message)
          })
      }
    })
  }

  // 添加修改机构
  public setAccounting (mode: 'add' | 'modify', id?: number) {
    const modal = new Modal({
      content: (
        <AccountingModal
          id={id}
          onOk={(val) => {
            console.log('val', val)
            const payload: any = {name: val.name}
            if (mode === 'modify') {payload.id = id}
            setAccounting(payload).then((res) => {
              this.getList()
              modal.hide()
            })
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

    const columns = [
      {
        title: '机构名称',
        dataIndex: 'name'
      },
      {
        title: '核算地区范围',
        dataIndex: 'cityNames',
        render: (val: any) => {
          let str = ''
          val.forEach((item: {regionCityName: string}) => {
            str += item.regionCityName + ','
          })
          str = str.slice(0, str.length - 1)
          return (
            <span>{str}</span>
          )
        }
      },
      {
        title: '操作',
        render: (val: any, item: any) => {
          return (
            <div>
              <a onClick={() => {this.setAccounting('modify', item.id)}}>修改</a>
              <Divider type='vertical' />
              <a onClick={() => {this.delAccounting(item.id)}}>删除</a>
            </div>
          )
        }
      }
    ]

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
            columns={columns}
            dataSource={this.state.dataSource}
            rowKey='id'
            pagination={{
              showQuickJumper: true,
              total: this.state.pageTotal,
              onChange: (pageCurrent, pageSize) => {
                this.searchVal.pageCurrent = pageCurrent
                this.searchVal.pageSize = pageSize
                this.getList()
              }
            }}
          />
        </div>
      </div>
    )

  }
}
export default Main
