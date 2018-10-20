import React from 'react'
import Agent from '../direct'
import { ColumnProps } from 'antd/lib/table'
import { Divider } from 'antd'
import { Modal } from 'pilipa'
import Detail from '../direct/detail'
import { changeCompanyInfo } from '../api'
class Main extends React.Component {
  public columns: ColumnProps<Organ.DirectItemProps>[] = [
    {
      title: '代理商',
      dataIndex: 'name'
    },
    {
      title: '级别',
      render: (text, record) => {
        return (
          <span>{record.regionProvinceName}-{record.regionCityName}</span>
        )
      }
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
      title: '状态',
      dataIndex: 'companyStatus'
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
              const ins: any = this.refs.ins
              ins.fetchList()
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
    return (
      <Agent
        ref='ins'
        columns={this.columns}
        type='Agent'
      />
    )
  }
}
export default Main
