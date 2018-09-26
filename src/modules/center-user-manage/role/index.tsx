import React from 'react'
import { Button, Table, Divider, Modal } from 'antd'
import ContentBox from '@/modules/common/content'
import AddButton from '@/modules/common/content/AddButton'

const styles = require('./style')

interface State {
  tab: number
  selectedRowKeys: any[]
  dataSource: any[]
}

class Main extends React.Component {
  public state: State = {
    tab: 0,
    selectedRowKeys: [],
    dataSource: [
      {
        id: 1,
        name: '111'
      },
      {
        id: 2,
        name: '222'
      }
    ]
  }

  // 切换tab
  public changeTab = (tab: number) => {
    this.setState({tab})
  }

  // 多选事件触发
  public onSelectChange = (selectedRowKeys: any) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({ selectedRowKeys })
  }

  // 确认删除
  public delConfirm = () => {
    Modal.confirm({
      title: '删除账号',
      content: '确定删除账号吗？',
      onOk: () => {},
      onCancel: () => {}
    })
  }

  public render () {
    const { selectedRowKeys } = this.state
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'name'
      },
      {
        title: '操作',
        render: () => {
          return (
            <div>
              <a>修改</a>
              <Divider type='vertical'/>
              <a>添加子页面权限</a>
              <Divider type='vertical'/>
              <a>禁用</a>
              <Divider type='vertical'/>
              <a>删除</a>
            </div>
          )
        }
      }
    ]

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    }

    return (
      <ContentBox
        title='角色'
        rightCotent={(
          <AddButton
            title='添加角色'
            onClick={() => {}}
          />
        )}
      >
        <div className={styles.wrap}>

          <div className={styles.tabWrap}>
            <div className={this.state.tab === 0 ? styles.active : ''} onClick={() => {this.changeTab(0)}}>系统角色</div>
            <div className={this.state.tab === 1 ? styles.active : ''} onClick={() => {this.changeTab(1)}}>代理商角色</div>
          </div>

          <div className={styles.contentWrap}>
            <Table
              dataSource={this.state.dataSource}
              columns={columns}
              rowSelection={rowSelection}
              pagination={{
                showQuickJumper: true
              }}
            />

            {
              this.state.dataSource.length === 0
              || <Button
                type='primary'
                disabled={!this.state.selectedRowKeys.length}
                className={styles.delBtn}
                onClick={this.delConfirm}
              >
                批量删除
              </Button>
            }

          </div>
        </div>
      </ContentBox>
    )
  }
}

export default Main
