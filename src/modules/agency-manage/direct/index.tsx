import React from 'react'
import { Table, Divider } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { fetchDirectList, changeCompanyInfo } from '../api'
import { Modal } from 'pilipa'
import Detail from './detail'
interface State {
  pagination?: Common.PaginationProps
  dataSource?: Organ.DirectItemProps[]
}
class Main extends React.Component<{}, State> {
  public state: State = {
    dataSource: []
  }
  public payload: Organ.DirectSearchPayload = {
    // companyType: 'DirectCompany',
    companyType: 'Agent',
    pageCurrent: 1,
    pageSize: 10
  }
  public columns: ColumnProps<Organ.DirectItemProps>[] = [
    {
      title: '直营',
      dataIndex: 'name'
    },
    {
      title: '区域',
      render: (text, record) => {
        return (
          <span>{record.regionProvinceName}-{record.regionCityName}</span>
        )
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime'
    },
    {
      title: '操作',
      width: 160,
      align: 'center',
      render: (text, record) => {
        return (
          <div>
            <span
              className='href'
              onClick={() => {
                this.show('view', record)
              }}
            >
              查看
            </span>
            <Divider type='vertical' />
            <span
              className='href'
              onClick={() => {
                this.show('update', record)
              }}
            >
              修改
            </span>
            <Divider type='vertical' />
            <span
              className='href'
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
    fetchDirectList(this.payload).then((res) => {
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
  public show (type: 'view' | 'update', record: Organ.DirectItemProps) {
    const modal = new Modal({
      title: '新增',
      content: (
        <Detail
          disabled={type === 'view'}
          item={record}
          onOk={(values) => {
            console.log(values)
            changeCompanyInfo(values).then((res) => {
              this.fetchList()
            })
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
  public render () {
    const { dataSource } = this.state
    return (
      <div>
        <div>
          <Table
            bordered
            columns={this.columns}
            dataSource={dataSource}
          />
        </div>
      </div>
    )
  }
}
export default Main
