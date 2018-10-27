import React from 'react'
import Agent from '../direct'
import { ColumnProps } from 'antd/lib/table'
import { Divider, Modal as M } from 'antd'
import { Modal } from 'pilipa'
import Detail from '../direct/detail'
import { changeCompanyInfo, fetchCompanyDetail } from '../api'
class Main extends React.Component {
  public columns: ColumnProps<Organ.DirectItemProps>[] = [
    {
      title: '代理商',
      dataIndex: 'name'
    },
    // {
    //   title: '级别',
    //   render: (text, record) => {
    //     return (
    //       <span>{record.regionProvinceName}-{record.regionCityName}</span>
    //     )
    //   }
    // },
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
    // {
    //   title: '状态',
    //   dataIndex: 'companyStatus',
    //   render: (text) => {
    //     return APP.dictionary[`EnumOrganAgentSource-${text}`]
    //   }
    // },
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
            {/* <Divider type='vertical' /> */}
            {/* <span
              className='href'
              onClick={() => this.delete()}
            >
              删除
            </span> */}
          </div>
        )
      }
    }
  ]
  public show (type: 'view' | 'update', record: Organ.DirectItemProps) {
    let title = ''
    if (type === 'view') {
      title = '查看'
    } else {
      title = '修改'
    }
    if (record) {
      fetchCompanyDetail({id: record.id}).then((item) => {
        const modal = new Modal({
          title: `${title}`,
          content: (
            <Detail
              disabled={type === 'view'}
              type='agent'
              item={item}
              onOk={(values) => {
                if (type === 'update') {
                  changeCompanyInfo(values).then((res) => {
                    const ins: any = this.refs.ins
                    ins.fetchList()
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
      })
    }
  }
  // 确认删除
  // public delete = () => {
  //   M.confirm({
  //     title: '删除机构',
  //     content: '确定删除机构吗？',
  //     onOk: () => {
  //     }
  //   })
  // }
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
