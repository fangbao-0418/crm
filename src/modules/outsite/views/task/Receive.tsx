/** 领用详情 */
import React from 'react'
import { Table, Button } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { fetchReceiveList, auditReceive } from '@/modules/outsite/api'
import { Modal } from 'pilipa'
interface Props {
  id?: string
}
interface State {
  dataSource: OutSide.ReceiveItemProps[]
  pagination: {
    total: number,
    current: number,
    pageSize: number
  }
}
class Main extends React.Component<Props, State> {
  public payload: OutSide.ReceivePayload = {
    pageCurrent: 1,
    pageSize: 15
  }
  public state: State = {
    dataSource: [],
    pagination: {
      total: 0,
      pageSize: this.payload.pageSize,
      current: this.payload.pageCurrent
    }
  }
  public columns: ColumnProps<OutSide.ReceiveItemProps>[] = [
    {
      title: '子项目',
      dataIndex: 'subTaskName'
    },
    {
      title: '费用',
      dataIndex: 'charge'
    },
    {
      title: '已领金额',
      dataIndex: 'charge'
    },
    {
      title: '申请时间',
      dataIndex: 'createTime'
    },
    {
      title: '主管审核时间',
      dataIndex: 'principalAuditTime'
    },
    {
      title: '财务审核时间',
      dataIndex: 'financeAuditTime'
    },
    {
      title: '操作',
      align: 'center',
      width: 80,
      render: (text, record) => {
        if (record.requestStatus === 'APPLY') {
          return (
            <span
              className='href'
              onClick={this.handleAudit.bind(this, record)}
            >
              审核
            </span>
          )
        } else {
          return (
            <span
              className='disabled'
            >
              审核
            </span>
          )
        }
      }
    }
  ]
  public componentWillMount () {
    this.fetchData()
  }
  public handleAudit (record: OutSide.ReceiveItemProps) {
    const modal = new Modal({
      title: '领用单审核',
      content: (
        <div className='font14'>
          是否确定通过审核
        </div>
      ),
      footer: (
        <div className='text-right'>
          <Button
            type='primary'
            className='mr5'
            onClick={() => {
              this.audit(record.id, 'APPROVE').then(() => {
                this.fetchData()
                modal.hide()
              })
            }}
          >
            通过
          </Button>
          <Button
            onClick={() => {
              this.audit(record.id, 'REFUSE').then(() => {
                this.fetchData()
                modal.hide()
              })
            }}
          >
            驳回
          </Button>
        </div>
      )
    })
    modal.show()
  }
  public audit (id: number, auditStatus: 'APPROVE' | 'REFUSE') {
    const payload: any = {
      id,
      auditStatus,
      auditType: 'PRINCIPAL'
    }
    return auditReceive(payload)
  }
  public fetchData () {
    fetchReceiveList(this.payload).then((res) => {
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
      <div>
        <Table
          bordered
          columns={this.columns}
          dataSource={dataSource}
          pagination={{
            total: pagination.total,
            pageSize: pagination.pageSize,
            current: pagination.current,
            showQuickJumper: true,
            showTotal: (total) => {
              return `共计 ${total} 条`
            },
            showSizeChanger: true,
            pageSizeOptions: ['15', '30', '50', '80', '100', '200'],
            onShowSizeChange: (current, size) => {
              this.payload.pageCurrent = 1
              this.payload.pageSize = size
              this.fetchData()
            },
            onChange: (current) => {
              pagination.current = current
              this.payload.pageCurrent = current
              this.fetchData()
            }
          }}
        />
      </div>
    )
  }
}
export default Main
