import React from 'react'
import ContentBox from '@/modules/common/content'
import {
  Button , Tabs, Table, Input
} from 'antd'

const stylus = require('./index.styl')

interface States {
  dataSource: string[]
}

const tableData = [{
  key: 1,
  name: '人力行政中心',
  children: [{
    key: 11,
    name: '人力咨询部'
  }, {
    key: 12,
    name: 'hrbp部'
  }, {
    key: 13,
    name: '行政运维部'
  }]
}, {
  key: 2,
  name: '营销中心',
  children: [{
    key: 21,
    name: '渠道部'
  }, {
    key: 22,
    name: '直营部'
  }]
}]
const columns = [
  { title: '部门名称', dataIndex: 'name', key: 'department',
    onHeaderCell: (column: any) => {
      return {
        style: {
          textIndent: '50px'
        }
      }
    }
  },
  { title: '操作', key: 'operation',
    width: 350,
    render: () => {
      return (
        <div>
          <a className={stylus.operate} href='javascript:;'>添加子部门</a>|
          <a className={stylus.operate} href='javascript:;'>修改</a>|
          <a className={stylus.operate} href='javascript:;'>禁用</a>|
          <a className={stylus.operate} href='javascript:;'>删除</a>
        </div>
      )
    },
    onHeaderCell: (column: any) => {
      return {
        style: {
          textAlign: 'center'
        }
      }
    }
  }
]

class AgentAccount extends React.Component<any, any> {
  public state: States = {
    dataSource: ['人力行政中心', '营销中心', '技术中心']
  }
  public onSelecttion (value: any) {
    console.log('onSelect', value)
  }

  public render () {
    const TabPane: any = Tabs.TabPane
    return (
      <div>
        <ContentBox title='代理商账号'>
          <div className={stylus.tabcon}>
          <Tabs
            defaultActiveKey='1'
            animated={false}
          >
            <TabPane tab='部门' key='1'>
              <div className={stylus.formitem}>
                {/* <AutoComplete
                  style={{ width: 200 }}
                  dataSource={this.state.dataSource}
                  placeholder='请输入名称'
                  onSelect={this.onSelecttion.bind(this)}
                /> */}
                <Input
                  placeholder='请输入名称'
                  style={
                    {
                      width: '200px'
                    }
                  }
                />
                <Button
                  type='primary'
                  style={
                    {
                      float:'right'
                    }
                  }
                >
                  添加一级部门
                </Button>
              </div>
              <Table
                className='components-table-demo-nested'
                columns={columns}
                dataSource={tableData}
              />
            </TabPane>
            <TabPane tab='账号' key='2'>Content of Tab Pane 2</TabPane>
            <TabPane tab='自定义角色' key='3'>Content of Tab Pane 3</TabPane>
          </Tabs>
        </div>
        </ContentBox>
      </div>
    )
  }
}

export default AgentAccount
