import React from 'react'
import { Table } from 'antd'
import Content from '@/modules/common/content'
import { Modal } from 'pilipa'
import SettingPanel from './panel'
interface State {
  dataSource: Setting.ItemProps[]
}
class Main extends React.Component {
  public columns = [
    {
      title: '大区',
      dataIndex: 'regionName'
    },
    {
      title: '省市'
    },
    {
      title: '机构'
    },
    {
      title: '呼叫供应商'
    },
    {
      title: '自动分配'
    },
    {
      title: '分配权值'
    },
    {
      title: '日分配上限'
    },
    {
      title: '操作',
      render: () => {
        return (
          <span
            className='href'
            onClick={() => {
              this.showPanel()
            }}
          >
            设置
          </span>
        )
      }
    }
  ]
  public state: State = {
    dataSource: [
      {
        regionName: 'xxxxx'
      }
    ]
  }
  public showPanel () {
    const modal = new Modal({
      title: 'CRM设置',
      content: <SettingPanel />
    })
    modal.show()
  }
  public render () {
    return (
      <Content
        title='CRM设置'
      >
        <Table
          columns={this.columns}
          dataSource={this.state.dataSource}
        />
      </Content>
    )
  }
}
export default Main
