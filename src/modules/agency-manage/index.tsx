import React from 'react'
import ContentBox from '@/modules/common/content'
import { Tabs } from 'antd'
import AddButton from '@/modules/common/content/AddButton'
import Direct from './direct'
import Agent from './agent'
import Accounting from './accounting'
import Modal from 'pilipa/libs/modal'
import AccountingModal from './accounting/AccountingModal'
import ChannelModal from './agent/ChannelModal'
const TabPane = Tabs.TabPane
interface States {
  defaultActiveKey: string
  showAccountingModal: number // 用于核算中心添加窗口的显示
}
class Main extends React.Component<null, States> {
  public state: States = {
    defaultActiveKey: 'direct',
    showAccountingModal: 0
  }
  public callback (value?: string) {
    this.setState({
      defaultActiveKey: value
    })
  }
  public add () {
    console.log(this.state.defaultActiveKey)
    if (this.state.defaultActiveKey === 'direct') {}
    if (this.state.defaultActiveKey === 'agent') { this.addAgent() }
    if (this.state.defaultActiveKey === 'accounting') {
      this.setState({showAccountingModal: ++this.state.showAccountingModal})
    }
  }
  public addAgent () {
    const modal = new Modal({
      content: <ChannelModal />,
      title: '新增代理商',
      mask: true,
      style: 'width: 800px;',
      onOk: () => {
        modal.hide()
      },
      onCancel: () => {
        modal.hide()
      }
    })
    modal.show()
  }

  public render () {
    return (
      <ContentBox
        title='机构管理'
        rightCotent={(
          <AddButton
            title='添加'
            onClick={() => {
              this.add()
            }}
          />
        )}
      >
        <Tabs
          animated={false}
          defaultActiveKey='direct'
          onChange={this.callback.bind(this)}
        >
          <TabPane tab='直营' key='direct'>
            <Direct />
          </TabPane>
          <TabPane tab='代理商' key='agent'>
            <Agent />
          </TabPane>
          <TabPane tab='核算中心' key='accounting'>
            <Accounting showAccountingModal={this.state.showAccountingModal} />
          </TabPane>
        </Tabs>
      </ContentBox>
    )
  }
}

export default Main
